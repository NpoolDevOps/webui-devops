<template>
  <div class="devops" v-if="isShow">
    <devops-panel-list
      class="devops"
      :send-devices="devices"
      :send-miner-devices="minerDevices"
    ></devops-panel-list>
    <devops-all-list
      class="devops"
      :send-miner-devices="minerDevices"
    ></devops-all-list>
  </div>
</template>

<script>
module.exports = {
  components: {
    DevopsPanelList: httpVueLoader("../main/devopscomponents/DevopsPanelList.vue"),
    DevopsAllList: httpVueLoader("../main/devopscomponents/DevopsAllList.vue"),
  },

  data() {
    return {
      devices: [],
      minerDevices: [],
      gatewayDevices: [],
      isShow: false,
      deviceUpdater: -1,
    };
  },

  created: function () {
    this.$on("get_my_devices", this.getMyDevices);
    this.$on("update_menu", this.updateMenu);
    this.$on("update_device_info", this.updateDeviceInfo);
    this.$on("update_miner_metrics", this.updateMinerMetrics);
  },

  mounted: function () {
    this.$emit("get_my_devices");
  },

  watch: {
    minerDevices: {
      handler: function (newValue, oldValue) {
        if (newValue !== oldValue) {
          this.isShow = true;
        }
      },
    },
  },

  methods: {
    getMyDevices: function () {
      let authCode = this.$cookies.get("authcode");
      if (!authCode || authCode == "" || authCode == "null") {
        ELEMENT.Notification({
          title: "授權失敗",
          message: "授權碼缺失: " + authCode,
          type: "error",
        });
        return;
      }

      let self = this;

      axios({
        url: "https://devops.npool.top/api/v0/device/mine",
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          auth_code: authCode,
        },
      })
        .then(function (response) {
          let resp = response.data;
          let num = 0;

          if (resp.code != 0) {
            ELEMENT.Notification({
              title: "獲取設備列表失敗",
              message: resp.msg,
              type: "error",
            });
            return;
          }

          resp.body.devices.forEach(function (device) {
            self.devices.push({
              device: {
                local_addr: device.local_addr, //机房网关IP
                public_addr: device.public_addr, //内网IP
                current_user: device.current_user, //用户
                role: device.role,
                pathIndex: "/0-0-" + num,
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
                },
              },
            });
            num++;
          });

          //卡片分类：miner和gateway
          self.devices.forEach(function (device) {
            //self.devices的每个device
            if (
              device.device.role === "fullminer" ||
              device.device.role === "miner"
            ) {
              self.minerDevices.push(device);
            } else if (device.role === "gateway") {
              self.gatewayDevices.push(device);
            }
          });

          self.$emit("update_device_info");
          self.$emit("update_menu");

          // var timeUpdateDeviceInfo = setTimeout(() => {
          //   self.$emit('update_device_info');
          // }, 1000);

          // var timeUpdateMenu = setTimeout(() => {
          //   self.$emit("update_menu")
          // }, 1000);

          let time = 5;
          self.deviceUpdater = setInterval(function () {
            self.$emit("update_device_info");
            console.log(time + " minutes passed...");
            time += 5;
          }, 300000);
        })
        .catch(function (error) {
          ELEMENT.Notification({
            title: "獲取設備列表失敗",
            message: error.message,
            type: "error",
          });
        });
    },

    updateDeviceInfo: function () {
      this.updateMinerInfo();
      this.updateGatewayInfo();
    },

    updateDeviceInfoFromPrometheus: function (device, metrics) {
      let query = encodeURIComponent(
        metrics + '{instance="' + device.local_addr + ':52379"}'
      );
      return axios({
        url: "https://prometheus.npool.top/api/v1/query?query=" + query,
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      });
    },

    updateDeviceMetrics: function (device, metrics, handler) {
      this.updateDeviceInfoFromPrometheus(device.device, metrics)
        .then(function (info) {
          console.log(metrics, device.device.local_addr, "info: ", info);
          // update device info
          if (info.data.data.result.length === 0) {
            handler(device, metrics, "0");
          } else {
            handler(device, metrics, info.data.data.result[0].value[1]);
          }
        })
        .catch(function (error) {
          console.log(metrics, device, device.local_addr, "error: ", error);
        });
    },

    updateMinerMetrics: function (obj) {
      let self = this;
      this.updateDeviceMetrics(
        obj.device,
        obj.metrics,
        function (device, metrics, value) {
          switch (metrics) {
            case "miner_balance":
              device.info.getMinerFee.miner_balance = value;
              self.$emit("update_miner_metrics", {
                device: device,
                metrics: "miner_available",
              });
              break;
            case "miner_available":
              device.info.getMinerFee.miner_available = value;
              self.$emit("update_miner_metrics", {
                device: device,
                metrics: "miner_vesting",
              });
              break;
            case "miner_vesting":
              device.info.getMinerFee.miner_vesting = value;
              self.$emit("update_miner_metrics", {
                device: device,
                metrics: "miner_precommit_deposit",
              });
              break;
            case "miner_precommit_deposit":
              device.info.getMinerFee.miner_precommit_deposit = value;
              self.$emit("update_miner_metrics", {
                device: device,
                metrics: "miner_initial_pledge",
              });
              break;
            case "miner_initial_pledge":
              device.info.getMinerFee.miner_initial_pledge = value;
              self.$emit("update_miner_metrics", {
                device: device,
                metrics: "miner_faulty_power",
              });
              break;
            case "miner_faulty_power":
              device.info.getMinerPower.miner_faulty_power = value;
              self.$emit("update_miner_metrics", {
                device: device,
                metrics: "miner_power",
              });
              break;
            case "miner_power":
              device.info.getMinerPower.miner_power = value;
              self.$emit("update_miner_metrics", {
                device: device,
                metrics: "miner_proving_power",
              });
              break;
            case "miner_proving_power":
              device.info.getMinerPower.miner_proving_power = value;
              self.$emit("update_miner_metrics", {
                device: device,
                metrics: "miner_committed_power",
              });
              break;
            case "miner_committed_power":
              // Update value
              device.info.getMinerPower.miner_committed_power = value;
              let minerDevices = self.minerDevices.map((device) => device);
              self.minerDevices = minerDevices;
              break;
          }
        }
      );
    },

    updateMinerInfo: function () {
      let self = this;
      this.minerDevices.forEach(function (device) {
        //this.devices的每一个device,device={device, info}
        self.$emit("update_miner_metrics", {
          device: device,
          metrics: "miner_balance",
        });
      });
    },

    updateGatewayInfo: function () {
      console.log("NOT IMPLEMENTED");
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
        });
      });

      gatewaymenu = {
        param: this.gatewayDevices,
        submenus: [],
      };
      this.gatewayDevices.forEach(function (device) {
        gatewaymenu.submenus.push({
          title: device.device.local_addr,
          path: "/html/devopsdt",
          param: device.device,
        });
      });

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
.devops {
  background-color: rgb(245, 245, 245);
}
</style>
