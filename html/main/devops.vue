<template>
<div class="devops">
  <devops-panel-list></devops-panel-list>
  <devops-all-list></devops-all-list>
</div>
</template>

<script>
module.exports = {
  components: {
    DevopsPanelList: httpVueLoader("../main/devopscomponents/DevopsPanelList.vue"),
    DevopsAllList: httpVueLoader("../main/devopscomponents/DevopsAllList.vue"),
  }
}
</script>

<style scoped>
  .devops {
    background-color: rgb(245, 245, 245);
  }
</style>
