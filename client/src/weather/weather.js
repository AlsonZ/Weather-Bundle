import React, { useEffect, useState } from 'react';
import WeatherCard from './weather-card.js';
import './weather.css';

function Weather(props) {

  const [weatherInfo, setWeatherInfo] = useState([]);

  useEffect(() => {
    async function fetchURL(url) {
      const res = await fetch('/weatherAPI/getURL/'+url);
      const resData = await res.json();
      if(resData) {
        console.log(resData);
        setWeatherInfo(resData);
      }
    }
    if(props.site) {
      fetchURL(props.site);
    }
  },[])

  return (
    <div className="weather-container">
      <a href={"http://www."+props.site} className="weather-url">
        {props.site}
      </a>
      {weatherInfo.map((weather,i) =>
        <WeatherCard key={i} weather={weather}/>
      )}
    </div>
  );
}

export default Weather;
