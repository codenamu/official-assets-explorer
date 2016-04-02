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
    },

    backbone: {
      deps: ['jquery', 'underscore']
    }
  },
  paths: {
    materialize     : '/vendor/material/js/materialize.min',
    jquery            : '/vendor/jquery/jquery.min',
    backbone          : '/vendor/backbone.min',
    underscore        : '/vendor/lodash.min',
    hammerjs          : '/vendor/material/js/hammer.min',
    sideNav           : '/vendor/material/js/sideNav',
    hammer            : '/vendor/material/js/jquery.hammer',
    velocity          : '/vendor/material/js/velocity.min',
    'backbone-query-parameters': '/vendor/backbone.queryparams.min',
    chartjs           : 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/1.0.2/Chart.min',
    dongModel         : './models/dong',
    municipalModel    : './models/municipal',
    provinceModel     : './models/province',
    orgModel          : './models/org',
    officialModel     : './models/official'
  }
})

require([
  'backbone',
  'routes/main'
], function (Backbone, Router) {
  var App = new Router
  Backbone.history.start({pushState: true})
})
