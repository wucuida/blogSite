<template>
<div>
  <el-main style="min-height:1000px;padding:80px 15% 0 15%;">
    <transition-group name="el-zoom-in-top">   
      <article-item v-for="i in tt" :key="i"></article-item>
    </transition-group> 
  </el-main>
  <el-footer>
    <el-pagination
      background
      layout="prev, pager, next"
      style="text-align:center"
      :total="1000">
    </el-pagination>
  </el-footer>
</div>
</template>
<script>
import ArticleItem from "./ArticleItem"
export default {
  data() {
    return {
      tt: 0,
      content: "",
    }
  },
  components: {
    ArticleItem
  },
  created() {
    setTimeout(() => {
      this.tt = 3
      let converter = new showdown.Converter({'tables':true});
      let t = '数据结构定义 \n'+
        '| 字段 | 类型 | 必须 | 备注 | \n'+
        '|------|------|------|------| \n'+
        '| id | String | - | 文章标识，创建时间时间戳_4位随机数的格式 | \n'+
        '| title | String | true | 文章标题 |\n'+
        '| createTime | Long | true | 文章创建时间 | \n'+
        '| updateTime | Long | true | 文章更新时间 | \n'+
        '| location | String | true | 文章地址 |'
      let html = converter.makeHtml(t);
      this.content = html
    }, 1000)
  }
}
</script>