/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  '../collections/official'
], function ($, _, Backbone, JST, Officials) {
  'use strict'

  var OfficialsView = Backbone.View.extend({
    template: JST['app/scripts/templates/officials.ejs'],

    el: '#main',

    events: {},

    initialize: function () {
      // this.listenTo(this.model, 'change', this.render)
      var self = this
      this.collection = new Officials()
      this.collection.fetch({ success: function () { self.render() }})
    },

    render: function () {
      this.$el.html(this.template({officials: this.collection.models}))
    }

    // close: function () {

    //   console.log('Kill: ', this)

    //   this.unbind() // Unbind all local event bindings
    //   this.remove() // Remove view from DOM

    // }
  })

  return OfficialsView
})
