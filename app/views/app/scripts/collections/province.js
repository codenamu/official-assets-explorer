/*global Officials, Backbone*/

Officials.Collections = Officials.Collections || {};

(function () {
  'use strict';

  Officials.Collections.Province = Backbone.Collection.extend({
    url: '/api/province',
    model: Officials.Models.Province

  });

})();
