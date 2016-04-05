/*global Officials, Backbone, JST*/

Officials.Views = Officials.Views || {};

(function () {
  'use strict';

  Officials.Views.Card = Backbone.View.extend({

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

})();
