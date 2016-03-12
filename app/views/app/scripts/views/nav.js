/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'materialize'
  // 'hammerjs',
  // 'sideNav',
  // 'hammer',
  // 'velocity'
], function ($, _, Backbone, JST) {
  'use strict'

  var NavView = Backbone.View.extend({
    template: JST['app/scripts/templates/nav.ejs'],

    tagName: 'nav',

    id: '',

    className: '',

    el: '#nav',

    events: {
      'click .button-collapse': 'test'
    },

    initialize: function () {
      this.render()
    },

    render: function () {
      this.$el.html(this.template())
    },

    test: function(event) {
      $('.button-collapse').sideNav()
    }
  })

  return NavView
})
