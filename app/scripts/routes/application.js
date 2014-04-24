/*global Blurry, Backbone*/

Blurry.Routers = Blurry.Routers || {};

(function () {
    'use strict';

    Blurry.Routers.Application = Backbone.Router.extend({
      routes: {
        '': 'start',
        '/spela': 'spela'
      },
      start: function(){

      },
      spela: function(){

      }
    });

})();
