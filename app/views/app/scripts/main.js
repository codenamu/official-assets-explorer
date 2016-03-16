/*global require*/
'use strict'

require.config({
  shim: {
    materialize: {
      deps: ['jquery', 'hammerjs', 'hammer']
    },
    hammer: {
      deps: ['jquery']
    },

    sideNav: {
      deps: ['hammerjs', 'hammer']
    },

    velocity: {
      deps: ['jquery']
    }
  },
  paths: {
    materialize   : '/vendor/materialize/dist/js/materialize.min',
    jquery        : '/vendor/jquery/dist/jquery',
    backbone      : '/vendor/backbone/backbone',
    underscore    : '/vendor/lodash/dist/lodash',
    hammerjs      : '/vendor/materialize/js/hammer.min',
    sideNav       : '/vendor/materialize/js/sideNav',
    hammer        : '/vendor/materialize/js/jquery.hammer',
    velocity      : '/vendor/materialize/js/velocity.min',
    'backbone-query-parameters': '/vendor/backbone-query-parameters/backbone.queryparams.min',
    chartjs       : 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/1.0.2/Chart.min'
  }
})

require([
  'backbone',
  'routes/main'
], function (Backbone, Router) {
  var App = new Router
  Backbone.history.start({pushState: true})
})
