/*global peekr, Backbone, JST*/

peekr.Views = peekr.Views || {};

(function() {
  'use strict';

  peekr.Views.Spela = Backbone.View.extend({

    template: JST['app/scripts/templates/spela.hbs'],

    tagName: 'div',

    id: '',

    className: '',

    imagePlaceholder: undefined,
    imageCanvasContext: undefined,
    imageElement: undefined,
    holeSizes: [30, 20, 15, 10],  // De olika storlekarna på masken (kikhålet).
    holeX: $('#image').width() / 2,
    holeY: $('#image').height() / 2,
    events: {
      'click .js-validate': 'validateName',
      'click .js-next': 'render'
    },
    el: '#viewSpela',

    initialize: function() {
      this.model.fetch({dataType: 'jsonp', data: {
        alt: 'json-in-script'
      }});
      this.listenTo(this.model, 'change', this.render);
      this.hide();
    },

    /***
     * Rita upp en ny bild.
     */
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      $('.js-next').hide();
      this.imagePlaceholder = $('#image');

      if (!this.imagePlaceholder[0].getContext) {
        window.alert('Din webbläsare saknar stöd för Canvas.');
      }

      // Rensa state inför ny bild.
      this.model.newImage();

      $('.answer').html('');

      this.imageCanvasContext = this.imagePlaceholder[0].getContext('2d');

      this.startTrackMove();

      this.printPoints();

      this.drawImage();
    },

    startTrackMove: function() {
      //this.imageCanvasContext.addEventListener('touchstart', startDraw);
      this.imagePlaceholder.bind('touchmove', $.proxy(this.updateMaskPosition, this));
      //this.imageCanvasContext.addEventListener('touchend', stopDraw);

      //this.imageCanvasContext.addEventListener('mousedown', startDraw);
      this.imagePlaceholder.bind('mousemove', $.proxy(this.updateMaskPosition, this));
      //this.imageCanvasContext.addEventListener('mouseup', stopDraw);
    },

    stopTrackMove: function() {
      //this.imageCanvasContext.addEventListener('touchstart', startDraw);
      this.imagePlaceholder.unbind('touchmove');
      //this.imageCanvasContext.addEventListener('touchend', stopDraw);

      //this.imageCanvasContext.addEventListener('mousedown', startDraw);
      this.imagePlaceholder.unbind('mousemove');
      //this.imageCanvasContext.addEventListener('mouseup', stopDraw);
    },

    updateMaskPosition: function(e) {
      var self = this;

      // Uppdatera globala variabler så att vi hela tiden har koll på vart muspekaren är.
      // Detta görs olika beroende på om man har en mus eller ett finger.
      // Flytta sedan masken till pekarens position.
      if (e.type.indexOf('touch') >= 0) {
        var pos = e.touches.item(0);
        self.holyX = pos.clientX - pos.target.offsetLeft;
        self.holeY = pos.clientY - pos.target.offsetTop;
      } else {
        self.holyX = e.offsetX;
        self.holeY = e.offsetY;
      }

      self.drawMask(self.holyX, self.holeY, self.holeSizes[self.model.currentDifficulty]);
    },
    printPoints: function() {
      $('#points').html('Poängnivå: ' + this.model.points);
      $('#totalPoints').html('Totala poäng: ' + this.model.totalPoints);
    },
    drawImage: function() {
      this.currentImage = this.model.getImage();
      if (this.currentImage) {
        var self = this;

        // Ladda ner bilden som skall visas.
        this.imageElement = new Image();
        this.imageElement.onload = function() {
          // Maskera och visa bilden när den är nerladdad.
          self.drawMask(self.holeX, self.holeY, self.holeSizes[self.model.currentDifficulty]);
          // Starta lyssna på ord.
          self.model.startListiningOnSpeech(function(word) {
            self.validateName(word);
          });
        };

        this.imageElement.src = this.currentImage.url;
      }
    },

    /***
     * Ritar ut bilden med en mask(titthål).
     * @param holeX {number} Titthålets X-position.
     * @param holeY {number} Titthålets Y-position.
     * @param holeRadius {number} Titthålets radie(storlek).
     */
    drawMask: function(holeX, holeY, holeRadius) {
      this.imageCanvasContext.rect(0, 0, $('#image').width(), $('#image').height());
      this.imageCanvasContext.fillStyle = 'grey';
      this.imageCanvasContext.fill();

      this.imageCanvasContext.save();

      // Create a circle
      this.imageCanvasContext.beginPath();
      this.imageCanvasContext.arc(holeX, holeY, holeRadius, 0, Math.PI * 2, false);

      // Clip to the current path
      this.imageCanvasContext.clip();

      this.imageCanvasContext.drawImage(this.imageElement, 0, 0);

      // Undo the clipping
      this.imageCanvasContext.restore();
    },

    show: function() {
      this.$el.show();
      this.render();
    },

    hide: function() {
      this.$el.hide();
    },

    validateName: function(input) {
      var guess;
      if (typeof input === 'string') {
        // Vid snack.
        guess = input;
      } else {
        // Vid knapptryckning.
        input.preventDefault();
        guess = $('.js-input').val();
      }

      var validation = this.model.validateName(guess);

      console.log('Gissning "' + guess + '", var rätt? ' + validation);

      var answer = $('.answer');
      var answerStr = '';

      if (validation) {

        answer.addClass('correct');
        answerStr = 'Du gissade rätt!';
        this.showImage();

      } else {

        answerStr = 'Det var fel namn.';

        if (this.model.lowerDifficulty()) {
          var self = this;

          // Rita hålet större, så att man inte behöver flytta muspekaren för att det skall synas att den är större.
          this.drawMask(self.holyX, self.holeY, self.holeSizes[self.model.currentDifficulty]);
          this.printPoints();
          // Lyssna på ett nytt ord.
          this.model.startListiningOnSpeech(function(word) {
            self.validateName(word);
          });
        } else {
          // Om gissningarna tog slut. Ge rätt svar och rita upp HELA bilden.
          answerStr += ' Rätt svar var "' + this.currentImage.name + '"';
          this.showImage();
        }
      }

      answer.html(answerStr);
    },

    /***
     * Visa upp hela bilden. T.ex. vid rätt svar eller om man bränt alla sina försök.
     */
    showImage: function() {
      $('#inputContainer').hide();
      $('.js-next').show();
      this.printPoints();

      this.stopTrackMove(); // Don't trigger mask.
      this.drawMask($('#image').width() / 2, $('#image').height() / 2, 1000); // Visa hela bilden (centrera hålet och gör det jättestort).
    }

  });

})();
