// import logo from './logo.svg';
// import './App.css';
import './global.css';
import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom'; 

import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';

function App() {
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );

  // return (
    // fetch('http://localhost:5000/api/courses')
    //   .then(res => res.json())
    //   .then(data => console.log(data))
    //   .catch(err => console.log(err))
  // )

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Courses} />
          <Route path="/courses/:id" component={CourseDetail} />
        </Switch>
      </BrowserRouter>
    );
}

export default App;
