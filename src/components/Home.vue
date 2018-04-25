<template>
<el-container id="home">
  <el-header :class="headerCls">
    <el-row>
      <el-col :span="13">
      <img src="../assets/logo.png" style="height:45px;float:left;padding-right:1%;padding-top:9px">
      <span style="color: #aaa;height: 60px;line-height: 60px;font-weight: bold;">Vue</span>
      </el-col>
      <el-col :span="4" style="padding-right:1%">
        <el-input
          :class="'hidden-sm-and-down'"
          style="height:60px;line-height:60px"
          :size="'small'"
          placeholder="请输入内容"
          suffix-icon="el-icon-search"
          v-model="searchContent">
        </el-input>
      </el-col>
      <el-col :span="7" >
      <el-menu
        :class="'hidden-sm-and-down'"
        :default-active="activeIndex2"
        style="font-weight:bolder"
        mode="horizontal"
        active-text-color="#42B983"
        @select="handleSelect">
        <el-menu-item index="1">Home</el-menu-item>
        <el-menu-item index="2">Tags</el-menu-item>
        <el-menu-item index="3">Archives</el-menu-item>
        <el-menu-item index="4">Manager</el-menu-item>
      </el-menu>
      </el-col>
    </el-row>
  </el-header>
  <article-list></article-list>
</el-container>
</template>
<script>
import 'element-ui/lib/theme-chalk/display.css';
import ArticleList from "./ArticleList"
export default {
  data() {
    return {
      a: true,
      tt: 0,
      activeIndex: '1',
      activeIndex2: '1',
      headerCls: ["header-top",],
      searchContent: ""
    }
  },
  components: {
    ArticleList
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    test() {

    }
  },
  created() {
    setTimeout(() => {
      this.tt = 3
    }, 1000)
  }
}
</script>
<style>
.header-top {
  width: 100%;
  box-shadow: 0 0 3px rgba(14,14,14,0.26);
  position: fixed;
  background-color: #fff
}
#home .el-input__inner {
  border-radius: 20px;
}
</style>
