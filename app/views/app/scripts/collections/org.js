/*global define*/

define([
  'underscore',
  'backbone',
  'orgModel'
], function (_, Backbone, OrgModel) {
  'use strict';

  var OrgCollection = Backbone.Collection.extend({
    url: '/api/org',
    model: OrgModel
  });

  return OrgCollection;
});
