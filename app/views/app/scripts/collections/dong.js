/*global define*/

define([
  'underscore',
  'backbone',
  'dongModel'
], function (_, Backbone, DongModel) {
  'use strict';

  var DongCollection = Backbone.Collection.extend({
    url: '/api/dong',
    model: DongModel
  });

  return DongCollection;
});
