/*global peekr, Backbone*/

peekr.Routers = peekr.Routers || {};

(function() {
  'use strict';

  peekr.Routers.Application = Backbone.Router.extend({
    routes: {
      '': 'start',
      'spela': 'spela'
    },

    changeView: function(view) {
      if (this.currentView) {
        this.currentView.hide();
      } else {
        peekr.Views.start.hide();
      }

      if (view) {
        view.show();
        this.currentView = view;
      }
    },

    initialize: function() {

    },

    start: function() {
      console.log('routa start')
      this.changeView(peekr.Views.start);
    },

    spela: function() {
      console.log('routa spela')
      this.changeView(peekr.Views.spela);
    }
  });

})();
