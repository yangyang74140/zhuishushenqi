import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/index.vue'
import classify from '../views/classify.vue'
import detail from '../views/detail.vue'
import chapters from '../views/chapters.vue'
import text from '../views/text.vue'
import search from '../views/search.vue'
import my from '../views/my.vue'
import bookcase from '../views/bookcase.vue'

Vue.use(VueRouter)

const routes = [
  
  {
    //我的
    path: '/my',
    component: my
  },
  {
    //书架
    path: '/bookcase',
    component: bookcase
  },
  {
    //搜索页
    path: '/search',
    component: search
  },
  {
    //文本
    path: '/text',
    component: text
  },{
    //章节内容
    path: '/chapters',
    component: chapters
  },
  {
    //详情页
    path: '/detail',
    component: detail
  },
  {
    //分类页
    path: '/classify',
    component: classify
  },
  {
    //主页
    path: '/',
    name: 'index',
    component: index
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  // mode:'history',
  // base:process.env.BASE_URL,
  routes
})

export default router
