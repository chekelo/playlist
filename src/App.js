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
  render() {
    return (
      <h1>Lista de reproducción de {this.props.name}</h1>
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
      <input type='text' onKeyUp={even=>this.props.onTextChange(even.target.value)} />
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
    this.state = {
      serverData: {},
      filterString: ''
    }
  }
  componentDidMount() {
    setTimeout(() => {      
    this.setState({ serverData: fakeServerData });
    }, 1000);
    setTimeout(() => {      
      this.setState({ filterString: '' });
      }, 2000);
  }
  render() {
    return (
      <div className="App">
        {this.state.serverData.user ?
          <div>
            <Title name={this.state.serverData.user.name} />
            <Summary playlists={this.state.serverData.user && this.state.serverData.user.playlists} />
            <TotalSongs playlists={this.state.serverData.user && this.state.serverData.user.playlists} />
            <Filter onTextChange={text => this.setState({filterString: text})} />
            {this.state.serverData.user.playlists.filter(playlist =>
              playlist.name.toLowerCase().includes(this.state.filterString.toLowerCase())
            ).map(playlist =>
              <Playlist playlist={playlist} />
            )}
          </div> : ''
        }
      </div>
    );
  }
}

export default App;
