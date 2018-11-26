 'use strict';

const logger = require('../utils/logger');
const playlistStore = require('../models/playlist-store');
const uuid = require('uuid');

const playlist = {
  index(request, response) {
    const playlistId = request.params.id;
    logger.debug('Playlist id = ', playlistId);
    const viewData = {
      title: 'Playlist',
      playlist: playlistStore.getPlaylist(playlistId),
    };
    response.render('playlist', viewData);
  },

  deleteSong(request, response) {
    const playlistId = request.params.id;
    const songId = request.params.songid;
    logger.debug(`Deleting Song ${songId} from Playlist ${playlistId}`);
    playlistStore.removeSong(playlistId, songId);
    response.redirect('/playlist/' + playlistId);
  },

  addSong(request, response) {
    const playlistId = request.params.id;
    const playlist = playlistStore.getPlaylist(playlistId);
    const newSong = {
      id: uuid(),
      title: request.body.title,
      artist: request.body.artist,
    };
    logger.debug('New Song = ', newSong);
    playlistStore.addSong(playlistId, newSong);
    response.redirect('/playlist/' + playlistId);
  },
  
  

  viewSong(request, response){
    const playlistId = request.params.id;
    logger.debug(playlistId);
    const song = request.params.songid;
    var songOne;
   const body =  playlistStore.getPlaylist(playlistId);
    body.songs.forEach(function(element){
      if(element.songId == song){
        songOne = element;}
    });
    logger.debug(body);
    logger.debug("SongID = " , song);
    const viewData = {
     title : songOne.name,
     body : songOne
    };
   response.render('viewsongs', viewData);
  },
  
  linkToSpotify(request, response){
  const playlistId = request.params.id;
  logger.debug(playlistId);
  const song = request.params.songid;
   var songOne;
   let trackid;
   const body =  playlistStore.getPlaylist(playlistId);
    body.songs.forEach(function(element){
      if(element.songId == song){
        songOne = element;} 
    });
    $(function myFunction() {  
    
    let query = songOne.name;
    
    $.get('/search?' + $.param({query: query}), function(data) {
      document.getElementById('results').innerHTML = data.tracks.items.map(track => {
        return {trackid : track.id.spotify};  
        console.log(trackid);
      })
      });
    });
     const viewData = {
     spotifyId : trackid
     
     };
      response.render('viewsongs', viewData);  
  }
};


    


module.exports = playlist;
