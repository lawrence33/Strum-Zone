//Globals
var base = 'https://api.spotify.com';
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
        $.each(tracks, function(i, items){
        console.log(items.artists);
        });
      }
    });
};

    $(function() {

      $('.song-name').on('submit', function(e) {
        e.preventDefault();

        // var song = $(this).find("input[name='songTitle']").val();
        var song = $('.songTitle').val();
        console.log(song, 'song');

        tabData(song);

      });
    });