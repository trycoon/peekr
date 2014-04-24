(function(exports) {
  'use strict';

  exports.Picasa = {

    /***
     * Fetches images from specified album.
     * Use as:
     * getImagesFromAlbum('114736267714313794052', '5508006810704621345').done(function(data) { // Do stuff }).fail(function() { // Do stuff });
     * @param userId
     * @param albumid
     * @returns {object} promise
     */
    getImagesFromAlbum: function(userId, albumid) {
      return $.ajax({
        dataType: 'jsonp',
        url: 'https://picasaweb.google.com/data/feed/api/user/' + userId + '/albumid/' + albumid,
        data: {
          alt: 'json-in-script',
          fields: 'entry(title,content)'  //Filter what we need
        },
        jsonpCallback: 'picasaCallback'
      });
    }
  };
})(this || window);