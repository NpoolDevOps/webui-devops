<template>
<div class="app-main">
  <el-row type="flex">
    <div class="el-col">
      <mysidebar :collapsed="sidebarCollapsed" @on-menu-switched="onMenuSwitched">
      </mysidebar>
    </div>
    <el-col>
      <myheader @on-header-icon-click="onHeaderIconClick" :collapsed="sidebarCollapsed" :parameter="menuParam">
      </myheader>
      <router-view></router-view>
    </el-col>
  </el-row>
  <div id="miit-beian">
    <img src="./res/police.png" />
    <a href="https://beian.miit.gov.cn/" target="_blank">备案号</a>
    <a href="https://beian.miit.gov.cn/" target="_blank">沪ICP备2021006061号</a>
  </div>

  <el-backtop target=".app-main"><i class="el-icon-caret-top"></el-backtop>
</div>
</template>

<script>
module.exports = {
  components: {
    mysidebar: httpVueLoader("components/sidebar.vue"),
    myheader: httpVueLoader("components/header.vue"),
  },
  data() {
    return {
      sidebarCollapsed: false,
      menuParam: {},
    };
  },
  methods: {
    onHeaderIconClick: function () {
      this.sidebarCollapsed = !this.sidebarCollapsed;
    },
    onMenuSwitched: function (param) {
      this.menuParam = param;
    },
  },
};
</script>

<style scoped>
.app-main {
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
}

.app-sidebar {
  max-width: 200px;
}

#miit-beian {
  height: 20px;
  position: fixed;
  bottom: 0;
  right: 50%;
  color: grey;
}

#miit-beian a {
  color: grey;
  font-size: 12px;
}

#miit-beian img {
  width: 16px;
  height: 16px;
  padding-top: 3px;
}

#miit-beian a:link {
  text-decoration: none;
}
</style>
