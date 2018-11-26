const playlist = require('./controllers/playlist.js');


$(function myFunction() {  
    
    let query = playlist.getSongName();

    
    $.get('/search?' + $.param({query: query}), function(data) {
      document.getElementById('results').innerHTML = data.tracks.items.map(track => {
        return `<li><a href="${track.external_urls.spotify}">${track.name}   |   ${track.artists[0].name}</a></li>`;
      }).join('\n');
  });
  
      
  $.get('/search-track', function(data) {
    // "Data" is the object we get from the API. See server.js for the function that returns it.
    console.group('%cResponse from /search-track', 'color: #F037A5; font-size: large');
    console.log(data);
    console.groupEnd();
    
    // Display the track name
    var trackName = $('<h3><a href="' + data.external_urls.spotify + '">' + data.name + '</a></h3>');
    var artistName = $('<h3>' + data.artists[0].name + '</h3>');
    trackName.appendTo('#search-track-container');
    artistName.appendTo('#search-track-container');
    
    // Display the album art
    var img = $('<img/>');
    img.attr('src', data.album.images[0].url);
    img.appendTo('#search-track-container');
  });

});