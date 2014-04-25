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
    imageCanvas: undefined,
    imageElement: undefined,
    currentDifficulty: 3, // Index till holeSize, lägre = enklare.
    holeSizes: [30, 20, 15, 10],

    events: {
      'click .js-validate': 'validateName'
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
      this.imagePlaceholder = $('#image');
      this.imageCanvas = this.imagePlaceholder[0].getContext('2d');

      //this.imageCanvas.addEventListener('touchstart', startDraw);
      this.imagePlaceholder.bind('touchmove', $.proxy(this.updateMaskPosition, this));
      //this.imageCanvas.addEventListener('touchend', stopDraw);

      //this.imageCanvas.addEventListener('mousedown', startDraw);
      this.imagePlaceholder.bind('mousemove', $.proxy(this.updateMaskPosition, this));
      //this.imageCanvas.addEventListener('mouseup', stopDraw);

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
      var self = this;

      // Ladda ner bilden som skall visas.
      this.imageElement = new Image();
      this.imageElement.onload = function() {
        // Maskera och visa bilden när den är nerladdad.
        self.drawMask(110, 70, self.holeSizes[self.currentDifficulty]);
      };

      this.imageElement.src = this.currentImage.url;

    },

    /***
     * Ritar ut bilden med en mask(titthål).
     * @param holeX {number} Titthålets X-position.
     * @param holeY {number} Titthålets Y-position.
     * @param holeRadius {number} Titthålets radie(storlek).
     */
    drawMask: function(holeX, holeY, holeRadius) {
      this.imageCanvas.save();

      // Create a circle
      this.imageCanvas.beginPath();
      this.imageCanvas.arc(holeX, holeY, holeRadius, 0, Math.PI * 2, false);

      // Clip to the current path
      this.imageCanvas.clip();

      this.imageCanvas.drawImage(this.imageElement, 0, 0);

      // Undo the clipping
      this.imageCanvas.restore();
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


      if(validation){
        answer.addClass('correct');
        answer.html('Rätt!');
      }else{
        answer.html('Det var fel namn...');
      }

      setTimeout(function(){}, 500);
    }
  });

})();
