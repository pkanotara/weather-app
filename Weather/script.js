const baseUrl = 'http://api.weatherapi.com/v1/current.json?key=314ce9363e9340a8af4171015252501&q=';

document.addEventListener('DOMContentLoaded', () => {
    const locationInput = document.getElementById('location-input');
    const searchButton = document.getElementById('search-btn');
    const locationElement = document.getElementById('location');
    const temperatureElement = document.getElementById('temperature');
    const descriptionElement = document.getElementById('description');
    const humidityElement = document.getElementById('humidity');
    const windElement = document.getElementById('wind');
    const weatherIconElement = document.getElementById('weather-icon');
    const extraInfoElement = document.getElementById('extra-info');
    const loadingElement = document.getElementById('loading');

    async function fetchWeather(location) {
        try {
            loadingElement.style.display = 'flex';
            const response = await fetch(`${baseUrl}${location}&aqi=no`);
            const data = await response.json();
            loadingElement.style.display = 'none';

            if (data.error) {
                locationElement.textContent = 'Location not found!';
                temperatureElement.textContent = 'Temperature: --';
                descriptionElement.textContent = 'Condition: --';
                humidityElement.textContent = 'Humidity: --';
                windElement.textContent = 'Wind Speed: --';
                weatherIconElement.classList.add('hidden');
                extraInfoElement.innerHTML = '';
            } else {
                locationElement.textContent = `${data.location.name}, ${data.location.region}, ${data.location.country}`;
                temperatureElement.textContent = `Temperature: ${data.current.temp_c}°C (${data.current.temp_f}°F)`;
                descriptionElement.textContent = `Condition: ${data.current.condition.text}`;
                humidityElement.textContent = `Humidity: ${data.current.humidity}%`;
                windElement.textContent = `Wind: ${data.current.wind_kph} km/h (${data.current.wind_dir})`;
                weatherIconElement.src = `https:${data.current.condition.icon}`;
                weatherIconElement.classList.remove('hidden');
                extraInfoElement.innerHTML = `
                    <p class="text-gray-700">Pressure: ${data.current.pressure_mb} mb</p>
                    <p class="text-gray-700">UV Index: ${data.current.uv}</p>
                    <p class="text-gray-700">Feels Like: ${data.current.feelslike_c}°C (${data.current.feelslike_f}°F)</p>
                    <p class="text-gray-700">Visibility: ${data.current.vis_km} km</p>
                `;
            }
        } catch (error) {
            loadingElement.style.display = 'none';
            console.error('Error fetching weather data:', error);
            locationElement.textContent = 'Error fetching weather data!';
        }
    }

    searchButton.addEventListener('click', () => {
        const location = locationInput.value.trim();
        if (location) {
            fetchWeather(location);
        } else {
            locationElement.textContent = 'Please enter a location!';
        }
    });
});