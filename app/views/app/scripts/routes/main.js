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
      this.cleanMain()

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
        Officials.MainView = new Officials.Views.Searchbox(params)
      } else {
        Officials.MainView = new Officials.Views.Searchbox()
      }
    },

    official: function(id, params) {
      this.cleanMain()

      $('header').hide()

      if (params) {
        Officials.MainView = new Officials.Views.Searchbox(params)
      } else {
        Officials.MainView = new Officials.Views.Searchbox()
      }

      if (!Officials.ActiveViews.headerView) {
        Officials.ActiveViews.headerView = new Officials.Views.Header()
      }

      if (Officials.ActiveViews.officialView) {
        Officials.ActiveViews.officialView.destroy()
      }

      Officials.MainView = new Officials.Views.Official({ uniqueId: id })
    },

    about: function() {
      this.cleanMain()

      $('#search').hide()
      Officials.ActiveViews.headerView = new Officials.Views.Header()
      Officials.MainView = new Officials.Views.About()
    },

    contact: function() {
      // this.cleanMain()

      $('#search').hide()
      Officials.ActiveViews.headerView = new Officials.Views.Header()
      Officials.MainView = new Officials.Views.Contact()
    },

    cleanMain: function() {
      if (Officials.MainView) {
        Officials.MainView.destroy()
      }
    }

  });
})();
