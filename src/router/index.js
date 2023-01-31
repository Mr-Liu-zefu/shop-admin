import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes:[
    {
      path: '/',
      name: 'Login',
      component: () => import(/* webpackChunkName: "about" */'../views/login/Login.vue')
    },
    {
      path: '/regist',
      name: 'regist',
      component: () => import('../views/regist/regist.vue')
    },
    {
      path: '/forget',
      name: 'forget',
      component: () => import('../views/forget/forget.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/hmoe/home.vue'),
      children: [
        {
          path: '/homepage',
          component: () => import('../components/homepage/hp.vue'),

        },
        {
          path:'/home/goodsList',
          name:'goodsList',
          component:() => import('../components/goodsList/index.vue')
        },
        {
          path: '/home/address',
          component: () => import('../components/useradmin/address/address.vue'),

        },
        {
          path: '/home/advise',
          component: () => import('../components/advise/ad.vue'),

        },
        {
          path:'/home/orderclass',
          component: () => import('../components/order/orderclass.vue'),
          children:[
            {
              path:'/home/orderclass/share',
              component: () => import('../components/order/share/share.vue')
            },
            {
              path:'/home/orderclass/old',
              component: () => import('../components/order/old/old.vue')
            },
            {
              path:'/home/orderclass/takeaways',
              component:() => import('../components/order/takeaways/takeaways')
            }
          ]
        },
        {
          path:'/home/userlist',
          component: () => import('../components/useradmin/userlist/userlist.vue'),

        },
        {
          path:'/home/userfollow',
          component: () => import('../components/useradmin/userfollow/userfollow.vue'),

        },
        {
          path:'/home/money',
          component: () => import ('../components/moneyadmin/money.vue')
        },
        {
          path:'/home/poster',
          component: () => import ('../components/poster/poster.vue')
        }
      ]
    }
  ]
})

//挂载路由导航守卫
//  router.beforeEach((to, from, next) => {
//    if(to.path === '/') {
//      return next();
//    }
//    const tokenstr = window.localStorage.getItem('token')
//    if (!tokenstr || tokenstr == undefined){
//      return next('/')
//    } else {
//      return next()
//    }
//  });



export default router
