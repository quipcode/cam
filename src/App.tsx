import React from 'react';
import logo from './logo.svg';
import './App.css';
import DonutChartWidget from './DonutCharts/DonutChartWidget';
import  BasicDonut from './basicDonut/basic_donut'
import MyBasicDonut from './myBasicDonut/myBasicDonut'
import SidePiece from './myBasicDonut/sidePiece';
import ScheduleContext from './myBasicDonut/donutContext'
// import VersionContext from './myBasicDonut/donutContext'

import TodoProvider from './todo/context/todoContext';
import ThemeProvider from './todo/context/themeContext';
import Todos from './todo/containers/Todos';
import AddTodo from './todo/components/AddTodo';
import ThemeWrapper from './todo/components/ThemeWrapper';

import CamProvider from './cam/context/camContext';
import CamThemeProvider from './cam/context/camThemeContext';
import Cams from './cam/containers/Cams'
import AddCam from './cam/components/AddCam';
import CamThemeWrapper from './cam/components/CamThemeWrapper';
import Donuts from './cam/containers/Donuts';
import CamColorProvider from './cam/context/camColorContext';
import FooBarApp from './fooBar';
import CamFoo from './camFoo';
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
      {/* <FooBarApp/> */}
      <CamFoo/>
      {/* <BasicDonut/> */}
      {/* <ScheduleContext/> */}
      {/* <VersionContext/> */}
      {/* <MyBasicDonut/> */}

      {/* <ThemeProvider>
        <TodoProvider>
          <ThemeWrapper>
            <main className="App">
              <h1>My Todos</h1>
              <AddTodo />
              <Todos />
            </main>
          </ThemeWrapper>
        </TodoProvider>
      </ThemeProvider> */}
      {/* <CamThemeProvider>
        <CamProvider>
          <CamThemeWrapper>
            <CamColorProvider>
            <main className="App">
              <h1>My Cam</h1>
              <Donuts/>
              <AddCam/>
              <Cams />
            </main>
            </CamColorProvider>
          </CamThemeWrapper>
        </CamProvider>
      </CamThemeProvider> */}
    </div>
  );
}

export default App;
