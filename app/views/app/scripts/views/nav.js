/*global Officials, Backbone, JST*/

Officials.Views = Officials.Views || {};

(function () {
  'use strict';

  Officials.Views.Nav = Backbone.View.extend({

    template: JST['app/scripts/templates/nav.ejs'],

    el: '#nav',

    initialize: function () {
      this.render()
    },

    render: function () {
      this.$el.html(this.template())
      this.afterRender()
    },

    afterRender: function(event) {
      $('.button-collapse').sideNav()
    }

  });

})();
