/*global Blurry, Backbone, JST*/

Blurry.Views = Blurry.Views || {};

(function () {
    'use strict';

    Blurry.Views.Spela = Backbone.View.extend({

        template: JST['app/scripts/templates/spela.hbs'],

        tagName: 'div',

        id: '',

        className: '',

        events: {},
      el: '#viewSpela',

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
          this.hide();
          this.render();
        },

        render: function () {
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
