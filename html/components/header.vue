<template>
<div class="header-row">
  <div>
    <el-button class="hamburger-icon header-line-height" :icon="headerBreadIcon" @click="onHeaderIconClick">
    </el-button>
  </div>

  <div>
    <el-breadcrumb class="breadcrumb-style">
      <el-breadcrumb-item class="header-line-height" v-for="(item, index) in parameter.items" :key="index" :to="{ path: item.path }">
        <span v-if="index < 2">{{ $t(item.title) }}</span>
        <span v-else-if="item.title === 'sideBar.option1' || item.title === 'sideBar.option2'">{{$t(item.title)}}</span>
        <span v-else>{{item.title}}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>

  <div class="right-menu">
    <template>
      <screenfull id="screenfull" class="right-menu-item" />
    </template>

    <el-dropdown class="right-menu-item" trigger="click" @command="changeLanguage">
      <div>
        <i class="el-icon-s-tools"></i>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item :command="lang.value" v-for="lang in langs" :key="lang.value">{{lang.label}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <el-dropdown class="right-menu-item user-menu" trigger="click">
      <div class="user-head">
        <el-avatar class="user-head-img" size="medium"> user </el-avatar>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item divided @click.native="logout">
          <span style="display:block;">Log Out</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</div>
</template>

<script>
module.exports = {
  components: {
    screenfull: httpVueLoader('../tool/screenfull/screenfull.vue'),
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
      ],
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

      } else if (command === 1) {
        this.$i18n.locale = 'en';

      }
    },

    logout: function () {
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
.header-row {
  width: 100%;
  height: 50px;
  overflow: hidden;
  position: relative;
  background-color: transparent;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  display: inline-block;
}

.header-line-height {
  line-height: 40px;
}

.hamburger-icon {
  float: left;
  width: 40px;
  height: 40px;
  border: none;
  padding: 0px;
}

.breadcrumb-style {
  float: left;
}

.right-menu {
  float: right;
  height: 100%;
  line-height: 50px;
}

.right-menu-item {
  display: inline-block;
  padding: 0 8px;
  height: 100%;
  font-size: 18px;
  vertical-align: text-bottom;
}

.user-head {
  height: 100%;
  position: relative;
}

.user-head-img {
  cursor: pointer;
  margin-top: 7px;
}
</style>
