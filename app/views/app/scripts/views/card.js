/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var CardView = Backbone.View.extend({
    template: JST['app/scripts/templates/card.ejs'],

    events: {},

    initialize: function () {
      this.render()
    },

    render: function () {
      this.$el.append(this.template({model: this.model}));
    },

    destroy: function() {
      this.undelegateEvents();
      this.$el.empty();
      this.stopListening();
      this.remove()
      return this;
    }
  });

  return CardView;
});
