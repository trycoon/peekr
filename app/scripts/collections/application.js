/*global Blurry, Backbone*/

Blurry.Collections = Blurry.Collections || {};

(function () {
    'use strict';

    Blurry.Collections.Application = Backbone.Collection.extend({

        model: Blurry.Models.Application

    });

})();
