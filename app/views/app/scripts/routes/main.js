/*global define*/

define([
  'jquery',
  '../views/nav',
  '../views/officials',
  '../views/official',
  '../views/search'
], function ($, NavView, OfficialsView, OfficialView, SearchView) {
  'use strict'

  var MainRouter = Backbone.Router.extend({
    routes: {
      ''        : 'search',
      ':name'   : 'official'
    },

    initialize: function() {
      var nav = new NavView()
    },

    search: function() {
      var view = new SearchView()
    },

    officials: function() {
      var view = new OfficialsView()
    },

    official: function(name) {
      var view = new OfficialView({ name: name })
    }

  })

  return MainRouter
})
