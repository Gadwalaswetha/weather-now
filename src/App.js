import { useState } from "react";
import "./App.css";

export default function App() {
  const [place, setPlace] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Must be declared before use
  const getBackgroundType = (code, isDay) => {
    if (!isDay) return "night";
    if (code === 0) return "sunny";
    if ([1, 2, 3].includes(code)) return "cloudy";
    if ([51, 61, 80].includes(code)) return "rainy";
    if (code === 95) return "stormy";
    return "default";
  };

  const fetchWeather = async () => {
    if (!place.trim()) {
      setError("Please enter a city, town, or village name.");
      return;
    }

    try {
      setError("");
      setWeather(null);
      setLoading(true);

      // Geolocation API call
      const geoRes = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          place
        )}, India&limit=1`
      );
      const geoData = await geoRes.json();

      if (!geoData || geoData.length === 0) {
        setError("Location not found. Try another name.");
        setLoading(false);
        return;
      }

      const { lat, lon, display_name } = geoData[0];

      // Weather API call (with units specified)
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,pressure_msl,weathercode,is_day&timezone=auto&wind_speed_unit=kmh`
      );
      const weatherData = await weatherRes.json();

      if (!weatherData.current) {
        setError("Weather data unavailable for this location.");
        setLoading(false);
        return;
      }

      const w = weatherData.current;
      const weatherDesc = {
        0: "Clear sky ☀️",
        1: "Mainly clear 🌤️",
        2: "Partly cloudy ⛅",
        3: "Overcast ☁️",
        45: "Fog 🌫️",
        51: "Light drizzle 🌦️",
        61: "Light rain 🌧️",
        80: "Rain showers 🌦️",
        95: "Thunderstorm ⛈️",
      };

      const bgType = getBackgroundType(w.weathercode, w.is_day);

      setWeather({
        name: display_name.split(",")[0],
        fullName: display_name,
        temp: w.temperature_2m,
        feels: w.apparent_temperature,
        humidity: w.relative_humidity_2m,
        wind: w.wind_speed_10m,
        pressure: w.pressure_msl,
        desc: weatherDesc[w.weathercode] || "Unknown",
        bgType: bgType,
      });
    } catch (err) {
      console.error(err);
      setError("Unable to fetch weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`app-container ${weather ? weather.bgType : "default"}`}>
      <div className="weather-container">
        <h1 className="app-title">🌦️ Weather Now</h1>
        <p className="app-subtitle">
          Check live weather for <b>any city or village</b> in India 🌍
        </p>

        <div className="search-box">
          <input
            type="text"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            placeholder="Enter city or village name..."
            className="search-input"
          />
          <button onClick={fetchWeather} className="search-btn" disabled={loading}>
            {loading ? "Loading..." : "Search"}
          </button>
        </div>

        {error && <p className="error-text">{error}</p>}

        {weather && (
          <div className="weather-card">
            <h2>{weather.fullName}</h2>
            <p className="desc">{weather.desc}</p>
            <div className="weather-info">
              <p>🌡️ Temp: <b>{weather.temp}°C</b></p>
              <p>🤗 Feels Like: {weather.feels}°C</p>
              <p>💧 Humidity: {weather.humidity}%</p>
              <p>🌬️ Wind: {weather.wind} km/h</p>
              <p>⚖️ Pressure: {weather.pressure} hPa</p>
            </div>
          </div>
        )}
      </div>

      <p className="footer">Built for Jamie – Outdoor Enthusiast 🌍</p>
    </div>
  );
}

