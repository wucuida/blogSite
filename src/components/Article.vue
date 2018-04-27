<template>
  <div v-html="htmlContent"></div>
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
      let articeId = this.$route.params.articleId
      if(articleId){
        this.$http.get(`/api/articles/${this.articleId}`).then(response => {
          this.renderContent(response.data)
        })
      }
    }
  },
  created() {
    this.refresh()
  }
}
</script>
