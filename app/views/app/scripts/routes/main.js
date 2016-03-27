/*global define*/

define([
  'jquery',
  'backbone-query-parameters',
  '../views/header',
  '../views/nav',
  '../views/officials',
  '../views/official',
  '../views/search',
  '../views/about',
  '../views/contact'
], function ($, _query_params, HeaderView, NavView, OfficialsView, OfficialView, SearchView, AboutView, ContactView) {
  'use strict'

  var MainRouter = Backbone.Router.extend({
    routes: {
      ''          : 'main',
      'about'     : 'about',
      'contact'   : 'contact',
      'officials' : 'officials',
      ':id'       : 'official'
    },

    initialize: function() {
      this.navView = new NavView()
    },

    main: function(params) {
      this.headerView = new HeaderView()

      if (params) {
        this.searchView.destroy()
        this.searchView = new SearchView(params)
      } else {
        this.searchView = new SearchView()
      }
    },

    official: function(id) {
      var view = new OfficialView({ uniqueId: id })
    },

    about: function() {
      this.headerView = new HeaderView()
      this.aboutView = new AboutView()
    },

    contact: function() {
      this.headerView = new HeaderView()
      this.contactView = new ContactView()
    }

  })

  return MainRouter
})
