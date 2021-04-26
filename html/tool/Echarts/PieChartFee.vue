<template>
<div :id="cardIDFee" style="width: 100%; height: 300px;"></div>
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
      getMinerChartFeeInfo: this.sendMinerInfo.getMinerFee,
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
        this.getMinerChartFeeInfo = newValue.getMinerFee;
      },
      deep: true,
    },

    getChartMinerDevice: {
      immediate: true,
      handler(newValue, oldValue) {
        this.cardIDFee = newValue.local_addr + '-Fee';
        this.$nextTick(() => {
          this.updateChart();
        });
      },
      deep: true,
    },

    getMinerChartFeeInfo: {
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

      let feeNameArr = Object.keys(this.getMinerChartFeeInfo);
      var feeChart = echarts.init(document.getElementById(this.cardIDFee));
      let feeSeriesData = [];

      for (let info in this.getMinerChartFeeInfo) {
        feeSeriesData.push({
          name: info,
          value: this.getMinerChartFeeInfo[info]
        })
      };

      //option of fee chart
      var feeOption = {
        title: {
          text: 'Fee',
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: feeNameArr,
        },
        series: [{
          name: 'fee',
          type: 'pie',
          roseType: 'radius',
          radius: [15, 95],
          center: ['50%', '38%'],
          data: feeSeriesData,
          animationEasing: 'cubicInOut',
          animationDuration: 2600
        }]
      };
      feeChart.setOption(feeOption);

    }
  }
}
</script>
