<template>
<el-row type="flex" justify="center">
  <el-col :span="18" :xs="24">
    <el-card class="box-card" style="margin-bottom:10px">
      <div slot="header" class="clearfix">
        <span style="cursor:pointer;font-size:larger" @click="getArticleContent">
          {{article.title}}
        </span>
        <el-button style="float: right; padding: 3px 5px" type="text"
          @click="getArticleContent">
          Read More
        </el-button>
        <el-row style="padding-top:3px">
          <el-col :span="8" :xs="24">
            <el-tag :size="'mini'" v-for="tag in article.tags"
              style="margin-right:5px"
              :key="tag.id">
              {{tag.name}}
            </el-tag>
          </el-col>
          <el-col :span="2" :offset="article.tags.length>0? 14: 22"
            :class="'hidden-sm-and-down'">
            <el-tag :size="'mini'" type="info"
              style="color:#ccc;border: 0; background-color:#fff;float:right">
              <i class='el-icon-date'> {{createTime}}</i>
            </el-tag>
          </el-col>
        </el-row>
      </div>
      <div >
        {{ article.summary}}...
      </div>
    </el-card>
  </el-col>
</el-row>
</template>
<script>
import {dateFormat} from "@/util/date_format.js"
export default {
  props: {
    article: {
      type: Object,
      default: () => {
        return {
          id: "",
          title: "",
          create_time: "",
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
  computed: {
    createTime() {
      return dateFormat(new Date(this.article.create_time), "yyyy-MM-dd")
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
