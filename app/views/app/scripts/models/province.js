/*global Officials, Backbone*/

Officials.Models = Officials.Models || {};

(function () {
  'use strict';

  Officials.Models.Province = Backbone.Model.extend({

    urlRoot: '/api/province',

    idAttribute: '_id',

    initialize: function() {
    },

    defaults: {
      name  : ''
    }
  });

})();
