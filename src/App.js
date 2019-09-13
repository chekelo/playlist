import React from 'react';
import './App.css';

function Title() {
  return <h1>Title</h1>
}

function Summary() {
  return <div style={{display:'inline-block', margin: '2px'}}>
    <h2 >90 Canciones</h2>
  </div>
}

function Filter() {
  return <div>
    <input/>
  </div>
}

function Playlist() {
  return <div style={{width:'25%'}}>
    <img/>
    <h3>Name of Playlist</h3>
    <ul>
      <li>Song 1</li>      
      <li>Song 2</li>
      <li>Song 3</li>
    </ul>
  </div>
}

function App() {
  return (
    <div className="App">
     <Title/>
     <Summary/>
     <Summary/>
     <Filter/>
     <Playlist/>
    </div>
  );
}

export default App;
