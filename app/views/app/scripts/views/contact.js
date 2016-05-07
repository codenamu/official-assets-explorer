/*global Officials, Backbone, JST*/

Officials.Views = Officials.Views || {};

Officials.Views.Contact = Backbone.View.extend({

  template: JST['app/scripts/templates/contact.ejs'],

  el: '#main',

  events: {
    'submit #form-contact'  : 'sendEmail'
  },

  initialize: function () {
    this.render()
  },

  render: function () {
    this.$el.html(this.template());
  },

  sendEmail: function(e) {
    e.preventDefault()

    if (document.getElementById('form-contact').checkValidity() === false) {
      this.checkValidate()
    } else {
      $.post('/api/send', {
        type: $('input[name=contact-for]:checked', '#form-contact').val(),
        fromEmail: $('#contact-email').val(),
        fromContact: $('#contact-contact').val(),
        content: $('#contact-content').val()
      })
      .done(function(result) {
        if (result.message === 'success') {
          alert('보내주신 내용을 잘 살펴보겠습니다. 감사합니다.')
          window.location.reload()
        } else {
          alert('이메일을 보내는데 실패하였습니다. 원인을 찾아볼게요.')
        }
      })

    }
  },

  checkValidate: function() {
    var contactFor = $('input[name=contact-for]:checked', '#form-contact').val()
    var contactEmail = $('input[name=contact-email]', '#form-contact').val()
    var contactContent = $('textarea[name=contact-content]', '#form-contact').val()

    var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (contactFor === undefined) {
      alert('제보할 내용의 구분을 선택해주세요')
    } else if (contactEmail === '' || !emailRegex.test(contactEmail)) {
      alert('이메일 주소를 확인해주세요')
    } else if (contactContent === '') {
      alert('제보할 내용을 확인해주세요')
    }
  }

});
