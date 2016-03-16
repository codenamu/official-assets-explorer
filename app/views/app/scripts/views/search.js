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

    // tagName: 'div',

    // id: '',

    // className: '',

    el: '#main',

    events: {
      'change #selected-orgs'   : 'selectOrgs',
      'change #selected-years'  : 'selectYears',
      'submit form#search'      : 'search'
    },

    initialize: function () {
      // this.listenTo(this.model, 'change', this.render)
      this.render()
      this.afterRender()
    },

    render: function () {
      this.$el.html(this.template())
    },

    afterRender: function() {
      $('#selected-orgs').material_select();
      $('#selected-years').material_select();
      $('ul.tabs').tabs();
    },

    search: function(event) {
      // event.preventDefault()

    }
  })

  return SearchView
})
