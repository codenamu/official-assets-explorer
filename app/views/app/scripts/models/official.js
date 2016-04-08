/*global Officials, Backbone*/

Officials.Models = Officials.Models || {};

(function () {
  'use strict';

  Officials.Models.Official = Backbone.Model.extend({

    urlRoot: '/api/official',

    idAttribute: '_id',

    initialize: function() {
    },

    defaults: {
      name: ''
    }
  });

})();
