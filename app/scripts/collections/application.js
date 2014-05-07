/*global peekr, Backbone*/

peekr.Collections = peekr.Collections || {};

(function () {
    'use strict';

    peekr.Collections.Application = Backbone.Collection.extend({

        model: peekr.Models.Application

    });

})();
