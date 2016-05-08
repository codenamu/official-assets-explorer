/*global Officials, Backbone, JST*/

Officials.Views = Officials.Views || {};

  Officials.Views.Data = Backbone.View.extend({

    template: JST['app/scripts/templates/data.ejs'],

    el: '#main',

    events: {
      'click #skip-survey'    : 'showDataList',
      'submit form#form-data' : 'submitSurvey',
      'click #data-list li'   : 'downloadFile'
    },

    initialize: function () {
      this.render()
    },

    render: function () {
      this.$el.html(this.template())
      this.afterRender()
    },

    afterRender: function() {
      this.checkIsSubmitted()
      this.initForms()
    },

    initForms: function() {
      if (window.innerWidth > 768) {
        for (var i = 0; i < $('#form-data').find('select').length; i++) {
          $($('#form-data').find('select')[i]).material_select()
        }
      } else {
        for (var i = 0; i < $('#form-data').find('select').length; i++) {
          $($('#form-data').find('select')[i]).addClass('browser-default')
        }
      }


    },

    checkIsSubmitted: function() {
      if (typeof(Storage) !== "undefined" && window.localStorage.getItem('surveyed') === 'yes') {
        this.showDataList()
      } else {
        this.hideDataList()
      }
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
          '<h4>고위공직자 재산 데이터 다운로드</h4>' +
        '</div>'
      )

      $('#data-list').append(
        '<div class="row">' +
          '<ul>' +
            '<li>- <a id="data-2011">2011년도 데이터</a></li>' +
            '<li>- <a id="data-2012">2012년도 데이터</a></li>' +
            '<li>- <a id="data-2013">2013년도 데이터</a></li>' +
            '<li>- <a id="data-2014">2014년도 데이터</a></li>' +
            '<li>- <a id="data-2015">2015년도 데이터</a></li>' +
          '</ul>' +
        '</div>'
      )

      $('#data-list').append(
        '<div class="row">' +
        '<hr>' +
          '<div class="row">' +
            // '<div class="col s2">' +
              '<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">' +
              '<img alt="크리에이티브 커먼즈 라이선스" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" />' +
              '</a>' +
            // '</div>' +
            // '<div class="col s10">' +
          '<br />' +
              '<a xmlns:cc="http://creativecommons.org/ns#" href="http://jaesan.newstapa.org" property="cc:attributionName" rel="cc:attributionURL">뉴스타파</a>' +
              '에 의해 작성된 <span xmlns:dct="http://purl.org/dc/terms/" href="http://purl.org/dc/dcmitype/Dataset" property="dct:title" rel="dct:type">고위공직자 재산 데이터</span>은(는) <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">크리에이티브 커먼즈 저작자표시-동일조건변경허락 4.0 국제 라이선스</a>에 따라 이용할 수 있습니다.' +
            // '</div>' +
          '</div>' +
          '<div class="row">' +
            '<ul>' +
              '<li>- 이 사이트에서 제공되는 데이터의 원 자료 출처는 관보, 국회공보, 헌법재판소공보입니다.</li>' +
              '<li>- 뉴스타파는 PDF 형태의 원본 자료를 입력, 정제하여 데이터베이스로 정리했습니다. 이 자료의 저작권은 뉴스타파에 있습니다.</li>' +
              '<li>- 이 데이터를 이용하여 2차 저작물을 발간한 경우, 반드시 뉴스타파를 인용 표기해야 합니다.</li>' +
            '</ul>' +
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

      if (!this.validateForm(gender, '성별') || !this.validateForm(age, '나이') || !this.validateForm(region, '사는 지역') || !this.validateForm(job, '직업') || !this.validateForm(purpose, '이용 목적')) {
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
    },

    downloadFile: function(e) {
      var dataId = $(e.target).attr('id')

      $.post('/api/log', {
        dataId: dataId
      })
      .done(function(result) {
        return true;
      })
    }
  })
