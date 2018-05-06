<template>
<div>
  <el-row id="about">
    <el-col :span="18" :offset="3">
      <el-card :body-style="{ padding: '0px' }">
        <img style="width:100%;height:100%" src="http://bpic.588ku.com//element_origin_min_pic/17/10/08/91780fabd605243830f9ffab17154dfd.jpg!r650" class="image">
        <!-- <div style="padding: 14px;">
          <span>小小程序猿</span>
          <div class="bottom clearfix">
            
            <time class="time">2018-4-12</time>
            <el-button type="text" class="button">操作按钮</el-button>
          </div>
        </div> -->
      </el-card>
    </el-col>
  </el-row>
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
      console.log(this.monthArticles)
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
