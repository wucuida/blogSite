<template>
<el-card class="box-card" style="margin-bottom:10px">
  <div slot="header" class="clearfix">
    <span style="cursor:pointer;font-size:larger" @click="getArticeContent">
      {{article.title}}
    </span>
    <el-button style="float: right; padding: 3px 0" type="text"
      @click="getArticeContent">
      Read More
    </el-button>
    <div style="padding-top:3px">
      <el-tag :size="'mini'" v-for="tag in tags" :key="tag">Flask</el-tag>
      <el-tag :size="'mini'" type="info">2015-03-13</el-tag>
    </div>
  </div>
  <div >
    {{ article.summary}}...
  </div>
</el-card>
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
    getArticeContent() {
      this.$router.push({'name': 'article', params: {'articleId': this.article.id}})
    },
  }
}
</script>
<style type="text/css" scope>
  .el-card__header{
    padding: 18px 20px 5px 20px;
  }
</style>
