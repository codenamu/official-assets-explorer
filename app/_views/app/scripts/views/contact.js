/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var ContactView = Backbone.View.extend({
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
          alert('이메일을 성공적으로 보냈습니다.')
        } else {
          alert('이메일을 보내는데 실패하였습니다.')
        }
      })

    }
  });

  return ContactView;
});
