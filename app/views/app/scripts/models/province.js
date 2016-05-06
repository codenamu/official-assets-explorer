/*global Officials, Backbone*/

Officials.Models = Officials.Models || {};

Officials.Models.Province = Backbone.Model.extend({

  urlRoot: '/api/province',

  idAttribute: '_id',

  initialize: function() {
  },

  defaults: {
    name  : ''
  }
});
