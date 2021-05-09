<template>
<div :id="cardIDPower" style="width: 100%; height: 100px;"></div>
</template>

<script>
module.exports = {
  props: {
    sendMinerDevice: {
      type: Object,
      default: () => {},
    },
    sendMinerInfo: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      cardIDFee: "",
      cardIDPower: "",
      getChartMinerDevice: this.sendMinerDevice,
      getChartMinerPowerInfo: this.sendMinerInfo.getMinerPower,
    }
  },

  watch: {
    sendMinerDevice: {
      immediate: true,
      handler: function (newValue, oldV) {
        this.getChartMinerDevice = newValue;
      },
      deep: true,
    },
    sendMinerInfo: {
      immediate: true,
      handler: function (newValue, oldV) {
        this.getChartMinerPowerInfo = newValue.getMinerPower;
      },
      deep: true,
    },

    getChartMinerDevice: {
      immediate: true,
      handler(newValue, oldValue) {
        this.cardIDPower = newValue.local_addr + '-Power';
        this.$nextTick(() => {
          this.updateChart();
        });
      },
      deep: true,
    },

    getChartMinerPowerInfo: {
      immediate: true,
      handler(newValue, oldValue) {
        this.$nextTick(() => {
          this.updateChart();
        });
      },
      deep: true,
    }
  },

  methods: {
    updateChart: function () {

      var powerChart = echarts.init(document.getElementById(this.cardIDPower));
      let powerSeriesData = [];

      for (let info in this.getChartMinerPowerInfo) {
        powerSeriesData.push({
          name: info,
          value: this.getChartMinerPowerInfo[info]
        })
      }

      //option of power chart
      var powerOption = {
        title: {
          text: 'Power',
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
          confine: true,
        },
        series: [{
          name: 'power',
          type: 'pie',
          // roseType: 'radius',
          radius: [5, 40],
          label: {
            normal: {
              position: 'inner',
              show: false
            }
          },
          center: ['50%', '50%'],
          data: powerSeriesData,
          animationEasing: 'cubicInOut',
          animationDuration: 2600
        }]
      };
      powerChart.setOption(powerOption);
    }
  }
}
</script>
