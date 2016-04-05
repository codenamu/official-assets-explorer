/*global Officials, Backbone*/

Officials.Models = Officials.Models || {};

(function () {
  'use strict';

  Officials.Models.Dong = Backbone.Model.extend({

    urlRoot: '/api/dong',

    idAttribute: '_id',

    initialize: function() {
    },

    defaults: {
      id    : 0,
      name  : ''
    }
  });

})();
