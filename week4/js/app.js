// OpenWeatherMap API URL and Key
const API_KEY = "b0e2627be270f36dc46cbdd395428825";
const BASE_URL = "https://api.openweathermap.org/data/2.5/forecast";
const fetchWeatherData = async (city) => {
    try {
        const response = await fetch(`${BASE_URL}?q=${city}&units=metric&appid=${API_KEY}`);
        if (!response.ok) {
            throw new Error("City not found");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error.message);
        alert(error.message);
    }
};

// Parse Weather Data for Graph
const parseWeatherData = (data) => {
    const labels = [];
    const temperatures = [];
    data.list.forEach((entry, index) => {
        if (index % 8 === 0) { // Get daily data (every 8 entries ~ 3-hour intervals)
            labels.push(new Date(entry.dt_txt).toLocaleDateString());
            temperatures.push(entry.main.temp);
        }
    });
    return { labels, temperatures };
};
const renderChart = (labels, temperatures) => {
    const ctx = document.getElementById("weatherChart").getContext("2d");
    new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "Temperature (°C)",
                data: temperatures,
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true
                }
            }
        }
    });
};

// Event Listener (Using Arrow Functions and Callbacks)
document.getElementById("getWeather").addEventListener("click", () => {
    const city = document.getElementById("city").value.trim();
    if (!city) {
        alert("Please enter a city name!");
        return;
    }
    fetchWeatherData(city).then(data => {
        if (data) {
            const { labels, temperatures } = parseWeatherData(data);
            renderChart(labels, temperatures);
        }
    });
});
