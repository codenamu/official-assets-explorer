/*global Officials, Backbone*/

Officials.Routers = Officials.Routers || {};

(function () {
  'use strict';

  Officials.Routers.Main = Backbone.Router.extend({
    routes: {
      ''          : 'main',
      'about'     : 'about',
      'contact'   : 'contact',
      'officials' : 'officials',
      ':id'       : 'official'
    },

    initialize: function() {
      if (!Officials.ActiveViews.navView) {
        Officials.ActiveViews.navView = new Officials.Views.Nav()
      }
    },

    main: function(params) {
      if (!Officials.ActiveViews.headerView) {
        Officials.ActiveViews.headerView = new Officials.Views.Header()
      }

      if (Officials.ActiveViews.officialView) {
        Officials.ActiveViews.officialView.destroy()
      }

      if (!$('header').is(':visible')) {
        $('header').show()
      }

      if (!$('#search').is(':visible')) {
        $('#search').show()
      }

      if (params) {
        Officials.ActiveViews.searchView = new Officials.Views.Searchbox(params)
      } else {
        Officials.ActiveViews.searchView = new Officials.Views.Searchbox()
      }
    },

    official: function(id, params) {
      $('header').hide()
      $('#search').hide()

      // if (params) {
      //   this.searchView = new SearchView(params)
      // } else {
      //   this.searchView = new SearchView()
      // }

      if (!Officials.ActiveViews.headerView) {
        Officials.ActiveViews.headerView = new Officials.Views.Header()
      }

      if (Officials.ActiveViews.officialView) {
        Officials.ActiveViews.officialView.destroy()
      }

      Officials.ActiveViews.officialView = new Officials.Views.Official({ uniqueId: id })
    },

    about: function() {
      $('#search').hide()
      Officials.ActiveViews.headerView = new Officials.Views.Header()
      Officials.ActiveViews.aboutView = new Officials.Views.About()
    },

    contact: function() {
      $('#search').hide()
      Officials.ActiveViews.headerView = new Officials.Views.Header()
      Officials.ActiveViews.contactView = new Officials.Views.Contact()
    }

  });
})();
