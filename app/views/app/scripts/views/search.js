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

    el: '#search',

    events: {
      'change #selected-orgs'           : 'selectOrgs',
      'change #selected-years'          : 'selectYears',
      'change #selected-provinces'      : 'selectProvince',
      'change #selected-municipals'     : 'selectMunicipal',
      'submit form#form-search-default' : 'submitDefaultSearch',
      'click .chip > i'                 : 'closeAChip'
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
        this.resetTags('default', 'orgs', $('#selected-orgs > option:selected'))
        this.resetTags('default', 'years', $('#selected-years > option:selected'))
        this.getResult()
      }

      this.drawForms()
    },

    setSelectOptions: function() {
      var self = this

      this.orgs.models.forEach(function(m) {
        $('#selected-orgs').append($('<option>', {
          id: 'option-orgs-id-' + m.attributes.id,
          value: m.attributes.title,
          text: m.attributes.title
        }))
      })


      this.provinces.forEach(function(p) {
        $('#selected-provinces').append($('<option>', {
          id: 'option-provinces-id' + p.attributes.id,
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

    selectOrgs: function(e) {
      this.resetTags('default', 'orgs', $('#selected-orgs > option:selected'))
    },

    selectYears: function() {
      this.resetTags('default', 'years', $('#selected-years > option:selected'))
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

    submitDefaultSearch: function(e) {
      var self = this

      // if user click the submit button
      if (e) e.preventDefault()

      var params = {}
      params.org = $('#selected-orgs').val()
      params.year = $('#selected-years').val()
      params.name = $('#selected-name').val()

      // destory the previous result view if there is
      Backbone.history.navigate('?' + $.param(params))
      window.location.reload()
    },

    getResult: function(params) {
      if (this.resultView) {
        this.resultView.destroy()
      }
      this.resultView = new OfficialsView(params)

      // hide search form view
      $('#search').velocity('slideUp', { duration: 500 });
    },

    resetTags: function(category, subcategory, values) {
      var chips = $('#tags-' + category + ' > .chip.chip-' + subcategory)

      if (values.length - 1 > chips.length) {
        // if user added a tag
        for (var i = 1; i < values.length; i++) {
          var id = $(values[i]).attr('id').split('-')[3]

          if ($('#chip-' + subcategory + '-id-' + id).length === 0) {
            $('#tags-' + category).append('<span id="chip-' + subcategory + '-id-' + id + '" class="chip chip-' + subcategory + '">' + $(values[i]).val() + '<i class="material-icons">close</i></span>')
          }
        }
      } else {
        // if user removed a tag
        for (var i = 0; i < chips.length; i++) {
          var id = $(chips[i]).attr('id').split('-')[3]

          if ($('#option-' + subcategory + '-id-' + id).prop('selected') === false) {
             $('#chip-' + subcategory + '-id-' + id).remove()
          }
        }
      }
    },

    closeAChip: function(e) {
      var id = 'option-' + $(e.target).closest('.chip').attr('id').split('-').slice(1).join('-')

      $('option#' + id).prop('selected', false)
      $('#selected-' + $(e.target).closest('.chip').attr('id').split('-')[1]).material_select()
    },

    destroy: function() {
      this.undelegateEvents();
      this.$el.empty();
      this.stopListening();
      return this;
    }
  })

  return SearchView
})
