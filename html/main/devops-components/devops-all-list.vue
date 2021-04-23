<template>
<div class="card-list">
  <el-row gutter="20">
    <el-col span="8" v-for="(device, index) in minerDevices" key="index">
      <el-card class="card-style" shadow="hover">
        <div slot="header" class="card-title">
          <el-button type="text" class="title-btn">{{ device.device.local_addr }}</el-button>
        </div>
        <div v-for="(value1, name1) in device.device" class="card-content">
          {{ name1 + " :  " + value1 }}
        </div>
        <el-divider content-position="left">info</el-divider>
        <div v-for="(value2, name2) in device.info" class="card-content">
          {{ name2 + " :  " + value2 }}
        </div>
      </el-card>
    </el-col>
  </el-row>
</div>
</template>

<script>
module.exports = {
  data() {
    return {
      devices: [],

      minerDevices: [],
      gatewayDevices: [],
      deviceUpdater: -1,
    };
  },
  created: function () {
    this.$on("get_my_devices", this.getMyDevices);
    this.$on("update_menu", this.updateMenu);
    this.$on("update_device_info", this.updateDeviceInfo);
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

      var self = this;

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

          self.devices = [];
          resp.body.devices.forEach(function (device) {
            self.devices.push({
              device: {
                id: device.id,
                role: device.role,
                local_addr: device.local_addr,
                current_user: device.current_user,
              }, //resp.body.devices中的device，即请求后返回的devices的每个device
              info: {
                miner_basefee: {},
                //fee
                miner_balance: {},
                miner_available: {},
                miner_vesting: {},
                miner_precommit_deposit: {},
                miner_initial_pledge: {},
                //power
                miner_faulty_power: {},
                miner_power: {},
                miner_proving_power: {},
                miner_committed_power: {},
              },
            })
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
          }, 2000);

          // self.deviceUpdater = setInterval(function () {
          //   self.$emit('update_device_info');
          // }, 300000)
        })
        .catch(function (error) {
          ELEMENT.Notification({
            title: '獲取設備列表失敗',
            message: error.message,
            type: 'error',
          });
        });

      let time = 5;
      this.deviceUpdater = setInterval(function () {
        this.$emit('update_device_info');
        console.log(time + ' minutes passed...');
        time += 5;
      }, 300000)
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
    updateMinerInfo: function () {
      let self = this;
      var myMinerDevices = this.minerDevices.map((device) => device);
      myMinerDevices.forEach(function (device) { //this.devices的每一个device,device={device, info}
        //miner_basefee
        self.updateDeviceInfoFromPrometheus(device.device, 'miner_basefee')
          .then(function (info) {
            console.log('miner base fee', 'device: ', device.device.local_addr, 'info: ', info);
            // update device info
            if (info.data.data.result.length === 0) {
              device.info.miner_basefee = 0;
            } else {
              device.info.miner_basefee = info.data.data.result[0].value[1];
            }
          })
          .catch(function (error) {
            console.log('miner base fee', device.device.local_addr, 'error: ', error);
          })

        //miner_balance
        self.updateDeviceInfoFromPrometheus(device.device, 'miner_balance')
          .then(function (info) {
            console.log('miner balance fee', device.device.local_addr, 'info: ', info);
            // update device info
            if (info.data.data.result.length === 0) {
              device.info.miner_balance = 0;
            } else {
              device.info.miner_balance = info.data.data.result[0].value[1];
            }
          })
          .catch(function (error) {
            console.log('miner balance fee', device, device.local_addr, 'error: ', error);
          })

        //miner_available
        self.updateDeviceInfoFromPrometheus(device.device, 'miner_available')
          .then(function (info) {
            console.log('miner available fee', device.device.local_addr, 'info: ', info);
            // update device info
            if (info.data.data.result.length === 0) {
              device.info.miner_available = 0;
            } else {
              device.info.miner_available = info.data.data.result[0].value[1];
            }
          })
          .catch(function (error) {
            console.log('miner available fee', device, device.local_addr, 'error: ', error);
          })

        //miner_faulty_power
        self.updateDeviceInfoFromPrometheus(device.device, 'miner_faulty_power')
          .then(function (info) {
            console.log('miner faulty_power number', device.device.local_addr, 'info: ', info);
            // update device info
            if (info.data.data.result.length === 0) {
              device.info.miner_faulty_power = 0;
            } else {
              device.info.miner_faulty_power = info.data.data.result[0].value[1];
            }
          })
          .catch(function (error) {
            console.log('miner faulty_power number', device, device.local_addr, 'error: ', error);
          })

        //miner_power
        self.updateDeviceInfoFromPrometheus(device.device, 'miner_power')
          .then(function (info) {
            console.log('miner power', device.device.local_addr, 'info: ', info);
            // update device info
            if (info.data.data.result.length === 0) {
              device.info.miner_power = 0;
            } else {
              device.info.miner_power = info.data.data.result[0].value[1];
            }
          })
          .catch(function (error) {
            console.log('miner power', device, device.local_addr, 'error: ', error);
          })

        //miner_vesting
        self.updateDeviceInfoFromPrometheus(device.device, 'miner_vesting')
          .then(function (info) {
            console.log('miner vesting', device.device.local_addr, 'info: ', info);
            // update device info
            if (info.data.data.result.length === 0) {
              device.info.miner_vesting = 0;
            } else {
              device.info.miner_vesting = info.data.data.result[0].value[1];
            }
          })
          .catch(function (error) {
            console.log('miner vesting', device, device.local_addr, 'error: ', error);
          })

        //miner_proving_power
        self.updateDeviceInfoFromPrometheus(device.device, 'miner_proving_power')
          .then(function (info) {
            console.log('miner proving_power number', device.device.local_addr, 'info: ', info);
            // update device info
            if (info.data.data.result.length === 0) {
              device.info.miner_proving_power = 0;
            } else {
              device.info.miner_proving_power = info.data.data.result[0].value[1];
            }
          })
          .catch(function (error) {
            console.log('miner proving_power number', device, device.local_addr, 'error: ', error);
          })

        //miner_precommit_deposit
        self.updateDeviceInfoFromPrometheus(device.device, 'miner_precommit_deposit')
          .then(function (info) {
            console.log('miner precommit_deposit number', device.device.local_addr, 'info: ', info);
            // update device info
            if (info.data.data.result.length === 0) {
              device.info.miner_precommit_deposit = 0;
            } else {
              device.info.miner_precommit_deposit = info.data.data.result[0].value[1];
            }
          })
          .catch(function (error) {
            console.log('miner precommit_deposit number', device, device.local_addr, 'error: ', error);
          })

        //miner_initial_pledge
        self.updateDeviceInfoFromPrometheus(device.device, 'miner_initial_pledge')
          .then(function (info) {
            console.log('miner initial_pledge number', device.device.local_addr, 'info: ', info);
            // update device info
            if (info.data.data.result.length === 0) {
              device.info.miner_initial_pledge = 0;
            } else {
              device.info.miner_initial_pledge = info.data.data.result[0].value[1];
            }
          })
          .catch(function (error) {
            console.log('miner initial_pledge number', device, device.local_addr, 'error: ', error);
          })

        //miner_committed_power
        self.updateDeviceInfoFromPrometheus(device.device, 'miner_committed_power')
          .then(function (info) {
            console.log('miner committed_power number', device.device.local_addr, 'info: ', info);
            // update device info
            if (info.data.data.result.length === 0) {
              device.info.miner_committed_power = 0;
            } else {
              device.info.miner_committed_power = info.data.data.result[0].value[1];
            }
          })
          .catch(function (error) {
            console.log('miner committed_power number', device, device.local_addr, 'error: ', error);
          })

        //
      });
      this.minerDevices = myMinerDevices;
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
</style>
