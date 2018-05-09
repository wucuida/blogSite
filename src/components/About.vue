<template>
<div>
  <el-row id="about">
    <el-col :span="18" :offset="3" >
      <el-card :body-style="{ padding: '0px', 'height': '500px' }">
        <el-row>
          <el-col :span="9" style="padding-top:12%">
            <div style="padding-left:40%">
              <img src="../assets/imgs/about_me.png" 
              style="height:100px;width:100px;border: 3px solid #ccc;border-radius:50%">
            </div>
            <div style="text-align:center;margin-top:5%">
            <i class="iconfont icon-github" style="padding-right:8px;cursor:pointer" @click="goGit"></i>
            <el-popover
              placement="bottom"
              width="150"
              trigger="hover"
              >
              <img src="../assets/imgs/my_weixin.jpg" style="height:150px;width:150px;">
              <i slot="reference" class="iconfont icon-weixin1" style="padding-right:8px">
              </i>
            </el-popover>
              
            
            <i class="iconfont icon-icon-zhihu"></i>
            </div>
            
          </el-col>
          <el-col :span="15" style="padding-top:8%;padding-right:5%">
            <div>
              <div><h3>About me</h3></div>
              <div>
                <ul>
                  <li>我可以360°不要脸的宅，也可以72小时不回家的浪</li>
                  <li>身在前端，心在后台，梦在AI</li>
                  <li>邮箱：727438548@qq.com</li>
                </ul>
              </div>
            </div>
            <div>
              <div><h3>About blog</h3></div>
              <div>自从2015年参加工作，记录了不少零零散散的东西，但缺少系统性的整理，希望能通过博客将零散的知识整理起来。也希望通过博客记录自己学习的历程，作为以后的反思材料。考虑到大部分博客都不适合自己，于是有了做自己博客的打算，结合自己的知识栈，于是本博客于2018年诞生了。</div>
            </div>
          </el-col>
        </el-row>
        
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
import "../assets/css/iconfont.css"
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
    goGit() {
      window.open("https://github.com/wucuida")
    }
  },
  created() {
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
