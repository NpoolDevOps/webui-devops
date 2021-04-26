<template>
<div class="card-list" :v-model="minerDevices" v-if="minerDevices.length !== 0">
  <el-row gutter="20">
    <el-col span="8" v-for="(device, index) in minerDevices" :key="index">
      <el-card class="card-style" shadow="hover">
        <div slot="header" class="card-title">
          <el-button type="text" class="title-btn">{{ device.device.local_addr }}</el-button>
        </div>
        <h3>deviceInfo</h3>
        <div v-for="(value1, name1) in device.device" class="card-content">
          {{ name1 + " :  " + value1 }}
        </div>
        <div v-for="(value2, name2) in device.info" class="card-content">
          <span class="title-font-style">{{name2 + ': '}}</span>
          <div v-for="(value3, name3) in value2" class="card-content">
            {{ name3 + ': ' + value3 }}
          </div>
        </div>
        <br />
        <div class="card-chart">
          <pie-chart-fee class="pie-chart" :send-miner-device='device.device' :send-miner-info='device.info'></pie-chart-fee>
          <pie-chart-power class="pie-chart" :send-miner-device='device.device' :send-miner-info='device.info'></pie-chart-power>
        </div>
      </el-card>
    </el-col>
  </el-row>
</div>
</template>

<script>
module.exports = {
  components: {
    PieChartFee: httpVueLoader('/html/tool/Echarts/PieChartFee.vue'),
    PieChartPower: httpVueLoader('/html/tool/Echarts/PieChartPower.vue'),
  },

  data() {
    return {
      devices: [],
      minerDevices: [],
      gatewayDevices: [],
      deviceUpdater: -1,
    };
  },

  created: function () {
    this.$on('get_my_devices', this.getMyDevices);
    this.$on('update_menu', this.updateMenu);
    this.$on('update_device_info', this.updateDeviceInfo);
    this.$on('update_miner_metrics', this.updateMinerMetrics);
  },
  mounted: function () {
    this.$emit("get_my_devices");
  },

  methods: {
    getMyDevices: function () {
      let authCode = this.$cookies.get('authcode');
      if (!authCode || authCode == '' || authCode == 'null') {
        ELEMENT.Notification({
          title: '授權失敗',
          message: '授權碼缺失: ' + authCode,
          type: 'error',
        });
        return;
      }

      let self = this;

      axios({
          url: 'https://devops.npool.top/api/v0/device/mine',
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          data: {
            auth_code: authCode,
          },
        })
        .then(function (response) {
          let resp = response.data;
          if (resp.code != 0) {
            ELEMENT.Notification({
              title: '獲取設備列表失敗',
              message: resp.msg,
              type: 'error',
            });
            return;
          }

          resp.body.devices.forEach(function (device) {
            self.devices.push({
              device: {
                id: device.id,
                role: device.role,
                local_addr: device.local_addr,
                current_user: device.current_user,
              }, //resp.body.devices中的device，即请求后返回的devices的每个device

              info: {
                // fee
                getMinerFee: {
                  miner_balance: "",
                  miner_available: "",
                  miner_vesting: "",
                  miner_precommit_deposit: "",
                  miner_initial_pledge: "",
                },
                //power
                getMinerPower: {
                  miner_faulty_power: "",
                  miner_power: "",
                  miner_proving_power: "",
                  miner_committed_power: "",
                }
              },
            });
          });

          //卡片分类：miner和gateway
          self.devices.forEach(function (device) { //self.devices的每个device
            if (device.device.role === 'fullminer' || device.device.role === 'miner') {
              self.minerDevices.push(device);
            } else if (device.role === 'gateway') {
              self.gatewayDevices.push(device);
            }
          });

          var timeUpdateDeviceInfo = setTimeout(() => {
            self.$emit('update_device_info');
          }, 1000);

          var timeUpdateMenu = setTimeout(() => {
            self.$emit("update_menu")
          }, 1000);

          let time = 5;
          self.deviceUpdater = setInterval(function () {
            self.$emit('update_device_info');
            console.log(time + ' minutes passed...');
            time += 5;
          }, 300000)
        })
        .catch(function (error) {
          ELEMENT.Notification({
            title: '獲取設備列表失敗',
            message: error.message,
            type: 'error',
          });
        });
    },

    updateDeviceInfo: function () {
      this.updateMinerInfo();
      this.updateGatewayInfo();
    },

    updateDeviceInfoFromPrometheus: function (device, metrics) {
      let query = encodeURIComponent(metrics + '{instance="' + device.local_addr + ':52379"}')
      return axios({
        url: 'http://47.99.107.242:9090/api/v1/query?query=' + query,
        method: 'get',
        headers: {
          'Content-Type': 'application/json'
        },
      })
    },

    updateDeviceMetrics: function (device, metrics, handler) {
      this.updateDeviceInfoFromPrometheus(device.device, metrics)
        .then(function (info) {
          console.log(metrics, device.device.local_addr, 'info: ', info);
          // update device info
          if (info.data.data.result.length === 0) {
            handler(device, metrics, '0');
          } else {
            handler(device, metrics, info.data.data.result[0].value[1]);
          }
        })
        .catch(function (error) {
          console.log(metrics, device, device.local_addr, 'error: ', error);
        })
    },

    updateMinerMetrics: function (obj) {
      let self = this;
      this.updateDeviceMetrics(obj.device, obj.metrics, function (device, metrics, value) {
        switch (metrics) {
          case 'miner_balance':
            device.info.getMinerFee.miner_balance = value;
            self.$emit('update_miner_metrics', {
              device: device,
              metrics: 'miner_available'
            });
            break;
          case 'miner_available':
            device.info.getMinerFee.miner_available = value;
            self.$emit('update_miner_metrics', {
              device: device,
              metrics: 'miner_vesting'
            });
            break;
          case 'miner_vesting':
            device.info.getMinerFee.miner_vesting = value;
            self.$emit('update_miner_metrics', {
              device: device,
              metrics: 'miner_precommit_deposit'
            });
            break;
          case 'miner_precommit_deposit':
            device.info.getMinerFee.miner_precommit_deposit = value;
            self.$emit('update_miner_metrics', {
              device: device,
              metrics: 'miner_initial_pledge'
            });
            break;
          case 'miner_initial_pledge':
            device.info.getMinerFee.miner_initial_pledge = value;
            self.$emit('update_miner_metrics', {
              device: device,
              metrics: 'miner_faulty_power'
            });
            break;
          case 'miner_faulty_power':
            device.info.getMinerPower.miner_faulty_power = value;
            self.$emit('update_miner_metrics', {
              device: device,
              metrics: 'miner_power'
            });
            break;
          case 'miner_power':
            device.info.getMinerPower.miner_power = value;
            self.$emit('update_miner_metrics', {
              device: device,
              metrics: 'miner_proving_power'
            });
            break;
          case 'miner_proving_power':
            device.info.getMinerPower.miner_proving_power = value;
            self.$emit('update_miner_metrics', {
              device: device,
              metrics: 'miner_committed_power'
            });
            break;
          case 'miner_committed_power':
            // Update value
            device.info.getMinerPower.miner_committed_power = value;
            let minerDevices = self.minerDevices.map((device) => device);
            this.minerDevices = minerDevices;
            break;
        }
      })
    },

    updateMinerInfo: function () {
      let self = this;
      this.minerDevices.forEach(function (device) { //this.devices的每一个device,device={device, info}
        self.$emit('update_miner_metrics', {
          device: device,
          metrics: 'miner_balance'
        });
      });
    },

    updateGatewayInfo: function () {
      console.log('NOT IMPLEMENTED')
    },
    updateMenu: function () {
      minermenu = {
        param: this.minerDevices,
        submenus: [],
      };
      this.minerDevices.forEach(function (device) {
        minermenu.submenus.push({
          title: device.device.local_addr,
          path: "/html/devopsdt",
          param: device.device,
        })
      });

      gatewaymenu = {
        param: this.gatewayDevices,
        submenus: [],
      }
      this.gatewayDevices.forEach(function (device) {
        gatewaymenu.submenus.push({
          title: device.device.local_addr,
          path: "/html/devopsdt",
          param: device.device,
        })
      })

      //第一次更新，更新miner列表的数据
      constants.EventBus.$emit("on-menu-item-updated", {
        clazz: constants.MenuClassDevops,
        subclazz: constants.MenuSubClassMinerDeviceList,
        menu: minermenu,
      });

      //第二次更新，更新gateway列表的数据
      constants.EventBus.$emit("on-menu-item-updated", {
        clazz: constants.MenuClassDevops,
        subclazz: constants.MenuSubClassGatewayDeviceList,
        menu: gatewaymenu,
      });
    },
  },
};
</script>

<style scoped>
.el-card__header {
  border-bottom: 2px solid rgb(221, 221, 221);
}

.card-list {
  padding: 10px;
  float: left;
  width: 100%;
  box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
}

.card-style {
  border: 1px solid rgb(221, 221, 221);
  border-radius: 20px;
  width: 90%;
  margin-top: 10px;
  margin-bottom: 10px;
}

.title-btn {
  padding: 0;
  font-size: 18px;
}

.card-content {
  font-size: 14px;
  word-spacing: 1px;
  line-height: 1.8;
}

.title-font-style {
  font-size: 18px;
  font-weight: bold;
}
</style>
