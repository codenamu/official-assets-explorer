/*global Officials, Backbone, JST*/

Officials.Views = Officials.Views || {};

(function () {
  'use strict';

  Officials.Views.Official = Backbone.View.extend({

    template: JST['app/scripts/templates/official.ejs'],

    el: '#main',

    events: {
      'submit #form-contact-official'  : 'sendEmail'
    },

    initialize: function (params) {
      // this.listenTo(this.model, 'change', this.render)
      var self = this;

      this.model = new Officials.Models.Official({ _id: params.uniqueId})
      this.model.fetch({ success: function () { self.calAssets() }})
    },

    render: function (model) {
      this.$el.html(this.template({ official: model }))
      this.afterRender(model)
    },

    afterRender: function(model) {
      this.drawBarChart()
      this.drawPieChart(model.latestYear)

      $('#btn-contact-official-' + model.person.uniqueId).leanModal();
      $('#page-official').velocity('scroll', {
        duration: 500,
        easing: 'ease-in-out'
      })
    },

    calAssets: function() {
      var self = this
      var model = this.model.toJSON()

      delete model['_id']
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
        var position = $.extend(true, {}, model[m].Position)
        position.year = model[m].year
        position.pdfUrl = model[m].pdfUrl

        if (model[m].year > self.result.latestYear) {
          self.result.latestYear = model[m].year
        }

        self.result.position.push(position)
        self.result.assets.history[model[m].year] = {}
        self.result.assets.history[model[m].year].pdfUrl = model[m].pdfUrl
        self.result.assets.history[model[m].year].assets = model[m].Assets
        self.result.assets.history[model[m].year].total = 0

        if (model[m].Assets.length) {
          model[m].Assets.forEach(function(a) {
            if (a.Cat2.title !== '채무') {
              self.result.assets.history[model[m].year].total += a.total
            }
          })
        }

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
      var measureYAxis = 10000 // Y Axis 레이블 표현 단위

      this.myBar = new Chart(ctx).Bar(barChartData, {
        responsive : true,
        scaleGridLineColor : '#5F718A',
        scaleFontColor: "#fff",
        isFixedWidth:true,
        barWidth:20,
        // barDatasetSpacing:30,
        // barValueSpacing:60,
        scaleLabel: function(label) {
          return self.calMeasureMoney(parseInt(label.value, 10)).slice(0, -4)
        },
        customTooltips: function(tooltip) {
          if (!tooltip) {
            return;
          }

          var year = parseInt(tooltip.text.split(':')[0], 10)
          // change pie chart on the year
          self.drawPieChart(year)
          // change total asset value on the year
          $('#official-asset-total').text(self.calMeasureMoney(self.result.assets.history[year].total) + '원 | ' + year + '년')
        }
      });
    },

    drawPieChart: function(year) {
      var self = this
      var pieData = {}
      var model = this.model.attributes

      delete model['id']
      delete model['_id']
      delete model['name']

      var pieData = this.makePieData(model)

      if (this.myPie) this.myPie.destroy()

      var pieOption = {
        header: {
          title: '자산 구성비'
        },
        size: {
          canvasWidth: '250',
          canvasHeight: '250',
          pieOuterRadius: "70%"
        },
        data: {
          content: pieData[year]
        },
        labels: {
          outer: {
            pieDistance: 15
          },
          inner: {
            hideWhenLessThanPercentage: 2
          },
          mainLabel: {
            color: '#ffffff'
          },
          percentage: {
            color: '#5c6d85',
            fontSize: 14,
            decimalPlaces: 0
          },
          lines: {
            enabled: true,
            style: 'straight',
            color: '#ffffff'
          }
        }
      }

      /**
       * make pie bigger if user's browser is from desktop
       */
      if (window.innerWidth > 768) {
        pieOption.size.canvasWidth = 450
        pieOption.size.pieOuterRadius = '70%'
      }

      this.myPie = new d3pie('canvas-pie', pieOption)
    },

    makePieData: function(model) {
      var self = this;
      var pieData = {}
      var nonRandomColorLabels = ['자동차·선박 등', '예금', '토지', '채무', '건물']
      var pieColor = ['#c8cef6', '#b6c0e6', '#a9b4dc', '#9da9cd', '#909ec2', '#8493b9', '#7b8bb1', '#7a86aa']

      for (var y in model) {
        pieData[model[y].year] = []

        model[y].Assets.forEach(function(d) {
          if (d.total > 0) {
            var data = {}
            data.value = d.total
            data.color = self.selectPieColor(d.Cat2.title)
            data.label = d.Cat2.title
          }
          
          pieData[model[y].year].push(data)
        })

        pieData[model[y].year]
        .sort(function(a, b) {
          return parseInt(a.value, 10) - parseInt(b.value, 10)
        })
        // .forEach(function(d) {
        //   if (nonRandomColorLabels.indexOf(d.label) < 0) {
            
        //   }
        // })
      }

      return pieData
    },

    selectPieColor: function(cat) {
      switch(cat) {
        case '자동차·선박 등':
          return '#fffca9'
          break
        case '예금':
          return '#b7d1ee'
          break
        case '토지':
          return '#c0efa9'
          break
        case '채무':
          return '#f4c79c'
          break
        case '건물':
          return '#ffc1d7'
          break
      }
    },


    /**
     * [calMeasureMoney description]
     * @param  {[type]} str [asset value on str type]
     * @return {[type]} str [asset value adapted korean WON measure]
     */
    calMeasureMoney: function(str) {
      var result = str.toString()
      var num = Math.floor(result.length / 4)

      if (result.length % 4 === 0) {
        num -= 1
      }

      for (var i = 0; i < num; i++) {
        var index = (i + 1) * (-1) * 4 + 2 * (i * (-1))
        var measure = ''

        switch (index) {
          case -4:
            measure = '만 '
            break;
          case -10:
            measure = '억 '
            break;
          case -16:
            measure = '조 '
            break;
          default:
            break;
        }
        result = result.substr(0, result.length + index) + measure + result.substr(index);
      }

      return result
    },

    sendEmail: function(e) {
      var self = this
      e.preventDefault()

      $.post('/api/send', {
        type: $('#contact-official-type').val(),
        fromEmail: $('#contact-official-email').val(),
        content: $('#contact-official-content').val()
      })
      .then(function(result) {
        if (result[0].status === 'sent') {
          alert('보내주신 내용을 잘 살펴보겠습니다. 감사합니다.')
          $('#contact-official-' + self.result.person.uniqueId).closeModal();
        } else {
          alert('이메일을 보내는데 실패하였습니다. 원인을 찾아볼게요.')
        }
      })

    },

    destroy: function() {
      this.undelegateEvents();
      this.$el.empty();
      this.stopListening();
      delete Officials.ActiveViews['officialView']
      return this;
    }

  });

})();
