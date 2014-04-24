/*global Blurry, Backbone*/

Blurry.Models = Blurry.Models || {};

(function() {
  'use strict';

  Blurry.Models.Application = Backbone.Model.extend({

    url: '',

    initialize: function() {
    },

    defaults: {
    },

    validate: function(attrs, options) {
    },

    parse: function(response, options) {
      return response;
    }
  });

})();
