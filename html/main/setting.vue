<template>
  <div>
    <el-card class="card-style">
      <div class="setting-box">
        <span class="setting-title">用户信息更改</span>
        <set-user-info></set-user-info>
      </div>
      <div class="setting-box">
        <span class="setting-title">设备选择</span>
        <set-transfer-device></set-transfer-device>
      </div>
      <div class="setting-box">
        <span class="setting-title">多选设备</span>
        <set-checkbox></set-checkbox>
      </div>
    </el-card>
  </div>
</template>

<script>
module.exports = {
  components: {
    SetUserInfo: httpVueLoader("../tool/setting/SetUserInfo.vue"),
    SetTransferDevice: httpVueLoader("../tool/setting/SetTransferDevice.vue"),
    SetCheckbox: httpVueLoader('../tool/setting/SetCheckbox.vue'),
  },
};
</script>

<style scoped>
.el-card__body {
  display: flex;
  flex-direction: column;
  margin: 10px 30px 0px 20px;
}

.setting-box {
  margin-left: 350px;
  margin-bottom: 20px;
}

.setting-title {
  font-size: 16px;
  color: gray;
  border-bottom: 2px solid gray;
  width: 100%;
}
</style>
