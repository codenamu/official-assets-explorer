/*global define*/

define([
  'underscore',
  'backbone',
  'officialModel'
], function (_, Backbone, OfficialModel) {
  'use strict';

  var OfficialCollection = Backbone.Collection.extend({
    url: '/api/official',
    model: OfficialModel
  });

  return OfficialCollection;
});
