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

    searchStatus: {},

    initialize: function (params) {
      var self = this
      this.params = params
      this.searchStatus = {
        isLoaded: true,
        isEnded: false,
        count: 0
      }

      var officials = new Officials()
      officials.fetch({data: $.param(params), success: function () {
        self.searchStatus.count += officials.models[0].attributes.officials.length
        self.checkSearchEnded(officials.models[0].attributes.count)

        var officialsRearranged = self.rearrangeOfficials(officials.models[0].attributes.officials)
        self.$el.html(self.template({count: officials.models[0].attributes.count}))
        self.afterRender(officialsRearranged)

        $('#' + self.$el.attr('id')).velocity('scroll', {
          duration: 500,
          easing: 'ease-in-out'
        })

        // bind detectScroll event to this
        _.bindAll(self, 'detectScroll')
        $(window).scroll(self.detectScroll)
      }})

    },

    render: function (model) {
      this.afterRender(model)
    },

    afterRender: function(model) {
      var self = this
      model.forEach(function(m) {
        self.subViews.push(new CardView({el: '#' + self.$el.attr('id') + ' .search-cards', model: m}))
      })

      this.saveCurrentsearchStatus()

      var wookmark = new Wookmark('.search-cards', {
        autoResize: true,
        offset: 0,
        outerOffset: -5,
        flexibleWidth: false,
        direction: 'left',
      });
    },

    saveCurrentsearchStatus: function() {
      // save current cards status to searchStatus after loading new cards
      this.searchStatus.isLoaded = true
    },

    checkSearchEnded: function(count) {
      if (this.searchStatus.count === parseInt(count, 10)) {
        this.searchStatus.isEnded = true
      }
    },

    rearrangeOfficials: function(collection) {
      var officials = {}
      var result = []

      collection.forEach(function(o) {
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

      return result
    },

    detectScroll: function() {
      var self = this
      var triggerPoint = 100; // 100px from the bottom
      var scrollTop = $(window).scrollTop()
      var docHeight = this.$el.height()
      // console.log('window height', $(window).height())
      // console.log('scrollTop', scrollTop)
      // console.log('doc height', this.$el.height())
      // trigger!!
      if(scrollTop + 350 > docHeight && this.searchStatus.isLoaded && !this.searchStatus.isEnded) {
        console.log('=====')
        this.searchStatus.isLoaded = false

        var officials = new Officials()
        var params = this.params
        params.offset = this.searchStatus.count
        params.limit = 20

        officials.fetch({data: $.param(params), success: function () {
          console.log(officials)
          var officialsRearranged = self.rearrangeOfficials(officials.models[0].attributes.officials)
          self.searchStatus.count += officialsRearranged.length
          self.checkSearchEnded(officials.models[0].attributes.count)
          self.afterRender(officialsRearranged)
        }})
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
      this.searchStatus = {}
      return this;
    },

    destroyCards: function() {
      _.invoke(this.subViews, 'destroy')
      this.subViews.length = 0
    }
  })

  return OfficialsView
})
