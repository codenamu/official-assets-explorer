/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict'

  var SearchView = Backbone.View.extend({
    template: JST['app/scripts/templates/search.ejs'],

    tagName: 'div',

    id: '',

    className: '',

    el: '#main',

    events: {},

    initialize: function () {
      // this.listenTo(this.model, 'change', this.render)
      this.render()
      this.afterRender()
    },

    render: function () {
      this.$el.html(this.template())
    },

    afterRender: function() {
      $('select').material_select();
    }
  })

  return SearchView
})
