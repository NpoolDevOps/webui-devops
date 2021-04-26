<template>
<div class="devops">
  <devops-panel-list></devops-panel-list>
  <devops-all-list></devops-all-list>
</div>
</template>

<script>
module.exports = {
  components: {
    devopsPanelList: httpVueLoader("./devops-components/devopsPanelList.vue"),
    devopsAllList: httpVueLoader("./devops-components/devopsAllList.vue"),
  }
}
</script>
