/*global Officials, Backbone*/

Officials.Collections = Officials.Collections || {}

Officials.Collections.Org = Backbone.Collection.extend({
  url: '/api/org',
  model: Officials.Models.Org

})
