/*global define*/

define([
  'underscore',
  'backbone'
], function (_, Backbone) {
  'use strict';

  var DongModel = Backbone.Model.extend({
    urlRoot: '/api/dong',

    idAttribute: '_id',

    initialize: function() {
    },

    defaults: {
      id    : 0,
      name  : ''
    }
  });

  return DongModel;
});
