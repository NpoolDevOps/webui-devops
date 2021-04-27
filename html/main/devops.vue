<template>
<div class="devops">
  <devops-panel-list></devops-panel-list>
  <devops-all-list></devops-all-list>
</div>
</template>

<script>
module.exports = {
  components: {
    DevopsPanelList: httpVueLoader("devops-components/DevopsPanelList.vue"),
    DevopsAllList: httpVueLoader("devops-components/DevopsAllList.vue"),
  }
}
</script>
