<template>
<el-main>
  <el-row style="margin-bottom:12px">
    <el-col :span="5" >
      <el-input placeholder='请输入文章标题'
        size="mini" suffix-icon="el-icon-search"
        v-model="searchContent"
        @keyup.native.enter="queryArticle" >
      </el-input>
    </el-col>
    <el-col :span="2" :offset="17">
      <el-button type="primary" round size="mini" @click="openArticleDialog">新增</el-button>
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
          prop="create_time"
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
    :close-on-click-modal='false'
    :show-close='false'
    width="40%"
    :top="'9vh'"
    >
    <el-form ref="form" :model="form" label-width="100px" :rules="rules">
      <el-form-item label="标题"  prop="title">
        <el-input v-model="form.title" :disabled="disableTitle"></el-input>
      </el-form-item>
      <el-form-item label="文章概要" prop="summary">
        <el-input type="textarea" :rows="4" v-model="form.summary"></el-input>
      </el-form-item>
      <el-form-item label="标签">
        <el-select v-model="form.tags" multiple placeholder="请选择标签" style="width:100%">
          <el-option
            v-for="item in allTags"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="源文件" :rules='fileValidator'>
        <el-upload
          ref="upload"
          :action="actionUrl"
          :http-request="uploadHandler"
          :auto-upload="false"
          multiple
          :limit="1"
          :on-exceed="exceedHandler"
          :on-change="fileChangeHandler"
          :before-upload="beforeUpload"
          :file-list="fileList">
          <el-button size="small" type="primary">上传文件</el-button>
          <small slot="tip" style="margin-left:10px">（只能上传md文件）</small>
        </el-upload>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancleSubmit">取 消</el-button>
      <el-button type="primary" @click="submitArticle">确 定</el-button>
    </span>
  </el-dialog>
</el-main>
</template>
<script>
import {dateFormat} from "@/util/date_format.js"
import {pick} from "@/util/tool.js"
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
      fileList: [],
      preparedFiles: [],
      actionUrl: '',
      rules: {
        'title': [{ required: true, message: '请输入标题', trigger: 'blur,change' }],
        'summary': [{ required: true, message: '请输入文章概要', trigger: 'blur,change' }],
      },
      fileValidator: {required: true},
      searchContent: ""
    }
  },
  computed: {
    tableHeight() {
      return document.documentElement.clientHeight - 182
    },
    disableTitle() {
      return (this.form.id != undefined)
    }
  },
  methods: {
    refreshPage(currentPage) {
      // console.log(currentPage, "currentPage=")
      this.$http.get("/api/articles", {
        params: {
          limit: this.limit,
          cursor: (currentPage - 1) * this.limit,
          verbose: 100,
          title: this.searchContent
        }
      }).then(rsp => {
        let rspData = rsp.data
        this.total = rspData.total
        this.articles = rspData.result
      })
    },
    dateFormatter(row, column) {
      return dateFormat(new Date(row.create_time), "yyyy-MM-dd")
    },
    queryArticle() {
      this.refreshPage(1)
    },
    handleEdit(index, row) {
      this.form = {
        id: row.id,
        title: row.title,
        tags: pick(row.tags, "id"),
        summary: row.summary
      }
      this.openArticleDialog()
    },
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该资源, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.delete(`/api/articles/${row.id}`).then(response => {
          if(response.data.result){
            this.$message({
              'type': 'success',
              'message': '删除文章成功'
            })
            this.refreshPage(1)
          }else if(response.data.error){
            this.$message({
              'type': 'error',
              "message": response.data.message
            })
          }
        })
      }).catch(() => {
      });
    },
    openArticleDialog() {
      this.showArticleDialog = true
      if(this.allTags.length == 0){
        this.$http.get('/api/tags', {
          params: {
            limit: 0,
            cursor: 0,
            verbose: 20
          }
        }).then(rsp => {
          if(rsp.data.result){
            this.allTags = rsp.data.result
          }else{
            this.$method({
              'type': 'warning',
              'message': '获取标签失败'
            })
          }
        })
      }
    },
    cancleSubmit() {
      this.showArticleDialog = false
      if(this.$refs.form){
        this.$refs.form.resetFields()
      }
      if(this.$refs.upload){
        this.$refs.upload.clearFiles()
      }
      this.preparedFiles = []
      this.form = {
        title: "",
        tags: [],
        summary: ""
      }
    },
    submitArticle() {
      this.$refs.form.validate(passed => {
        if(passed){
          if(this.form.id){
            // 更新
            this.updateArticle()
          }else{
            // 新增
            if(this.preparedFiles.length){
              this.$refs.upload.submit()
            }else{
              this.$message({
                type: 'warning',
                message: "请选择源文件"
              })
            }
          }

        }else{
          return false
        }
      })
      console.log(this.form, "form")
    },
    updateArticle() {
      if(this.preparedFiles.length){
        // 连同源文件一同更新
        this.$refs.upload.submit()
      }else{
        // 只更新artile结构
        this.$http.put(`/api/articles/${this.form.id}`, this.form).then(response => {
         if(response.data.result){
          this.$message({
            type: 'success',
            message: '更新文章成功'
          })
         }else{
          this.$message({
            'type': 'error',
            'message': '更新文章失败'
          })
         }
        })
      }
    },
    exceedHandler(file, fileList) {
      // console.log(file, fileList, "exceedHandler")
      this.$message({
        'type': 'warning',
        'message': '只能上传一个文件'
      })
    },
    fileChangeHandler(file, fileList){
      this.preparedFiles = fileList
    },
    uploadHandler(param) {
      let fileObj = param.file;
      let form = new FormData();
      // 文件对象
      form.append("file", fileObj);
      let httpConfig = {
        'url': "/api/articles",
        'action': '新增',
        'method': 'POST'
      }
      this.$http.post('/api/upload', form, {
        params: {
          'title': this.form.title
        }
      }).then(response => {
        // console.log('上传结果', response)
        if(response.data.result){
          if(this.form.id != undefined){
            httpConfig = {
              'url': `/api/articles/${this.form.id}`,
              'action': '更新',
              'method': 'PUT'
            }
          }
          return this.$http({
            'url': httpConfig.url,
            'method': httpConfig.method,
            'body': this.form
          })
        }else{
          return Promise.reject({'error': response.data})
        }
      }).then(resp => {
        this.cancleSubmit()
        if(resp.data.result){
          this.$message({
            'type': 'success',
            "message": `${httpConfig.action}文章成功`
          })
          this.refreshPage(1)
        }else{
          return Promise.reject({'error': resp.data})
        }
      }).catch(error => {
        console.log(error)
        this.$message({
          'type': 'error',
          'message': `${httpConfig.action}文章失败`
        })
      })
    },
    beforeUpload(file){
      if(file.name.slice(-3).toUpperCase() != ".MD"){
        this.$message({
          'type': 'warning',
          'message': '只接受md文件'
        })
        return false
      }
      if(file.size == 0){
        this.$message({
          'type': 'warning',
          'message': '文件不可为空'
        })
        return false
      }
      if(file.size > 1024*1024*4){
        this.$message({
          'type': 'warning',
          'message': '文件不能超过4M'
        })
        return false
      }
      return true
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
