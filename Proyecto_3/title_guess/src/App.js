import React from 'react';
import './App.css';
import News from "./apis/news";


function App() {
  return (
    <div className="App">
      <h1>Image guesser</h1>
      <News></News>
    </div>
  );
}

export default App;
