/*global define*/

define([
  'underscore',
  'backbone'
], function (_, Backbone) {
  'use strict';

  var OrgModel = Backbone.Model.extend({
    urlRoot: '/api/org',

    initialize: function() {
    },

    defaults: {
      id    : 0,
      title : ''
    }
  });

  return OrgModel;
});
