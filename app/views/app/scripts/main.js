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
    materialize   : '/public/vendor/materialize/dist/js/materialize.min',
    jquery        : '/public/vendor/jquery/dist/jquery',
    backbone      : '/public/vendor/backbone/backbone',
    underscore    : '/public/vendor/lodash/dist/lodash',
    hammerjs      : '/public/vendor/materialize/js/hammer.min',
    sideNav       : '/public/vendor/materialize/js/sideNav',
    hammer        : '/public/vendor/materialize/js/jquery.hammer',
    velocity      : '/public/vendor/materialize/js/velocity.min',
    'backbone-query-parameters': '/public/vendor/backbone-query-parameters/backbone.queryparams.min',
    chartjs       : 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/1.0.2/Chart.min'
  }
})

require([
  'backbone',
  'routes/main'
], function (Backbone, Router) {
  var App = new Router
  Backbone.history.start({
    pushState: true,
    root: '/'
  })
})
