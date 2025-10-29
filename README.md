# 🌦️ Weather Now

**Built for Jamie – Outdoor Enthusiast 🌍**  
A fast and elegant weather app that shows **live weather reports for any city, town, or village in India** — powered by **Open-Meteo API** and **OpenStreetMap (Nominatim)**.

---

## 🚀 Features

✅ Get **real-time weather conditions** for **any location** across India  
✅ Uses **Open-Meteo API** (no API key needed)  
✅ Dynamic **background changes** — sunny, cloudy, rainy, stormy, or night  
✅ Beautiful, **animated UI** built with React & CSS  
✅ Responsive design (works on desktop & mobile)  
✅ Graceful error handling for unknown places  

---

## 🎯 User Persona

**👤 Name:** Jamie  
**💼 Occupation:** Outdoor Enthusiast  
**🌱 Need:** Quickly check the current weather conditions for any city or village to plan outdoor activities.  

---

## 🧠 How It Works

1. **User searches** for any Indian city, town, or village.  
2. The app uses **OpenStreetMap (Nominatim)** to find latitude & longitude.  
3. Those coordinates are sent to **Open-Meteo API** to fetch live weather data.  
4. The app displays:
   - 🌡️ Temperature  
   - 🤗 Feels Like  
   - 💧 Humidity  
   - 🌬️ Wind Speed  
   - ⚖️ Pressure  
   - 🌤️ Weather Description  
5. Background automatically updates to match weather (e.g., sunny, rainy, night).

---

## 🧩 Tech Stack

| Technology | Purpose |
|-------------|----------|
| **React.js** | Frontend Framework |
| **CSS3** | Styling & Animations |
| **OpenStreetMap (Nominatim)** | Convert place → coordinates |
| **Open-Meteo API** | Fetch live weather data |
| **JavaScript (ES6+)** | Logic & state management |

---

## 🖼️ Dynamic Backgrounds

| Weather | Background |
|----------|-------------|
| ☀️ Clear / Sunny | Blue sky background |
| ⛅ Cloudy / Overcast | Cloudy sky background |
| 🌧️ Rainy / Drizzle | Rain falling background |
| ⛈️ Thunderstorm | Dark stormy background |
| 🌙 Night | Starry night background |

---

## 🛠️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/weather-now.git
cd weather-now
