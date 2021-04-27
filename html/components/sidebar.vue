<template>
<div>
  <el-menu class="el-menu-vertical" text-color="#bfcbd9" active-text-color="#20a0ff" background-color="#324157" :default-active="defaultActiveMenuIndex" :collapse="collapsed" @select="onMenuSelected" router>
    <el-submenu v-for="(submenu1, index1) in menus" :key="index1" :index="index1">
      <template slot="title">
        <i :class="submenu1.icon"></i>
        <span slot="title">{{ submenu1.title }}</span>
      </template>
      <el-submenu v-for="(submenu2, index2) in submenu1.submenus" :key="index2" :index="index1 + indexSeparator + index2">
        <span slot="title">{{ submenu2.title }}</span>
        <el-menu-item v-for="(submenu3, index3) in submenu2.submenus" :key="index3" :index="index1 + indexSeparator + index2 + indexSeparator + index3">
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
      default: [{
          title: "運維控制檯",
          icon: "el-icon-location",
          path: "/",
          clazz: constants.MenuClassDevops,
          submenus: [{
              title: "礦工列表",
              path: "/",
              clazz: constants.MenuSubClassMinerDeviceList,
              submenus: [],
            },
            {
              title: "網關列表",
              path: "/",
              clazz: constants.MenuSubClassGatewayDeviceList,
              submenus: [],
            }
          ],
        },
        {
          title: "導航二",
          icon: "el-icon-location",
          path: "/",
          submenus: [{
            title: "分組一",
            path: "/group",
            submenus: [{
                title: "選項一",
                path: "/group/item",
              },
              {
                title: "選項二",
                path: "/group/item",
              },
            ],
          }, ],
        },
      ],
    },
  },
  data() {
    return {
      indexSeparator: "-",
      defaultActiveMenuIndex: "0",
    };
  },
  methods: {
    onMenuSelected: function (index) {
      idxs = index.split(this.indexSeparator);
      var items = [];
      if (0 < idxs.length) {
        let menu = this.menus[idxs[0]];
        items.push({
          title: menu.title,
          path: menu.path,
          param: menu.param,
        });
      }
      if (1 < idxs.length) {
        let menu = this.menus[idxs[0]].submenus[idxs[1]];
        items.push({
          title: menu.title,
          path: menu.path,
          param: menu.param,
        });
      }
      if (2 < idxs.length) {
        let menu = this.menus[idxs[0]].submenus[idxs[1]].submenus[idxs[2]];
        items.push({
          title: menu.title,
          path: '/' + index,
          param: menu.param,
        });
      }
      this.$emit("on-menu-switched", {
        items: items,
      });
    },
    onMenuItemUpdated: function (menu) {
      var myMenus = this.menus.map((menu) => menu);
      for (let i = 0; i < myMenus.length; i++) {
        if (menu.clazz == myMenus[i].clazz) {
          for (let k = 0; k < myMenus[i].submenus.length; k++) {
            if (menu.subclazz == myMenus[i].submenus[k].clazz) {
              myMenus[i].submenus[k].submenus = menu.menu.submenus;
              this.menus = myMenus;
              return;
            }
          }
        }
      }
    },
  },
  created() {
    constants.EventBus.$on("on-menu-item-updated", this.onMenuItemUpdated);
  },
  mounted() {
    this.onMenuSelected(this.defaultActiveMenuIndex);
  },
  beforeDestroy() {
    constants.EventBus.$off("on-menu-item-updated");
  },
};
</script>

<style scoped>
.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;

}
</style>
