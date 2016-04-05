/*global Officials, Backbone, JST*/

Officials.Views = Officials.Views || {};

(function () {
  'use strict';

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
      
      $.post('/api/send', {
        type: $('input[name=contact-for]:checked', '#form-contact').val(),
        fromEmail: $('#contact-email').val(),
        fromContact: $('#contact-contact').val(),
        content: $('#contact-content').val()
      })
      .done(function(result) {
        if (result[0].status === 'sent') {
          alert('보내주신 내용을 잘 살펴보겠습니다. 감사합니다.')
          window.location.reload()
        } else {
          alert('이메일을 보내는데 실패하였습니다. 원인을 찾아볼게요.')
        }
      })

    }

  });

})();
