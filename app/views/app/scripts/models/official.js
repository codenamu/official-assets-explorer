/*global Officials, Backbone*/

Officials.Models = Officials.Models || {};

Officials.Models.Official = Backbone.Model.extend({

  urlRoot: '/api/official',

  idAttribute: '_id',

  initialize: function() {
  },

  defaults: {
    name: ''
  }
});
