var SpotifyWebApi = require("spotify-web-api-node");

require("dotenv").config();

function spotifySearchPlaylist(){
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET
  });
  
  // Retrieve an access token
  spotifyApi.clientCredentialsGrant().then(
    function(data) {
//      console.log('The access token expires in ' + data.body['expires_in']);
//      console.log('The access token is ' + data.body['access_token']);
  
      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body['access_token']);
      
      return spotifyApi.searchPlaylists('pagodinho');

    },
    function(err) {
      console.log(
        'Something went wrong when retrieving an access token',
        err.message
      );
    } 
  )
  // Function that generates a random integer with defined range
  .then(function(data){
    function between(min, max) {  
      return Math.floor(
        Math.random() * (max - min) + min
      )
    }
    
    // Generates a maximum value according to the "total" field of the response
    var max = 0;
    if (data.body.playlists.total < 20) {
      max = (data.body.playlists.total)-1;
    }else{max = 19;
    }

    // Print the random URL
    const linkSpotify = JSON.stringify(data.body.playlists.items[between(0, max)].external_urls.spotify)
    console.log(linkSpotify)
  }
  );
}
spotifySearchPlaylist();