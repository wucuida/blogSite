import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: resolve => require(["../components/Home.vue"], resolve)
    },{
      path: "/home",
      name: "home",
      component: resolve => require(["../components/Home.vue"], resolve)
    },{
      path: "/article/:articleId",
      name: "article",
      component: resolve => require(["../components/Article.vue"], resolve)
    },{
      path: "/tags",
      name: "tags",
      component: resolve => require(["../components/Home.vue"], resolve)
    },{
      path: "/archives",
      name: "archives",
      component: resolve => require(["../components/Home.vue"], resolve)
    },{
      path: "/manage",
      name: "manage",
      component: resolve => require(["../components/Home.vue"], resolve)
    }
  ]
})
