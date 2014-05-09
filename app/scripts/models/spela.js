/*global peekr, Backbone, Picasa*/

peekr.Models = peekr.Models || {};

(function() {
  'use strict';

  // Speech recognition.
  var SpeechRecognition = window.webkitSpeechRecognition ||
      window.mozSpeechRecognition ||
      window.msSpeechRecognition ||
      window.oSpeechRecognition ||
      window.SpeechRecognition;

  peekr.Models.Spela = Backbone.Model.extend({

    points: 0,            // Hur mycket rätt svar på denna bild ger. Är beroende av nuvarande svårighetsgrad. (Tänk TV-programmet "På spåret").
    totalPoints: 0,       // Hur mycket poäng har vi total ackumulerat hittils.
    currentDifficulty: 3, // Svårighetsnivå, lägre = enklare. Fungerar som index till holeSize.

    url: function(){
      return 'https://picasaweb.google.com/data/feed/api/user/' + this.userId +'/albumid/' + this.albumid;
    },

    images: [],

    initialize: function() {
      this.points = 1 + this.currentDifficulty * 2;
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
      OAuth.popup('google', {cache: true},function(error, result) {
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
      var correctAnswer = this.currentImage.name.toLowerCase() === name.toLowerCase();

      if (correctAnswer) {
        this.totalPoints += this.points;
      }

      return correctAnswer;
    },

    /***
     * Anropa då man vill visa en ny bild, nollställer poängräknare och svårighetsnivå bl.a.
     */
    newImage: function() {
      this.currentDifficulty = 3;
      this.points = 1 + this.currentDifficulty * 2;
    },
    /***
     * Minska svårighetsnivån. Hålet blir större, men bilden är värd mindre med poäng.
     * @returns {boolean} Huruvida det gick att sänka svårighetsgraden, false=om man redan är på enklaste nivån.
     */
    lowerDifficulty: function() {
      if (this.currentDifficulty === 0) {
        this.points = 0;

        return false;
      }

      this.currentDifficulty--;
      this.points = 1 + this.currentDifficulty * 2;

      return true;
    },

    /**
     * Funktion som lyssnar efter ett uttalat ord, måste anropas inför varje gång man förväntar sig ett nytt ord.
     */
    startListiningOnSpeech: function(callback) {
      if (SpeechRecognition) {
        var recognition = new SpeechRecognition();
        recognition.lang = 'sv-SE';
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.onresult = function(event) {
          if (event.results.length > 0) {
            var word = event.results[0][0].transcript;
            console.log('Detected speech: ' + word);
            if (callback) {
              callback(word);
            }
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
