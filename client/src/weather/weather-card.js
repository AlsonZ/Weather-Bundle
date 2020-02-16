import React, { Suspense } from 'react';
import './weather.css';

function WeatherCard({weather}) {
  return (
    <div className="weather-card-container">
      <Suspense fallback={<div>Loading...?</div>}>
        <h1 className="weather-card-day">{weather.day}</h1>
        <div className="weather-card-content">
          <div className="weather-card-content-top-row">
            <p className="weather-card-temp">{weather.minTemp}</p>
            <img className="weather-card-image" src={weather.image}/>
            <p className="weather-card-temp">{weather.maxTemp}</p>
          </div>
          <div className="weather-card-info-container">
            <span className="weather-card-rain-chance-title">Rain Chance: </span>
            <span className="weather-card-rain-chance">{weather.rainChance}</span>
          </div>
          <div className="weather-card-info-container">
            <span className="weather-card-rain-amount-title">Rain Amount:</span>
            <span className="weather-card-rain-amount">{weather.rainAmount}</span>
          </div>
          <div className="weather-card-info-container">
            <span className="weather-card-fire-danger-title">Fire Danger: </span>
            <span className="weather-card-fire-danger">{weather.fireDanger}</span>
          </div>
          <div className="weather-card-info-container">
            <span className="weather-card-UV-index-title">UV Index:</span>
            <span className="weather-card-UV-index">{weather.UVIndex}</span>
          </div>
        </div>
      </Suspense>
    </div>
  );
}

export default WeatherCard;
