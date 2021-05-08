<template>
<div class="card-list" v-if="cardMinerDevices.length !== 0">
  <el-row gutter="20">
    <el-col span="7" class="card-margin" v-for="(device, index) in cardMinerDevices" :key="index">
      <el-card class="card-list-style" shadow="hover">
        <div slot="header" class="card-title">
          <el-button :id="device.device.pathIndex" type="text" class="title-btn" @click="goToDetail($event)">{{ device.device.local_addr }}</el-button>
          <div class="reminder-light">
            <div class="outer">
              <div class="inner"></div>
            </div>
          </div>
        </div>
        <div>
          <span class="title-font-style title-style">{{$t('deviceInfos.deviceInfo')}}: </span>
          <div class="card-content">
            <div v-for="(value1, name1, index1) in device.device">
              <span v-if="name1 != 'pathIndex'">{{$t(`device[${parseInt(index1)}]`)}} : {{value1}}</span>
            </div>
          </div>
        </div>
        <el-row v-for="(value2, name2, index2) in device.info" class="card-info-display" gutter="20">
          <el-col :span="8" class="pie-position">
            <div class="card-chart">
              <pie-chart-fee class="pie-chart" :send-miner-device='device.device' :send-miner-info='device.info' v-if="name2 === 'getMinerFee'"></pie-chart-fee>
              <pie-chart-power class="pie-chart" :send-miner-device='device.device' :send-miner-info='device.info' v-if="name2 === 'getMinerPower'"></pie-chart-power>
            </div>
          </el-col>
          <el-col :span="12" class="info-display">
            <div>
              <span class="title-font-style ">{{$t(`minerInfo[${parseInt(index2)}]`)}}</span>
              <div v-for="(value3, name3, index3) in value2" class="card-content">
                {{$t(`getMiner.${name2}[${parseInt(index3)}]`)}} : {{value3}}
              </div>
            </div>
          </el-col>
        </el-row>

        <div class="card-carousel">
          <el-carousel :interval="3000" height="50px" direction="vertical" autoplay="true" indicator-position="none">
            <el-carousel-item v-for="item in 4" :key="item">
              <h3>{{item}}</h3>
            </el-carousel-item>
          </el-carousel>
        </div>
      </el-card>
    </el-col>
  </el-row>
</div>
</template>

<script>
module.exports = {
  components: {
    PieChartFee: httpVueLoader('../../tool/Echarts/PieChartFee.vue'),
    PieChartPower: httpVueLoader('../../tool/Echarts/PieChartPower.vue'),
  },

  props: {
    sendMinerDevices: {
      type: Array,
      default: () => [],
    }
  },

  data() {
    return {
      cardMinerDevices: this.sendMinerDevices,
    }
  },

  watch: {
    sendMinerDevices: {
      immediate: true,
      deep: true,
      handler: function (newValue, oldValue) {
        this.cardMinerDevices = newValue;
      },

    }
  },

  methods: {
    goToDetail: function (a) {
      this.$router.push(a.currentTarget.id);
    },
  },

};
</script>

<style scoped>
.card-list {
  padding: 10px;
  float: left;
  width: 100%;
}

.el-card__header {
  border-bottom: none;
  box-shadow: 8px 8px 40px rgba(0, 0, 0, 0.05);
  height: 50px;
}

.card-list-style {
  border: 1px solid rgb(221, 221, 221);
  border-radius: 20px;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
}

.title-font-style {
  font-size: 16px;
  font-weight: bold;
  word-spacing: 1px;
  line-height: 1.8;
}

.title-btn {
  padding: 0;
  font-size: 18px;

  display: inline-block;
}

.reminder-light {
  float: right;
  display: inline;
}

.outer {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #67C23A;
  box-shadow: #67C23A 0px 0px 10px;
}

.inner {
  width: 24px;
  height: 24px;
  background-color: rgb(255, 255, 255);
  border-radius: 50%;
  opacity: 0.7;
  animation-name: move;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

@keyframes move {
  from {
    opacity: 0;
  }

  to {
    opacity: 0.7
  }
}

.card-content {
  font-size: 14px;
  word-spacing: 1px;
  line-height: 1.8;
  padding: 0px 0px 0px 5px;
}

.card-carousel {
  display: inline;
}

.card-list-style .el-card__body {
  padding: 0px 10px;
  padding-top: 5px;
}

.card-margin {
  margin: 0px 30px;
}
</style>
