//Globals
var song;
var base = 'https://api.spotify.com';
var songID = '/v1/tracks/{id}';
var songSearch = '/v1/search?type=track';
var urlSong = 'https://www.songsterr.com/a/ra/songs.json?pattern='
var theArtist;


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
        console.log(tracks);

       $.each(tracks, function(i, items){
          var songPost = clonePost(items);
          $('.song-results').append(songPost);
        });
      }
    });
    refineResults();
};

// when 'selectThis' is clicked we want to find the nearest li of 'nameArtist'

var refineResults = function(){
      $('.spotify').on('click','.selectThis',function(e){
        e.preventDefault();

        var closestDiv = $(this).closest('div');

        closestDiv.addClass('selected');
        closestDiv.removeClass('addArtist');
        $('.addArtist').hide();
        theArtist = $('.selected .nameArtist').text();
      
        console.log(theArtist, 'the FINAL artist name');
        
        getTabs(song, theArtist);
       });
};


//clone the template, post data to template & append to 'song-results'
var clonePost = function(artistsData){
  // console.log('start', 'artist');
  var newPost = $('.template .addArtist').clone();
        // console.log(newPost, 'clone')

  var newArtist = newPost.find('.nameArtist');
  newArtist.text(artistsData.artists[0].name);
  theArtist = artistsData.artists[0].name;
  // console.log(theArtist, 'theArtist');

  var songLink = newPost.find('.songLink');
  var uri = artistsData.uri;

  songLink.html('<iframe src="https://embed.spotify.com/?uri='
  + uri + '"' + 'width="220" + height="300" frameborder="0"' 
  + 'allowtransparency="true">' + '</iframe>');


  return newPost;

};


var getTabs = function(songName, artistName){
  
  var songAPI = 'https://www.songsterr.com/a/wa/song?id=';

  $.ajax({
    type: 'GET',
    data: songName,
    datatype: 'jsonp',
    url: urlSong + songName,
    success: function(data){
      console.log(data, 'tab data');
  
    // var useThisID = '';
    //   for (var i = 0; i <= data.length; i++) {

    //     if(artistName == data[i].artist.name){
    //         console.log(data[i].artist.name, 'artist name2');
    //         var useThisID = data[i].id;
    //         console.log(useThisID, 'final id');

    //      return useThisID;
    //       };
    //     };

    var songId = data[0].id;
    console.log(songId, 'the id to use');

    var songURL = songAPI + songId;
    console.log(songURL);


    $('.tabs-results').html('<iframe src="' + songURL + '"' 
  + 'width="850" + height="975" frameborder="0"' 
  + 'allowtransparency="true" scrolling="yes">' + '</iframe>');


    $('.correctTab').on('click', function(){
      console.log(data[0].id, 'data string again');

      $('.tabs-results').empty();
      
      for (var i = 1; i <= data.length; i++) {
        songId = data[i].id;
      
      console.log(songAPI, 'new song API');
      console.log(songId, 'new song id');

        $('.tabs-results').html('<iframe src="' + songURL + '"' 
        + 'width="850" + height="975" frameborder="0"' 
        + 'allowtransparency="true" scrolling="yes">' + '</iframe>');
      };
    });
    // return songURL;
  }
  }); 
};


    $(function() {

      $('.song-name').on('submit', function(e) {
        e.preventDefault();

<<<<<<< HEAD
        var song = $('.songTitle').val();
=======
        song = $('.songTitle').val();
        console.log(song);

>>>>>>> master
        tabData(song);

      });
    });

