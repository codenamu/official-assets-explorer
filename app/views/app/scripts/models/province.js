/*global define*/

define([
  'underscore',
  'backbone'
], function (_, Backbone) {
  'use strict';

  var ProvinceModel = Backbone.Model.extend({
    urlRoot: '/api/province',

    idAttribute: '_id',

    initialize: function() {
    },

    defaults: {
      _id    : 0,
      name  : ''
    }
  });

  return ProvinceModel;
});
