<template>
<el-main>
  <el-row style="margin-bottom:12px">
    <el-col :span="5" >
      <el-input placeholder='请输入名称' size="mini" suffix-icon="el-icon-search">
      </el-input>
    </el-col>
    <el-col :span="2" :offset="17">
      <el-button type="primary" round size="mini" @click="addTag">新增</el-button>
    </el-col>
  </el-row>
  <el-row>
    <el-col>
      <el-table
        :data="tags"
        border
        :height="tableHeight"
        size="small"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="名称"
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
    title="新增标签"
    :visible.sync="showTagDialog"
    :close-on-click-modal='false'
    :show-close='false'
    width="40%"
    >
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <el-form-item label="名称"  prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancleSubmit">取 消</el-button>
      <el-button type="primary" @click="doSubmit">确 定</el-button>
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
      tags: [],
      showTagDialog: false,
      form: {
        name: "",
      },
      rules: {
        'name': [{ required: true, message: '请输入名称', trigger: 'blur,change' }],
      },
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
      this.$http.get("/api/tags", {
        param: {
          limit: this.limit,
          cursor: (currentPage - 1) * this.limit,
        }
      }).then(rsp => {
        let rspData = rsp.data
        this.total = rspData.total
        this.tags = rspData.result
      })
    },
    dateFormatter(row, column) {
      return dateFormat(new Date(row.create_time), "yyyy-MM-dd")
    },
    handleEdit(index, row) {
      this.showTagDialog = true
      this.form = {
        name: row.name,
        id: row.id
      }
    },
    handleDelete(index, row) {
      // console.log(index, row)
      this.$confirm('此操作将永久删除该资源, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.delete(`/api/tags/${row.id}`).then(response => {
          this.cancleSubmit()
          if(response.data.result){
            this.$message({
              'type': 'success',
              'message': '删除标签成功'
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
    addTag() {
      this.showTagDialog = true
    },
    cancleSubmit() {
      this.showTagDialog = false
      if(this.$refs.form){
        this.$refs.form.resetFields()
      }
      this.form = {
        'name': ''
      }
    },
    doSubmit() {
      this.$refs.form.validate(passed => {
        if(passed){
          let httpConfig = {
            'url': "/api/tags",
            'action': '新增',
            'method': 'POST'
          }
          if(this.form.id){
            httpConfig = {
              url: `/api/tags/${this.form.id}`,
              action: '更新',
              method: 'PUT'
            }   
          }
          this.$http({
            'url': httpConfig.url,
            'method': httpConfig.method,
            'body': this.form,
          }).then(resp => {
            this.cancleSubmit()
            if(resp.data.result){
              this.$message({
                'type': 'success',
                "message": `${httpConfig.action}标签成功`
              })
              this.refreshPage(1)
            }else{
              return Promise.reject({'error': resp.data})
            }
          }).catch(error => {
            this.$message({
              'type': 'error',
              "message": `${httpConfig.action}标签失败`
            })
          })
        }else{
          return false
        }
      })
    },
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
