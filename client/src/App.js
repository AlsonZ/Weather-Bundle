import React from 'react';
import Weather from './weather/weather.js';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <h1 className="app-weather-title">
        Sydney Weather Forecast
      </h1>
      <div className="app-weather-container">
        <Weather site={'bom.gov.au'}/>
        <Weather site={'accuweather.com'}/>
      </div>
    </div>
  );
}

export default App;
