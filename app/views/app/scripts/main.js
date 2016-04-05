/*global officials, $*/


window.Officials = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  ActiveViews: {},
  init: function () {
    'use strict';
    var App = new Officials.Routers.Main
    Backbone.history.start()
  }
};

$(document).ready(function () {
  'use strict';
  Officials.init();

});
