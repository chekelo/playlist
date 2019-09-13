import React, { Component } from 'react';
import './App.css';

let fakeServerData = {
  user: {
    name: "Keilor",
    playlists: [
      {
        name: 'Loquera',
        songs: [
          { name: 'electro 1' },
          { name: 'titanic' },
          { name: 'party animal' }
        ]
      },
      {
        name: 'rock y otras',
        songs: [
          { name: 'Patiente' },
          { name: 'The reason' },
          { name: 'Number of the best' }
        ]
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

    return <div style={{ display: 'inline-block', marginRight: '100px' }}>
      <h2>{this.props.playlists && this.props.playlists.length} Playlist</h2>
    </div>
  }
}
class TotalSongs extends Component {

  render() {
    let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
      return songs.concat(eachPlaylist.songs);
    }, []);
    return <div style={{ display: 'inline-block' }}>
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
  render() {
    return (
      <div style={{ display: 'inline-block', width: '25%' }}>
        <img />
        <h3>{this.props.playlist.name}</h3>
        <ul>
          {this.props.playlist.songs.map(song =>
            <li>{song.name}</li>
          )}
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
  componentDidMount() {
    this.state = ({ serverData: fakeServerData });
  }
  render() {
    return (
      <div className="App">
        {this.state.serverData.user ?
          <div>
            <Title />
            <Summary playlists={this.state.serverData.user && this.state.serverData.user.playlists} />
            <TotalSongs playlists={this.state.serverData.user && this.state.serverData.user.playlists} />
            <Filter />
            {this.state.serverData.user.playlists.map(playlist =>
              <Playlist playlist={playlist} />
            )}
          </div> : ''
        }
      </div>
    );
  }
}

export default App;
