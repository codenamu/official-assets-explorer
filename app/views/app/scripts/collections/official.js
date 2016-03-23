/*global define*/

define([
  'underscore',
  'backbone',
  '../models/official'
], function (_, Backbone, OfficialModel) {
  'use strict';

  var OfficialCollection = Backbone.Collection.extend({
    url: '/api/official',
    model: OfficialModel
  });

  return OfficialCollection;
});
