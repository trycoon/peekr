/*global peekr, $*/


window.peekr = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  application: null,

  init: function() {
    'use strict';
    Backbone.history.start({pushState: true});
    this.Routers.router = new this.Routers.Application();
    this.Views.start = new this.Views.Start({model: new this.Models.Start()});
    this.Views.spela = new this.Views.Spela({model: new this.Models.Spela()});
  }
};

$(document).ready(function() {
  'use strict';
  peekr.init();
});
