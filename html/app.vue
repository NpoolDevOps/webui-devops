<template>
    <div class="app-main">
        <el-row type="flex">
            <el-col>
                <mysidebar
                    :collapsed="sidebarCollapsed"
                    @on-menu-switched="onMenuSwitched">
                </mysidebar>
            </el-col>
            <el-col>
                <myheader
                    @on-header-icon-click="onHeaderIconClick"
                    :collapsed="sidebarCollapsed"
                    :parameter="menuParam">
                </myheader>
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
            menuParam: {},
        }
    },
    methods: {
        onHeaderIconClick: function() {
            this.sidebarCollapsed = !this.sidebarCollapsed
        },
        onMenuSwitched: function(param) {
            this.menuParam = param
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