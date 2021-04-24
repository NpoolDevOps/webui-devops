<template>
<div id="app">
  <div :id="cardID" style="width: 100%; height: 300px;"></div>
</div>
</template>

<script>
module.exports = {

  name: 'app',

  props: {
    chartMinerDevice: {},
  },
  data(){
    return{
      cardID: "",
    }
  },

  mounted: function () {
    this.$nextTick(() => {
      this.initChart()
    });
    this.initCardID();
  },

  methods: {
    initCardID: function(){
      this.cardID = Math.random().toString();
      console.log(this.cardID);
    },

    initChart() {
      console.log(document.getElementById(this.cardID));
      var chart = echarts.init(document.getElementById(this.cardID));

      var option = {
        title: {
          text: 'example',
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: ['Industries', 'Technology', 'Forex', 'Gold', 'Forecasts']
        },
        series: [{
          name: 'WEEKLY WRITE ARTICLES',
          type: 'pie',
          roseType: 'radius',
          radius: [15, 95],
          center: ['50%', '38%'],
          data: [{
              value: 320,
              name: 'Industries'
            },
            {
              value: 240,
              name: 'Technology'
            },
            {
              value: 149,
              name: 'Forex'
            },
            {
              value: 100,
              name: 'Gold'
            },
            {
              value: 59,
              name: 'Forecasts'
            }
          ],
          animationEasing: 'cubicInOut',
          animationDuration: 2600
        }]
      };
      chart.setOption(option);
    }
  }
}
</script>
