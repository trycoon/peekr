/*global Blurry, Backbone, Picasa*/

Blurry.Models = Blurry.Models || {};

(function() {
  'use strict';

  // Speech recognition.
  var SpeechRecognition = window.webkitSpeechRecognition ||
      window.mozSpeechRecognition ||
      window.msSpeechRecognition ||
      window.oSpeechRecognition ||
      window.SpeechRecognition;

  Blurry.Models.Spela = Backbone.Model.extend({

    url: function(){
      return 'https://picasaweb.google.com/data/feed/api/user/' + this.userId +'/albumid/' + this.albumid
    },

    images: [],

    initialize: function() {
      this.userId = '105814678861633692185';
      this.albumid = '6005765907437818049';
      this.getAccessToken();
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

    },

    defaults: {
    },

    validate: function(attrs, options) {
    },

    parse: function(response, options) {
      console.log('response', response)

      //var unprocessedList = this.getImageList('sport').feed.entry;
      this.images = _.map(response.feed.entry, function(value, key) {
        return { url: value.content.src, name: value.summary['$t'] };
      });

      this.images = _.shuffle(this.images);

    },

    getImage: function() {
      this.currentImage = this.getRandomImage();
      return this.currentImage;
    },

    validateName: function(name) {
      console.log('validateName... ' + this.currentImage.name);
      return this.currentImage.name.toLowerCase() === name.toLowerCase();
    },

    /**
     * Funktion som lyssnar efter ett uttalat ord, måste anropas inför varje gång man förväntar sig ett nytt ord.
     */
    startListiningOnSpeech: function() {
      if (SpeechRecognition) {
        var recognition = new SpeechRecognition();
        recognition.lang = 'sv-SE';
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.onresult = function(event) {
          if (event.results.length > 0) {
            var word = event.results[0][0].transcript;
            console.log('Detected speech: ' + word);
          }
        };
        recognition.start();
      }
    },

    /**
     * Returnerar ett objekt med bild och vad den föreställer.
     */
    getRandomImage: function() {
      // Om inga bilder finns i listan, hämta dom från servern.
      if (this.images.length === 0) {
        this.fetch({dataType: 'jsonp', data: {
          alt: 'json-in-script'
        }});
      } else {
        // Returnera första bilden i listan och ta sedan bort den från listan så att vi inte får samma vid nästa anrop.
        var img = this.images.shift();

        if(img.hasOwnProperty('url')){
          return img;
        }else{
          this.getRandomImage();
        }
      }
    }

  });
})();
