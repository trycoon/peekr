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
    },

    defaults: {
    },

    validate: function(attrs, options) {
    },

    parse: function(response, options) {
      console.log('response', response)

      //var unprocessedList = this.getImageList('sport').feed.entry;
      this.images = _.map(response.feed.entry, function(value, key) {
        return { url: value.content.src, name: value.title['$t'] };
      });
      // Bland om i listan.
      this.images = _.shuffle(this.images);

      return this.images;
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
        this.fetch();
      } else {
        // Returnera första bilden i listan och ta sedan bort den från listan så att vi inte får samma vid nästa anrop.
        return this.images.shift();
      }
    },

    getImageList: function(category) {
      //TODO: Denna funktion skall ersättas av Jonas, som skall hämta en lista på alla bilder ifrån Picasa.
      return JSON.parse('{ "version": "1.0", "encoding": "UTF-8", "feed": { "id": { "$t": "https://picasaweb.google.com/data/feed/base/user/105814678861633692185/albumid/6005765907437818049" }, "title": { "$t": "Blurry", "type": "text" }, "entry": [{ "id": { "$t": "https://picasaweb.google.com/data/entry/base/user/105814678861633692185/albumid/6005765907437818049/photoid/6005765911070440914?alt=json&hl=en_US" }, "published": { "$t": "2014-04-24T07:59:02.000Z" }, "updated": { "$t": "2014-04-24T14:04:41.574Z" }, "category": [{ "scheme": "http://schemas.google.com/g/2005#kind", "term": "http://schemas.google.com/photos/2007#photo" }], "title": { "$t": "Robert Aschberg", "type": "text" }, "content": { "type": "image/jpeg", "src": "https://lh3.googleusercontent.com/-okAh3njZ7gA/U1jERrWA_dI/AAAAAAAAABc/1L_Gi750MTE/aschberg.jpg" } }, { "id": { "$t": "https://picasaweb.google.com/data/entry/base/user/105814678861633692185/albumid/6005765907437818049/photoid/6005765923475136562?alt=json&hl=en_US" }, "published": { "$t": "2014-04-24T07:59:05.000Z" }, "updated": { "$t": "2014-04-24T14:04:57.582Z" }, "category": [{ "scheme": "http://schemas.google.com/g/2005#kind", "term": "http://schemas.google.com/photos/2007#photo" }], "title": { "$t": "Astrid Lindgren", "type": "text" }, "content": { "type": "image/jpeg", "src": "https://lh3.googleusercontent.com/-E_AzstngT4s/U1jESZjhoDI/AAAAAAAAABA/gxB4q1KkQEY/astrid.jpg" } }, { "id": { "$t": "https://picasaweb.google.com/data/entry/base/user/105814678861633692185/albumid/6005765907437818049/photoid/6005765911781866418?alt=json&hl=en_US" }, "published": { "$t": "2014-04-24T07:59:02.000Z" }, "updated": { "$t": "2014-04-24T14:05:45.951Z" }, "category": [{ "scheme": "http://schemas.google.com/g/2005#kind", "term": "http://schemas.google.com/photos/2007#photo" }], "title": { "$t": "Charlotte Kalla", "type": "text" }, "content": { "type": "image/jpeg", "src": "https://lh3.googleusercontent.com/-K552SrKppdE/U1jERt_oe7I/AAAAAAAAAA8/-Rn96lE77lk/kalla.jpg" } }, { "id": { "$t": "https://picasaweb.google.com/data/entry/base/user/105814678861633692185/albumid/6005765907437818049/photoid/6005765937773147794?alt=json&hl=en_US" }, "published": { "$t": "2014-04-24T07:59:09.000Z" }, "updated": { "$t": "2014-04-24T14:06:05.427Z" }, "category": [{ "scheme": "http://schemas.google.com/g/2005#kind", "term": "http://schemas.google.com/photos/2007#photo" }], "title": { "$t": "Lillemor Arvidsson", "type": "text" }, "content": { "type": "image/jpeg", "src": "https://lh4.googleusercontent.com/-6WBKWU7gRTM/U1jETO0b9pI/AAAAAAAAABM/kun3PIQ2tRo/lillemor.jpg" } }, { "id": { "$t": "https://picasaweb.google.com/data/entry/base/user/105814678861633692185/albumid/6005765907437818049/photoid/6005765935705711074?alt=json&hl=en_US" }, "published": { "$t": "2014-04-24T07:59:08.000Z" }, "updated": { "$t": "2014-04-24T14:06:51.355Z" }, "category": [{ "scheme": "http://schemas.google.com/g/2005#kind", "term": "http://schemas.google.com/photos/2007#photo" }], "title": { "$t": "Zlatan Ibrahimovic", "type": "text" }, "content": { "type": "image/jpeg", "src": "https://lh6.googleusercontent.com/-ag1AJSwUdFw/U1jETHHhYeI/AAAAAAAAABE/jht2TvwP7Cc/slatan.jpg" } }] } }');



      Picasa.getImagesFromAlbum(
          '114736267714313794052',
          '5508006810704621345'
      ).done(function(data) {
            alert(data);
          }).fail(function() {
            alert('Misslyckades med att ladda lista på bilder');
          });
    }
  });
})();
