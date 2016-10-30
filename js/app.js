//Globals
var song;
var youtubeURL = 'https://www.googleapis.com/youtube/v3/search?';
var base = 'https://api.spotify.com';
var songID = '/v1/tracks/{id}';
var songSearch = '/v1/search?type=track';
var urlSong = 'http://www.songsterr.com/a/ra/songs.json?pattern='
var songAPI = 'http://www.songsterr.com/a/wa/song?id=';
var theArtist;
var songURL;
var useThisID;
var tabsData;


//Spotify API call
var tabData = function(query) {
    $('.spotify').removeClass('hidden');


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
          // console.log(data,'L 28');
          // console.log(tracks,'L 29');

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
  + uri + '"' + 'width="350" + height="100" frameborder="0"' 
  + 'allowtransparency="true">' + '</iframe>');

  return newPost;
};

//Songsterr API
var getTabs = function(songName, artistName){

  $.ajax({
    type: 'GET',
    data: songName,
    datatype: 'json',
    url: urlSong + songName,
    success: function(data){
      console.log(data, 'tab data');

      tabsData = data;

      var useThisID = '';
      for (var i = 0; i <= data.length; i++) {
        
        if(artistName == data[i].artist.name && data[i].artist.name != ''){
            useThisID = data[i].id;
          };
        
        songURL = songAPI + useThisID;

        $('.tabs-results').html('<iframe src="' + songURL + '"' 
        + 'width="825" + height="875" frameborder="0"' 
        + 'allowtransparency="true" scrolling="yes">' + '</iframe>');
      };
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
      + '<iframe width="370" height="300" src=' 
      + vidThumb + '>' + '</iframe>' + '<br>';

      console.log(vidList,'vids');

      $('.guitar-tutorial').html(vidList);
    });
};
};

var clearForm = function(){

    $('.song-results').empty();
    $('.tabs-results').empty();
    $('.list-tabs').empty();
    $('.guitar-tutorial').empty();
    $('.addArtist').show();
    $('.selectThis').show();
};


    $(function() {

      //if the tab STILL is not right, this gives ALL tabs in hyperlink 2 click
    $('.correctTab').on('click', function(){
      var restOfTabs = '';
      var baseSite = 'http://www.songsterr.com/';

      $('.stillWrong').show();

      $('.tabs-results').html('<iframe name="myIframe" src="' + baseSite + '"' 
        + 'width="850" + height="975" frameborder="0"' 
        + 'allowtransparency="true" scrolling="yes" sandbox="allow-forms allow-scripts">' + '</iframe>');
      
      $.each(tabsData,function(i,index){
        restOfTabs += '<li><a href="' +songAPI+index.id + '"' +' target="myIframe">' +index.artist.name+ '</a></li>';
      });

      $('.list-tabs').html(restOfTabs);
      $('.list-tabs').on('click',function(){
        $('.list-tabs').hide();
      });
    });
    
     //If all else fails & Songsterr doesnt have the right tab, which is quite possible,
    // allows Ux to click button & insert their own link which is contained in iFrame via sandbox
    $('#tabs-div').on('click', '.stillWrong', function(){

        $('.correctTab').hide();
        var theTab = prompt('Paste your tab link here.');
        
        $('.tabs-results').empty();

        $('.tabs-results').html('<iframe src="' + theTab + '"' 
        + 'width="850" + height="975" frameborder="0"' 
        + 'allowtransparency="true" scrolling="yes" sandbox="allow-forms allow-scripts">' + '</iframe>');
      });

    
    //Ux types in the new input form for the NEXT song they want
     $('.new-query').on('click', function(e){
        e.preventDefault();

        clearForm();

        $('.songTitle').val("");
        $('.song-you-want').slideDown('slow');
        $('.next-song-query').slideUp('slow');
        $('.spotifynext').removeClass('spotifynext').addClass('spotify');
        $('.correctTab').hide();
        $('.song-results').empty();
        $('.song-results').removeClass('song-results2').addClass('overflow-sm', '.song-results');
    });



    // when 'selectThis' is clicked we want to find the nearest li of 'nameArtist'
      $('.spotify').on('click','.selectThis',function(e){
        e.preventDefault();

        $('.correctTab').show();

        var closestDiv = $(this).closest('div');

        closestDiv.addClass('selected').removeClass('addArtist');
        $('.song-results').addClass('song-results2').removeClass('overflow-sm', '.song-results');
        $('.spotify').addClass('spotifynext').removeClass('spotify');
        $('.nameArtist').hide();
        $('.addArtist').hide();
        theArtist = $('.selected .nameArtist').text();
        $('.selectThis').hide();
        
        getTabs(song, theArtist);

    //call Youtube API
        getYoutubeVids(song,theArtist); 
       });


      $('.song-name').on('submit', function(e) {
        e.preventDefault();
      
        clearForm();
        $('.song-you-want').slideUp('slow');
        $('.next-song-query').slideDown('slow');
       
        song = $('.songTitle').val();
        
        tabData(song);               
      });
    });