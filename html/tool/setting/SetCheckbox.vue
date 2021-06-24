<template>
  <div class="checkbox-style">
    <el-checkbox-group v-model="devices" >
      <el-checkbox v-for="device in allDevices" :label="device"></el-checkbox>
    </el-checkbox-group>
    <el-button type="primary" @click="onSubmit" class="submit-button">提交</el-button>
    <el-button type="primary" @click="checkAll" class="submit-button"> 全选</el-button>
    <el-button type="primary" @click="cancleAll" class="submit-button">取消</el-button>
  </div>
</template>

<script>
module.exports = {
  data() {
    return {
      devices: [],
      allDevices: ['device1', 'device2', 'device3', 'device4']
    };
  },

  methods: {
    onSubmit: function(){
      console.log('devices:', this.devices);
    },

    checkAll: function(){
      this.devices = this.allDevices.map((device) => device);
      console.log('devices:', this.devices);
    },

    cancleAll: function(){
      this.devices = [];
      console.log('devices:', this.devices);
    }
  }
};
</script>

<style scoped>
.checkbox-style {
  margin: 30px 0px 0px 150px;
  width: 700px;
}

.submit-button {
  
  margin-top: 10px;
}
</style>