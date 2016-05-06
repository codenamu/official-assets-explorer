/*global Officials, Backbone*/

Officials.Collections = Officials.Collections || {};

Officials.Collections.Municipal = Backbone.Collection.extend({
  url: '/api/municipal',
  model: Officials.Models.Municipal

});
