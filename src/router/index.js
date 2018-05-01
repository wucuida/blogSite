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
      path: "/articles/:articleId",
      name: "article",
      component: resolve => require(["../components/Article.vue"], resolve)
    },{
      path: "/about",
      name: "about",
      component: resolve => require(["../components/Home.vue"], resolve)
    },{
      path: "/archives",
      name: "archives",
      component: resolve => require(["../components/Home.vue"], resolve)
    },{
      path: "/manage",
      name: "manage",
      component: resolve => require(["../components/Manage.vue"], resolve),
      children: [
        {
          path: 'doc',
          name: "manageDoc",
          component: resolve => require(["../components/ManageDoc.vue"], resolve),
        }, {
          path: 'tag',
          name: "manageTag",
          component: resolve => require(["../components/ManageTag.vue"], resolve),

        }, {
          path: '',
          name: "defaultManage",
          component: resolve => require(["../components/ManageDoc.vue"], resolve),
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
      component: resolve => require(["../components/Login.vue"], resolve)
    }
  ]
})
