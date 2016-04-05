/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var HeaderView = Backbone.View.extend({
    template: JST['app/scripts/templates/header.ejs'],

    el: 'header',

    events: {},

    initialize: function () {
      this.render()
    },

    render: function () {
      this.$el.html(this.template());
    },

    afterRender: function() {
      $('.modal-trigger').leanModal();
    }
  });

  return HeaderView;
});
