/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'chartjs',
  'templates',
  '../models/official'
], function ($, _, Backbone, Chart, JST, Official) {
  'use strict'

  var OfficialView = Backbone.View.extend({
    template: JST['app/scripts/templates/official.ejs'],

    tagName: 'div',

    id: '',

    className: '',

    el: '#main',

    events: {},

    initialize: function (params) {
      // this.listenTo(this.model, 'change', this.render)
      var self = this;
      this.model = new Official({ id: params.uniqueId})
      this.model.fetch({ success: function () { self.calAssets() }})
    },

    render: function (model) {
      this.$el.html(this.template({ official: model }))
      this.afterRender()
    },

    afterRender: function() {
      this.drawChart()
    },

    calAssets: function() {
      var model = this.model.toJSON()
      delete model['id']
      delete model['name']

      var result = {}
      result.person = model[0].Person
      result.position = []
      result.assets = {}
      result.assets.total = 0
      result.assets.history = {}

      Object.keys(model).forEach(function(m) {
        model[m].Position.year = model[m].year
        result.position.push(model[m].Position)

        model[m].Assets.forEach(function(a) {
          result.assets.total += a.total
        })

        result.assets.history[model[m].year] = model[m].Assets
      })

      console.log(result)
      this.render(result)
    },

    drawChart: function() {
      var randomScalingFactor = function(){ return Math.round(Math.random()*100)};
      var barChartData = {
        labels : ["2011","2012","2013","2014","2015"],
        datasets : [
          {
            fillColor : '#ffffff',
            strokeColor : '#ffffff',
            highlightFill: '#fffca9',
            highlightStroke: '#fffca9',
            data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
          }
        ]
      }

      var ctx = $('#canvas')[0].getContext('2d');
      this.myBar = new Chart(ctx).Bar(barChartData, {
        responsive : true,
        scaleGridLineColor : '#5F718A',
        scaleFontColor: "#fff"
      });

    }
  })

  return OfficialView
})
