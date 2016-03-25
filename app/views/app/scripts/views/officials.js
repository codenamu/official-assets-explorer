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

    events: {
      'click .card'         : 'clickCard'
    },

    initialize: function (params) {
      var self = this
      this.params = params
      this.collection = new Officials()
      this.collection.fetch({data: $.param(params), success: function () {
        self.rearrangeOfficials()
      }})
    },

    render: function (model) {
      this.$el.html(this.template({count: this.collection.models[0].attributes.count, officials: model}))
      this.afterRender()
    },

    afterRender: function() {
      $('#' + this.$el.attr('id')).velocity('scroll', {
        duration: 500,
        easing: 'ease-in-out'
      })
    },

    rearrangeOfficials: function() {
      var officials = {}
      var result = []

      this.collection.models[0].attributes.officials.forEach(function(o) {
        var id = o.Person.uniqueId

        if(officials[id]) {
          o.Position.year = o.year
          officials[id].Position.push(o.Position)
        } else {
          officials[id] = {}
          officials[id].Person = o.Person
          officials[id].Position = []
          o.Position.year = o.year
          officials[id].Position.push(o.Position)
        }
      })

      for (var o in officials) {
        result.push(officials[o])
      }

      this.render(result)
    },

    clickCard: function(event) {
      Backbone.history.navigate($(event.target).closest('.card').attr('id').slice(9))
      window.location.reload()
    },

    destroy: function() {
      this.undelegateEvents();
      this.$el.empty();
      this.stopListening();
      return this;
    }
  })

  return OfficialsView
})
