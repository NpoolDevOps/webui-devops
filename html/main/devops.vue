<template>
  <el-table border stripe :data="devices">
    <el-table-column prop="role" label="角色"></el-table-column>
    <el-table-column prop="sub_role" label="子角色"></el-table-column>
    <el-table-column prop="owner" label="所有者"></el-table-column>
    <el-table-column prop="current_user" label="使用者"></el-table-column>
    <el-table-column prop="manager" label="管理者"></el-table-column>
    <el-table-column prop="nvme_count" label="NVME數"></el-table-column>
    <el-table-column prop="nvme_desc" label="NVME描述"></el-table-column>
    <el-table-column prop="gpu_count" label="GPU數"></el-table-column>
    <el-table-column prop="gpu_desc" label="GPU描述"></el-table-column>
    <el-table-column prop="memory_count" label="內存條數"></el-table-column>
    <el-table-column prop="memory_size" label="內存大小"></el-table-column>
    <el-table-column prop="memory_desc" label="內存描述"></el-table-column>
    <el-table-column prop="cpu_count" label="CPU數"></el-table-column>
    <el-table-column prop="cpu_desc" label="CPU描述"></el-table-column>
    <el-table-column prop="hdd_count" label="硬盤數"></el-table-column>
    <el-table-column prop="hdd_desc" label="硬盤描述"></el-table-column>
    <el-table-column prop="local_addr" label="內網IP"></el-table-column>
    <el-table-column prop="public_addr" label="公網IP"></el-table-column>
    <el-table-column
      prop="runtime_nvme_count"
      label="當前NVME數"
    ></el-table-column>
    <el-table-column
      prop="runtime_gpu_count"
      label="當前GPU數"
    ></el-table-column>
    <el-table-column
      prop="runtime_memory_count"
      label="當前內存條數"
    ></el-table-column>
    <el-table-column
      prop="runtime_memory_size"
      label="當前內存大小"
    ></el-table-column>
    <el-table-column
      prop="runtime_hdd_count"
      label="當前硬盤數"
    ></el-table-column>
    <el-table-column prop="parent_spec" label="父設備特徵碼"></el-table-column>
    <el-table-column prop="os_spec" label="操作系統"></el-table-column>
    <el-table-column prop="status" label="狀態"></el-table-column>
  </el-table>
</template>
<script>
module.exports = {
  data() {
    return {
      devices: [],
    };
  },
  created: function () {
    this.$on('get_my_devices', this.getMyDevices);
    this.$on('update_menus', this.updateMenu)
  },
  mounted: function () {
    this.$emit('get_my_devices');
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
        })
        .catch(function (error) {
          ELEMENT.Notification({
            title: '獲取設備列表失敗',
            message: error.message,
            type: 'error',
          });
        });
    },
    updateMenu: function() {
      menu = {
        title: '設備列表',
        path: '/device/list',
        param: this.devices,
        submenus: [],
      }
      this.devices.forEach(function(device) {
        menu.submenus.push({
          title: device.local_addr,
          path: '/device',
          patam: device,
        })
        this.$emit('on-menu-item-updated', menu)
      })
    }
  },
};
</script>
