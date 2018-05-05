<template>
<el-row style="margin: -20px">
  <el-col :span="4" class="manage-menu"
    :style="{ 'height': height+'px', 'background-color':'#eef1f6'}">
    <el-row>
      <transition name="el-zoom-in-top">
        <el-menu id="manage-tag" @select="handleClickMenu"
          background-color="#eef1f6"
          :default-active="defaultActive">
          <el-menu-item  v-for="tag in allTags"
            :class="{'currentTag': (tag.id==currentTag.id)}"
            :index="tag.id+''" :key="tag.id">
            <i :class="tag.icon"></i>
            <span class='tag_content'>
              {{tag.name + ""}}
            </span>
          </el-menu-item>
        </el-menu>
      </transition>
    </el-row>
  </el-col>
  <el-col :span="20" >
    <router-view></router-view>
  </el-col>
</el-row>
</template>
<script>
const allTags = [
  {'name': '文章', 'id': "manageArticle", icon: 'el-icon-document'},
  {'name': '标签', 'id': 'manageTag', icon: 'el-icon-star-on'}
]
export default {
  data() {
    return {
      allTags: allTags,
      currentTag: allTags[0],
    }
  },
  computed: {
    height() {
      // mini toolbar 24,default32
      return document.documentElement.clientHeight - 60
    },
    defaultActive() {
      return 'article'
      // if(this.$route.)
    }
  },
  components: {
  },
  watch: {
  },
  methods:{
    queryTable() {

    },
    handleClickMenu(id) {
      console.log(id, this.currentTag)
      if(id != this.currentTag.id){
        this.currentTag = this.allTags.find(t => t.id == id)
        this.$router.push({'name': id})
      }
    },
    refresh() {
    }
  },
  created() {
    console.log(this.$route, this.$router)
    this.refresh()
  }
}
</script>
<style type="text/css" scope>
  .manage-menu .el-tag {
    /*font-size: 16px;*/
    text-align: center;
    width: 100%;
    height: 80%;
    padding-top:6%;
    color: #fff;
    border-radius: 4px;
    box-sizing: border-box;
    border: 1px solid transparent;
  }
  .manage-menu .is-active {
    background-color: red
  }
  .manage-menu .is-active .el-tag {
    /*color: #20a0ff;*/
    /*font-weight: bold;*/
    font-size: larger
  }
  .currentTag {
    border-left: 5px solid #42b983;
  }
  .manage-menu .tag_content {
    width: 70%;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .manage-menu #manage-tag .el-icon-delete {
    float: none;
    margin: inherit;
  }
  /*::-webkit-scrollbar {
    width: 0px;
  }*/
</style>
