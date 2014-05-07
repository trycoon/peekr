/*global peekr, Backbone*/

peekr.Models = peekr.Models || {};

(function() {
  'use strict';

  peekr.Models.Start = Backbone.Model.extend({

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
