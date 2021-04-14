<template>
    <div class="app-main">
        <el-row>
            <el-col :span="2">
                <mysidebar></mysidebar>
            </el-col>
            <el-col :span="22">
                <myheader></myheader>
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
    }
}
</script>
<style scoped>
.app-main {
    width: 100%;    
    height: 100%;
}
</style>