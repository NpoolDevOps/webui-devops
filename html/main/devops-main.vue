<template>
    <div class="devops-main">
        <el-row>
            <el-col :span="2">
                <devopssidebar></devopssidebar>
            </el-col>
            <el-col :span="22">
                <devopsframe></devopsframe>
            </el-col>
        </el-row>
    </div>
</template>
<script>
module.exports = {
    components: {
        'devopssidebar': httpVueLoader('../sidebar/devops-sidebar.vue'),
        'devopsframe': httpVueLoader('../devops/devops-frame.vue')
    }
}
</script>
<style scoped>
.devops-main {
    width: 100%;
    height: 100%;
}
</style>