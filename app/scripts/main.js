/*global Blurry, $*/


window.Blurry = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    application: null,

    init: function () {
        'use strict';
      //this.routes = new this.Routers.Application();
     // var m = new this.Models.Application()
        //console.log('main init', this.Views.Start);
      //this.application = new this.Views.Application(m);
      this.Views.start = new this.Views.Start();

    }
};

$(document).ready(function () {
    'use strict';
  Blurry.init();
});
