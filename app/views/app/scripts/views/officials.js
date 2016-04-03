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

      delete params['el']

      this.searchStatus = {
        // is data user requested at this time loaded
        isLoaded: true,
        // is entired data for the parameters loaded?
        isEnded: false,
        // the current number of data loaded(not the entire data)
        count: 0
      }

      var officials = new Officials()
      officials.fetch({data: $.param(params), success: function () {
        var officialsRearranged = self.rearrangeOfficials(officials.models[0].get('officials'))
        self.searchStatus.count += officialsRearranged.length
        self.checkSearchEnded(officials.models[0].get('count'))

        self.beforeRender()
        self.$el.html(self.template({count: officials.models[0].get('count')}))
        self.afterRender(officialsRearranged)
      }})

    },

    render: function (model) {
      this.afterRender(model)
    },

    beforeRender: function() {
      $('#' + this.$el.attr('id')).velocity('scroll', {
        duration: 500,
        easing: 'ease-in-out'
      })
    },

    afterRender: function(model) {
      var self = this

      model.forEach(function(m) {
        self.subViews.push(new CardView({el: '#' + self.$el.attr('id') + ' .search-cards', model: m}))
      })

      this.saveCurrentsearchStatus()
      this.deactivateLoadingSignal()

      var wookmark = new Wookmark('.search-cards', {
        autoResize: true,
        offset: 0,
        outerOffset: -5,
        flexibleWidth: false,
        direction: 'left',
      });

      // bind detectScroll event to this
      _.bindAll(self, 'detectScroll')
      $(window).scroll(self.detectScroll)
    },

    saveCurrentsearchStatus: function() {
      // save current cards status to searchStatus after loading new cards
      this.searchStatus.isLoaded = true
    },

    checkSearchEnded: function(count) {
      if (this.searchStatus.count === parseInt(count, 10)) {
        this.searchStatus.isEnded = true
        $('#page-search .search-loading > .preloader-wrapper').removeClass('active')
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

      if(scrollTop + 400 > docHeight && this.searchStatus.isLoaded && !this.searchStatus.isEnded) {
        this.showLoadingDiv()
        this.activateLoadingSignal()


        this.searchStatus.isLoaded = false

        var officials = new Officials()
        var params = this.params
        params.offset = this.searchStatus.count
        params.limit = 20

        officials.fetch({data: $.param(params), success: function () {
          var officialsRearranged = self.rearrangeOfficials(officials.models[0].get('officials'))
          self.searchStatus.count += officialsRearranged.length
          self.checkSearchEnded(officials.models[0].get('count'))
          self.afterRender(officialsRearranged)
        }})
      }
    },

    showLoadingDiv: function() {
      $('#page-search .search-loading').show()
    },

    activateLoadingSignal: function() {
      $('#page-search .search-loading > .preloader-wrapper').addClass('active')
    },

    deactivateLoadingSignal: function() {
      $('#page-search .search-loading > .preloader-wrapper').removeClass('active')
    },

    clickCard: function(event) {
      Backbone.history.navigate($(event.target).closest('.card').attr('id').slice(9) + '?' + this.fixEncodeURI($.param(this.params)))
      window.location.reload()
    },

    fixEncodeURI: function(param) {
      return param.replace(/%5B/g, '').replace(/%5D/g, '');
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
