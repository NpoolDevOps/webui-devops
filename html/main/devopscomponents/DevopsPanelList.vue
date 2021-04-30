<template>
<div class="total-list">
  <el-row gutter="20">
    <el-col :span="8" v-for="info in panelInfo.panelIconClass.length">
      <div class="card-panel">
        <div class="card-panel-icon">
          <i :class=panelInfo.panelIconClass[info-1]></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">{{$t(`panel[${info-1}]`)}}</div>
          <div class="card-panel-number">{{panelInfo.panelNumber[info-1]}}</div>
        </div>
      </div>
    </el-col>
  </el-row>
</div>
</template>

<script>
module.exports = {
  props: {
    sendDevices: {
      type: Array,
      default: () => [],
    },

    sendMinerDevices: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      getDevices: this.sendDevices,
      getMinerDevices: this.sendMinerDevices,
      panelInfo: {
        panelNumber: [],
        panelIconClass: [
          "el-icon-user-solid",
          "el-icon-monitor",
          "el-icon-coin",
          "el-icon-coin",
          "el-icon-edit",
          "el-icon-error",
          "el-icon-aim",
        ],
      }
    }
  },

  watch: {
    sendDevices: {
      immdiate: true,
      deep: true,
      handler: function (newV, oldV) {
        this.getDevices = newV;
      }
    },

    sendMinerDevices: {
      immdiate: true,
      deep: true,
      handler: function (newV, oldV) {
        this.getMinerDevices = newV;
      }
    },

    getMinerDevices: {
      immdiate: true,
      deep: true,
      handler: function (newV, oldV) {
        let [minerNum, deviceNum, coinNum, dailyCoinNum, powerNum, faultyPowerNum, punishNum] = [newV.length, this.getDevices.length, 0, 0, 0, 0, 0];
        newV.forEach(device => {
          coinNum += parseFloat(device.info.getMinerFee.miner_balance);
          dailyCoinNum += parseFloat(device.info.getMinerFee.miner_vesting);
          powerNum += parseFloat(device.info.getMinerPower.miner_power);
          faultyPowerNum += parseFloat(device.info.getMinerPower.miner_faulty_power);
        });
        this.panelInfo.panelNumber = [minerNum, deviceNum, coinNum, dailyCoinNum, powerNum, faultyPowerNum, punishNum];
      }
    }
  },
}
</script>

<style scoped>
.total-list {
  padding: 0px 10px;
}

.card-panel {
  height: 120px;
  cursor: pointer;
  font-size: 12px;
  position: relative;
  overflow: hidden;
  color: rgb(0, 0, 0);
  background: #fff;
  box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
  /* border-color: rgba(0, 0, 0, 0.05); */
  margin: 5px;
  border: 1px solid rgb(221, 221, 221);
  border-radius: 20px;
}

.card-panel-icon {
  float: left;
  margin: 14px 0 0 14px;
  padding: 16px;
  border-radius: 6px;
  font-size: 48px;
}

.card-panel-description {
  float: right;
  font-weight: bold;
  margin: 26px;
  margin-left: 0px;
}

.card-panel-text {
  line-height: 18px;
  color: rgba(0, 0, 0, 0.45);
  font-size: 16px;
  margin-bottom: 12px;
}

.card-panel-number {
  font-size: 20px;
  float: right;
}
</style>
