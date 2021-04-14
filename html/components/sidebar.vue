<template>
  <div>
    <el-menu
      class="el-menu-vertical"
      :default-active="defaultActiveMenuIndex"
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
          :index="index1 + indexSeparator + index2"
        >
          <span slot="title">{{ submenu2.title }}</span>
          <el-menu-item
            v-for="(submenu3, index3) in submenu2.submenus"
            :key="index3"
            :index="index1 + indexSeparator + index2 + indexSeparator + index3"
          >
            {{ submenu3.title }}
          </el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="100">
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
          title: '運維控制檯', icon: 'el-icon-location', path: '/', clazz: constants.MenuClassDevops,
          submenus: [
            { 
              title: '礦工列表', path: '/group', clazz: constants.MenuSubClassDeviceList,
              submenus: [],
            }
          ]
        }, {
          title: '導航二', icon: 'el-icon-location', path: '/',
          submenus: [
            {
              title: '分組一', path: '/group',
              submenus: [
                { title: '選項一', path: '/group/item' },
                { title: '選項二', path: '/group/item' }
              ]
            }
          ]
        }
      ]
    }
  },
  data() {
    return {
      indexSeparator: '-',
      defaultActiveMenuIndex: '0',
    }
  },
  methods: {
    onMenuSelected: function(index) {
      idxs = index.split(this.indexSeparator)
      var items = []
      if (0 < idxs.length) {
        let menu = this.menus[idxs[0]]
        items.push({
          title: menu.title,
          path: menu.path,
          param: menu.param,
        })
      }
      if (1 < idxs.length) {
        let menu = this.menus[idxs[0]].submenus[idxs[1]]
        items.push({
          title: menu.title,
          path: menu.path,
          param: menu.param,
        })
      }
      if (2 < idxs.length) {
        let menu = this.menus[idxs[0]].submenus[idxs[1]].submenus[idxs[2]]
        items.push({
          title: menu.title,
          path: menu.path,
          param: menu.param,
        })
      }
      this.$emit('on-menu-switched', {
        items: items
      })
    },
    onMenuItemUpdated: function(menu) {
      for (let i = 0; i < this.menus.length; i++) {
        if (menu.clazz == this.menus[i].clazz) {
          for (let k = 0; k < this.menus[i].submenus.length; k++) {
            if (menu.subclazz == this.menus[i].submenus[k].clazz) {
              this.menus[i].submenus = menu.submenus
              return
            }
          }
        }
      }
    }
  },
  created() {
    constants.EventBus.$on('on-menu-item-updated', this.onMenuItemUpdated)
  },
  mounted() {
    this.onMenuSelected(this.defaultActiveMenuIndex)
  }
}
</script>
<style scoped>
  .el-menu-vertical:not(.el-menu--collapse) {
    width: 200px;
  }
</style>