/*global Officials, Backbone*/

Officials.Routers = Officials.Routers || {};

Officials.Routers.Main = Backbone.Router.extend({
  routes: {
    ''          : 'main',
    'about'     : 'about',
    'contact'   : 'contact',
    'data'      : 'data',
    'officials' : 'officials',
    ':id'       : 'official'
  },

  initialize: function() {
    if (!Officials.ActiveViews.navView) {
      Officials.ActiveViews.navView = new Officials.Views.Nav()
    }

    this.bind('route', this._pageView);
  },

  _pageView: function() {
    var path = decodeURI(Backbone.history.getFragment());
    ga('anotherTracker.send', 'pageview');
    ga('require', 'displayfeatures');
    ga('send', 'pageview', {page: "/" + path});
  },

  main: function(params) {
    this.switchLogoImg('main')
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
    this.switchLogoImg('normal')
    this.cleanMain()

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

    Officials.MainView = new Officials.Views.Official({ uniqueId: id, params: params })
  },

  about: function() {
    this.switchLogoImg('normal')
    this.cleanMain()

    $('#search').hide()
    Officials.ActiveViews.headerView = new Officials.Views.Header()
    Officials.MainView = new Officials.Views.About()
  },

  data: function() {
    this.switchLogoImg('normal')
    this.cleanMain()

    $('#search').hide()
    Officials.ActiveViews.headerView = new Officials.Views.Header()
    Officials.MainView = new Officials.Views.Data()
  },

  contact: function() {
    this.switchLogoImg('normal')

    $('#search').hide()
    Officials.ActiveViews.headerView = new Officials.Views.Header()
    Officials.MainView = new Officials.Views.Contact()
  },

  cleanMain: function() {
    if (Officials.MainView) {
      Officials.MainView.destroy()
    }
  },

  switchLogoImg: function(type) {
    if (type === 'main') {
      $('.brand-logo.hide-desktop.logo-main').addClass('active')
      $('.brand-logo.hide-desktop.logo-normal').removeClass('active')
    } else {
      $('.brand-logo.hide-desktop.logo-main').removeClass('active')
      $('.brand-logo.hide-desktop.logo-normal').addClass('active')
    }
  }

});
