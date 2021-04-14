<template>
    <div class="header-color">
        <el-row>
            <el-col class="header-icon header-line-height">
                <el-button
                    class="header-icon"
                    :icon="headerBreadIcon"
                    @click="onHeaderIconClick">
                </el-button>
            </el-col>
            <el-col class="header-nav" :span="10">
                <el-breadcrumb>
                    <el-breadcrumb-item
                        class="header-line-height"
                        v-for="(item, index) in parameter.items"
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
            default: 'el-icon-back',
        },
        collpased: {
            default: false,
        },
        parameter: {
            default: {
                items: [],
            },
        }
    },
    methods: {
        onHeaderIconClick: function() {
            this.$emit('on-header-icon-click')
            this.collpased = !this.collpased
        },
        onMenuSwitched: function(param) {
            console.log(param)
        }
    },
    computed: {
        headerBreadIcon: function() {
            return this.collpased ? 'el-icon-right' : 'el-icon-back'
        }
    },
}
</script>
<style scoped>
.header-line-height {
    line-height: 40px;
}
.header-color {
    background-color: transparent;
}
.header-icon {
    width: 40px;
    height: 40px;
    border: none;
    padding: 0;
}
.header-nav {
    background-color: transparent;
}
</style>