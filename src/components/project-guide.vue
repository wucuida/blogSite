<template>
<div>
  <div v-html="aaa" class="markdown-body"></div>
</div>
</template>
<script type="text/javascript">
import showdown from "showdown"
export default {
  data() {
    return {
      aaa: 123,
    }
  },
  created() {

    this.$http.get("/api/test").then(response => {
      // console.log(hljs)
      let content = response.data
      this.bb = content
      let converter = new showdown.Converter({
        "omitExtraWLInCodeBlocks":true,
        "noHeaderId":false,
        "prefixHeaderId":"",
        "ghCompatibleHeaderId":true,
        "headerLevelStart":1,
        "parseImgDimensions":true,
        "simplifiedAutoLink":true,
        "excludeTrailingPunctuationFromURLs":false,
        "literalMidWordUnderscores":true,
        "strikethrough":true,
        "tables":true,
        "tablesHeaderId":false,
        "ghCodeBlocks":true,
        "tasklists":true,
        "smoothLivePreview":true,
        "smartIndentationFix":false,
        "disableForced4SpacesIndentedSublists":false,
        "simpleLineBreaks":false,
        "requireSpaceBeforeHeadingText":false,
        "ghMentions":false,"extensions":[],"sanitize":false
      })
      converter.setFlavor('original');
      converter.setFlavor('github');
      let html = converter.makeHtml(content);
      console.log(html)
      this.aaa = html
      // hljs.initHighlightingOnLoad();
    })
  }
}
</script>

