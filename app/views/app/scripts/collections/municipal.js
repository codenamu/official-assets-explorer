/*global define*/

define([
  'underscore',
  'backbone',
  '../models/municipal'
], function (_, Backbone, MunicipalModel) {
  'use strict';

  var MunicipalCollection = Backbone.Collection.extend({
    url: '/api/municipal',
    model: MunicipalModel
  });

  return MunicipalCollection;
});
