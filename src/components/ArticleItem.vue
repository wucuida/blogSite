<template>
<el-row>
  <el-col :span="18" :offset="3">
    <el-card class="box-card" style="margin-bottom:10px">
      <div slot="header" class="clearfix">
        <span style="cursor:pointer;font-size:larger" @click="getArticleContent">
          {{article.title}}
        </span>
        <el-button style="float: right; padding: 3px 0" type="text"
          @click="getArticleContent">
          Read More
        </el-button>
        <div style="padding-top:3px">
          <el-tag :size="'mini'" v-for="tag in tags" :key="tag">{{tag}}</el-tag>
          <el-tag :size="'mini'" type="info"
            style="color:#ccc;border: 0; background-color:#fff">
            <i class='el-icon-date'> 2015-03-13</i>
          </el-tag>
        </div>
      </div>
      <div >
        {{ article.summary}}...
      </div>
    </el-card>
  </el-col>
</el-row>
</template>
<script>
export default {
  props: {
    article: {
      type: Object,
      default: () => {
        return {
          id: "",
          title: "",
          createTime: "",
          summary: ""
        }
      }
    },
    tags: {
      type: Array,
      default: () => []
    }
  },
	data() {
		return {
		}
	},
  methods: {
    getArticleContent() {
      this.$router.push({'name': 'article', params: {'articleId': this.article.id}})
    },
  }
}
</script>
<style type="text/css" >
</style>
