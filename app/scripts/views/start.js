/*global Blurry, Backbone, JST*/

Blurry.Views = Blurry.Views || {};

(function () {
    'use strict';

    Blurry.Views.Start = Backbone.View.extend({

        template: JST['app/scripts/templates/start.hbs'],

        tagName: 'div',

        id: '',

        className: '',

        events: {
          'click .js-toggle': 'toggel'
        },
        el: '#viewContent',
      toggel: function(){

        Blurry.Routers.router.navigate('spela', {trigger: true});
      },

        initialize: function () {
          this.listenTo(this.model, 'change', this.render);
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
