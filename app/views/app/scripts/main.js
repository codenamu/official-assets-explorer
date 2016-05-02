/*global officials, $*/
window.Officials = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  ActiveViews: {},
  initViews: function() {
    Backbone.View.prototype.destroy = function(){
      // destroy all subviews if the view has subviews
      if (this.subViews) {
        this.subViews.forEach(function(v) { v.destroy() })
        this.subViews.length = 0

        // unbind all events on window
        $(window).unbind('scroll')
      }

      $(this.el).removeData().unbind();
      this.undelegateEvents();
      this.$el.empty();
      this.stopListening();
      this.unbind()
      return this;
    }

    Backbone.View.prototype.getVelocityOffset = function() {
      return (window.innerWidth <= 768) ? -56 : -95
    }

    this.bindDataForm()
  },

  bindDataForm: function() {
    var self = this

    // if user already submited this survey
    if (window.localStorage.getItem('surveyed') === 'yes') {
      movePage('data')
    }

    // if user do not want to submit this survey
    $('#skip-survey').bind('click', function(e) {
      movePage('data')
    })


    $('#form-data').bind('submit', function(e) {
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
          movePage('data')
        })
      }
    })

    function showDataPage() {
      $('.modal-content.content-data').append(
        '<ul>' +
        '<li>- <a href="#">2011년도 데이터</a></li>' +
        '<li>- <a href="#">2012년도 데이터</a></li>' +
        '<li>- <a href="#">2013년도 데이터</a></li>' +
        '<li>- <a href="#">2014년도 데이터</a></li>' +
        '<li>- <a href="#">2015년도 데이터</a></li>' +
        '</ul>'
      )

      $('.modal-content.content-data').append(
        '<hr>' +
        '<div class="row">' +
        '<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">' +
        '<img alt="크리에이티브 커먼즈 라이선스" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" />' +
        '</a>' +
        '<br />' +
        '<a xmlns:cc="http://creativecommons.org/ns#" href="http://jaesan.newstapa.org" property="cc:attributionName" rel="cc:attributionURL">뉴스타파</a>' +
        '에 의해 작성된 <span xmlns:dct="http://purl.org/dc/terms/" href="http://purl.org/dc/dcmitype/Dataset" property="dct:title" rel="dct:type">고위공직자 재산 데이터</span>은(는) <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">크리에이티브 커먼즈 저작자표시-동일조건변경허락 4.0 국제 라이선스</a>에 따라 이용할 수 있습니다.' +
        '</div>'
      )
    }

    function movePage(target) {
      if (target === 'data') {
        showDataPage()

        $('.modal-content.content-survey').hide()
        $('.modal-content.content-data').show()
      } else {
        $('.modal-content.content-survey').show()
        $('.modal-content.content-data').hide()
      }
    }

    function validateForm(target, msg) {
      if (!target) {
        alert(msg + '를 확인해주세요.')
        return false
      } else {
        return true
      }
    }
  },

  init: function () {
    'use strict';
    var App = new Officials.Routers.Main
    this.initViews()

    Backbone.history.start()
  }
}

$(document).ready(function () {
  'use strict'
  Officials.init()
})
