import React from 'react';
import logo from './logo.svg';
import './App.css';
import DonutChartWidget from './DonutCharts/DonutChartWidget';
import  BasicDonut from './basicDonut/basic_donut'
import MyBasicDonut from './myBasicDonut/myBasicDonut'
import SidePiece from './myBasicDonut/sidePiece';
import ScheduleContext from './myBasicDonut/donutContext'
// import VersionContext from './myBasicDonut/donutContext'
function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <h1>Hi there buddy</h1>
      {/* <BasicDonut/> */}
      <ScheduleContext/>
      {/* <VersionContext/> */}
      <MyBasicDonut/>
    </div>
  );
}

export default App;
