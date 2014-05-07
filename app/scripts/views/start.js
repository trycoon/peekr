/*global peekr, Backbone, JST*/

peekr.Views = peekr.Views || {};

(function() {
  'use strict';

  peekr.Views.Start = Backbone.View.extend({

    template: JST['app/scripts/templates/start.hbs'],

    tagName: 'div',

    id: '',

    className: '',

    events: {
      'click .js-toggle': 'toggel'
    },
    el: '#viewContent',
    toggel: function() {

      peekr.Routers.router.navigate('spela', {trigger: true});
    },

    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.render();
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
    },
    show: function() {
      this.$el.show();
    },

    hide: function() {
      this.$el.hide();
    }

  });

})();
