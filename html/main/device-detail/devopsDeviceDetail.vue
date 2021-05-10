<template>
<div class="detail-card-style">
  <span class="title-style">device number</span>
  <el-card class="card-style">
    <span>设备概览</span>
    <div class="device-style">
      <div class="div-device-fee">
        <span>账户余额：10000</span><br />
        <span>可用余额</span><br />
        <span>扇区抵押</span><br />
        <!--下方插入折线图直观展示fee变化-->
      </div>

      <div class="div-device-power">
        <span>有效算力</span><br />
        <span>设备状态</span>
        <!--下方插入折线图直观展示power变化-->
      </div>
    </div>
  </el-card>
    
  <el-card class="card-style">
    <span>统计</span>
    <div class="device-style">
      <ul>
        <li v-for="i in 4">{{i}}</li>
      </ul>
    </div>
  </el-card>

  <el-card class="card-style">
    <span>账户信息</span>
    <div class="device-style">
      <ul>
        <li v-for="i in 4">{{i}}</li>
      </ul>
    </div>
  </el-card>
</div>
</template>

<script>
module.exports = {

}
</script>

<style scoped>
.detail-card-style {
  margin: 20px;
}

.title-style {
  font-size: 18px;
  border-bottom: 1px solid gray;
}

.card-style {
  margin-top: 30px;
}

.device-style {
  display: flex;
  flex-direction: row;
  padding: 10px;
  margin: 20px;
}

.div-device-fee {
  box-shadow: 10px 10px 40px rgba(0, 0, 0, 0.1);
  width: 750px;
}

.div-device-power {
  box-shadow: 10px 10px 40px rgba(0, 0, 0, 0.1);
  width: 750px;
  margin-left: 60px;
}
</style>
