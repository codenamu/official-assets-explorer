/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  '../models/official'
], function ($, _, Backbone, JST, Official) {
  'use strict'

  var OfficialView = Backbone.View.extend({
    template: JST['app/scripts/templates/official.ejs'],

    tagName: 'div',

    id: '',

    className: '',

    events: {},

    initialize: function (params) {
      // this.listenTo(this.model, 'change', this.render)
      var self = this;
      this.model = new Official({ name: params.name})
      this.model.fetch({ success: function () { self.render() }})
    },

    render: function () {
      this.$el.html(this.template(this.model.toJSON()))
    }
  })

  return OfficialView
})
