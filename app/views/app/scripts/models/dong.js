/*global Officials, Backbone*/

Officials.Models = Officials.Models || {};

Officials.Models.Dong = Backbone.Model.extend({

  urlRoot: '/api/dong',

  idAttribute: '_id',

  initialize: function() {
  },

  defaults: {
    name  : ''
  }
});
