/*global define*/

define([
  'underscore',
  'backbone'
], function (_, Backbone) {
  'use strict';

  var OfficialModel = Backbone.Model.extend({
    urlRoot: '/api/official',

    initialize: function() {
    },

    defaults: {
      id: 0,
      name: ''
    }
  });

  return OfficialModel;
});
