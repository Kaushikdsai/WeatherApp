import React, { useEffect, useState, useRef } from 'react';
import './Weather.css';
import searchIcon from '../assets/search.png'; // Renamed to avoid conflicts
import cloudIcon from '../assets/cloud.png';
import clearIcon from '../assets/clear.png';
import drizzleIcon from '../assets/drizzle.png';
import humidityIcon from '../assets/humidity.png';
import rainIcon from '../assets/rain.png';
import snowIcon from '../assets/snow.png';
import windIcon from '../assets/wind.png';

export const Weather = () => {
  const inputRef=useRef();
  const [weatherData,setWeatherData]=useState(false);
  const allIcons = {
    "01d": clearIcon,
    "01n": clearIcon,
    "02d": cloudIcon,
    "02n": cloudIcon,
    "03d": cloudIcon,
    "03n": cloudIcon,
    "04d": drizzleIcon,
    "04n": drizzleIcon,
    "09d": rainIcon,
    "09n": rainIcon,
    "10d": rainIcon,
    "10n": rainIcon,
    "13d": snowIcon,
    "13n": snowIcon
  }
  const search = async (city) => {
    try {
      const apiKey = import.meta.env.VITE_APP_ID; // Fetch API key from env
      if (!apiKey) {
        console.error("API key is not defined. Please check your .env file.");
        return;
      }
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        console.log(data);
      } else {
        console.error(`Error: ${data.message}`);
      }
      const icon=allIcons[data.weather[0].icon] || clearIcon;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon
      })
    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert("data not found");
    }
  };

  useEffect(() => {
    search("Tambaram");
  }, []);

  return (
    <div className="weather">
      <div className="search-bar">
        <input ref={inputRef} placeholder="Search"></input>
        <img src={searchIcon} alt="Search Icon" onClick={() => search(inputRef.current.value)}></img>
      </div>
      <img src={weatherData.icon} className="weather-icon" alt="Weather Icon" />
      <h1 className="temperature">{weatherData.temperature}°c</h1>
      <h1 className="location">{weatherData.location}</h1>
      <div className="weather-data">
        <div className="col">
          <img src={humidityIcon} alt="Humidity Icon" />
          <div className="d">
            <p>91%</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={windIcon} alt="Wind Icon" />
          <div className="d">
            <p>3.6Km/h</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
  );
};
