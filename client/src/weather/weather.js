import React, { useEffect, useState } from 'react';
import WeatherCard from './weather-card.js';
import './weather.css';

function Weather(props) {

  const [weatherInfo, setWeatherInfo] = useState([
    {
      day: "Monday",
      image: "none",//use a name and import the svgs for different types?
      minTemp: "19",
      maxTemp: "25",
      rainChance: "50%",
      rainAmount: "10-50mm",
      fireDanger: "nil",
      UVIndex: "extreme"
    }
  ]);

  useEffect(() => {
    //fetch weather site 1 data
    if(props.site === "bom.gov.au") {

    }
  },[])

  return (
    <div className="weather-container">
      {weatherInfo.map((weather) =>
        <WeatherCard weather={weather}/>
      )}
    </div>
  );
}

export default Weather;
