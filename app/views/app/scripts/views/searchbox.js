/*global Officials, Backbone, JST*/

Officials.Views = Officials.Views || {};

(function () {
  'use strict';

  Officials.Views.Searchbox = Backbone.View.extend({

    template: JST['app/scripts/templates/searchbox.ejs'],

    el: '#search',

    events: {
      'change #selected-orgs'            : 'selectOrgs',
      'change #selected-years'           : 'selectYears',
      'change #selected-provinces'       : 'selectProvince',
      'change #selected-municipals'      : 'selectMunicipal',
      'change #selected-dongs'           : 'selectDong',
      'submit form#form-search-default'  : 'submitDefaultSearch',
      'submit form#form-search-election' : 'submitElectionSearch',
      'click .chip > i'                  : 'closeAChip'
    },

    initialize: function (params) {
      var self = this
      var params = params || {}
      this.params = (Object.keys(params).length === 1 && Object.keys(params).indexOf('keyword') > -1 && !params.keyword) ? undefined : params;

      this.orgs = new Officials.Collections.Org()
      this.provinces = new Officials.Collections.Province()

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
      // initialize tabs
      $('#search-tabs > ul.tabs').tabs();
      this.setInitSelectOptions()
      this.drawForms()
      this.fixMaterialFormBug()


      if (!_.isEmpty(this.params)) {
        this.setParams()
        this.getResult(this.params)

        /**
         * if use request with default search option
         */
        if (!this.params['election']) {
          this.resetTags('default', 'orgs', $('#selected-orgs > option:selected'))
          this.resetTags('default', 'years', $('#selected-years > option:selected'))
        } else {
          /**
         * if use request with election cadidates search option
         */
          $('#search-tabs > ul.tabs').tabs('select_tab', 'search-election');
          this.setParams()
          this.getResult(this.params)
        }
      } else {
        this.hideLoadingDiv()
      }
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

      this.provinces.models.forEach(function(p) {
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

      if (params.keyword && !params.election) {
        $('#selected-keyword').val(params.keyword)
      } else if (params.keyword && params.election) {
        $('#selected-keyword-election').val(params.keyword)
      }


      if (params.org) {
        var orgOps = $('#selected-orgs > option')

        if (typeof params.org === 'string') {
          params.org = params.org.split(',')
        }

        for (var i = 0; i < orgOps.length; i++) {
          if (params.org.indexOf($(orgOps[i]).val()) > -1) $(orgOps[i]).attr('selected', 'selected')
        }

        $('#selected-orgs').material_select()
      }

      if (params.year) {
        var yearOps = $('#selected-years > option')

        if (typeof params.year === 'string') {
          params.year = params.year.split(',')
        }

        for (var i = 0; i < yearOps.length; i++) {
          if (params.year.indexOf($(yearOps[i]).val()) > -1) $(yearOps[i]).attr('selected', 'selected')
        }

        $('#selected-years').material_select()
      }

      if (params.election) {
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
      var cb = typeof callback == 'function' ? callback : function(){}
      // this.resetTags('election', 'provinces', $('#selected-provinces > option:selected'))

      self.initRegionOptions($('#selected-municipals'))
      self.initRegionOptions($('#selected-dongs'))

      this.municipals = new Officials.Collections.Municipal()
      this.municipals.fetch({data: 'province=' + $('#selected-provinces').val(), success: function() {
        self.municipals.models.forEach(function(m) {
          $('#selected-municipals').append($('<option>', {
            id: 'option-municipals-id-' + m.get('id'),
            value: m.get('name'),
            text: m.get('name')
          }))
        })

        $('#selected-municipals').material_select()

        self.resetTags('election', 'dongs', $('#selected-dongs > option:selected'))
        self.resetTags('election', 'municipals', $('#selected-municipals > option:selected'))
        self.resetTags('election', 'provinces', $('#selected-provinces > option:selected'))
        cb()
      }})


    },

    selectMunicipal: function(callback) {
      var self = this
      var cb = typeof callback == 'function' ? callback : function(){}
      // this.resetTags('election', 'municipals', $('#selected-municipals > option:selected'))
      self.initRegionOptions($('#selected-dongs'))

      this.dongs = new Officials.Collections.Dong()
      this.dongs.fetch({data: 'municipal=' + $('#selected-municipals').val(), success: function() {
        self.dongs.models.forEach(function(m) {
          $('#selected-dongs').append($('<option>', {
            id: 'option-dongs-id-' + m.get('id'),
            value: m.get('name'),
            text: m.get('name')
          }))
        })

        self.resetTags('election', 'dongs', $('#selected-dongs > option:selected'))
        self.resetTags('election', 'municipals', $('#selected-municipals > option:selected'))
        $('#selected-dongs').material_select()
        cb()
      }})

    },

    selectDong: function() {
      this.resetTags('election', 'dongs', $('#selected-dongs > option:selected'))
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
      // Backbone.history.navigate('?' + this.fixEncodeURI($.param(params)))
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
      // Backbone.history.navigate('?' + this.fixEncodeURI($.param(params)))
      // find results
      this.getResult(params)
    },

    fixEncodeURI: function(param) {
      return param.replace(/%5B/g, '').replace(/%5D/g, '');
    },

    fixMaterialFormBug: function() {
      $('input[readonly]').on('focus', function(ev) {
        $(this).blur()
      });
    },

    getResult: function(params) {
      if (Backbone.history.getFragment().split('?')[0] === "") {
        Officials.ActiveViews = new Officials.Views.Searchresult(params)
      }
    },

    resetTags: function(category, subcategory, values) {
      var chips = $('#tags-' + category + ' > .col > .chip.chip-' + subcategory)


      if (category === 'default') {
        var valLength = values.length - 1
        var initNum = 1

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

      } else {
        var chipId = $(chips[0]).attr('id')
        var valueId = $(values[0]).attr('id')

        if (chipId) {
          var id = chipId.split('-')[3]
          $('#chip-' + subcategory + '-id-' + id).remove()
        }

        if (valueId) {
          var id = valueId.split('-')[3]

          if ($('#chip-' + subcategory + '-id-' + id).length === 0) {
            $('#tags-' + category + ' > .col').append('<span id="chip-' + subcategory + '-id-' + id + '" class="chip chip-' + subcategory + '">' + $(values[0]).val() + '</span>')
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
      delete Officials.ActiveViews['SearchboxView']
      return this;
    }

  });

})();
