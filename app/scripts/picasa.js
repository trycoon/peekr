(function(exports) {
  'use strict';

  exports.Picasa = {

    /***
     * Fetches images from specified album.
     * Use as:
     * getImagesFromAlbum('114736267714313794052', '5508006810704621345').done(function(data) { // Do stuff }).fail(function() { // Do stuff });
     *
     * userId can be hard coded to 105814678861633692185 if things are messy
     * albumId can be hard code to 6005765907437818049 if things are messy
     * @param userId
     * @param albumid
     * @returns {object} promise
     */
    getImagesFromAlbum: function(userId, albumid) {
      return $.ajax({
        type: 'GET',
        url: 'https://picasaweb.google.com/data/feed/api/user/' + userId +'/albumid/' + albumid,
        dataType: "jsonp",
        data: {
          alt: 'json-in-script'
        },
        jsonpCallback: 'picasaCallback',
        success: function(response, status, xhr) {
          return response;

        },
        error: function(xhr, status, err) {
          console.log('Jupiter client call failed ');
        }
      });
    },


    /**
     * Handle authentication against Google
     * Is dependent of https://oauth.io/ where a account is needed in order to use the library.
     */
    getAccessToken: function() {
      var access_token;
      OAuth.initialize('BLyjDMMIj7nRjs2m3bCFWB0ZsTA');
      OAuth.popup('google', function(error, result) {
        return access_token = result.access_token;
      });

    }


};
})(this || window);