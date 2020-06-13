import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import './App.css';

import "bootstrap/dist/css/bootstrap.min.css";

import store from "./store";

import Main from "./components/main.component";
import Register from "./components/register.component";
import Login from "./components/login.component";

import {
  MAIN_PAGE_ENDPOINT,
  REGISTER_PAGE_ENDPOINT,
  LOGIN_PAGE_ENDPOINT,
} from "./constants";

class App extends Component {
  render() {
    return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <div className="container">
            <Switch>
              <Route exact path={MAIN_PAGE_ENDPOINT} component={Main} />
              <Route exact path={REGISTER_PAGE_ENDPOINT} component={Register} />
              <Route exact path={LOGIN_PAGE_ENDPOINT} component={Login} />
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
    );
  }
}

export default App;
