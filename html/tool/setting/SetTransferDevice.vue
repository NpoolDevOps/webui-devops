<template>
  <div>
    <el-transfer v-model="value" :data="devices" class="transfer-style" :titles="['所有设备', '问题设备']">
    </el-transfer>
    <el-button @click="onValue">查看Value</el-button>
  </div>
</template>

<script>
module.exports = {
  data() {
    const generateData = (_) => {
      const data = [];
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `备选项 ${i}`,
          // deviceNum: i.toString(),
        });
      }
      return data;
    };
    return {
      devices: generateData(),
      value: [1, 4], //每一个data的key
    };
  },

  methods: {
    onValue: function () {
      console.log("value:", this.value);
    },
  },
};
</script>

<style scoped>
.transfer-style {
  margin: 30px 0px 0px 150px;
}
</style>