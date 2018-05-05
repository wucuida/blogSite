<template>
  <el-row>
    <el-col :span="18" :offset="3" >
      <div id="articleContent" v-html="htmlContent"></div>
    </el-col>
  </el-row>
</template>
<script type="text/javascript">
import showdown from "showdown"
import {converterConfig} from "../config/config.js"
export default {
  data() {
    return {
      converter: "",
      htmlContent: ""
    }
  },
  methods: {
    renderContent(content) {
      let converter = this.converter || (new showdown.Converter(converterConfig))
      let html = converter.makeHtml(content || "")
      this.htmlContent = html
    },
    refresh() {
      console.log(this.$route, this.$router)
      let articleId = this.$route.params.articleId

      if(articleId){
        this.$http.get(`/api/articles/${articleId}`).then(response => {
          if(response.data.result){
            this.renderContent(response.data.result)
          }else {          
            this.$confirm('此页面暂时无法访问, 是否跳转到主页?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$router.push("/home")
            }).catch(() => {
              this.$router.push("/home")    
            })
          }
        })
      }
    }
  },
  created() {
    this.refresh()
  }
}
</script>
<style>
#articleContent {
 font-family: "Microsoft Yahei", Helvetica, arial, sans-serif ;
  font-size: 14px;
  line-height: 1.6;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: white;
  padding: 30px 30px 0 30px;
  color: #516272;
}

#articleContent > *:first-child {
  margin-top: 0 !important;
}
#articleContent > *:last-child {
  margin-bottom: 0 !important;
}

#articleContent a {
  color: #4183C4; }
#articleContent a.absent {
  color: #cc0000; }
#articleContent a.anchor {
  display: block;
  padding-left: 30px;
  margin-left: -30px;
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
}

#articleContent h1, h2, h3, h4, h5, h6 {
  margin: 20px 0 10px;
  padding: 0;
  font-weight: bold;
  -webkit-font-smoothing: antialiased;
  cursor: text;
  position: relative;
}

#articleContent h1 tt, h1 code {
  font-size: inherit;
}

#articleContent h2 tt, h2 code {
  font-size: inherit;
}

#articleContent h3 tt, h3 code {
  font-size: inherit;
}

#articleContent h4 tt, h4 code {
  font-size: inherit;
}

#articleContent h5 tt, h5 code {
  font-size: inherit;
}

#articleContent h6 tt, h6 code {
  font-size: inherit;
}

#articleContent h1 {
  font-size: 28px;
  color: #2B3F52;
}

#articleContent h2 {
  font-size: 24px;
  border-bottom: 1px solid #DDE4E9;
  color: #2B3F52;
}

#articleContent h3 {
  font-size: 18px;
  color: #2B3F52;
}

#articleContent h4 {
  font-size: 16px;
  color: #2B3F52;
}

#articleContent h5 {
  font-size: 14px;
  color: #2B3F52;
}

#articleContent h6 {
  color: #2B3F52;
  font-size: 14px;
}

#articleContent p, blockquote, ol, dl, pre {
  margin: 15px 0;
  color: #516272;  }

#articleContent > h2:first-child {
  margin-top: 0;
  padding-top: 0;
}
#articleContent > h1:first-child {
  margin-top: 0;
  padding-top: 0;
}
#articleContent > h1:first-child + h2 {
  margin-top: 0;
  padding-top: 0;
}
#articleContent > h3:first-child, #articleContent > h4:first-child, #articleContent > h5:first-child, #articleContent > h6:first-child {
  margin-top: 0;
  padding-top: 0;
}

#articleContent a:first-child h1, a:first-child h2, a:first-child h3, a:first-child h4, a:first-child h5, a:first-child h6 {
  margin-top: 0;
  padding-top: 0;
}

#articleContent h1 p, h2 p, h3 p, h4 p, h5 p, h6 p {
  margin-top: 0;
}

#articleContent li p.first {
  display: inline-block;
}
#articleContent li {
  margin: 0;
}
#articleContent ul, ol {
  margin: 15px 0;
  color: #516272; 
  padding-left: 30px;
}

#articleContent ul :first-child, ol :first-child {
  margin-top: 0;
}

#articleContent dl {
  padding: 0;
}
#articleContent dl dt {
  font-size: 14px;
  font-weight: bold;
  font-style: italic;
  padding: 0;
  margin: 15px 0 5px;
}
#articleContent  dl dt:first-child {
    padding: 0;
  }
#articleContent  dl dt > :first-child {
    margin-top: 0;
  }
#articleContent  dl dt > :last-child {
    margin-bottom: 0;
  }
#articleContent dl dd {
  margin: 0 0 15px;
  padding: 0 15px;
}
#articleContent dl dd > :first-child {
  margin-top: 0;
}
#articleContent dl dd > :last-child {
  margin-bottom: 0;
}

#articleContent blockquote {
  border-left: 4px solid #ECF0F3;
  /*padding: 0 15px;*/
  padding: 15px;
  background-color:#F7F9FA;
  color: #2B3F52;
}
#articleContent blockquote > :first-child {
  margin-top: 0; }
#articleContent blockquote > :last-child {
  margin-bottom: 0;
}

#articleContent table {
  margin: 15px 0;
  color: #516272; 
  padding: 0;
  border-collapse: collapse;
}
#articleContent table tr {
  border-top: 1px solid #cccccc;
  background-color: white;
  margin: 0;
  padding: 0;
}
#articleContent table tr:nth-child(2n) {
  background-color: #f8f8f8;
}
#articleContent table tr th {
  font-weight: bold;
  border: 1px solid #cccccc;
  margin: 0;
  padding: 6px 13px;
}
#articleContent table tr td {
  border: 1px solid #cccccc;
  margin: 0;
  padding: 6px 13px;
}
#articleContent table tr th :first-child, table tr td :first-child {
  margin-top: 0;
}
#articleContent table tr th :last-child, table tr td :last-child {
  margin-bottom: 0;
}

#articleContent img {
  max-width: 100%;
}

#articleContent span.frame {
  display: block;
  overflow: hidden;
}
#articleContent span.frame > span {
  border: 1px solid #dddddd;
  display: block;
  float: left;
  overflow: hidden;
  margin: 13px 0 0;
  padding: 7px;
  width: auto; }
#articleContent span.frame span img {
  display: block;
  float: left; }
#articleContent span.frame span span {
  clear: both;
  color: #333333;
  display: block;
  padding: 5px 0 0;
}
#articleContent span.align-center {
  display: block;
  overflow: hidden;
  clear: both;
}
#articleContent span.align-center > span {
  display: block;
  overflow: hidden;
  margin: 13px auto 0;
  text-align: center;
}
#articleContent span.align-center span img {
  margin: 0 auto;
  text-align: center;
}
#articleContent span.align-right {
  display: block;
  overflow: hidden;
  clear: both;
}
#articleContent span.align-right > span {
  display: block;
  overflow: hidden;
  margin: 13px 0 0;
  text-align: right;
}
#articleContent span.align-right span img {
  margin: 0;
  text-align: right;
}
#articleContent span.float-left {
  display: block;
  margin-right: 13px;
  overflow: hidden;
  float: left;
}
#articleContent span.float-left span {
  margin: 13px 0 0;
}
#articleContent span.float-right {
  display: block;
  margin-left: 13px;
  overflow: hidden;
  float: right;
}
#articleContent span.float-right > span {
  display: block;
  overflow: hidden;
  margin: 13px auto 0;
  text-align: right;
}

#articleContent code, tt {
  margin: 0 2px;
  padding: 0 5px;
  white-space: nowrap;
  border: 1px solid #eaeaea;
  background-color: #f8f8f8;
  border-radius: 3px;
}

#articleContent pre code {
  margin: 0;
  padding: 0;
  white-space: pre;
  border: none;
  background: transparent;
}

#articleContent .highlight pre {
  background-color: #f8f8f8;
  border: 1px solid #cccccc;
  font-size: 13px;
  line-height: 19px;
  overflow: auto;
  padding: 6px 10px;
  border-radius: 3px;
}

#articleContent pre {
  background-color: #f8f8f8;
  border: 1px solid #cccccc;
  font-size: 13px;
  line-height: 19px;
  overflow: auto;
  padding: 6px 10px;
  border-radius: 3px;
}
#articleContent pre code, pre tt {
  background-color: transparent;
  border: none;
}

#articleContent sup {
  font-size: 0.83em;
  vertical-align: super;
  line-height: 0;
}
#articleContent code {
  white-space: pre-wrap;
  word-break: break-all;
  display: block;
}
#articleContent * {
  -webkit-print-color-adjust: exact;
}
 @media print {
  #articleContent table, pre {
    page-break-inside: avoid;
  }
  #articleContent pre {
    word-wrap: break-word;
  }

}
</style>
