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
    },

    // validate: function(attrs, options) {
    // },

    // parse: function(response, options)  {
    //   return response;
    // }
  });

  return OfficialModel;
});
