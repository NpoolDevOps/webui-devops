<template>
  <div>
    <el-menu
      class="el-menu-vertical"
      default-active="1-1-1"
      :collapse="collapsed"
      @select="onMenuSelected"
    >
      <el-submenu
        v-for="(submenu1, index1) in menus"
        :key="index1"
        :index="index1"
      >
        <template slot="title">
          <i :class="submenu1.icon"></i>
          <span slot="title">{{ submenu1.title }}</span>
        </template>
        <el-submenu
          v-for="(submenu2, index2) in submenu1.submenus"
          :key="index2"
          :index="index1 + '-' + index2"
        >
          <span slot="title">{{ submenu2.title }}</span>
          <el-menu-item
            v-for="(submenu3, index3) in submenu2.submenus"
            :key="index3"
            :index="index1 + '-' + index2 + '-' + index3"
          >
            {{ submenu3.title }}
          </el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item>
         <i class="el-icon-location"></i>
        <span slot="title">設置</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
module.exports = {
  props: {
    collapsed: {
      default: false,
    },
    menus: {
      default: [
        { 
          title: "導航一", icon: "el-icon-location",
          submenus: [
            { 
              title: "分組一",
              submenus: [
                { title: "選項一" },
                { title: "選項二" },
                { title: "選項三" }
              ]
            }
          ]
        }, {
          title: "導航二", icon: "el-icon-location",
          submenus: [
            {
              title: "分組一",
              submenus: [
                { title: "選項一" },
                { title: "選項二" }
              ]
            }
          ]
        }
      ]
    }
  },
  methods: {
    onMenuSelected: function(menu) {
      console.log(menu)
    }
  }
}
</script>