'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

// Initialize Spotify API wrapper
const SpotifyWebApi = require('spotify-web-api-node');

// The object we'll use to interact with the API
const spotifyApi = new SpotifyWebApi({
  clientId : process.env.CLIENT_ID,
  clientSecret : process.env.CLIENT_SECRET
});


