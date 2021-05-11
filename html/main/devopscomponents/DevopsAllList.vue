<template>
<div class="card-list" :v-if="cardMinerDevices.length > 0">
  <el-row gutter="20">
    <el-col span="7" class="card-margin" v-for="(device, index) in cardMinerDevices" :key="index">
      <el-card class="card-list-style" shadow="hover">
        <div slot="header" class="header-positon">
          <div class="header-button">
            <el-button :id="'/device' + device.device.pathIndex" type="text" class="title-btn" @click="goToDetail($event)">{{ device.device.local_addr }}</el-button>
          </div>
          <div class="reminder-light">
            <div class="outer">
              <div class="inner"></div>
            </div>
          </div>
        </div>
        <el-row gutter="24" class="up-info-style">
          <el-col :span="8" v-for="(value1, name1, index1) in device.device" class="info-position">
            <span class="title-font-style" v-if="name1 != 'pathIndex' && name1 != 'role'">{{ $t(`device[${parseInt(index1)}]`) }}:</span>
            <br />
            <span class="card-content" v-if="name1 != 'pathIndex' && name1 != 'role'">{{ value1 }}</span>
          </el-col>
        </el-row>
        <el-row gutter="20">
          <el-col :span="8" class="pie-position">
            <div class="card-chart">
              <pie-chart-fee class="pie-chart" :send-miner-device="device.device" :send-miner-info="device.info"></pie-chart-fee>
            </div>
          </el-col>
          <el-col :span="12" class="info-display">
            <div class="fee-power-text-position">
              <span class="title-font-style">{{ $t("getMiner.getMinerFee.miner_balance") }}:</span>
              <br />
              <span class="card-content">{{
                  device.info.getMinerFee.miner_balance
                }}</span>
            </div>
          </el-col>
        </el-row>

        <el-row gutter="20">
          <el-col :span="8" class="pie-position">
            <div class="card-chart">
              <pie-chart-power class="pie-chart" :send-miner-device="device.device" :send-miner-info="device.info"></pie-chart-power>
            </div>
          </el-col>
          <el-col :span="12" class="info-display">
            <div class="fee-power-text-position">
              <span class="title-font-style">{{ $t("getMiner.getMinerPower.miner_power") }}/{{
                    $t("getMiner.getMinerPower.miner_faulty_power")
                  }}:</span>
              <br />
              <span class="card-content">{{
                  device.info.getMinerPower.miner_power
                }}</span>/<span class="card-content faulty-color" style="padding: 0px;">{{
                  device.info.getMinerPower.miner_faulty_power
                }}</span>
            </div>
          </el-col>
        </el-row>

        <div class="card-carousel">
          <el-carousel :interval="3000" height="50px" direction="vertical" autoplay="true" indicator-position="none">
            <el-carousel-item v-for="item in 4" :key="item">
              <h3>{{ item }}</h3>
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
    PieChartFee: httpVueLoader("../../tool/Echarts/PieChartFee.vue"),
    PieChartPower: httpVueLoader("../../tool/Echarts/PieChartPower.vue"),
  },

  props: {
    sendMinerDevices: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      cardMinerDevices: this.sendMinerDevices,
    };
  },

  watch: {
    sendMinerDevices: {
      immediate: true,
      deep: true,
      handler: function (newValue, oldValue) {
        this.cardMinerDevices = newValue;
      },
    },
  },

  methods: {
    goToDetail: function (a) {
      var index = a.currentTarget.id;
      this.$router.push(index);
      constants.EventBus.$emit("on-menu-selected", index);
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

.header-positon {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
  color: #67c23a;
  display: inline-block;
}

.title-btn:before,
.title-btn:after {
  content: "";
  display: block;
  width: 0;
  height: 0;
  border-bottom: 2px solid transparent;
  box-sizing: border-box;
}

.title-btn:before {
  top: 0;
  left: 0;
  transition: border-color 0s ease-in 0.8s, width 0.2s ease-in 0.6s,
    height 0.2s ease-in 0.4s;
}

.title-btn:after {
  right: 0;
  bottom: 0;
  transition: border-color 0s ease-in 0.4s, width 0.2s ease-in 0.2s,
    height 0.2s ease-in;
}

.title-btn:hover:after {
  width: 100%;
  height: 100%;
  transition: border-color 0s ease-in 0.4s, width 0.2s ease-in 0.4s,
    height 0.3s ease-in 0.6s;
  border-bottom-color: #67c23a;

}

.reminder-light {
  float: right;
  display: inline;
}

.outer {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #67c23a;
  box-shadow: #67c23a 0px 0px 10px;
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
    opacity: 0.7;
  }
}

.up-info-style {
  padding-top: 10px;
}

.info-position {
  text-align: center;
}

.card-content {
  font-size: 14px;
  word-spacing: 1px;
  line-height: 1.8;
  padding: 0px 0px 0px 5px;
  color: #606266;
}

.info-display {
  height: 100px;
  text-align: center;
}

.fee-power-text-position {
  text-align: center;
  padding-top: 24px;
}

.faulty-color {
  color: #f56c6c;
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
