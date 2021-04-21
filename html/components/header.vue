<template>
<el-row class="header-color header-style">
  <div class="header-font">
    <el-col span="1" class="header-icon header-line-height">
      <el-button class="header-icon" :icon="headerBreadIcon" @click="onHeaderIconClick">
      </el-button>
    </el-col>
    <el-col span="10" class="header-nav" :span="10">
      <el-breadcrumb>
        <el-breadcrumb-item class="header-line-height" v-for="(item, index) in parameter.items" :key="index" :to="{ path: item.path }">
          {{ item.title }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="1" class="right-menu">
      <el-dropdown class="user-menu" trigger="click">
        <div class="user-head">
          <el-avatar size="medium"> user </el-avatar> 
        </div>
        <el-dropdown-menu slot="dropdown">

          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">Log Out</span>
          </el-dropdown-item>

        </el-dropdown-menu>
      </el-dropdown>
    </el-col>


    <el-col span="1" class="right-menu">
      <screenfull id="screenfull" class="right-menu-item" />
    </el-col>


    <el-col span="1" class="right-menu">
      <el-dropdown class="reight-menu-item" trigger="click" @command="changeLanguage">
        <div>
          <i class="el-icon-s-tools"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item :command="lang.value" v-for="lang in langs" :key="lang.value">{{lang.label}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
    
  </div>
</el-row>
</template>

<script>
module.exports = {
  components: {
    screenfull: httpVueLoader('./tool/screenfull.vue'),
  },

  data() {
    return {
      langs: [{
          label: this.$t('message.zh'),
          value: 0
        },
        {
          label: this.$t('message.en'), 
          value: 1
        }
      ]
    }
  },

  props: {
    headerBreadIcon: {
      type: String,
      default: "el-icon-back",
    },
    collpased: {
      default: false,
    },
    parameter: {
      default: {
        items: [],
      },
    },
  },

  methods: {
    onHeaderIconClick: function () {
      this.$emit("on-header-icon-click");
      this.collpased = !this.collpased;
    },
    onMenuSwitched: function (param) {
      console.log(param);
    },

    changeLanguage: function (command) {
      if (command === 0) {
          this.$i18n.locale = 'zh';
          console.log('now is zh');
          console.log(this.$i18n.locale);
        } else if (command === 1) {
          this.$i18n.locale = 'en';
          console.log('now is en');
          console.log(this.$i18n.locale);
        }
    },

    async logout(){
      alert("log out successfully!");
    }
  },

  computed: {
    headerBreadIcon: function () {
      return this.collpased ? "el-icon-right" : "el-icon-back";
    },
  },
};
</script>

<style scoped>
.header-line-height {
  line-height: 40px;
}

.header-style {
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  padding: 1px;
}

.header-color {
  background-color: transparent;
}

.header-icon {
  width: 40px;
  height: 40px;
  border: none;
  padding: 0px;
}

.header-nav {
  background-color: transparent;
  padding-left: 10px;
}

.right-menu {
  margin: 0%;
  float: right;
  line-height: 50px;
  height: 50px;
  width: 50px;
}

.right-menu-item {
  display: inline-block;
  font-size: 22px;
  color: #5a5e66;
}

.el-icon-s-tools {
  font-size: 22px;
}

.right-menu .right-menu-item .el-col-1 {
  float: right;
  width: 2.5%;
}

.el-icon-zoom-in,.el-avatar,.el-icon-s-tools {
  margin: 8px;
}

.user-head {
  line-height: 50px;
  height: 50px;
  width: 50px;
}
</style>
