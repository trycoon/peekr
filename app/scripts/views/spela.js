/*global Blurry, Backbone, JST*/

Blurry.Views = Blurry.Views || {};

(function() {
  'use strict';

  Blurry.Views.Spela = Backbone.View.extend({

    template: JST['app/scripts/templates/spela.hbs'],

    tagName: 'div',

    id: '',

    className: '',

    imagePlaceholder: undefined,
    imageCanvasContext: undefined,
    imageOriginalCanvasContext: undefined,
    imageOriginalCanvas: undefined,
    imageElement: undefined,
    currentDifficulty: 3, // Index till holeSize, lägre = enklare.
    holeSizes: [30, 20, 15, 10],

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
      //this.render();
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      $('.js-next').hide();
      this.imagePlaceholder = $('#image');

      if (!this.imagePlaceholder[0].getContext) {
        window.alert('Din webbläsare saknar stöd för Canvas.');
      }

      this.currentDifficulty = 3;
      
      this.imageCanvasContext = this.imagePlaceholder[0].getContext('2d');
      this.imageOriginalCanvas = document.createElement('canvas');
      this.imageOriginalCanvasContext = this.imageOriginalCanvas.getContext('2d');

      //this.imageCanvasContext.addEventListener('touchstart', startDraw);
      this.imagePlaceholder.bind('touchmove', $.proxy(this.updateMaskPosition, this));
      //this.imageCanvasContext.addEventListener('touchend', stopDraw);

      //this.imageCanvasContext.addEventListener('mousedown', startDraw);
      this.imagePlaceholder.bind('mousemove', $.proxy(this.updateMaskPosition, this));
      //this.imageCanvasContext.addEventListener('mouseup', stopDraw);

      this.drawImage();
    },

    updateMaskPosition: function(e) {
      var self = this;

      if (e.type.indexOf('touch') >= 0) {
        var pos = e.touches.item(0);
        self.drawMask(pos.clientX - pos.target.offsetLeft, pos.clientY - pos.target.offsetTop, self.currentHoleSize);
      } else {
        self.drawMask(e.offsetX, e.offsetY, self.holeSizes[self.currentDifficulty]);
      }
    },

    drawImage: function() {
      this.currentImage = this.model.getImage();
      if (this.currentImage) {
        var self = this;

      // Ladda ner bilden som skall visas.
      this.imageElement = new Image();
      this.imageElement.onload = function() {
        self.imageOriginalCanvasContext.drawImage(self.imageElement, 0, 0, 300, 300);  // Rita ut bilden första gången på canvasen.
        // Maskera och visa bilden när den är nerladdad.
        self.drawMask(110, 70, self.holeSizes[self.currentDifficulty]);
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
      //this.imageOriginalCanvas.drawImage(this.imageElement, 0, 0, 300, 300);

      this.imageCanvasContext.save();

      // Create a circle
      this.imageCanvasContext.beginPath();
      this.imageCanvasContext.arc(holeX, holeY, holeRadius, 0, Math.PI * 2, false);

      // Clip to the current path
      this.imageCanvasContext.clip();

      this.imageCanvasContext.drawImage(this.imageElement, 0, 0, 300, 300);

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

    validateName: function(event) {
      event.preventDefault();
      var validation = this.model.validateName($('.js-input').val());

      console.log('input ', validation);
      var answer = $('.answer');


      if (validation) {
        answer.addClass('correct');
        answer.html('Du gissade rätt!');
        $('#inputContainer').hide();
        $('.js-next').show();

      }else{
        answer.html('Det var fel namn...');
        if(this.currentDifficulty > 0){
          this.currentDifficulty--;
        }
      }

      setTimeout(function(){}, 500);
    }
  });

})();
