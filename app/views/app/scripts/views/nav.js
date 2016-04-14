/*global Officials, Backbone, JST*/

Officials.Views = Officials.Views || {};

(function () {
  'use strict';

  Officials.Views.Nav = Backbone.View.extend({

    template: JST['app/scripts/templates/nav.ejs'],

    el: '#nav',

    events: {
      'click a'   : 'hideSlideOut'
    },

    initialize: function () {
      this.render()
    },

    render: function () {
      this.$el.html(this.template())
      this.afterRender()
    },

    afterRender: function(event) {
      if (window.innerWidth <= 768) {
        $('.button-collapse').sideNav()
        $('.drag-target').css('touch-action', 'no')
      }
    },

    hideSlideOut: function() {
      $('.button-collapse').sideNav('hide')
    }

  });

})();
