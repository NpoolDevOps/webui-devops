<template>
  <div>
    <el-menu
      class="el-menu-vertical"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      background-color="#324157"
      :default-active="defaultActiveMenuIndex"
      :collapse="collapsed"
      @select="onMenuSelected"
      router
    >
      <el-submenu
        v-for="(submenu1, index1) in menus"
        :key="index1"
        :index="'/device/' + index1"
      >
        <template slot="title">
          <i :class="submenu1.icon"></i>
          <span slot="title">{{ $t(submenu1.title) }}</span>
        </template>
        <el-submenu
          v-for="(submenu2, index2) in submenu1.submenus"
          :key="index2"
          :index="'/device/' + index1 + indexSeparator + index2"
        >
          <span slot="title">{{ $t(submenu2.title) }}</span>
          <el-menu-item
            v-for="(submenu3, index3) in submenu2.submenus"
            :key="index3"
            :index="
              '/device/' + index1 + indexSeparator + index2 + indexSeparator + index3
            "
          >
            <span v-if="submenu2.title === 'sideBar.group1'">{{
              $t(submenu3.title)
            }}</span>
            <span v-else>{{ submenu3.title }}</span>
          </el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="/user/setting">
        <i class="el-icon-location"></i>
        <span slot="title">{{ $t("sideBar.settings") }}</span>
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
          title: "sideBar.oc",
          icon: "el-icon-location",
          path: "/home",
          clazz: constants.MenuClassDevops,
          submenus: [
            {
              title: "sideBar.minerList",
              path: "/home/miner",
              clazz: constants.MenuSubClassMinerDeviceList,
              submenus: [],
            },
            {
              title: "sideBar.gatewayList",
              path: "/home",
              clazz: constants.MenuSubClassGatewayDeviceList,
              submenus: [],
            },
          ],
        },
        {
          title: "sideBar.navigation2",
          icon: "el-icon-location",
          path: "/home",
          submenus: [
            {
              title: "sideBar.group1",
              path: "/group",
              submenus: [
                {
                  title: "sideBar.option1",
                  path: "/group/item",
                },
                {
                  title: "sideBar.option2",
                  path: "/group/item",
                },
              ],
            },
          ],
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
      var self = this;
      var items = [];
      
      if (index === "0") {
        let menu = self.menus[0];
        items.push({
          title: menu.title,
          path: menu.path,
          param: index,
        });
      } else if (index === "/user/setting") {
        items.push({
          title: "sideBar.settings",
          path: index,
          param: index,
        });
      }
       else {
        var arr = index.split("/");
        let newIndex = arr[1];
        this.$route.params.index = newIndex;
        let idxs = newIndex.split("-");
        if (0 < idxs.length) {
          let menu = this.menus[idxs[0]];
          items.push({
            title: menu.title,
            path: menu.path,
            param: "/device/" + idxs[0],
          });
        }
        if (1 < idxs.length) {
          let menu = this.menus[idxs[0]].submenus[idxs[1]];
          items.push({
            title: menu.title,
            path: menu.path,
            param: "/device/" + idxs[0] + self.indexSeparator + idxs[1],
          });
        }
        if (2 < idxs.length) {
          let menu = this.menus[idxs[0]].submenus[idxs[1]].submenus[idxs[2]];
          items.push({
            title: menu.title,
            path: index,
            param:
              "/device/" +
              idxs[0] +
              self.indexSeparator +
              idxs[1] +
              self.indexSeparator +
              idxs[2],
          });
        }
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
  created: function () {
    constants.EventBus.$on("on-menu-item-updated", this.onMenuItemUpdated);
    constants.EventBus.$on("on-menu-selected", this.onMenuSelected);
  },
  mounted: function () {
    this.onMenuSelected(this.defaultActiveMenuIndex);
  },
  beforeDestroy: function () {
    constants.EventBus.$off("on-menu-item-updated");
  },
};
</script>

<style scoped>
.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
}
</style>
