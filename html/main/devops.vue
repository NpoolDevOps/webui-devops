<template>
<div class="devops">
  <panellist></panellist>
  <cardlist></cardlist>
</div>
</template>

<script>
module.exports = {
  components: {
    panellist: httpVueLoader("./devops-components/devops-panel-list.vue"),
    cardlist: httpVueLoader("./devops-components/devops-all-list.vue"),
  }
}
</script>
