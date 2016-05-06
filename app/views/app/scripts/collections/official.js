/*global Officials, Backbone*/

Officials.Collections = Officials.Collections || {};

Officials.Collections.Official = Backbone.Collection.extend({
  url: '/api/official',
  model: Officials.Models.Official

});
