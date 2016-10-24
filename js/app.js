//Globals
var song;
var youtubeURL = 'https://www.googleapis.com/youtube/v3/search?';
var base = 'https://api.spotify.com';
var songID = '/v1/tracks/{id}';
var songSearch = '/v1/search?type=track';
var urlSong = 'http://www.songsterr.com/a/ra/songs.json?pattern='
var theArtist;


//Spotify API call
var tabData = function(query) {
    console.log(query, 'que');

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

       $.each(tracks, function(i, items){
          var songPost = clonePost(items);
          $('.song-results').append(songPost).addClass('overflow-sm');

        });
      }
    });
};


//clone the template, post data to template & append to 'song-results'
var clonePost = function(artistsData){
  var newPost = $('.template .addArtist').clone();
  
  var newArtist = newPost.find('.nameArtist');
  newArtist.text(artistsData.artists[0].name);
  theArtist = artistsData.artists[0].name;
  
  var songLink = newPost.find('.songLink');
  var uri = artistsData.uri;

  songLink.html('<iframe src="https://embed.spotify.com/?uri='
  + uri + '"' + 'width="200" + height="230" frameborder="0"' 
  + 'allowtransparency="true">' + '</iframe>');

  return newPost;
};

//Songsterr API
var getTabs = function(songName, artistName){
  var songAPI = 'http://www.songsterr.com/a/wa/song?id=';

  $.ajax({
    type: 'GET',
    data: songName,
    datatype: 'jsonp',
    url: urlSong + songName,
    success: function(data){
      console.log(data, 'tab data');
    
      var useThisID = '';
      for (var i = 0; i <= data.length; i++) {
        
        if(artistName == data[i].artist.name && data[i].artist.name != ''){
            console.log(data[i].artist.name, 'console log data i');
            useThisID = data[i].id;
            // console.log(useThisID, 'final id');
          };
        
        songURL = songAPI + useThisID;
        console.log(songURL, 'url');

        $('.tabs-results').html('<iframe src="' + songURL + '"' 
        + 'width="850" + height="975" frameborder="0"' 
        + 'allowtransparency="true" scrolling="yes">' + '</iframe>');


    //if the tab STILL is not right, this gives ALL tabs in hyperlink 2 click
    $('.correctTab').on('click', function(){
      var restOfTabs = '';
      var baseSite = 'http://www.songsterr.com/';

      $('.stillWrong').show();

      $('.tabs-results').html('<iframe name="myIframe" src="' + baseSite + '"' 
        + 'width="850" + height="975" frameborder="0"' 
        + 'allowtransparency="true" scrolling="yes" sandbox="allow-forms allow-scripts">' + '</iframe>');
      
      $.each(data,function(i,index){
        restOfTabs += '<li><a href="' +songAPI+index.id + '"' +' target="myIframe">' +index.artist.name+ '</a></li>';
      });

      $('.list-tabs').html(restOfTabs);
      
      });
    };
    
     //If all else fails & Songsterr doesnt have the right tab, which is quite possible,
    // allows Ux to click button & insert their own link which is contained in iFrame via sandbox
    $('.stillWrong').on('click', function(){
  
        $('.correctTab').hide();
        var theTab = prompt('Paste your tab link here.');
        
        $('.tabs-results').empty();

        $('.tabs-results').html('<iframe src="' + theTab + '"' 
        + 'width="850" + height="975" frameborder="0"' 
        + 'allowtransparency="true" scrolling="yes" sandbox="allow-forms allow-scripts">' + '</iframe>');
        });
  }
  });
};

//Youtube API
var getYoutubeVids = function(songNm, artistNm){

  var searchString = songNm + ' ' + artistNm + ' guitar lesson tutorial';
  console.log(searchString, 'search');

  var params = {
    q: searchString,
    key: 'AIzaSyA1uLdof4nnB3Ef3japYsj8p6eNcYB6LIc',
    part: 'snippet',
    maxResults: 5
  };

  $.getJSON(youtubeURL,params,function(data){
      var ytData = data.items; 
      console.log(data.items,'yt vids');

      postVids(ytData);

  });

var postVids = function(dataSet){
    var snipBase = "https://www.youtube.com/embed/";
    var vidList = '';

    $.each(dataSet,function(i,index){
      var snipTitle = index.snippet.title;
      var vidThumb = snipBase + index.id.videoId;
      vidList += '<p>' +snipTitle+ '</p>' 
      + '<iframe width="400" height="275" src=' 
      + vidThumb + '>' + '</iframe>' + '<br>';

      console.log(vidList,'vids');

      $('.guitar-tutorial').html(vidList);
    });

};

};

var clearForm = function(){
        song = $('.songTitle').val();
        console.log(song, 'new song');

    $('.song-results').empty();
    $('.tabs-results').empty();
    $('.list-tabs').empty();
    
};


    $(function() {

    // when 'selectThis' is clicked we want to find the nearest li of 'nameArtist'
      $('.spotify').on('click','.selectThis',function(e){
        e.preventDefault();

        var closestDiv = $(this).closest('div');

        closestDiv.addClass('selected');
        closestDiv.removeClass('addArtist');
        $('.song-results').removeClass('overflow-sm');
        $('.addArtist').hide();
        theArtist = $('.selected .nameArtist').text();
        $('.selectThis').hide();
        
        getTabs(song, theArtist);

    //call Youtube API
        getYoutubeVids(song,theArtist); 
        console.log(song,'YT song');
        console.log(theArtist,'YT artist');
       });


      $('.song-name').on('submit', function(e) {
        e.preventDefault();

        clearForm();

 
        song = $('.songTitle').val();
        console.log(song);

        tabData(song);
               
      });
    });