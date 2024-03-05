// External Imports
import { useState } from "react";
// Internal Imports
import WeatherWidget from "./components/weather";
import AirQualityWidget from "./components/airquality";
import "./App.css";
// Asset Imports
import { ReactComponent as LogoSvg } from "./assets/svgs/logo.svg";

function App() {
  const [inputValue, setInputValue] = useState("London");
  const [location, setLocation] = useState("London");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLocation(inputValue);
  };

  return (
    <div>
      <div className="logo">
        <LogoSvg />
      </div>
      <div>
        <form onSubmit={handleFormSubmit} className="form__group field">
          <input
            type="text"
            className="form__field"
            placeholder="Location"
            name="location"
            id="location"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
          <label for="location" className="form__label">
            Location
          </label>
        </form>
        <div className="dashboard">
          <div className="weatherwidget">
            <WeatherWidget location={location} />
          </div>
          <div className="airquality">
            <AirQualityWidget location={location} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
