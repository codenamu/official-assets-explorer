/*global define*/

define([
  'underscore',
  'backbone'
], function (_, Backbone) {
  'use strict';

  var MunicipalModel = Backbone.Model.extend({
    urlRoot: '/api/municipal',

    idAttribute: '_id',

    initialize: function() {
    },

    defaults: {
      _id    : 0,
      name  : ''
    }
  });

  return MunicipalModel;
});
