/*global Officials, Backbone, JST*/

Officials.Views = Officials.Views || {};

Officials.Views.About = Backbone.View.extend({

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
