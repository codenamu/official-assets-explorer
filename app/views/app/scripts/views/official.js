/*global Officials, Backbone, JST*/

Officials.Views = Officials.Views || {};

(function () {
  'use strict';

  Officials.Views.Official = Backbone.View.extend({

    template: JST['app/scripts/templates/official.ejs'],

    el: '#main',

    events: {
      'click .forward'                 : 'clickBackNForth',
      'click .backward'                : 'clickBackNForth',
      'click .history-back'            : 'clickHistoryBack',
      'submit #form-contact-official'  : 'sendEmail'
    },

    initialize: function (params) {
      // this.listenTo(this.model, 'change', this.render)
      var self = this;
      this.params = (Object.keys(params).length === 1 && Object.keys(params).indexOf('keyword') > -1 && !params.params.keyword) ? undefined : params.params;

      this.model = new Officials.Models.Official({ _id: params.uniqueId})
      this.model.fetch({ success: function () { self.calAssets() }})

      // $(window).bind('scroll', function () {
      //   self.detectScroll();
      // });
    },

    render: function (model) {
      this.$el.html(this.template({ official: model }))
      this.afterRender(model)
    },

    afterRender: function(model) {
      var self = this
      this.drawBarChart()
      this.drawPieChart(model.latestYear)
      // fill yellow on bar graph of lastest year
      d3.select('rect:last-child').style('fill', '#fffca9')


      $('#btn-contact-official-' + model.person.uniqueId).leanModal();

      setTimeout(function() {
        $('#main').velocity('scroll', {
          offset: self.getVelocityOffset(),
          duration: 500,
          easing: 'ease-in-out'
        })
      }, 500)

    },

    getBacknForth: function (params) {
      var queries = params.params
      queries.uniqueId = params.uniqueId
      $.get('/api/official/backnforth', queries, function(result) {
        if (result.back) {
          $('#page-official .card .backward').attr('id', result.back.Person.uniqueId)
          $('#page-official .card .backward').html(
            '<div class="row icon"><img src="/img/arrow-left.png" alt="좌측 화살표" /></div>' +
            '<div class="row name">' + result.back.Person.name + '</div>'
          )
        } else {
          $('#page-official .card .backward').html('')
        }

        if (result.forth) {
          $('#page-official .card .forward').attr('id', result.forth.Person.uniqueId)
          $('#page-official .card .forward').html(
            '<div class="row icon"><img src="/img/arrow-right.png" alt="우측 화살표" /></div>' +
            '<div class="row name">' + result.forth.Person.name + '</div>'
          )
        } else {
          $('#page-official .card .forward').html('')
        }

      })
    },

    clickBackNForth: function(e) {
      location.href = '/#' + $(e.target).closest('.backnforth').attr('id') + '?' + this.fixEncodeURI($.param(this.params))
    },

    clickHistoryBack: function() {
      delete this.params['uniqueId']
      location.href = '/#?' + this.fixEncodeURI($.param(this.params))
    },

    fixEncodeURI: function(param) {
      return param.replace(/%5B/g, '').replace(/%5D/g, '');
    },

    detectScroll: function() {
      var currentPos = $('body').scrollTop()
      var mainPos = $('#main').position().top

      if (mainPos - currentPos < 90) {
        $('#page-official .card').removeClass('ontop')
      } else {
        $('#page-official .card').addClass('ontop')
      }
    },

    calAssets: function() {
      var self = this
      var model = this.model.toJSON()

      delete model['_id']
      delete model['id']
      delete model['name']

      this.result = {}
      this.result.person = model[0].Person
      this.result.isElec = false
      this.result.latestYear = 0
      this.result.position = []
      this.result.assets = {}
      this.result.assets.total = 0
      this.result.assets.history = {}

      Object.keys(model).forEach(function(m) {
        var position = $.extend(true, {}, model[m].Position)
        position.isMain = model[m].isMain
        position.isElec = model[m].openId.slice(0, 4) === 'elec' ? true : false
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
            self.result.assets.history[model[m].year].total += a.total
          })
        }

        if (position.isElec) {
          self.result.mainOrg = model[m].Position.Org3.title
          self.result.mainPos = model[m].Position.title
        }
      })


      this.result.assets.history[this.result.latestYear].totalText = this.calMeasureMoney(this.result.assets.history[this.result.latestYear].total)
      this.reorderHistory(this.result.position)
      this.render(this.result)
    },

    reorderHistory: function(positions) {
      this.result.reorderedPosition = []

      var self = this
      var tempPos = {}


      positions
        .map(function(p) {
          return {
            year: p.year,
            orgTitle: p.Org3.title,
            posTitle: p.title
          }
        })
        .sort(function(a, b) {
          return a.year - b.year
        })
        .forEach(function(p, i) {
          if (!_.isEmpty(tempPos) && (tempPos.title === (p.orgTitle + ' ' + p.posTitle))) {
            tempPos.year.push(p.year)

            if (i + 1 === positions.length) {
              self.result.reorderedPosition.push(tempPos)
            }
          } else if (!_.isEmpty(tempPos) && tempPos.title !== (p.orgTitle + ' ' + p.posTitle)) {
            self.result.reorderedPosition.push(tempPos)
            tempPos = {}
            tempPos.title = p.orgTitle + ' ' + p.posTitle
            tempPos.year = []
            tempPos.year.push(p.year)


            if (i + 1 === positions.length) {
              self.result.reorderedPosition.push(tempPos)
            }

          } else {
            tempPos.title = p.orgTitle + ' ' + p.posTitle
            tempPos.year = []
            tempPos.year.push(p.year)

            if (i + 1 === positions.length) {
              self.result.reorderedPosition.push(tempPos)
            }
          }
        })
    },

    drawBarChart: function() {
      var self = this
      var datasets = []

      this.result.position.forEach(function(p) {
        if (p.isMain) {
          var pos = {};
          pos.year = p.year
          pos.total = 0

          self.result.assets.history[p.year].assets.forEach(function(h) {
            pos.total += h.total
          })

          datasets.push(pos)
        }
      })

      var graphWidth = 500

      if (window.innerWidth <= 768) {
        graphWidth = window.innerWidth

        if (datasets.length < 3) {
          graphWidth -= 50 * (datasets.length)
        }
      }

      if (datasets.length > 5) {
        graphWidth += 50 * (datasets.length - 5)
      }

      var margin = {top: 50, right: 40, bottom: 70, left: 40}
      var width = graphWidth - margin.left - margin.right
      var height = 290 - margin.top - margin.bottom
      var barWidth = 26

      var x = d3.scale.ordinal().rangeRoundBands([0, width], 1);
      var y = d3.scale.linear().range([height, 0]);

      var xAxis = d3.svg.axis()
          .scale(x)
          .orient('bottom')
      var yAxis = d3.svg.axis()
          .scale(y)
          .orient("left")
          .ticks(5)
          .tickFormat(this.formatBarYAxis)

      var svg = d3.select('#canvas-bar').append('svg')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
        .append('g')
          .attr('width', width)
          .attr('transform',
                'translate(' + margin.left + ',' + margin.top + ')');

        var yMax = (d3.max(datasets, function(p) { return p.total; }))
        var yMin = (d3.min(datasets, function(p) { return p.total; }))
        var yDomainMin = yMin < 0 ? yMin : 0
        var yDomainMax = yMax < 0 ? 0 : yMax

        x.domain(datasets.map(function(p) { return p.year; }))
        y.domain([yDomainMin, yDomainMax])


        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + y(0) + ")")
            .call(xAxis)
          .selectAll('text')
            .style('text-anchor', 'end')
            .attr('dx', function(d) {
              if (self.result.assets.history[d].total < 0) {
                return '3em'
              } else {
                return '-.8em'
              }
            })
            .attr('dy', '-.55em')
            .attr('transform', 'rotate(-90)' );

        svg.append('g')
            .attr('class', 'y axis')
            .call(yAxis)
          .append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', 6)
            .attr('dy', '.71em')
            .style('text-anchor', 'end')
            .text('원');

        svg.selectAll('bar')
            .data(datasets)
          .enter().append('rect')
            .style('fill', '#ffffff')
            .attr('x', function(d) {
              return x(d.year) - barWidth/2
              // if (datasets.length < 5) {
              //   return x(d.year) - graphWidth/3;
              // } else {
              //   return x(d.year) - barWidth/2;
              // }
            })
            .attr('width', barWidth)
            .attr('y', function(d) {
              if (yMax < 0) {
                return y(0)
              } else {
                return d.total < 0 ? y(0) : y(d.total);
              }
            })
            .attr('height', function(d) {
              if (yMax > 0) {
                if (yMin < 0) {
                  return (d.total < 0) ? height - y(-1 * d.total) : (height - (y(yMin) - y(0)) - y(d.total));
                } else {
                  return height - y(d.total)
                }
              } else {
                return y(d.total)
              }

            })
          .on("mouseover", function(d) {
            $('#official-asset-total > .number').text(self.calMeasureMoney(d.total))
            $('#official-asset-total > .year').text(d.year + '년')
            self.drawPieChart(d.year)

            d3.selectAll('rect')
              .style('fill', '#ffffff')

            d3.select(this)
              .style('fill', '#fffca9');
          })
    },

    formatBarYAxis: function(value) {
      var result = ''
      var value = value < 0 ? value.toString().slice(1) : value.toString()
      var count = value.match(/0/g).length

      if (count === 4) {
        result =  value.slice(0, -1 * count) + '만'
      } else if (count === 5) {
        result =  value.slice(0, -1 * count) + '십만'
      } else if (count === 6) {
        result =  value.slice(0, -1 * count) + '백만'
      } else if (count === 7) {
        result =  value.slice(0, -1 * count) + '천만'
      } else if (count === 8) {
        result =  value.slice(0, -1 * count) + '억'
      } else if (count === 9) {
        result =  value.slice(0, -1 * count) + '0억'
      } else if (count === 9) {
        result =  value.slice(0, -1 * count) + '00억'
      } else if (count === 10) {
        result =  value.slice(0, -1 * count) + '00억'
      } else if (count === 11) {
        result =  value.slice(0, -1 * count) + '000억'
      } else if (count === 12) {
        result =  value.slice(0, -1 * count) + '조'
      } else if (count === 13) {
        result =  value.slice(0, -1 * count) + '0조'
      }

      return value < 0 ? '-' + result : result
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

      var canvasWidth = 600

      if (window.innerWidth <= 768 && window.innerWidth > 599) {
        canvasWidth = 300
      } else if (window.innerWidth < 600) {
        canvasWidth = window.innerWidth - 20
      }

      var pieOption = {
        footer: {
          text: '자산 구성비',
          color: '#ffffff',
          fontSize: 14,
          location: 'bottom-center'
        },
        size: {
          canvasWidth: canvasWidth,
          canvasHeight: 300,
          pieOuterRadius: "60%"
        },
        data: {
          content: pieData[year]
        },
        labels: {
          outer: {
            hideWhenLessThanPercentage: 3,
            format: 'label-percentage2',
            fontSize: 10,
            pieDistance: 15
          },
          inner: {
            format: 'none'
          },
          mainLabel: {
            color: '#ffffff',
            fontSize: 13
          },
          percentage: {
            fontSize: 13
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
        pieOption.size.canvasWidth = 500
        pieOption.size.canvasHeight = 450
        pieOption.size.pieOuterRadius = '80%'
        pieOption.footer.fontSize = 18
      }

      this.myPie = new d3pie('canvas-pie', pieOption)
      $('#p0_footer').attr('y', 428)
    },

    makePieData: function(model) {
      var self = this;
      var pieData = {}
      var nonRandomColorLabels = ['자동차·선박 등', '예금', '토지', '채무', '건물']
      var pieColor = ['#c8cef6', '#b6c0e6', '#a9b4dc', '#9da9cd', '#909ec2', '#8493b9', '#7b8bb1', '#7a86aa']

      for (var y in model) {
        var total = 0
        pieData[model[y].year] = []

        model[y].Assets.forEach(function(d) {
          if (d.total !== 0) {
            var data = {}
            data.value = d.total
            data.color = self.selectPieColor(d.Cat2.title)
            data.label = d.Cat2.title
            pieData[model[y].year].push(data)

            total += d.total
          }
        })

        pieData[model[y].year]
          .sort(function(a, b) {
            return parseInt(a.value, 10) - parseInt(b.value, 10)
          })
        .forEach(function(d) {
          if (!d.color) {
            d.color = pieColor.shift()
          }
        })
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
    calMeasureMoney: function(val) {
      var target = val < 0 ? val.toString().slice(1) : val.toString()
      var result = ''
      var thousand = ''
      var man = ''
      var eok = ''
      var jo = ''


      if (target.length < 5) {
        result = parseInt(val.toString(), 10) + '원'
      } else if (target.length < 9) {
        man = parseInt(target.slice(0, -4), 10)
        thousand = parseInt(target.slice(-4), 10) === 0 ? '' : ' ' + parseInt(target.slice(-4), 10)
        result = man + '만' + thousand + '원'
      } else if (target.length < 13) {
        eok = parseInt(target.slice(0, -8), 10)
        man = parseInt(target.slice(-8, -4), 10) === 0 ? '' : ' ' + parseInt(target.slice(-8, -4), 10)
        thousand = parseInt(target.slice(-4), 10) === 0 ? '' : ' ' + parseInt(target.slice(-4), 10)

        if (!man && !thousand) {
          result =  eok + '억원'
        } else if (!man && thousand) {
          result =  eok + '억' + thousand + '원'
        } else if (man && !thousand) {
          result =  eok + '억' + man + '만원'
        }  else {
          result =  eok + '억' + man + '만' + thousand + '원'
        }
      } else if (target.length < 17) {
        jo = parseInt(target.slice(0, -12), 10)
        eok = parseInt(target.slice(-12, -8), 10)
        man = parseInt(target.slice(-8, -4), 10)
        thousand = parseInt(target.slice(-4), 10)

        if (!eok && !man && !thousand) {
          result = jo + '조원'
        } else if (!eok && !man && thousand) {
          result = jo + '조' + thousand + '원'
        } else if (!eok && man && !thousand) {
          result = jo + '조' + man + '만원'
        } else if (eok && !man && !thousand) {
          result = jo + '조' + eok + '억원'
        } else if (eok && man && !thousand) {
          result = jo + '조' + eok + '억' + man + '만원'
        } else if (eok && !man && thousand) {
          result = jo + '조' + eok + '억' + thousand + '원'
        } else if (!eok && man && thousand) {
          result = jo + '조' + man + '만' + thousand + '원'
        } else {
          result = jo + '조' + eok + '억' + man + '만' + thousand + '원'
        }
      }

      return val < 0 ? '-' + result : result

      //
      // for (var i = 0; i < num; i++) {
      //   var index = (i + 1) * (-1) * 4 + 2 * (i * (-1))
      //   var measure = ''
      //   10억0000만0000원
      //
      //
      //
      //   switch (index) {
      //     case -4:
      //       measure = '만 '
      //       break;
      //     case -10:
      //       measure = '억 '
      //       break;
      //     case -16:
      //       measure = '조 '
      //       break;
      //     default:
      //       break;
      //   }
      //   result = result.substr(0, result.length + index) + measure + result.substr(index);
      // }

      // return result
    },

    sendEmail: function(e) {
      var self = this
      e.preventDefault()

      if (document.getElementById('form-contact-official').checkValidity() === false) {
        this.checkValidate()
      } else {
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
      }
    },

    checkValidate: function() {
      var contactEmail = $('input[name=contact-official-email]', '#form-contact-official').val()
      var contactContent = $('textarea[name=contact-official-content]', '#form-contact-official').val()
      var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (contactEmail === '' || !emailRegex.test(contactEmail)) {
        alert('이메일 주소를 확인해주세요')
      } else if (contactContent === '') {
        alert('제보할 내용을 확인해주세요')
      }
    },

    isMobile: function() {
      if (window.innerWidth < 768) {
        return true
      } else {
        return false
      }
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
