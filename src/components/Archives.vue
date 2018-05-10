<template>
<div>
  <el-row :style="{'min-height': mainMinHeight + 'px'}"
    element-loading-text="Loading..."
    id="archives" v-loading="loading">
    <el-col :span="8" :offset="8">
      <el-steps :active="13" direction='vertical' :space="'150px'"
        :finish-status="'process'">
        <el-step title="Today" description="" icon='el-icon-date' :key="-1"></el-step>
        <el-step v-for="(item,k) in monthArticles"
          icon='el-icon-date'
          :key="k">
          <div slot="title">{{year}}年{{item[0]}}月</div>
          <div slot="description">
              <div v-for="doc in item[1]"
                :key="doc.id"
                @click="readArticle(doc)"
                class="archives_article_desc">
                <i class='el-icon-view'></i>
                <span >{{doc.title}}</span>
              </div>
          </div>
        </el-step>
      </el-steps>
    </el-col>
  </el-row>
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
export default {
  props: {
    search: {
      type: String,
      default: ""
    }
  },
  data() {
    let date = new Date()
    return {
      limit: 10,
      total: 1,
      articles: [],
      monthArticles: [],
      now: date,
      currentPage: 1,
      loading: false
    }
  },
  components: {
  },
  computed: {
    mainMinHeight() {
      return document.documentElement.clientHeight - 60 - 90
    },
    year() {
      return this.now.getFullYear() - this.currentPage + 1
    }
  },
  methods: {
    refreshPage(currentPage) {
      this.loading = true
      this.currentPage = currentPage
      this.$http.get("/api/articles", {
        params: {
          limit: this.limit,
          cursor: (currentPage - 1) * this.limit,
          verbose: 30,
          startTime: parseInt((new Date(this.year, 0, 1))/1000),
          endTime: parseInt((new Date())/1000)
        }
      }).then(rsp => {
        let rspData = rsp.data
        if(rspData.result) {
          this.total = rspData.total
          this.articles = rspData.result
          this.doArchive()
        }else{
          this.$message({
            'type': 'error',
            'message': '归档出错'
          })
        }
        this.loading = false
      })
    },
    doArchive() {
      let monthMap = {}
      let monthArticles = []
      this.articles.forEach(article => {
        let month = new Date(parseInt(article.create_time)*1000).getMonth() + 1 + ''
        if(monthMap[month]){
          monthMap[month].push(article)
        }else {
          monthMap[month] = [article]
        }
      })
      for(let month in monthMap){
        monthArticles.unshift([month, monthMap[month]])
      }
      this.monthArticles = monthArticles.sort((a,b) => b[0] - a[0])
    },
    readArticle(article) {
      this.$router.push({'name': 'article', params: {'articleId': article.id}})
    }
  },
  created() {
    this.refreshPage(1)
    // let html = converter.makeHtml(t);
  }
}
</script>
<style type="text/css">
#archives .archives_article_desc:hover {
  cursor: pointer;
  color: #42B983;
  font-size: larger;
}
#archives .el-step.is-vertical .el-step__title {
  color: #42B983;
}
#archives .el-step__icon {
  color: #42B983;
}
</style>
