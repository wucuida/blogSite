<template>
<div>
  <div id="articleItems" :style="{'min-height': mainMinHeight + 'px'}">
    <transition-group name="el-zoom-in-top">
      <article-item v-for="article in articles"
        :key="article.id"
        :article="article">
      </article-item>
    </transition-group>
  </div>
  <el-footer>
    <el-pagination
      background
      layout="prev, pager, next"
      style="text-align:center;margin-top:10px"
      @current-change="refreshPage"
      :page-size="limit"
      :total="total">
    </el-pagination>
  </el-footer>
</div>
</template>
<script>
import ArticleItem from "./ArticleItem"
import Showdown from "showdown"
export default {
  props: {
    search: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      convertor: "",
      limit: 10,
      total: 1,
      articles: [],
    }
  },
  components: {
    ArticleItem,
  },
  computed: {
    mainMinHeight() {
      return document.documentElement.clientHeight - 60 - 90
    }
  },
  methods: {
    refreshPage(currentPage) {
      this.$http.get("/api/articles", {
        params: {
          limit: this.limit,
          cursor: (currentPage - 1) * this.limit,
          verbose: 100,
          title: this.search
        }
      }).then(rsp => {
        let rspData = rsp.data
        this.total = rspData.total
        this.articles = rspData.result
        console.log(this.articles, "this.articles")
      })
    }
  },
  beforeCreate() {
    this.convertor = new Showdown.Converter({tables: true});
  },
  created() {
    this.refreshPage(1)
    // let html = converter.makeHtml(t);
  }
}
</script>
<style type="text/css">
#articleItems .el-card__header{
    padding: 18px 20px 5px 20px;
  }
</style>
