/*global define*/

define([
  'underscore',
  'backbone'
], function (_, Backbone) {
  'use strict';

  var AssetModel = Backbone.Model.extend({
    url: '',

    initialize: function() {
    },

    defaults: {
    }
  });

  return AssetModel;
});
