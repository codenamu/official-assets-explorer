/*global Officials, Backbone*/

Officials.Models = Officials.Models || {};

Officials.Models.Municipal = Backbone.Model.extend({

  urlRoot: '/api/municipal',

  idAttribute: '_id',

  initialize: function() {
  },

  defaults: {
    name  : ''
  }
});
