// External Imports
import React, { useEffect, useState } from "react";
import axios from "axios";

// Internal Imports
import "./index.css";

// Assets
import { ReactComponent as WindSvg } from "../../assets/svgs/air_FILL1_wght400_GRAD0_opsz24.svg";

const AirQualityWidget = ({ getCurrentLocation }) => {
  const [airQualityData, setAirQualityData] = useState(null);
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);

  // Function to get the current location
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLon(position.coords.longitude);
        },
        (error) => {
          console.error("Error getting location: ", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  // API connection using axios
  useEffect(() => {
    if (lat && lon) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=33b697b5fe02ec9121ba8228bc7f5ee2`
        )
        // Setting setAirQualityData to the response from the API
        .then((response) => {
          setAirQualityData(response.data);
        })
        // Error Validation
        .catch((error) => {
          console.error("error: ", error);
        });
    }
  }, [lat, lon]); // Making the function only run when the lat or lon variables change

  // Get the location on component mount
  useEffect(() => {
    getLocation();
  }, []);

  if (!airQualityData) return <div>Loading...</div>;

  return (
    // The Air Quality Widget
    <div className="air-quality-widget">
      {/* <div className="wind-container">{<WindSvg className="wind" />}</div> */}
      <div className="current-location">Air Quality</div>
      <div className="co">CO: {airQualityData.list[0].components.co}</div>
      <div className="o3">O3: {airQualityData.list[0].components.o3}</div>
      <div className="pm2_5">
        PM2.5: {airQualityData.list[0].components.pm2_5}
      </div>
      <div className="pm10">PM10: {airQualityData.list[0].components.pm10}</div>
      <div className="no2">NO2: {airQualityData.list[0].components.no2}</div>
      <div className="so2">SO2: {airQualityData.list[0].components.so2}</div>
    </div>
  );
};

export default AirQualityWidget;
