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

    el: '#search-default-result',

    events: {
      'click .card'         : 'clickCard',
      'click #btn-research' : 'showForm'
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
      this.$el.html(this.template({officials: model}))
    },

    rearrangeOfficials: function() {
      var officials = {}
      var result = []

      this.collection.models.forEach(function(o) {
        var model = o.attributes
        var id = o.attributes.Person.uniqueId

        if(officials[id]) {
          model.Position.year = model.year
          officials[id].Position.push(model.Position)
        } else {
          officials[id] = {}
          officials[id].Person = model.Person
          officials[id].Position = []
          model.Position.year = model.year
          officials[id].Position.push(model.Position)
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

    showForm: function() {
      $('#page-search').removeClass('closed')
    }
  })

  return OfficialsView
})
