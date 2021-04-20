<template>
  <div class="card-list">
  <el-row gutter="20">
    <el-col span="6" v-for="(device, index) in devices" key="index">
      <el-card class="card-style" shadow="hover">
        <div slot="header" class="card-title">
          <el-button type="text" class="title-btn">{{ device.local_addr }}</el-button>
        </div>
        <div v-for="(value, name) in device" class="card-content">
          {{ name + " :  " + value }}
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
    };
  },
  created: function () {
    this.$on("get_my_devices", this.getMyDevices);
    this.$on("update_menu", this.updateMenu);
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
        headers: { 'Content-Type': 'application/json' },
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

          self.devices = resp.body.devices;
          self.$emit("update_menu")
        })
        .catch(function (error) {
          ELEMENT.Notification({
            title: '獲取設備列表失敗',
            message: error.message,
            type: 'error',
          });
        });
    },
    updateMenu: function () {
      menu = {
        title: "設備列表",
        path: "/html",
        param: this.devices,
        submenus: [],
      };
      this.devices.forEach(function (device) {
        menu.submenus.push({
          title: device.local_addr,
          path: "/device",
          patam: device,
        });
      });
      constants.EventBus.$emit("on-menu-item-updated", {
        clazz: constants.MenuClassDevops,
        subclazz: constants.MenuSubClassDeviceList,
        menu: menu,
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
