<template>
  <div>
    <i :class="isFullscreen?'el-icon-zoom-out':'el-icon-zoom-in'" @click="click" />
  </div>
</template>

<script>
module.exports={
  name: 'Screenfull',
  data() {
    return {
      isFullscreen: false
    }
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    this.destroy()
  },
  methods: {
    click: function(){
      if (!screenfull.isEnabled) {
        this.$message({
          message: 'you browser can not work',
          type: 'warning'
        })
        return false
      }
      screenfull.toggle()
    },
    change: function(){
      this.isFullscreen = screenfull.isFullscreen
    },
    init: function(){
      if (screenfull.isEnabled) {
        screenfull.on('change', this.change)
      }
    },
    destroy: function(){
      if (screenfull.isEnabled) {
        screenfull.off('change', this.change)
      }
    }
  }
}
</script>

<style scoped>

</style>
