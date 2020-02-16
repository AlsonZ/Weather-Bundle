import React from 'react';
import Weather from './weather/weather.js';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Weather site={'bom.gov.au'}/>
      <Weather site={'accuweather.com'}/>
    </div>
  );
}

export default App;
