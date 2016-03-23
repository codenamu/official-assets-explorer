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
      ''          : 'main',
      'officials' : 'officials',
      ':id'       : 'official'
    },

    initialize: function() {
      this.navView = new NavView()
      this.searchView = new SearchView()
    },

    main: function(params) {
      if (params) {
        this.searchView.destroy()
        this.searchView = new SearchView(params)
      }
    },

    official: function(id) {
      var view = new OfficialView({ uniqueId: id })
    }

  })

  return MainRouter
})
