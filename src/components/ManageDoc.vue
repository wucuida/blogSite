<template>
<el-main>
  <el-row style="margin-bottom:12px">
    <el-col :span="5" >
      <el-input placeholder='文章名称' size="mini" suffix-icon="el-icon-search">
      </el-input>
    </el-col>
    <el-col :span="2" :offset="17">
      <el-button type="primary" round size="mini" >新增</el-button>
    </el-col>
  </el-row>
  <el-row>
    <el-col>
      <el-table
        :data="tableData"
        border
        :height="tableHeight"
        size="small"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
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
</el-main>
</template>
<script>
export default {
  data() {
    return {
      limit: 10,
      total:150,
      tableData3: [],
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      },{
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      },{
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      },{
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      },{
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      },{
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  computed: {
    tableHeight() {
      return document.documentElement.clientHeight - 182
    }
  },
  methods: {
    refreshPage() {

    }
  }
}
</script>
