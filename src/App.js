import React, { Component } from 'react';
import './App.css';

let fakeServerData = {
  user: {
    name: "Keilor",
    playlists: [
      {
        name: 'Loquera',
        songs: ['electro 1', 'titanic', 'party animal']
      },
      {
        name: 'rock y otras',
        songs: ['Patiente', 'The reason', 'Number of the best']
      }
    ]
  }
  }
  

class Title extends Component {
  constructor() {
    super();
    this.state = { serverData: fakeServerData }
  }

  render() {
    return (
      <h1>Lista de reproducción de{this.state.serverData.user
        && this.state.serverData.user.name}</h1>
    );
  }
}

class Summary extends Component {
 
  render() {
    
    return <div style={{ display: 'inline-block', margin: '100px' }}>
      <h2>{this.props.playlists && this.props.playlists.length} Playlist</h2>      
    </div>
  }
}
class TotalSongs extends Component {
 
  render() {
    let allSongs= this.props.playlists.reduce((songs,eachPlaylist)=>{
      return songs.concat(eachPlaylist.songs);
    },[]);
    return <div style={{ display: 'inline-block', margin: '2px' }}>
      <h2>{allSongs.length} Canciones</h2>      
    </div>
  }
}

class Filter extends Component {
  render() {
    return <div>
      <input />
    </div>
  }
}

class Playlist extends Component {
  constructor() {
    super();
    this.state = { serverData: fakeServerData }
  }
  render() {
    return (     
      <div style={{ width: '25%' }}>
        <img />
        <h3>Name of Playlist</h3>
        <ul>
          <li>Song 1</li>
          <li>Song 2</li>
          <li>Song 3</li>
        </ul>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = { serverData: fakeServerData }
  }
  componentDidMount(){
    this.state=({serverData:fakeServerData});
  }
  render() {
    return (
      <div className="App">
        <Title />
        <Summary playlists={this.state.serverData.user && this.state.serverData.user.playlists} />
        <TotalSongs playlists={this.state.serverData.user && this.state.serverData.user.playlists}  />
        <Filter />
        <Playlist />
      </div>
    );
  }
}

export default App;
