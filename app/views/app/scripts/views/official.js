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
      this.model.fetch({ success: function () { self.render() }})
    },

    render: function () {
      var model = this.model.toJSON()

      delete model['id']
      delete model['name']

      this.$el.html(this.template({ official: model }))
      this.afterRender()
    },

    afterRender: function() {
      this.drawChart()
    },

    drawChart: function() {
      var randomScalingFactor = function(){ return Math.round(Math.random()*100)};
      var barChartData = {
        labels : ["January","February","March","April","May","June","July"],
        datasets : [
          {
            fillColor : "rgba(220,220,220,0.5)",
            strokeColor : "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
          },
          {
            fillColor : "rgba(151,187,205,0.5)",
            strokeColor : "rgba(151,187,205,0.8)",
            highlightFill : "rgba(151,187,205,0.75)",
            highlightStroke : "rgba(151,187,205,1)",
            data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
          }
        ]
      }

      var ctx = $('#canvas')[0].getContext("2d");
      var myBar = new Chart(ctx).Bar(barChartData, {
        responsive : true
      });

    }

    // calAssets: function() {
    //   var model = this.model.toJSON()

    //   var official = {}

    //   official.Assets = {}
    //   official.Person = model[0].Person

    //   for (var i in model) {
    //     official.Assets[model[i].year] = model[i].Assets
    //   }

    //   this.render()
    // }
  })

  return OfficialView
})
