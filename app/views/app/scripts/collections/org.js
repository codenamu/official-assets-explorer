/*global define*/

define([
  'underscore',
  'backbone',
  '../models/org'
], function (_, Backbone, OrgModel) {
  'use strict';

  var OrgCollection = Backbone.Collection.extend({
    url: '/api/org',
    model: OrgModel
  });

  return OrgCollection;
});
