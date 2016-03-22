/*global define*/

define([
  'underscore',
  'backbone'
], function (_, Backbone) {
  'use strict';

  var MunicipalModel = Backbone.Model.extend({
    urlRoot: '/api/municipal',

    initialize: function() {
    },

    defaults: {
      id    : 0,
      name  : ''
    }
  });

  return MunicipalModel;
});
