<template>
<div class="total-list">
  <el-row gutter="20">
    <el-col :span="8" >
      <div class="card-panel">
        <div class="card-panel-icon">
          <i class="el-icon-user-solid"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">{{$t('panel.miner')}}</div>
          <div class="card-panel-number">{{computeMinerNum}}</div>
        </div>
      </div>
    </el-col>

    <el-col :span="8" >
      <div class="card-panel">
        <div class="card-panel-icon">
          <i class="el-icon-monitor"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">{{$t('panel.equipment')}}</div>
          <div class="card-panel-number">{{computeDeviceNum}}</div>
        </div>
      </div>
    </el-col>

    <el-col :span="8" >
      <div class="card-panel">
        <div class="card-panel-icon">
          <i class="el-icon-coin"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">{{$t('panel.coin')}}</div>
          <div class="card-panel-number">{{computeCoinNum}}</div>
        </div>
      </div>
    </el-col>

    <el-col :span="8" >
      <div class="card-panel">
        <div class="card-panel-icon">
          <i class="el-icon-coin"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">{{$t('panel.newCoin')}}</div>
          <div class="card-panel-number">{{computeDailyCoinNum}}</div>
        </div>
      </div>
    </el-col>

    <el-col :span="8" >
      <div class="card-panel">
        <div class="card-panel-icon">
          <i class="el-icon-edit"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">{{$t('panel.totalComputing')}}</div>
          <div class="card-panel-number">{{computePowerNum}}</div>
        </div>
      </div>
    </el-col>

    <el-col :span="8" >
      <div class="card-panel">
        <div class="card-panel-icon">
          <i class="el-icon-error"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">{{$t('panel.errorComputing')}}</div>
          <div class="card-panel-number">{{computeFaultyPowerNum}}</div>
        </div>
      </div>
    </el-col>

    <el-col :span="8" >
      <div class="card-panel">
        <div class="card-panel-icon">
          <i class="el-icon-aim"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">{{$t('panel.punishment')}}</div>
          <div class="card-panel-number">100</div>
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

  data(){
    return{
      getDevices: this.sendDevices,
      getMinerDevices: this.sendMinerDevices,
    }
  },

  watch: {
    sendDevices: {
      immdiate: true,
      deep: true,
      handler: function(newV, oldV){
        this.getDevices = newV;
      }
    },

    sendMinerDevices: {
      immdiate: true,
      deep: true,
      handler: function(newV, oldV){
        this.getMinerDevices = newV;
      }
    },
  },

  computed: {
    computeMinerNum: function(){
      return this.getMinerDevices.length;
    },
    computeDeviceNum: function(){
      return this.getDevices.length;
    },
    computeCoinNum: function(){
      let CoinSum = 0;
      this.getMinerDevices.forEach(device => {
        CoinSum += parseFloat(device.info.getMinerFee.miner_balance);
      });
      return CoinSum;
    },
    computeDailyCoinNum: function(){
      let dailyCoinNum = 0;
      this.getMinerDevices.forEach(device => {
        dailyCoinNum += parseFloat(device.info.getMinerFee.miner_vesting);
      });
      return dailyCoinNum;
    },
    computePowerNum: function(){
      let powerNum = 0;
      this.getMinerDevices.forEach(device => {
        powerNum += parseFloat(device.info.getMinerPower.miner_power);
      });
      return powerNum;
    },
    computeFaultyPowerNum: function(){
      let faultyPowerNum = 0;
      this.getMinerDevices.forEach(device => {
        faultyPowerNum += parseFloat(device.info.getMinerPower.miner_faulty_power);
      });
      return faultyPowerNum;
    },
    computePunishNum: function(){},
  }
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
