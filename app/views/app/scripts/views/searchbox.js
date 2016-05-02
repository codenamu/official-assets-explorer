/*global Officials, Backbone, JST*/

Officials.Views = Officials.Views || {};

(function () {
  'use strict';

  Officials.Views.Searchbox = Backbone.View.extend({

    template: JST['app/scripts/templates/searchbox.ejs'],

    el: '#search',

    events: {
      'change #selected-orgs'               : 'selectOrgs',
      'change #selected-years'              : 'selectYears',
      'change #selected-orgs-mobile'        : 'selectOrgs',
      'change #selected-years-mobile'       : 'selectYears',
      'change #selected-provinces'          : 'selectProvince',
      'change #selected-municipals'         : 'selectMunicipal',
      'change #selected-dongs'              : 'selectDong',
      'change #selected-provinces-mobile'   : 'selectProvince',
      'change #selected-municipals-mobile'  : 'selectMunicipal',
      'change #selected-dongs-mobile'       : 'selectDong',
      'submit form#form-search-default'     : 'submitDefaultSearch',
      'submit form#form-search-election'    : 'submitElectionSearch',
      'click .chip > i'                     : 'closeAChip',
      'click .caret'                        : 'clickCaret',
      'click .caret-mobile'                 : 'clickCaretMobile'
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


      if (!_.isEmpty(this.params)) {
        this.setParams()
        /**
         * if use request with default search option
         */
        if (!this.params['election']) {
          this.resetTags('default', 'orgs', $('#selected-orgs > option:not(:disabled):selected'))
          this.resetTags('default', 'years', $('#selected-years option:not(:disabled):selected'))
          this.getResult(this.params)
        } else {
          /**
         * if use request with election cadidates search option
         */
          $('#search-tabs > ul.tabs').tabs('select_tab', 'search-election');
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

        $('#selected-orgs-mobile > optgroup').append($('<option>', {
          id: 'option-mobile-orgs-id-' + m.get('id'),
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

        $('#selected-provinces-mobile').append($('<option>', {
          id: 'option-mobile-provinces-id-' + p.get('id'),
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
        this.selectOptions('orgs')
      }

      if (params.year) {
        this.selectOptions('years')
      }

      if (params.election) {
        this.selectOptions('provinces')

        this.selectProvince(function() {
          self.selectOptions('municipals')

          self.selectMunicipal(function() {
            self.selectOptions('dongs')

          })
        })
      }
    },
    /**
     * end of setParams
     */

    selectOptions: function(target) {
      var ops = $('#selected-' + target + ' > option:not(:disabled)')
      if (target == 'orgs' || target == 'years') {
        var opsMobile = $('#selected-' + target + '-mobile > optgroup > option:not(:disabled)')
      } else {
        var opsMobile = $('#selected-' + target + '-mobile > option:not(:disabled)')
      }
      var targetParam = this.params[target.slice(0, -1)]

      if (typeof targetParam === 'string') {
        targetParam = targetParam.split(',')
      }

      if (targetParam) {
        for (var i = 0; i < ops.length; i++) {
          if (targetParam.indexOf($(ops[i]).val()) > -1) {
            $(ops[i]).prop('selected', true)
          }
          if (targetParam.indexOf($(opsMobile[i]).val()) > -1) $(opsMobile[i]).prop('selected', true)
        }
      }

      $('#selected-' + target).material_select()

      // if (target === 'orgs' || target === 'years') {
      //   $('#selected-' + target + '-mobile').select2({
      //     placeholder: target === 'orgs' ? '소속을 선택하세요' : '년도를 선택하세요'
      //   })
      // }
    },

    drawForms: function() {
      $('#selected-orgs').material_select()
      $('#selected-years').material_select()
      $('#selected-provinces').material_select()
      $('#selected-municipals').material_select()
      $('#selected-dongs').material_select()

      // $('#selected-orgs-mobile').select2({
      //   placeholder: '소속을 선택하세요'
      // })
      //
      // $('#selected-years-mobile').select2({
      //   placeholder: '년도를 선택하세요'
      // })
    },

    selectOrgs: function(e) {
      this.resetTags('default', 'orgs', $('#selected-orgs > option:not(:disabled):selected'))
      this.resetTags('default', 'orgs', $('#selected-orgs-mobile option:not(:disabled):selected'), 'mobile')
    },

    selectYears: function(e) {
      this.resetTags('default', 'years', $('#selected-years > option:not(:disabled):selected'))
      this.resetTags('default', 'years', $('#selected-years-mobile option:not(:disabled):selected'), 'mobile')
    },

    selectProvince: function(callback) {
      var self = this
      var cb = typeof callback == 'function' ? callback : function(){}
      var isMobile = $('input.select-dropdown').css('display') === 'none' ? '-mobile' : ''

      self.initRegionOptions($('#selected-municipals'))
      self.initRegionOptions($('#selected-dongs'))
      self.initRegionOptions($('#selected-municipals-mobile'))
      self.initRegionOptions($('#selected-dongs-mobile'))


      this.municipals = new Officials.Collections.Municipal()
      this.municipals.fetch({data: 'province=' + $('#selected-provinces' + isMobile).val(), success: function() {
        self.municipals.models.forEach(function(m) {
          $('#selected-municipals').append($('<option>', {
            id: 'option-municipals-id-' + m.get('id'),
            value: m.get('name'),
            text: m.get('name')
          }))
        })

        self.municipals.models.forEach(function(m) {
          $('#selected-municipals-mobile').append($('<option>', {
            id: 'option-mobile-municipals-id-' + m.get('id'),
            value: m.get('name'),
            text: m.get('name')
          }))
        })

        $('#selected-municipals').material_select()

        self.resetTags('election', 'provinces', $('#selected-provinces' + isMobile + ' > option:not(:disabled):selected'))
        self.resetTags('election', 'dongs', $('#selected-dongs' + isMobile + ' > option:not(:disabled):selected'))
        self.resetTags('election', 'municipals', $('#selected-municipals' + isMobile + ' > option:not(:disabled):selected'))
        cb()
      }})
    },

    selectMunicipal: function(callback) {
      var self = this
      var cb = typeof callback == 'function' ? callback : function(){}
      var isMobile = $('selected-municipals').css('display') === 'none' ? '-mobile' : ''
      self.initRegionOptions($('#selected-dongs'))
      self.initRegionOptions($('#selected-dongs-mobile'))

      this.dongs = new Officials.Collections.Dong()
      this.dongs.fetch({data: 'municipal=' + $('#selected-municipals' + isMobile).val() + '&province=' + $('#selected-provinces' + isMobile).val(), success: function() {
        self.dongs.models.forEach(function(m) {
          $('#selected-dongs').append($('<option>', {
            id: 'option-dongs-id-' + m.get('id'),
            value: m.get('name'),
            text: m.get('name')
          }))
        })

        self.dongs.models.forEach(function(m) {
          $('#selected-dongs-mobile').append($('<option>', {
            id: 'option-mobile-dongs-id-' + m.get('id'),
            value: m.get('name'),
            text: m.get('name')
          }))
        })

        self.resetTags('election', 'dongs', $('#selected-dongs' + isMobile + ' > option:not(:disabled):selected'))
        self.resetTags('election', 'municipals', $('#selected-municipals' + isMobile + ' > option:not(:disabled):selected'))

        $('#selected-dongs').material_select()
        cb()
      }})
    },

    selectDong: function() {
      var isMobile = $('input.select-dropdown').css('display') === 'none' ? '-mobile' : ''
      this.resetTags('election', 'dongs', $('#selected-dongs' + isMobile + ' > option:not(:disabled):selected'))
    },

    initRegionOptions: function(target) {
      switch (target.attr('id')) {
        case 'selected-municipals':
        case 'selected-municipals-mobile':
          var text = '시/군/구를 선택하세요'
          break
        case 'selected-dongs':
        case 'selected-dongs-mobile':
          var text = '읍/면/동을 선택하세요'
          break
      }

      // var text = target.attr('id') === ('selected-municipals' || 'selected-municipals-mobile')? '시/군/구를 선택하세요' : '읍/면/동을 선택하세요'
      target.html('')

      target.append($('<option>', {
        selected: true,
        disabled: true,
        hidden: true,
        value: text,
        text: text
      }))

      if (target.attr('id').slice(-6) !== 'mobile') {
        target.material_select()
      }
    },

    submitDefaultSearch: function(e) {
      var self = this

      // if user click the submit button
      if (e) e.preventDefault()

      var params = {}

      params.org = ($('input.select-dropdown').css('display') !== 'none') ? $('#selected-orgs').val() : $('#selected-orgs-mobile').val()
      params.year = ($('input.select-dropdown').css('display') !== 'none') ? $('#selected-years').val() : $('#selected-years-mobile').val()
      params.keyword = this.escapeSymbols($('#selected-keyword').val())
      $('#selected-keyword').val(params.keyword)
      // set current url with query parameters
      // if (Backbone.history.getFragment().split('?')[0] !== "") {
      Backbone.history.navigate('/?' + this.fixEncodeURI($.param(params)), {trigger: false, replace: true})
      // }
      // find results
      this.getResult(params)
    },

    submitElectionSearch: function(e) {
      var self = this
      // if user click the submit button
      if (e) e.preventDefault()
      var params = {}
      var isMobile = ($('input.select-dropdown').css('display') === 'none')

      params.election = 1

      if (isMobile) {
        params.province = $('#selected-provinces-mobile').val()
        params.municipal = $('#selected-municipals-mobile').val()
        params.dong = $('#selected-dongs-mobile').val()
      } else {
        params.province = $('#selected-provinces').val()
        params.municipal = $('#selected-municipals').val()
        params.dong = $('#selected-dongs').val()
      }

      if ($('#selected-keyword-election').val()) {
        params.keyword = this.escapeSymbols($('#selected-keyword-election').val())
        $('#selected-keyword-election').val(params.keyword)
      }

      // set current url with query parameters
      Backbone.history.navigate('/?' + this.fixEncodeURI($.param(params)), {trigger: false, replace: true})
      // find results
      this.getResult(params)

    },

    fixEncodeURI: function(param) {
      return param.replace(/%5B/g, '').replace(/%5D/g, '');
    },

    escapeSymbols: function(str) {
      return str.toLowerCase()
        .split(',')
        .map(function(s) {
          return s.replace(/[<>-[\]{}()$%&*+?.\\^|#\s\]\"]/g, '')
        })
        .join(' ')
    },

    getResult: function(params) {
      if (Backbone.history.getFragment().split('?')[0] === "") {
        if (Officials.ActiveViews.resultView) {
          Officials.ActiveViews.resultView.destroy()
        }

        Officials.ActiveViews.resultView = new Officials.Views.Searchresult(params)
      }
    },

    resetTags: function(category, subcategory, values) {
      var chips = $('#tags-' + category + ' > .col > .chip.chip-' + subcategory)

      if (category === 'default') {
        var valLength = values.length
        var initNum = 0

        console.log(values)

        if (valLength > chips.length) {
        // if user added a tag
          for (; initNum < values.length; initNum++) {

            // var id = $(values[initNum]).attr('id').split('-')[3]
            var id = $(values[initNum]).attr('id').split('-').length === 4 ? $(values[initNum]).attr('id').split('-')[3] : $(values[initNum]).attr('id').split('-')[4]

            if ($('#chip-' + subcategory + '-id-' + id).length === 0) {
              $('#tags-' + category + ' > .col').append('<span id="chip-' + subcategory + '-id-' + id + '" class="chip chip-' + subcategory + '">' + $(values[initNum]).val() + '<i class="material-icons">close</i></span>')
            }
          }
        } else {
          // if user removed a tag
          for (var i = 0; i < chips.length; i++) {
            // check user select options on mobile or desktop
            var id = $(chips[i]).attr('id').split('-').length === 4 ? $(chips[i]).attr('id').split('-')[3] : $(chips[i]).attr('id').split('-')[4]
            if ($('#option-' + subcategory + '-id-' + id).prop('selected') === false) {
               $('#chip-' + subcategory + '-id-' + id).remove()
            }
          }
        }

      } else {
        var chipId = $(chips[0]).attr('id') ? $(chips[0]).attr('id').split('-')[3] : ''
        var valueId = $(values[0]).attr('id') ? $(values[0]).attr('id').split('-')[3] : ''

        if (chipId) {
          $('.chip-' + subcategory + '-id-' + chipId).remove()
        }

        if (valueId  && $('#chip-' + subcategory + '-id-' + id).length === 0) {
          $('#tags-' + category + ' > .col').append($('<span>', {
            id: 'chip-' + subcategory + '-id-' + valueId,
            class: 'chip chip-' + subcategory + ' chip-' + subcategory + '-id-' + valueId,
            text: $(values[0]).val()
          }))
        }
      }


    },

    closeAChip: function(e) {
      var id = 'option-' + $(e.target).closest('.chip').attr('id').split('-').slice(1).join('-')
      var idMobile = 'option-mobile-' + $(e.target).closest('.chip').attr('id').split('-').slice(1).join('-')

      $('option#' + id).attr('selected', false)
      $('option#' + idMobile).attr('selected', false)
      $('#selected-' + $(e.target).closest('.chip').attr('id').split('-')[1]).material_select()
      // $('#selected-' + $(e.target).closest('.chip').attr('id').split('-')[1] + '-mobile').select2({
      //   placeholder: $(e.target).closest('.chip').attr('id').split('-')[1] === 'orgs' ? '소속을 선택하세요' : '년도를 선택하세요'
      // })
    }
  });

})();
