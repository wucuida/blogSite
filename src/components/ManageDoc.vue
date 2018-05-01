<template>
<el-main>
  <el-row style="margin-bottom:12px">
    <el-col :span="5" >
      <el-input placeholder='文章标题' size="mini" suffix-icon="el-icon-search">
      </el-input>
    </el-col>
    <el-col :span="2" :offset="17">
      <el-button type="primary" round size="mini" @click="addArticle">新增</el-button>
    </el-col>
  </el-row>
  <el-row>
    <el-col>
      <el-table
        :data="articles"
        border
        :height="tableHeight"
        size="small"
        style="width: 100%">
        <el-table-column
          prop="title"
          label="文章"
          >
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建日期"
          :formatter="dateFormatter">
        </el-table-column>
        <el-table-column
          prop="operation"
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              round
              @click="handleEdit(scope.$index, scope.row)">更新</el-button>
            <el-button
              size="mini"
              round
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
  <el-row>
    <el-col>
      <el-pagination
        background
        layout="prev, pager, next"
        style="text-align:center;margin-top:10px"
        @current-change="refreshPage"
        :page-size="limit"
        :total="total">
      </el-pagination>
    </el-col>
  </el-row>
  <el-dialog
    id='article-dialog'
    title="新增文章"
    :visible.sync="showArticleDialog"
    width="40%"
    :top="'9vh'"
    >
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="文章概要">
        <el-input type="textarea" :rows="4" v-model="form.summary"></el-input>
      </el-form-item>
      <el-form-item label="标签">
        <el-select v-model="form.tags" multiple placeholder="请选择标签">
          <el-option
            v-for="item in allTags"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="源文件">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
          :limit="1"
          :file-list="fileList">
          <el-button size="small" type="primary">上传文件</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</el-main>
</template>
<script>
import {dateFormat} from "@/util/date_format.js"
export default {
  data() {
    return {
      limit: 10,
      total:0,
      articles: [],
      showArticleDialog: false,
      form: {
        title: "",
        tags: [],
        summary: ""
      },
      allTags: [],
      fileList: []
    }
  },
  computed: {
    tableHeight() {
      return document.documentElement.clientHeight - 182
    }
  },
  methods: {
    refreshPage(currentPage) {
      console.log(currentPage, "currentPage=")
      this.$http.get("/api/articles", {
        param: {
          limit: this.limit,
          cursor: (currentPage - 1) * this.limit,
        }
      }).then(rsp => {
        let rspData = rsp.data
        this.total = rspData.total
        this.articles = rspData.result
      })
    },
    dateFormatter(row, column) {
      return dateFormat(new Date(row.createTime), "yyyy-MM-dd")
    },
    addArticle() {
      this.showArticleDialog = true
    }
  },
  created() {
    this.refreshPage(1)
  }
}
</script>
<style>
#article-dialog .el-input__inner {
  border-radius: 4px;
}
</style>
