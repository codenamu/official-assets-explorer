/*global Officials, Backbone, JST*/

Officials.Views = Officials.Views || {};

(function () {
  'use strict';

  Officials.Views.Searchresult = Backbone.View.extend({

    template: JST['app/scripts/templates/searchresult.ejs'],

    el: '#main',

    events: {
      'click .card'                 : 'clickCard',
      'click #btn-scroll-searchbox' : 'scrollSearchbox',
      'scroll body'                      : 'detectScroll'
    },

    subViews: [],

    searchStatus: {},

    initialize: function (params) {
      var self = this
      this.params = params
      delete params['el']



      var officials = new Officials.Collections.Official()
      officials.fetch({data: $.param(params), success: function () {
        self.searchStatus = jQuery.extend({}, {
          // is data user requested at this time loaded
          isLoaded: true,
          // is entired data for the parameters loaded?
          isEnded: true,
          // the current number of data loaded(not the entire data)
          count: 0
        })
        var officialsRearranged = self.rearrangeOfficials(officials.models[0].get('officials'))
        self.searchStatus.count = officialsRearranged.length
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
      this.scrollToTarget()
    },

    afterRender: function(model) {
      var self = this

      model.forEach(function(m) {
        self.subViews.push(new Officials.Views.Card({el: '#' + self.$el.attr('id') + ' .search-cards', model: m}))
      })

      this.deactivateLoadingSignal()

      var wookmark = new Wookmark('.search-cards', {
        autoResize: true,
        offset: 0,
        outerOffset: -5,
        flexibleWidth: false,
        direction: 'left',
      });

      // bind detectScroll event to this
      // _.bindAll(this, 'detectScroll')
      // this.detectScroll = _.bind(this.detectScroll, this);
      $(window).bind('scroll', function () {
        self.detectScroll();
      });
      // $(window).scroll(this.detectScroll)
    },

    scrollToTarget: function() {
      var self = this
      $('#main').velocity('scroll', {
        offset: self.getVelocityOffset(),
        duration: 500,
        easing: 'ease-in-out'
      })
    },

    saveCurrentsearchStatus: function() {
      // save current cards status to searchStatus after loading new cards
      this.searchStatus.isLoaded = true
      // this.searchStatus.isEnded = true
    },

    checkSearchEnded: function(count) {
      if (this.searchStatus.count !== parseInt(count, 10)) {
        this.searchStatus.isEnded = false
        this.activateLoadingSignal()
        // $('#main .search-loading > .preloader-wrapper').addClass('active')
      } else {
        this.searchStatus.isEnded = true
        this.deactivateLoadingSignal()
        // $('#main .search-loading > .preloader-wrapper').removeClass('active')
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
          officials[id].isElec = false
          o.Position.year = o.year
          officials[id].Person = o.Person
          officials[id].Position = []
          officials[id].Position.push(o.Position)
        }

        // set the main org/pos party/region if he/she was elected on 20th election
        if (o.openId.slice(0, 4) === 'elec') {
          officials[id].isElec = true
          officials[id].mainOrg = o.Position.Org3.title
          officials[id].mainPos = o.Position.title
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

        var officials = new Officials.Collections.Official()
        var params = this.params
        params.offset = this.searchStatus.count
        params.limit = 20

        officials.fetch({data: $.param(params), success: function () {
          self.saveCurrentsearchStatus()
          var officialsRearranged = self.rearrangeOfficials(officials.models[0].get('officials'))
          self.searchStatus.count += officialsRearranged.length
          self.checkSearchEnded(officials.models[0].get('count'))
          self.afterRender(officialsRearranged)
        }})
      }
    },

    showLoadingDiv: function() {
      $('#main .search-loading').show()
    },

    activateLoadingSignal: function() {
      $('#main .search-loading > .preloader-wrapper').addClass('active')
    },

    deactivateLoadingSignal: function() {
      $('#main .search-loading > .preloader-wrapper').removeClass('active')
    },

    getVelocityOffset: function() {
      if (window.innerWidth < 768) {
        return -56
      } else {
        return -96
      }
    },

    clickCard: function(event) {
      this.destroy()
      location.href = '/#'  + $(event.target).closest('.card').attr('id').slice(9) + '?' + this.fixEncodeURI($.param(this.params))
    },

    scrollSearchbox: function() {
      $('#search').velocity('scroll', {
        offset: this.getVelocityOffset(),
        duration: 500,
        easing: 'ease-in-out'
      })
    },

    fixEncodeURI: function(param) {
      return param.replace(/%5B/g, '').replace(/%5D/g, '');
    }

  });

})();
