<template>
<div>
  <div id="treeChart" class="tree-chart" :style="{width: '500px', height: '500px',padding: '15px'}"></div>
</div>
</template>

<script>
module.exports = {
  name: "eCharts",
  data() {
    return {
      treedata: [{
        name: '本科',
        children: [{
            name: '考研',
            value: 0,
          },
          {
            name: '就业',
            value: 0,
            children: [{
              name: '相关就业详见菜单栏‘培养方向’',
              value: 0,
            }]
          },
          {
            name: '考公',
            value: 0,
          },
          {
            name: '留学',
            value: 0,
            children: [{
              name: '相关文件（申请流程、交换要求）',
              value: 0,
            }]
          },
          {
            name: '创业',
            value: 0,
          }
        ]
      }],

      option: {
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove'
        },
        series: [{
          type: 'tree',
          data: [],
          // orient: 'TB',
          top: '1%',
          left: '7%',
          bottom: '1%',
          right: '20%',
          symbolSize: 7,
          label: {
            position: 'left',
            verticalAlign: 'middle',
            align: 'right',
            fontSize: 13
          },
          leaves: {
            label: {
              position: 'right',
              verticalAlign: 'middle',
              align: 'left'
            }
          },
          expandAndCollapse: true,
          animationDuration: 550,
          animationDurationUpdate: 750
        }]
      },

    }
  },
  created: function () {
    this.$nextTick(() => {
      this.showChart();
    });
  },
  methods: {
    showChart: function () {
      var myChart = echarts.init(document.getElementById('treeChart'));
      myChart.on('click', this.clickLable);
      let self = this;
      this.option.series[0].data = this.treedata;

      this.treedata[0].children.forEach(child => {
        if (child.value === 0) {
          child.lineStyle = {
            color: 'rgba(0, 0, 0, 1)',
            borderColor: 'rgba(0, 0, 0, 1)'
          };
        }
      });
      myChart.setOption(self.option);
    },

    clickLable: function (param) {
      if (param.type === 'click') {
        this.$router.push('/detail');
        console.log('param.name: ', param.name);
      }
    }
  }
}
</script>

<style>
.ml30 {
  margin-left: 30px;
}

.m50 {
  margin: 50px
}

.tree-chart {
  display: inline-block;
}
</style>
