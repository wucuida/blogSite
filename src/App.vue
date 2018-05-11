<template>
  <div id="app">
    <el-container >
      <el-header :class="headerCls" id="index">
        <el-row>
          <el-col :span="14" :xs="17">
          <img src="./assets/imgs/logo.png" style="height:45px;float:left;padding-right:1%;padding-top:9px">
          <span style="color: #aaa;height: 60px;line-height: 60px;font-weight: bold;">WUCD</span>
          </el-col>
          <el-col :span="5" :xs="0" style="padding-right:1%">
            <el-input
              :class="'hidden-sm-and-down'"
              style="height:60px;line-height:60px"
              :size="'small'"
              placeholder="搜索文章"
              suffix-icon="el-icon-search"
              @keyup.native.enter="searchArticle"
              v-model="searchContent">
            </el-input>
          </el-col>
          <el-col :span="5" :xs="7">
            <div :class="{'phone-menu-icon': !isPc}" id="phone-menu">
              <el-button
                :class="'hidden-sm-and-up'"
                @click="show=!show"
                icon="el-icon-menu" type="text">
              </el-button>
            </div>
            <el-menu
                ref='menu'
                :mode="isPc?'horizontal':'vertical'"
                :default-active="activeIndex"
                :style="{'font-weight':'bolder', 'display': (isPc||show)?'':'none'}"
                active-text-color="#42B983"
                @select="handleSelect">
                <el-menu-item index="home">Home</el-menu-item>
                <el-menu-item index="archives">Archives</el-menu-item>
                <el-menu-item index="about">About</el-menu-item>
                <!-- <el-menu-item index="manage">Manage</el-menu-item> -->
              </el-menu>
          </el-col>
        </el-row>
      </el-header>
      <el-main :style="{'height': mainHeight + 'px', 'padding': '20px 20px 0 20px'}">
        <router-view ref="view" @home="goHome" :search="searchContent"></router-view>
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
      headerCls: ["header-top",],
      searchContent: "",
      show: false
    }
  },
  computed: {
    mainHeight() {
      return  document.documentElement.clientHeight - 60
    },
    activeIndex() {
      let active = this.$route.meta.activeName
      if(active){
        return active
      }
      return 'home'
    },
    isPc() {
      return screen.width > 768
    }
  },

  methods: {
    goHome() {
      this.$refs.menu.activeIndex = 'home'
    },
    handleSelect(route, routePath) {
      this.show = false
      this.$router.push({ path: `/${route}` })
    },
    searchArticle() {
      console.log(this.$route, "header route")
      if(this.$route.name == "home"){
        this.$refs.view.refreshPage(1)
      }else {
        this.$router.push({path: '/home'})
      }
    }
  },
  created() {
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-size: 14px;
  line-height: 1.6;
  color: #516272;
}
.header-top {
  width: 100%;
  box-shadow: 0 0 3px rgba(14,14,14,0.26);
  background-color: #fff;
  z-index: 999;
}
#app .el-input__inner {
  border-radius: 20px;
}
#phone-menu .el-icon-menu {
  font-size: large;
}
.phone-menu-icon {
  text-align:right;
  padding-top:7%;
  font-size:20px
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
