/*global Blurry, Backbone*/

Blurry.Models = Blurry.Models || {};

(function() {
  'use strict';

  Blurry.Models.Spela = Backbone.Model.extend({

    url: '',

    initialize: function() {
    },

    defaults: {
    },

    validate: function(attrs, options) {
    },

    parse: function(response, options) {
      return response;
    },

    getImage: function() {
      this.currentImage =  {
        name: 'Babben',
        url: '/images/bab.jpg'
      };

      return this.currentImage;
    },

    validateName: function(name) {
      return this.currentImage.name.toLowerCase() == name.toLowerCase();
    }


  });

})();
