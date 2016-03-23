/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  '../collections/official',
  '../collections/org',
  '../collections/province',
  '../collections/municipal',
  '../collections/dong',
  './officials'
], function ($, _, Backbone, JST, Officials, Orgs, Provinces, Municipals, Dongs, OfficialsView) {
  'use strict'

  var SearchView = Backbone.View.extend({
    template: JST['app/scripts/templates/search.ejs'],

    el: '#main',

    events: {
      'change #selected-provinces'      : 'selectProvince',
      'change #selected-municipals'     : 'selectMunicipal',
      'submit form#form-search-default' : 'submitDefaultSearch'
    },

    initialize: function (params) {
      var self = this

      this.params = params
      this.orgs = new Orgs()
      this.provinces = new Provinces()

      this.orgs.fetch({success: function() {
        self.provinces.fetch({success: function() {
          self.render()
        }})
      }})
    },

    render: function () {
      this.$el.html(this.template())
      this.afterRender()
    },

    afterRender: function() {
      this.setSelectOptions()

      if (!_.isEmpty(this.params)) {
        this.setParams()
      }

      this.drawForms()
    },

    setSelectOptions: function() {
      var self = this

      this.orgs.models.forEach(function(m) {
        $('#selected-orgs').append($('<option>', {
          value: m.attributes.title,
          text: m.attributes.title
        }))
      })


      this.provinces.forEach(function(p) {
        $('#selected-provinces').append($('<option>', {
          value: p.attributes.name,
          text: p.attributes.name
        }))
      })
    },

    setParams: function() {
      var params = this.params
      var orgOps = $('#selected-orgs > option')
      var yearOps = $('#selected-years > option')

      if (params.org) {
        if (typeof params.org === 'string') {
          params.org = params.org.split(',')
        }

        for (var i = 0; i < orgOps.length; i++) {
          if (params.org.indexOf($(orgOps[i]).val()) > -1) $(orgOps[i]).attr('selected', 'selected')
        }
      }

      if (params.year) {
        if (typeof params.year === 'string') {
          params.year = params.year.split(',')
        }

        for (var i = 0; i < yearOps.length; i++) {
          if (params.year.indexOf($(yearOps[i]).val()) > -1) $(yearOps[i]).attr('selected', 'selected')
        }
      }
    },

    drawForms: function() {
      $('#selected-orgs').material_select();
      $('#selected-years').material_select();
      $('#selected-provinces').material_select();
      $('#selected-municipals').material_select();
      $('#selected-dongs').material_select();
      $('ul.tabs').tabs();
    },

    submitDefaultSearch: function(e) {
      e.preventDefault()

      var self = this

      var params = {}
      params.org = $('#selected-orgs').val()
      params.year = $('#selected-years').val()
      params.name = $('#selected-name').val()

      this.hideForm()
      var view = new OfficialsView(params)

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

    selectProvince: function() {
      var self = this
      $('#selected-municipals').prop('disabled', false)
      $('#selected-dongs').prop('disabled', true)

      this.municipals = new Municipals()
      this.municipals.fetch({data: 'province=' + $('#selected-provinces').val(), success: function() {
        self.municipals.models.forEach(function(m) {
          $('#selected-municipals').append($('<option>', {
            value: m.attributes.name,
            text: m.attributes.name
          }))
        })

        $('#selected-municipals').material_select()
      }})
    },

    selectMunicipal: function() {
      var self = this
      $('#selected-dongs').prop('disabled', false)

      this.dongs = new Dongs()
      this.dongs.fetch({data: 'municipal=' + $('#selected-municipals').val(), success: function() {
        self.dongs.models.forEach(function(m) {
          $('#selected-dongs').append($('<option>', {
            value: m.attributes.name,
            text: m.attributes.name
          }))
        })

        $('#selected-dongs').material_select()
      }})
    },

    hideForm: function() {
      $('#page-search').addClass('closed')
    }
  })

  return SearchView
})
