<template>
  <div id="app">
    <el-container >
      <el-header :class="headerCls" id="index">
        <el-row>
          <el-col :span="13">
          <img src="./assets/logo.png" style="height:45px;float:left;padding-right:1%;padding-top:9px">
          <span style="color: #aaa;height: 60px;line-height: 60px;font-weight: bold;">Vue</span>
          </el-col>
          <el-col :span="4" style="padding-right:1%">
            <el-input
              :class="'hidden-sm-and-down'"
              style="height:60px;line-height:60px"
              :size="'small'"
              placeholder="搜索文章"
              suffix-icon="el-icon-search"
              v-model="searchContent">
            </el-input>
          </el-col>
          <el-col :span="7" >
          <el-menu
            :class="'hidden-sm-and-down'"
            :default-active="activeIndex"
            style="font-weight:bolder"
            mode="horizontal"
            active-text-color="#42B983"
            @select="handleSelect">
            <el-menu-item index="home">Home</el-menu-item>
            <el-menu-item index="archives">Archives</el-menu-item>
            <el-menu-item index="about">About</el-menu-item>
            <el-menu-item index="manage">Manage</el-menu-item>
          </el-menu>
          </el-col>
        </el-row>
      </el-header>
      <el-main :style="{'height': mainHeight + 'px', 'padding': '20px 20px 0 20px'}">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/display.css';
export default {
  name: 'app',
  data() {
    return {
      activeIndex: 'home',
      headerCls: ["header-top",],
      searchContent: ""
    }
  },
  computed: {
    mainHeight() {
      return  document.documentElement.clientHeight - 60
    }
  },

  methods: {
    handleSelect(route, routePath) {
      this.$router.push({ path: `/${route}` })
    },
  },
  created() {
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0
}
.header-top {
  width: 100%;
  box-shadow: 0 0 3px rgba(14,14,14,0.26);
  background-color: #fff;
  z-index: 999;
}
.el-input__inner {
  border-radius: 20px;
}

/*#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}*/
</style>
