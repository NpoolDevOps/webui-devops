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
  padding: 0;
}

.header-nav {
  background-color: transparent;
  padding-left: 10px;
}

.right-menu {
  float: right;
  height: 100%;
  line-height: 50px;
}

.right-menu-item {
  display: inline-block;
  font-size: 22px;
  color: #5a5e66;
}

.el-icon-s-tools {
  font-size: 22px;
}

.el-col-1 {
  text-align: center;
  width: 2.5%;
}
</style>
