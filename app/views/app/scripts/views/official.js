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
      this.drawBarChart()
      this.drawPieChart(2014)
    },

    calAssets: function() {
      var self = this
      var model = this.model.toJSON()

      delete model['id']
      delete model['name']

      this.result = {}
      this.result.person = model[0].Person
      this.result.latestYear = 0
      this.result.position = []
      this.result.assets = {}
      this.result.assets.total = 0
      this.result.assets.history = {}

      Object.keys(model).forEach(function(m) {
        model[m].Position.year = model[m].year

        if (model[m].year > self.result.latestYear) {
          self.result.latestYear = model[m].year
        }

        self.result.position.push(model[m].Position)

        self.result.assets.history[model[m].year] = {}
        self.result.assets.history[model[m].year].assets = model[m].Assets
        self.result.assets.history[model[m].year].total = 0

        model[m].Assets.forEach(function(a) {
          self.result.assets.history[model[m].year].total += a.total
        })
      })

      this.result.assets.history[this.result.latestYear].totalText = this.calMeasureMoney(this.result.assets.history[this.result.latestYear].total)
      this.render(this.result)
    },

    drawBarChart: function() {
      var self = this
      var barChartData = {
        labels : [],
        datasets : [
          {
            fillColor : '#ffffff',
            strokeColor : '#ffffff',
            highlightFill: '#fffca9',
            highlightStroke: '#fffca9',
            data : []
          }
        ]
      }

      this.result.position.forEach(function(p) {
        barChartData.labels.push(p.year)

        var total = 0;
        self.result.assets.history[p.year].assets.forEach(function(h) {
          total += h.total
        })

        barChartData.datasets[0].data.push(total)
      })


      var ctx = $('#canvas-bar')[0].getContext('2d');
      this.myBar = new Chart(ctx).Bar(barChartData, {
        responsive : true,
        scaleGridLineColor : '#5F718A',
        scaleFontColor: "#fff",
        customTooltips: function(tooltip) {
          if (!tooltip) {
            return;
          }

          var year = parseInt(tooltip.text.split(':')[0], 10)
          // change pie chart on the year
          self.drawPieChart(year)
          // change total asset value on the year
          $('#official-asset-total').text(self.calMeasureMoney(self.result.assets.history[year].total) + '원')
        }
      });

    },

    drawPieChart: function(year) {
      var self = this
      var pieData = {}
      var model = this.model.attributes

      delete model['id']
      delete model['name']

      for (var y in model) {
        pieData[model[y].year] = []

        model[y].Assets.forEach(function(d) {
          if (d.total > 0) {
            var data = {}
            data.value = d.total
            data.color = '#fffca9'
            data.label = d.Cat2.title
            pieData[model[y].year].push(data)
          }
        })
      }

      var canvas = document.getElementById('canvas-pie')
      var ctx = canvas.getContext('2d')
      if (this.myPie) this.myPie.destroy()

      this.myPie = new Chart(ctx).Pie(pieData[year], {
        showTooltips: true,
        tooltipEvents: [],
        tooltipFillColor: 'rgba(0,0,0,0)',
        tooltipFontColor: '#5c6d85',
        tooltipFontSize: 20,
        tooltipFontStyle: 'bold',
        tooltipTemplate: "<%if (label){%><%=label%> <%}%><%= valueText %>%",
        // multiTooltipTemplate: "<%= valueText %>원",
        animationSteps : 25,
        animationEasing: 'linear',
        segmentStrokeWidth : 3,
        customTooltips: false,
        onAnimationComplete: function() {
          this.segments.forEach(function(s) {
            s.valueText = self.calMeasureMoney(Math.round(100 * s.value / self.result.assets.history[year].total))
          })

          this.showTooltip(this.segments, true);
        }
      })
    },

    calMeasureMoney: function(str) {
      var result = str.toString()
      var num = Math.floor(result.length / 3)

      if (result.length % 3 === 0) {
        num -= 1
      }

      for (var i = 0; i < num; i++) {
        var index = (i + 1) * (-1) * 3 + i * (-1)
        result = result.substr(0, result.length + index) + ',' + result.substr(index);
      }

      return result
    }
  })

  return OfficialView
})
