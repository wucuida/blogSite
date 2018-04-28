<template>
<div v-loading="loading" element-loading-text="加载中...." class="tableFlex">

</div>
</template>
<script type="text/javascript">
  import {dateFormat} from '@/util/date_format.js'
  import {pick} from "@/util/tool.js"
  // import EditorDialog from './doc-editor.vue'
  // import uploadFileDialog from './uploadFile-dialog.vue'
  export default{
    props: {
      tagId: {
        type: String,
        default: ""
      },
      tagType: {
        type: Number,
        default: 0
      },
    },
    data() {
      return {
        tableData: [],
        currentPage: 1,
        total: 10,
      }
    },
    components: {
      // EditorDialog: resolve => require(["./doc-editor.vue"], resolve),
      // editFileDialog,
      // uploadFileDialog
    },
    watch: {
      // tagId(val, oldVal){
      //   console.log("change--")
      //   this.refresh()
      // }
    },
    computed: {
      tableHeight() {
        return document.documentElement.clientHeight - 60 - 70
      },
    },
    methods: {
      getData() {
        let token = sessionStorage.getItem("accessToken")
        let params = {
          limit: this.pageSize,
          access_token: token,
          cursor: this.pageSize * (this.currentPage - 1),
        }
        let queryBody = {}
        let url
        if(this.tagType === 2){
          // 故障类型
          url = "/api/iwosdts_fault/list"
          queryBody.name = (this.searchedName==="")? null: this.searchedName
        }else if(this.tagType === 1){
          // 解决方案
          url = "/api/iwosdts_solution/list"
          queryBody.name = (this.searchedName==="")? null: this.searchedName
        }else {
          url = "/api/iwosdts_doc/list"
          queryBody.filename = (this.searchedName==="")? null: this.searchedName
          queryBody.tagId = this.tagId
        }
        let dataPromise = this.$http.post(url, queryBody, {
          params: params
        }).then(response => {
          if(response.data.error) {
            return Promise.reject({'error': "请求表格数据出错"})
          }
          return Promise.resolve(response.data)
        })
        return dataPromise
      },
      renderTable(data) {
        this.tableData = data.result
        this.total = data.total
        this.$nextTick(() => {
          this.loading = false
        })
      },
      dateFormatter(row,column) {
        return dateFormat(new Date(row.createTime), "yyyy-MM-dd")
      },
      solutionFormatter(row, column){
        return this.solutionMap[row._id]? this.solutionMap[row._id].name: ""
      },
      refresh() {
        // console.log("refresh--")
        this.loading = false
        this.solutions = []
        let bindings = []
        let faults = []
        if(this.tagId){
          let token = sessionStorage.getItem("accessToken")
          if(this.tagType === 2){
            // 若为"故障类型"还需继续请求对应的"解决方案"
            this.getData().then(rsp => {
              faults = rsp.result
              return this.$http.post("/api/iwosdts_binding/list", {
                type: 0,
                sources: pick(faults, "_id")
            }, {
              params: {access_token: token}
            }).then(bindRsp => {
              if(bindRsp.data.error){
                return Promise.reject({"error": "请求绑定的解决方案出错"})
              }
              bindings = bindRsp.data.result
              let solutionIds = pick(bindRsp.data.result, "target")
              if(solutionIds.length){
                return this.$http.post("/api/iwosdts_solution/list", {
                  resourceIds: pick(bindRsp.data.result, "target")
                }, {
                  params: {
                    access_token: token,
                    limit: 0
                  }
                })
              }else{
                // "异常-方案"绑定不存在,模拟请求到的空数据
                return Promise.resolve({data: {result: []}})
              }

            }).then(solutionRsp => {
                let solutions = solutionRsp.data.result
                if(solutions && solutions.length){
                  let solutionMap = {}
                  faults.forEach(fault => {
                    let binding = bindings.find(b  => b.source == fault._id)
                    if(binding){
                      solutionMap[binding.source] = solutions.find(s => s._id == binding.target)
                    }
                  })
                  this.solutionMap = solutionMap
                }
                this.renderTable(rsp)
              })
            })
          }else{
            this.getData().then(data => {
              this.renderTable(data)
            })
          }
        }
      },
      addNewItem() {
        this.handleAdd()
      },
      uploadFile() {
        this.handleUpload()
      },
      handleAdd() {
        this.saveButton = true
        this.dialogDataE = {
          id: "",
          filename: "",
          type: this.tagType,
          tagId: this.tagId
        }
        this.$nextTick(() => {
          this.$refs.guideDialog.show()
        })
      },
      handleSearcch() {
        this.refresh()
      },
      scanFile(index,row) {
        let dialogData = {
          id: row._id,
          filename: row.filename,
          type: this.tagType,
          tagId: this.tagId,
          descFileId: row.descFileId,
        }
        this.dialogDataE = dialogData
        this.$nextTick(() => {
          this.$refs.guideDialog.show()
        })
      },
      closeDialog() {
        this.bindDialogVisible = false
      },
      submitBind() {
        if(this.bindingForm.solution){
          let token = sessionStorage.getItem("accessToken")
          this.$http.post("/api/iwosdts_binding/batch_delete", {
            source: this.bindingForm.faultId,
            type: 0
          }, {
            params: {access_token: token}
          }).then(deleteRsp => {
            if(deleteRsp.data.error){
              return Promise.reject(deleteRsp.data)
            }
            return this.$http.post("/api/iwosdts_binding/batch_add", {
              sources: [this.bindingForm.faultId],
              targets: [this.bindingForm.solution],
              type: 0
            }, {
              params: {access_token: token}
            })
          }).then(addRsp => {
            if(addRsp.data.error){
              return Promise.reject(addRsp.data.error)
            }
            // 更新绑定成功
            this.closeDialog()
            this.$message({
              type: "success",
              message: ('international.message.bindScheme',[('international.message.success')])
            })
            this.refresh()
          }).catch(error => {
             this.$message({
              type: "error",
              message: ('international.message.bindScheme',[('international.message.failed')])
            })
          })
        }else{
          this.$message({
            type: "error",
            message: ('international.message.Pselect',[('international.message.solution')])
          })
        }
      },
      handleBind(index, row) {
        let getSolutionPromise
        if(this.solutions.length){
          getSolutionPromise = Promise.resolve(this.solutions)
        }else{
          getSolutionPromise = this.$http.post("/api/iwosdts_solution/list", {}, {params: {
            limit: 0,
            access_token: sessionStorage.getItem("accessToken")
          }}).then(rsp => {
            if(rsp.data.result && rsp.data.total){
              return Promise.resolve(rsp.data.result)
            }
          })
        }
        getSolutionPromise.then(solutions => {
          this.solutions = solutions
          let model = {
            fault: row.name,
            faultId: row._id,
            solution: this.solutionMap[row._id]? this.solutionMap[row._id]._id: ""
          }
          this.bindingForm = model
          this.bindDialogVisible = true
        })

      },
      handleView(index,row) {
        this.saveButton = false
        if(this.tagType == 0) {
          this.scanFile(index, row)
        }else{
          row.filename = row.name
          this.scanFile(index, row)
        }
      },
      handleEdite(index,row) {
        this.saveButton = true
        if(this.uploadType.indexOf(this.tagType) != -1){
          this.$confirm(('international.message.unreadableFile'), ('international.message.prompt'), {
            confirmButtonText: ('international.message.determine'),
            cancelButtonText: ('international.message.cancel'),
            type: 'warning'
          }).then(() => {
            this.scanFile(index, row)
          })
        }else if(this.tagType == 0){
          // 普通文档文件
          this.scanFile(index, row)
        }else{
          // 异常/解决方案
          row.filename = row.name
          this.scanFile(index, row)
        }
      },

      handleDelete(index, row) {
        this.$confirm(('international.message.deletePrompt'), ('international.message.prompt'), {
          confirmButtonText: ('international.message.determine'),
          cancelButtonText: ('international.message.cancel'),
          type: 'warning'
        }).then(() => {
          let id = row._id
          this.$http.delete(`/api/iwosdts_doc/${id}`,{
             params:{
              access_token: sessionStorage.getItem("accessToken")
            }
          }).then(response => {
            if(response.data.error){
              this.$message({
                type: 'warning',
                message: ('international.message.deleteSth',[('international.message.failed')])
              })
            }else {
              this.$message({
                type: 'success',
                message: ('international.message.deleteSth',[('international.message.success')])
              })
              this.refresh()
            }
          })
        }).catch(() => {
        });
      },
      handleDownLode(index, row) {
        let id = row.docId
        let accessToken = sessionStorage.getItem('accessToken')
        let url = `api/file/${id}?access_token=${accessToken}`
        window.open(url)
      },
      handleSizeChange(val) {
        this.loading = true
        this.pageSize = val
        this.refresh()
      },
      handleCurrentChange(val) {
        this.loading = true
        this.currentPage = val
        this.refresh()
      },
      handleUpload() {
        this.$nextTick(() => {
          this.$refs.uploadFileDialog.show()
        })
      }
    },
    created() {
    }
  }
</script>
<style type="text/css" scoped>
</style>
