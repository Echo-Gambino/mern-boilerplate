import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import './App.css';

import "bootstrap/dist/css/bootstrap.min.css";

import Main from "./components/main.component";
import Register from "./components/register.component";

import {
  MAIN_PAGE_ENDPOINT,
  REGISTER_PAGE_ENDPOINT,
  LOGIN_PAGE_ENDPOINT,
} from "./constants";

class App extends Component {
  render() {
    return (
    <Router>
      <div className="App">
        <div className="container">
          <Route exact path={MAIN_PAGE_ENDPOINT} component={Main} />
          <Route exact path={REGISTER_PAGE_ENDPOINT} component={Register} />
        </div>
      </div>
    </Router>
    );
  }
}

export default App;
