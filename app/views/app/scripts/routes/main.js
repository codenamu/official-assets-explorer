/*global define*/

define([
  'jquery',
  'backbone-query-parameters',
  '../views/nav',
  '../views/officials',
  '../views/official',
  '../views/search'
], function ($, _query_params, NavView, OfficialsView, OfficialView, SearchView) {
  'use strict'

  var MainRouter = Backbone.Router.extend({
    routes: {
      ''          : 'search',
      'officials' : 'officials',
      ':id'       : 'official'
    },

    initialize: function() {
      var nav = new NavView()
    },

    search: function() {
      var view = new SearchView()
    },

    officials: function(params) {
      var view = new OfficialsView(params)
    },

    official: function(id) {
      var view = new OfficialView({ uniqueId: id })
    }

  })

  return MainRouter
})
