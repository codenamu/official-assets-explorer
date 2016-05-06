/*global Officials, Backbone*/

Officials.Collections = Officials.Collections || {};

Officials.Collections.Dong = Backbone.Collection.extend({
  url: '/api/dong',
  model: Officials.Models.Dong
});
