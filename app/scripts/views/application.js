/*global Blurry, Backbone, JST*/

Blurry.Views = Blurry.Views || {};

(function () {
    'use strict';

    Blurry.Views.Application = Backbone.View.extend({

        template: JST['app/scripts/templates/application.ejs'],

        tagName: 'div',

        id: '',

        className: '',

        events: {},

        el: '#viewContent',

        initialize: function (options) {
          console.log('kk', options)
          this.model = options;
          this.listenTo(this.model, 'change', this.render);
          this.render();
        },

        render: function () {
          console.log('öö')
            this.$el.html(this.template(this.model.toJSON()));
            this.$el.html(this.template());
        }

    });

})();
