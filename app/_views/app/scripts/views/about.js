/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var AboutView = Backbone.View.extend({
    template: JST['app/scripts/templates/about.ejs'],

    el: '#main',

    initialize: function () {
      // this.listenTo(this.model, 'change', this.render);
      this.render()
    },

    render: function () {
      this.$el.html(this.template());
    }
  });

  return AboutView;
});
