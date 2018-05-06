import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: resolve => require(["../components/Home.vue"], resolve),
      meta: { activeName: "home" }
    },{
      path: "/home",
      name: "home",
      component: resolve => require(["../components/Home.vue"], resolve),
      meta: { activeName: "home" }
    },{
      path: "/articles/:articleId",
      name: "article",
      component: resolve => require(["../components/Article.vue"], resolve),
      meta: { activeName: "home" }
    },{
      path: "/about",
      name: "about",
      component: resolve => require(["../components/Home.vue"], resolve),
      meta: { activeName: "about" }
    },{
      path: "/archives",
      name: "archives",
      component: resolve => require(["../components/Archives.vue"], resolve),
      meta: { activeName: "archives" }
    },{
      path: "/manage",
      name: "manage",
      component: resolve => require(["../components/Manage.vue"], resolve),
      meta: { activeName: "manage" },
      children: [
        {
          path: 'article',
          name: "manageArticle",
          component: resolve => require(["../components/ManageDoc.vue"], resolve),
          meta: { activeName: "manage" }
        }, {
          path: 'tag',
          name: "manageTag",
          component: resolve => require(["../components/ManageTag.vue"], resolve),
          meta: { activeName: "manage" }
        }, {
          path: '',
          name: "defaultManage",
          component: resolve => require(["../components/ManageDoc.vue"], resolve),
          meta: { activeName: "manage" }
          // beforeEnter: (to, from, next) => {
          //   var type = sessionStorage.getItem("type")
          //   if(type && parseInt(type) <= 100){
          //     next()
          //   }else {
          //     next("/login")
          //   }
          // }

        }
      ],
      beforeEnter: (to, from, next) => {
        var token = sessionStorage.getItem("access_token")
        if(token){
          next()
        }else {
          console.log("122")
          next("login")
        }
      }
    }, {
      path: "/login",
      name: "login",
      component: resolve => require(["../components/Login.vue"], resolve),
      meta: { activeName: "manage" }
    }
  ]
})
