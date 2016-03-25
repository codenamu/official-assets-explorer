/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  '../collections/official',
  '../views/card'
], function ($, _, Backbone, JST, Officials, CardView) {
  'use strict'

  var OfficialsView = Backbone.View.extend({
    template: JST['app/scripts/templates/officials.ejs'],

    events: {
      'click .card'         : 'clickCard'
    },

    subViews: [],

    initialize: function (params) {
      var self = this
      _.bindAll(this, 'detectScroll')
      $(window).scroll(this.detectScroll)

      this.params = params
      this.collection = new Officials()
      this.collection.fetch({data: $.param(params), success: function () {
        self.rearrangeOfficials()
      }})
    },

    render: function (model) {
      this.$el.html(this.template({count: this.collection.models[0].attributes.count}))
      this.afterRender(model)
    },

    afterRender: function(model) {
      var self = this
      model.forEach(function(m) {
        self.subViews.push(new CardView({el: '#' + self.$el.attr('id') + ' .search-cards', model: m}))
      })

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

    detectScroll: function() {
      var triggerPoint = 100; // 100px from the bottom
      var scrollTop = $(window).scrollTop()
      var scrollHeight = this.el.scrollHeight

      // trigger!!
      if(scrollTop + triggerPoint > scrollHeight) {

      }
    },

    clickCard: function(event) {
      Backbone.history.navigate($(event.target).closest('.card').attr('id').slice(9))
      window.location.reload()
    },

    destroy: function() {
      this.destroyCards()
      this.undelegateEvents();
      this.$el.empty();
      this.stopListening();
      return this;
    },

    destroyCards: function() {
      _.invoke(this.subViews, 'destroy')
      this.subViews.length = 0
    }
  })

  return OfficialsView
})
