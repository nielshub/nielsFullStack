import React from 'react';
import './App.css';
import News from "./apis/news";
import { BrowserRouter as Router, Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <h1>Image guesser</h1>
      <News></News>
    </div>
  );
}

export default App;
