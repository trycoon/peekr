/*global Blurry, $*/


window.Blurry = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        'use strict';
      var m = new this.Models.Application()
        console.log('main init', m);
      this.Views.start = new this.Views.Application(m);

    }
};

$(document).ready(function () {
    'use strict';
  Blurry.init();
});
