/*global define*/

define([
  'underscore',
  'backbone'
], function (_, Backbone) {
  'use strict';

  var OrgModel = Backbone.Model.extend({
    urlRoot: '/api/org',

    idAttribute: '_id',

    initialize: function() {
    },

    defaults: {
      _id    : 0,
      title : ''
    }
  });

  return OrgModel;
});
