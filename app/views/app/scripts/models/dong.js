/*global define*/

define([
  'underscore',
  'backbone'
], function (_, Backbone) {
  'use strict';

  var DongModel = Backbone.Model.extend({
    urlRoot: '/api/dong',

    initialize: function() {
    },

    defaults: {
      id    : 0,
      name  : ''
    }
  });

  return DongModel;
});
