import React from 'react';
import Weather from './weather/weather.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <Weather site={'bom.gov.au'}/>
    </div>
  );
}

export default App;
