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
      'change #selected-orgs'            : 'selectOrgs',
      'change #selected-years'           : 'selectYears',
      'change #selected-provinces'       : 'selectProvince',
      'change #selected-municipals'      : 'selectMunicipal',
      'submit form#form-search-default'  : 'submitDefaultSearch',
      'submit form#form-search-election' : 'submitElectionSearch',
      'click .chip > i'                  : 'closeAChip'
    },

    initialize: function (params) {
      var self = this
      this.params = params
      this.render()
    },

    render: function () {
      this.$el.html(this.template())
      this.afterRender()
    },

    afterRender: function() {
      var self = this
      this.orgs = new Orgs()
      this.provinces = new Provinces()

      this.orgs.reset()
      this.provinces.reset()

      this.orgs.fetch({success: function() {
        self.provinces.fetch({success: function() {
          $('#search-tabs > ul.tabs').tabs();
          self.setInitSelectOptions()
          self.drawForms()


          if (!_.isEmpty(self.params)) {
            self.setParams()
            self.getResult(self.params)

            /**
             * if use request with default search option
             */
            if (self.params['keyword'] !== undefined) {
              self.resetTags('default', 'orgs', $('#selected-orgs > option:selected'))
              self.resetTags('default', 'years', $('#selected-years > option:selected'))
            } else if (self.params['election'] !== undefined) {
              /**
             * if use request with election cadidates search option
             */
              $('#search-tabs > ul.tabs').tabs('select_tab', 'search-election');
              self.setParams()
              self.getResult(self.params)
            }
          } else {
            self.hideLoadingDiv()
          }


        }})
      }})
      // initialize tabs

    },

    showLoadingDiv: function() {
      $('#page-search .search-loading').show()
    },

    hideLoadingDiv: function() {
      $('#page-search .search-loading').hide()
    },

    setInitSelectOptions: function() {
      var self = this

      this.orgs.models.forEach(function(m) {
        $('#selected-orgs').append($('<option>', {
          id: 'option-orgs-id-' + m.get('id'),
          value: m.get('title'),
          text: m.get('title')
        }))
      })

      this.provinces.forEach(function(p) {
        $('#selected-provinces').append($('<option>', {
          id: 'option-provinces-id-' + p.get('id'),
          value: p.get('name'),
          text: p.get('name')
        }))
      })
    },


    /**
     * [setParams description]
     * set options in form if url has parameters like keyword, provinces, and so on
     */
    setParams: function() {
      var self = this
      var params = this.params

      if (params.org) {
        var orgOps = $('#selected-orgs > option')

        if (typeof params.org === 'string') {
          params.org = params.org.split(',')
        }

        for (var i = 0; i < orgOps.length; i++) {
          if (params.org.indexOf($(orgOps[i]).val()) > -1) $(orgOps[i]).attr('selected', 'selected')
        }
      }

      if (params.year) {
        var yearOps = $('#selected-years > option')

        if (typeof params.year === 'string') {
          params.year = params.year.split(',')
        }

        for (var i = 0; i < yearOps.length; i++) {
          if (params.year.indexOf($(yearOps[i]).val()) > -1) $(yearOps[i]).attr('selected', 'selected')
        }
      }

      if (params.election) {
        if (params.keyword) {
          $('#selected-keyword-election').val(params.keyword)
        }

        var provinceOps = $('#selected-provinces > option:not(:disabled)')

        for (var i = 0; i < provinceOps.length; i++) {
          if (params.province === $(provinceOps[i]).val()) {
            $(provinceOps[i]).prop('selected', true)
            $('#selected-provinces').material_select()
            break;
          }
        }

        this.selectProvince(function() {
          var municipalOps = $('#selected-municipals > option:not(:disabled)')

          for (var i = 0; i < municipalOps.length; i++) {
            if (params.municipal === $(municipalOps[i]).val()) {
              $(municipalOps[i]).prop('selected', true)
              $('#selected-municipals').material_select()
              break;
            }
          }

          self.selectMunicipal(function() {
            var dongOps = $('#selected-dongs > option:not(:disabled)')

            for (var i = 0; i < dongOps.length; i++) {
              if (params.dong === $(dongOps[i]).val()) {
                $(dongOps[i]).prop('selected', true)
                $('#selected-dongs').material_select()
                break;
              }
            }

          })
        })
      }
    },
    /**
     * end of setParams
     */

    drawForms: function() {
      $('#selected-orgs').material_select();
      $('#selected-years').material_select();
      $('#selected-provinces').material_select();
      $('#selected-municipals').material_select();
      $('#selected-dongs').material_select();
    },

    selectOrgs: function(e) {
      this.resetTags('default', 'orgs', $('#selected-orgs > option:selected'))
    },

    selectYears: function() {
      this.resetTags('default', 'years', $('#selected-years > option:selected'))
    },

    selectProvince: function(callback) {
      var self = this
      var cb = callback ? callback : function(){}
      // this.resetTags('election', 'provinces', $('#selected-provinces > option:selected'))

      self.initRegionOptions($('#selected-municipals'))
      self.initRegionOptions($('#selected-dongs'))

      this.municipals = new Municipals()
      this.municipals.fetch({data: 'province=' + $('#selected-provinces').val(), success: function() {
        self.municipals.models.forEach(function(m) {
          $('#selected-municipals').append($('<option>', {
            id: 'option-municipals-id-' + m.get('id'),
            value: m.get('name'),
            text: m.get('name')
          }))
        })

        $('#selected-municipals').material_select()

        cb()
      }})
    },

    selectMunicipal: function(callback) {
      var self = this
      var cb = callback ? callback : function(){}
      // this.resetTags('election', 'municipals', $('#selected-municipals > option:selected'))
      self.initRegionOptions($('#selected-dongs'))

      this.dongs = new Dongs()
      this.dongs.fetch({data: 'municipal=' + $('#selected-municipals').val(), success: function() {
        self.dongs.models.forEach(function(m) {
          $('#selected-dongs').append($('<option>', {
            id: 'option-dongs-id-' + m.get('id'),
            value: m.get('name'),
            text: m.get('name')
          }))
        })

        $('#selected-dongs').material_select()
        cb()
      }})
    },

    initRegionOptions: function(target) {
      var text = target.attr('id') === 'selected-municipals' ? '시/군/구를 선택하세요' : '읍/면/동을 선택하세요'
      target.html('')

      target.append($('<option>', {
        selected: true,
        disabled: true,
        value: text,
        text: text
      }))

      target.material_select()
    },

    submitDefaultSearch: function(e) {
      var self = this

      // if user click the submit button
      if (e) e.preventDefault()

      var params = {}
      params.org = $('#selected-orgs').val()
      params.year = $('#selected-years').val()
      params.keyword = $('#selected-keyword').val()


      // set current url with query parameters
      Backbone.history.navigate('?' + this.fixEncodeURI($.param(params)))
      // find results
      this.getResult(params)
    },

    submitElectionSearch: function(e) {
      var self = this

      // if user click the submit button
      if (e) e.preventDefault()

      var params = {}
      if ($('#selected-provinces').val()) {
        params.province = $('#selected-provinces').val()
      }

      if ($('#selected-municipals').val()) {
        params.municipal = $('#selected-municipals').val()
      }

      if ($('#selected-dongs').val()) {
        params.dong = $('#selected-dongs').val()
      }

      if ($('#selected-keyword-election').val()) {
        params.keyword = $('#selected-keyword-election').val()
      }

      params.election = 1

      // set current url with query parameters
      Backbone.history.navigate('?' + this.fixEncodeURI($.param(params)))
      // find results
      this.getResult(params)
    },

    fixEncodeURI: function(param) {
      return param.replace(/%5B/g, '').replace(/%5D/g, '');
    },

    getResult: function(params) {
      if (this.resultView) {
        this.resultView.destroy()
      }

      // show results in the active tab
      // between #search-default and #search-election
      params.el = $('#search-tabs li.tab > a.active').attr('href') + '-result'
      this.resultView = new OfficialsView(params)
    },

    resetTags: function(category, subcategory, values) {
      if (category === 'default') {
        var valLength = values.length - 1
        var initNum = 1
      } else {
        var valLength = values.length
        var initNum = 0
      }
      var chips = $('#tags-' + category + ' > .col > .chip.chip-' + subcategory)

      if (valLength > chips.length) {
        // if user added a tag
        for (; initNum < values.length; initNum++) {
          var id = $(values[initNum]).attr('id').split('-')[3]

          if ($('#chip-' + subcategory + '-id-' + id).length === 0) {
            $('#tags-' + category + ' > .col').append('<span id="chip-' + subcategory + '-id-' + id + '" class="chip chip-' + subcategory + '">' + $(values[initNum]).val() + '<i class="material-icons">close</i></span>')
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
