<template>
<tree-miner-chart></tree-miner-chart>
</template>

<script>
module.exports = {
  components: {
    TreeMinerChart: httpVueLoader('../tool/Echarts/TreeMinerChart.vue'),
  }
}
</script>
