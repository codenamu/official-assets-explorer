/*global define*/

define([
  'underscore',
  'backbone',
  'models/Province'
], function (_, Backbone, ProvinceModel) {
  'use strict';

  var ProvinceCollection = Backbone.Collection.extend({
    url: '/api/province',
    model: ProvinceModel
  });

  return ProvinceCollection;
});
