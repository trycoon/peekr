/*global Blurry, Backbone, JST*/

Blurry.Views = Blurry.Views || {};

(function () {
    'use strict';

    Blurry.Views.Start = Backbone.View.extend({

        //template: JST['app/scripts/templates/start.ejs'],

        tagName: 'div',

        id: '',

        className: '',

        events: {},
        el: '#viewContent',

        initialize: function () {
            //this.listenTo(this.model, 'change', this.render);
          this.render();
        },

        render: function () {
            //this.$el.html(this.template(this.model.toJSON()));
            this.$el.html('StartVyn!');
        }

    });

})();
