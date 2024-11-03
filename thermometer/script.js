// script.js

function convertTemperature(type) {
    const input = parseFloat(document.getElementById("temperatureInput").value);

    if (isNaN(input)) {
        document.getElementById("result").innerText = "Please enter a valid number.";
        return;
    }

    let result;
    if (type === 'celsiusToFahrenheit') {
        result = (input * 9 / 5) + 32;
        document.getElementById("result").innerText = `Result: ${result.toFixed(2)} °F`;
    } else if (type === 'fahrenheitToCelsius') {
        result = (input - 32) * 5 / 9;
        document.getElementById("result").innerText = `Result: ${result.toFixed(2)} °C`;
    }
}
