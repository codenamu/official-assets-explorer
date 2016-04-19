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
    if (window.localStorage.getItem('surveyed') === 'yes') {
      $('.modal-content.content-survey').hide()
      $('.modal-content.content-data').show()
    }

    var self = this

    $('#form-data').bind('submit', function(e) {
      e.preventDefault()

      var gender = $('input[name=data-gender]:checked', '#form-data').val()
      var age = $('select[name=data-age]', '#form-data').val()
      var region = $('select[name=data-region]', '#form-data').val()
      var job = $('select[name=data-job]', '#form-data').val()
      var purpose = $('select[name=data-purpose]', '#form-data').val()
      var purposeDetail = $('textarea[name=data-purpose-detail]', '#form-data').val()

      if (!self.validateForm(gender, '성별') || !self.validateForm(gender, '나이') || !self.validateForm(gender, '사는 지역') || !self.validateForm(gender, '직업') || !self.validateForm(gender, '이용 목적') || !self.validateForm(gender, '이용 목적 내용')) {
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

          console.log(result)
        })
      }
    })
  },

  validateForm: function(target, msg) {
    if (!target) {
      alert(msg + '를 확인해주세요.')
      return false
    } else {
      return true
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
