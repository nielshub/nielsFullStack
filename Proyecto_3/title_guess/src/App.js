import React from "react";
import "./App.css";
import News from "./apis/news";
import Home from "./apis/home"
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact strict path="/" render={() => <Home/>}></Route>
        <Route exact strict path="/us" render={() => <News country = "United States" />}></Route>
        <Route exact strict path="/jp" render={() => <News country = "Japan" />}></Route>
        <Route exact strict path="/fr" render={() => <News country = "France" />}></Route>
        <Route exact strict path="/it" render={() => <News country = "Italia" />}></Route>
        <Route exact strict path="/br" render={() => <News country = "Brasil" />}></Route>
        <Route exact strict path="/nl" render={() => <News country = "Netherland" />}></Route>
        <Route exact strict path="/info" render={() => <span>Info for the app</span>}></Route>
      </div>
    </Router>
  );
}

export default App;
