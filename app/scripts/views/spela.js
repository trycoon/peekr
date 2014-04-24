/*global Blurry, Backbone, JST*/

Blurry.Views = Blurry.Views || {};

(function () {
    'use strict';

    Blurry.Views.Spela = Backbone.View.extend({

        template: JST['app/scripts/templates/spela.hbs'],

        tagName: 'div',

        id: '',

        className: '',

        events: {
          'click .js-validate': 'validateName'
        },
      el: '#viewSpela',

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
          this.hide();
          this.render();
        },

        render: function () {
           this.$el.html(this.template(this.model.toJSON()));

          this.drawImage();
        },

      drawImage: function () {
        var imageCanvas = document.getElementById('image').getContext('2d');
        this.currentImage = this.model.getImage();
          var img = new Image();

          img.onload = function () {
            imageCanvas.save();

            // Create a circle
            /*imageCanvas.beginPath();
            imageCanvas.arc(106, 77, 10, 0, Math.PI * 2, false);

            // Clip to the current path
            imageCanvas.clip();*/

            imageCanvas.drawImage(img, 0, 0);

            // Undo the clipping
            imageCanvas.restore();
            //maskCanvas.drawImage(img, 0, 0);
          };

          img.src = this.currentImage.url;

        },

      show: function() {
        this.$el.show();
        this.render();
      },

      hide: function() {
        this.$el.hide();
      },

      validateName: function(event){
        event.preventDefault();
        console.log('input ', this.model.validateName($('.js-input').val()));
      }

    });

})();
