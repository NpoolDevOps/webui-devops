<template>
    <div class="app-main">
        <el-row>
            <el-col :span="2">
                <mysidebar ref="mySidebar" :collapsed="sidebarCollapsed"></mysidebar>
            </el-col>
            <el-col :span="22">
                <myheader @on-header-icon-click="onHeaderIconClick"></myheader>
                <router-view></router-view>
            </el-col>
        </el-row>
    </div>
</template>
<script>
module.exports = {
    components: {
        'mysidebar': httpVueLoader('components/sidebar.vue'),
        'myheader': httpVueLoader('components/header.vue'),
    },
    data() {
        return {
            sidebarCollapsed: false,
        }
    },
    methods: {
        onHeaderIconClick: function() {
            this.sidebarCollapsed = !this.sidebarCollapsed
        }
    }
}
</script>
<style scoped>
.app-main {
    width: 100%;    
    height: 100%;
}
</style>