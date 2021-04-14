<template>
    <div class="header-color">
        <el-row>
            <el-col class="header-icon header-line-height">
                <el-icon :class="headerBreadIcon"></el-icon>
            </el-col>
            <el-col class="header-nav" :span="10">
                <el-breadcrumb>
                    <el-breadcrumb-item
                        class="header-line-height"
                        v-for="(item, index) in paths"
                        :key="index"
                        :to="{path: item.path}">
                        {{ item.title }}
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
            <el-col>
            </el-col>
        </el-row>
    </div>
</template>
<script>
module.exports = {
    props: {
        headerBreadIcon: {
            type: String,
            default: 'el-icon-help',
        },
        paths: {
            default: [
                {
                    title: '主頁',
                    path: '/',
                }, {
                    title: '運維控制檯',
                    path: '/devops',
                }, {
                    title: '192.168.50.112',
                    path: '/devops/detail',
                }
            ],
        }
    }
}
</script>
<style scoped>
.header-line-height {
    line-height: 25px;
}
.header-color {
    background-color: transparent;
}
.header-icon {
    width: 25px;    
    height: 25px;
    margin-left: 10px;
}
.header-nav {
    background-color: transparent;
}
</style>