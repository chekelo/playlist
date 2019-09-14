import React, { Component } from 'react';
import './App.css';
import queryString from 'query-string';

/**
 * TODO 
 * 
 * -Mostrar listado completo de canciones por playlist
 * -Agregar canciones a una playlist específica
 */


 /**
  * Componente para mostrar datos de usuario, actualmente muestra nombre e imagen
  */

class Title extends Component {
  render() {
    console.log(this.props.user)
    return <div>
      <img src={this.props.user.imageUrl} style={{borderRadius:'50%'}}/>
      <h1>Lista de reproducción de {this.props.user.name}</h1>
    </div>
  }
}
/**
  * Componente para mostrar la cantidad de playlist que posee el usuario
  */
class Summary extends Component {

  render() {

    return <div style={{ display: 'inline-block', marginRight: '100px' }}>
      <h2>{this.props.playlists && this.props.playlists.length} Playlist</h2>
    </div>
  }
}

/**
  * Componente para mostrar la cantidad Canciones de las playlists
  */
class TotalSongs extends Component {

  render() {
    let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
      return songs.concat(eachPlaylist.songs);
    }, []);
    return <div style={{ display: 'inline-block' }}>
      <h2>{allSongs.length} Canciones en lista</h2>
    </div>
  }
}

/**
  * Componente para buscar por nombre de playlist 
  * 
  * TODO: extender funcionalidad para que permita el filtrado por nombre de canciones
  */
class Filter extends Component {
  render() {
    return <div>
      <input type='text' onKeyUp={even => this.props.onTextChange(even.target.value)} />
    </div>
  }
}

/**
  * Componente para mostrar la información de la playlist, incluye las canciones
  * Se realiza un ajuste para solo mostrar las primeras 5 canciones
  */
class Playlist extends Component {
  render() {
    return (
      <div style={{ display: 'inline-block', width: '25%', marginBottom: '10px'}}>
        <img src={this.props.playlist.imageUrl} style={{ width: '100px', borderRadius:'50%' }} />
        <h3>{this.props.playlist.name} (Top 5)</h3>
        <ul style={{listStyle:'none'}}>      
          {this.props.playlist.songs.slice(0, 5).map(song =>
            <li>{song.name}</li>
          )}
        </ul>
        <button 
        style={{backgroundColor:'#337ab7',color: '#fff',borderColor: '#2e6da4'}} 
        onClick={() => window.location = '/listSongs'}>
        Ver canciones
        </button>
      </div>
    );
  }
}

/**
  * Componente Principal encargado de logueo y obtención de datos
  */
class App extends Component {
  constructor() {
    super();
    this.state = {
      filterString: ''
    }
  }
  /**
   * se carga el token para la navegación una vez autenticado.
   * 
   * TODO: validar problema cuando el token expira, es necesario redireccionar a login
   */
  componentDidMount() {
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;

    if (!accessToken)
      return;
    //Funcion para obtener la informacion del usuario autenticado
    fetch('https://api.spotify.com/v1/me', {
      headers: { 'Authorization': 'Bearer ' + accessToken }
    }).then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({
          user: {
            name: data.display_name,
            imageUrl: data.images[0].url
          }
        })
      })
    //Funcion para obtener las playlist del usuario logueaado
    fetch('https://api.spotify.com/v1/me/playlists', {
      headers: { 'Authorization': 'Bearer ' + accessToken }
    }).then(response => response.json())
      .then(playlistData => {
        let playlists = playlistData.items;
        console.log(playlistData);
        let trackDataPromises = playlists.map(playlist => {
          let responsePromise = fetch(playlist.tracks.href, {
            headers: { 'Authorization': 'Bearer ' + accessToken }
          })
          let trackDataPromise = responsePromise.then(reponse => reponse.json());
          return trackDataPromise;
        })
        let allTracksDataPromises = Promise.all(trackDataPromises);
        let playlistPromise = allTracksDataPromises.then(trackDatas => {
          trackDatas.forEach((trackData, i) => {
            playlists[i].trackDatas = trackData.items.map(item => item.track)
          })
          return playlists;
        })
        return playlistPromise;
      })
      .then(playlists => {
        this.setState({
          playlists: playlists.map(item => {
            return {
              name: item.name,
              imageUrl: item.images[0].url,
              songs: item.trackDatas.map(track => ({
                name: track.name
              }))
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
            <Title user={this.state.user} />
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
