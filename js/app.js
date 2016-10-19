//Globals
var base = 'https://api.spotify.com';
var songID = '/v1/tracks/{id}';
var songSearch = '/v1/search?type=track';
var urlSong = 'http://www.songsterr.com/a/ra/songs.json?pattern='


var tabData = function(query) {
    // console.log(query, 'que');

    var params = {
       q: query,
     type: 'track',
      client_id: '263dae5b8ae14bae8e71e20dc4e97afe',
      client_secret: '35be8278b6a0481da43b5eb6042a28db'
    };

    $.ajax({
      type: 'GET',
      url: base + songSearch,
      datatype: 'json',
      data: params,
      success: function(data) {
        var tracks = data.tracks.items;
        // console.log(tracks, 'tracks')
        $.each(tracks, function(i, items){
        console.log(items, 'artists')
          var songPost = clonePost(items);
      $('.song-results').append(songPost);
      $('.go-to-tabs').removeClass();
      });
      }
    });

};

//clone the template, post data to template & append to 'song-results'
var clonePost = function(artistsData){

  var newPost = $('.template .addArtist').clone();
        // console.log(newPost, 'clone')

  var newArtist = newPost.find('.nameArtist');
  newArtist.text(artistsData.artists[0].name);
  // console.log(artistsData.artists[0].name, 'name');

  var albumImg = newPost.find('.addImg');
  // var albumCover = artistsData.album.images[].url;
  // console.log(artistsData.album.images[].url, 'img');
  albumImg.html('<img src=' + "artistsData.album.images[].url"+ '/>');

  var songLink = newPost.find('.songLink');
  var uri = artistsData.uri;
  // songLink.html("<embed src="+ 'artistsData.uri' +">''</embed>");
  songLink.html('<iframe src="https://embed.spotify.com/?uri='
  + uri + '"' 
  + 'width="200" + height="230" frameborder="0"' 
  + 'allowtransparency="true">' + '</iframe>');

  // songLink.html<'a href="' + 'https://api.spotify.com/v1/tracks/1gLOB2DBPvG1Jrupdj9PRc' + '"></a>';
  // console.log(artistsData.uri, 'song');

  return newPost;

};

var getTabs = function(songName){
  
  var songAPI = 'http://www.songsterr.com/a/wa/song?id=';

  $.ajax({
    type: 'GET',
    data: songName,
    datatype: 'json',
    url: urlSong + songName,
    success: function(data){
      console.log(data, 'data');
    songId = data[0].id;
    // console.log(songId);
    var songURL = songAPI + songId;
    // console.log(songURL);

    $('.tabs-results').html('<iframe src="' + songURL + '"' 
  + 'width="850" + height="975" frameborder="0"' 
  + 'allowtransparency="true" scrolling="no">' + '</iframe>');

    return songURL;
    // });
  }
  }); 
  
};

    $(function() {

      $('.song-name').on('submit', function(e) {
        e.preventDefault();

        var song = $('.songTitle').val();
        tabData(song);

        getTabs(song);
      });
    });

