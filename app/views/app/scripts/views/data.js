/*global Officials, Backbone, JST*/

Officials.Views = Officials.Views || {};

(function () {
  'use strict'

  Officials.Views.Data = Backbone.View.extend({

    template: JST['app/scripts/templates/data.ejs'],

    el: '#main',

    events: {
      'click #skip-survey'    : 'showDataList',
      'submit form#form-data' : 'submitSurvey'
    },

    initialize: function () {
      if (typeof(Storage) !== "undefined" && window.localStorage.getItem('surveyed') === 'yes') {
        this.showDataList()
      } else {
        this.hideDataList()
      }

      this.render()
    },

    render: function () {
      this.$el.html(this.template())
    },

    showDataList: function(e) {
      if (e) e.preventDefault()
      this.getDataList()

      $('#data-survey').hide()
      $('#data-list').show()
    },

    hideDataList: function() {
      $('#data-list').hide()
    },

    getDataList: function() {
      $('#data-list').append(
        '<div class="row">' +
          '<h5>고위공직자 재산 데이터 다운로드</h5>' +
        '</div>'
      )

      $('#data-list').append(
        '<div class="row">' +
          '<ul>' +
            '<li>- <a href="#">2011년도 데이터</a></li>' +
            '<li>- <a href="#">2012년도 데이터</a></li>' +
            '<li>- <a href="#">2013년도 데이터</a></li>' +
            '<li>- <a href="#">2014년도 데이터</a></li>' +
            '<li>- <a href="#">2015년도 데이터</a></li>' +
          '</ul>' +
        '</div>'
      )

      $('#data-list').append(
        '<div class="row">' +
          '<div class="row">' +
          '<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">' +
          '<img alt="크리에이티브 커먼즈 라이선스" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" />' +
          '</a>' +
          '<br />' +
          '<a xmlns:cc="http://creativecommons.org/ns#" href="http://jaesan.newstapa.org" property="cc:attributionName" rel="cc:attributionURL">뉴스타파</a>' +
          '에 의해 작성된 <span xmlns:dct="http://purl.org/dc/terms/" href="http://purl.org/dc/dcmitype/Dataset" property="dct:title" rel="dct:type">고위공직자 재산 데이터</span>은(는) <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">크리에이티브 커먼즈 저작자표시-동일조건변경허락 4.0 국제 라이선스</a>에 따라 이용할 수 있습니다.' +
          '</div>' +
        '</div>'
      )
    },

    submitSurvey: function(e) {
      var self = this
      e.preventDefault()

      var gender = $('input[name=data-gender]:checked', '#form-data').val()
      var age = $('select[name=data-age]', '#form-data').val()
      var region = $('select[name=data-region]', '#form-data').val()
      var job = $('select[name=data-job]', '#form-data').val()
      var purpose = $('select[name=data-purpose]', '#form-data').val()
      var purposeDetail = $('textarea[name=data-purpose-detail]', '#form-data').val()

      if (!validateForm(gender, '성별') || !validateForm(gender, '나이') || !validateForm(gender, '사는 지역') || !validateForm(gender, '직업') || !validateForm(gender, '이용 목적')) {
        return false;
      } else {
        $.post('/api/survey', {
          gender: gender,
          age: age,
          region: region,
          job: job,
          purpose: purpose,
          purposeDetail: purposeDetail
        })
        .done(function(result) {
          // save if user did this survey
          if(typeof(Storage) !== "undefined") {
            window.localStorage.setItem("surveyed", 'yes');
          }

          alert('설문조사에 응해주셔서 감사합니다.')
          self.showDataList()
        })
      }
    },

    validateForm: function(target, msg) {
      if (!target) {
        alert(msg + '를 확인해주세요.')
        return false
      } else {
        return true
      }
    }
  })

})()
