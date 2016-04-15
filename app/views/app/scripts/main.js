/*global officials, $*/
window.Officials = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  ActiveViews: {},
  initViews: function() {
    Backbone.View.prototype.destroy = function(){
      if (this.subViews) {
        this.subViews.forEach(function(v) { v.destroy() })
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
