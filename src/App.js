import React, { Component } from 'react';
import './App.css';
import queryString from 'query-string';

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
      <input type='text' onKeyUp={even => this.props.onTextChange(even.target.value)} />
    </div>
  }
}

class Playlist extends Component {
  render() {
    return (
      <div style={{ display: 'inline-block', width: '25%' }}>
        <img src={this.props.playlist.imageUrl} style={{width:'100px'}}/>
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
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
    console.log(accessToken);
    //Funcion para obtener la informacion del usuario autenticado
    fetch('https://api.spotify.com/v1/me', {
      headers: { 'Authorization': 'Bearer ' + accessToken }
    }).then(response => response.json())
      .then(data => {
        this.setState({
          user: {
            name: data.display_name
          }
        })
      })
    //Funcion para obtener las playlist del usuario logueaado
    fetch('https://api.spotify.com/v1/me/playlists', {
      headers: { 'Authorization': 'Bearer ' + accessToken }
    }).then(response => response.json())
      .then(data => {
        this.setState({
          playlists: data.items.map(item => {
            return {
              name: item.name,
              imageUrl:item.images[0].url,
              songs: []
            }
          })
        })
      })
  }
  render() {

    let playlistToRender = this.state.user &&
      this.state.playlists
      ? this.state.playlists.filter(
        playlist => playlist.name.toLowerCase().includes(this.state.filterString.toLowerCase()))
      : []

    return (
      <div className="App">
        {this.state.user ?
          <div>
            <Title name={this.state.user.name} />
            <Summary playlists={playlistToRender} />
            <TotalSongs playlists={playlistToRender} />
            <Filter onTextChange={text => this.setState({ filterString: text })} />
            {playlistToRender.map(playlist =>
              <Playlist playlist={playlist} />
            )}
          </div> : <button onClick={() => window.location = 'http://localhost:8888/login'}
            style={{ minWidth: '160px', color: '#fff', backgroundColor: '#1DB954', fontSize: '16px', borderRadius: '500px' }}>
            Ingresar a Spotify</button>
        }
      </div>
    );
  }
}

export default App;
