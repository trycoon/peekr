/*global Blurry, Backbone*/

Blurry.Routers = Blurry.Routers || {};

(function() {
  'use strict';

  Blurry.Routers.Application = Backbone.Router.extend({
    routes: {
      '': 'start',
      'spela': 'spela'
    },

    changeView: function(view) {
      if (this.currentView) {
        this.currentView.hide();
      }else{
        Blurry.Views.start.hide();
      }

      if (view) {
        view.show();
        this.currentView = view;
      }
    },

    initialize: function(){

    },

    start: function() {
      console.log('routa start')
      this.changeView(Blurry.Views.start);
    },

    spela: function() {
      console.log('routa spela')
      this.changeView(Blurry.Views.spela);
    }
  });

})();
