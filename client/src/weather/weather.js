import React, { useEffect, useState } from 'react';
import WeatherCard from './weather-card.js';
import './weather.css';

function Weather(props) {

  const [weatherInfo, setWeatherInfo] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchURL(url) {
      const res = await fetch('/weatherAPI/getURL/'+url);
      const resData = await res.json();
      if(resData) {
        console.log(resData);
        if(resData === "Access Denied") {
          setError(true);
        } else {
          setWeatherInfo(resData);
        }
      }
    }
    if(props.site) {
      fetchURL(props.site);
    }
  },[]);
  useEffect(() => {
    if(weatherInfo.length > 0) {
      setLoaded(true);
    }
  }, [weatherInfo]) 

  return (
    <div className="weather-container">
      <a href={"http://www."+props.site} className="weather-url">
        {props.site}
      </a>
        {error && <div>Access Denied</div>}
        {!loaded && !error && <div>Loading...</div> }
        {loaded && weatherInfo.map((weather,i) =>
          <WeatherCard key={i} weather={weather}/>
        )}
    </div>
  );
}

export default Weather;
