import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import './App.css';

import "bootstrap/dist/css/bootstrap.min.css";

import Main from "./components/main.component";
import Register from "./components/register.component";

class App extends Component {
  render() {
    return (
    <Router>
      <div className="App">
        <div className="container">
          <Route exact path="/" component={Main} />
          <Route exact path="/register" component={Register} />
        </div>
      </div>
    </Router>
    );
  }
}

export default App;
