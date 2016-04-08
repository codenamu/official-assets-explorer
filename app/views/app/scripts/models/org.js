/*global Officials, Backbone*/

Officials.Models = Officials.Models || {};

(function () {
  'use strict';

  Officials.Models.Org = Backbone.Model.extend({

    urlRoot: '/api/org',

    idAttribute: '_id',

    initialize: function() {
    },

    defaults: {
      title : ''
    }
  });

})();
