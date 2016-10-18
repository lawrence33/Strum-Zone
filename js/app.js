//Globals
var base = 'https://api.spotify.com';
var songID = '/v1/tracks/{id}';
var songSearch = '/v1/search?type=track';
console.log(base + songSearch);

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

    $(function() {

      $('.song-name').on('submit', function(e) {
        e.preventDefault();

        // var song = $(this).find("input[name='songTitle']").val();
        var song = $('.songTitle').val();
        tabData(song);

      });

        //should I clone this to a new div, OR should I clone & delete the rest
        // $('.go-to-tabs').on('click', function(){
        //     $('.selectArtist').clone();
        //     $('.tabs-results').append(copyMusic);
        // });

        //why is this not working?
        $('.selectArtist').mousedown(function(e){
          e.preventDefault();
            alert('hi');
          });

        //why is this not working?
        $('.addArtist').hover(function(){
            alert('hi');
          });
                  
            // var copyMusic = $(this).clone();
            // console.log(copyMusic, 'copy');
            // $('.tabs-results').appensd(copyMusic);
            // $('.song-results').empty();
          });
        