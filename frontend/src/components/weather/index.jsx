// External Imports
import React, { useEffect, useState } from "react";
import axios from "axios";
// Internal Imports
import "./index.css";
// Asset Imports
import { ReactComponent as MoonSvg } from "../../assets/svgs/dark_mode_FILL1_wght400_GRAD0_opsz24.svg";
import { ReactComponent as CloudSvg } from "../../assets/svgs/cloud_FILL1_wght400_GRAD0_opsz24.svg";

// Weather Component Widget
const WeatherWidget = ({ location }) => {
  const [weatherData, setWeatherData] = useState(null);

  // API connection using axios
  useEffect(() => {
    if (location.length) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=33b697b5fe02ec9121ba8228bc7f5ee2&units=metric`
        )
        // Setting setWeatherData to the response from the API
        .then((response) => {
          setWeatherData(response.data);
        })
        // Error Validation
        .catch((error) => {
          console.error("error: ", error);
        });
    }
  }, [location]); // Making the function only run when the location variable changes

  // Outputing to website a loading text while gathering data
  if (!weatherData) return <div>Loading...</div>;

  const currentTimeUTC = new Date().getTime() / 1000;
  const localTime = currentTimeUTC + weatherData.timezone;
  const isDayTime =
    localTime > weatherData.sys.sunrise && localTime < weatherData.sys.sunset;
  const cloudSize = weatherData.clouds.all;

  return (
    // The Weather widget
    <div className="weather-widget">
      {/* Changing if there is a sun or moon displayed on the widget */}
      {isDayTime ? <div className="sun"></div> : <MoonSvg className="moon" />}
      <div className="cloud-container">
        {/* Setting the size of the displayed cloud dependent on the amount of clouds outside */}
        {cloudSize > 50 && <CloudSvg className="cloud" />}
      </div>
      <div className="temperature">{Math.round(weatherData.main.temp)}°</div>
      <div className="weather">{weatherData.weather[0].main}</div>
      <div className="low-high">
        {Math.round(weatherData.main.temp_min)}° /{" "}
        {Math.round(weatherData.main.temp_max)}°
      </div>
      <div className="feels-like">
        Feels Like: {Math.round(weatherData.main.feels_like)}
      </div>
      <div className="location">{weatherData.name}</div>
      <div className="humidity">Humidity: {weatherData.main.humidity}%</div>
    </div>
  );
};

export default WeatherWidget;
