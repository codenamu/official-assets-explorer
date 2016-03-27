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

    initialize: function () {
      this.render()
    },

    render: function () {
      this.$el.html(this.template());
    }
  });

  return ContactView;
});
