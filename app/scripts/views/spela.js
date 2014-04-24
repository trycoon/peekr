/*global Blurry, Backbone, JST*/

Blurry.Views = Blurry.Views || {};

(function () {
    'use strict';

    Blurry.Views.Spela = Backbone.View.extend({

        template: JST['app/scripts/templates/spela.ejs'],

        tagName: 'div',

        id: '',

        className: '',

        events: {},

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
        }

    });

})();
