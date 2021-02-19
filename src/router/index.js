// 设置页面路由
import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Goods from '../views/goods/goods.vue'//商品组件
import Ratings from '../views/ratings/ratings.vue'//评论组件
import Seller from '../views/seller/seller.vue'//商家信息组件
import NotFound from '../views/404/404.vue';//404页面


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'goods',
    component: Goods
  },
  {
    path: '/goods',
    name: 'goods',
    component: Goods
  },
  {
    path: '/ratings',
    name: 'ratings',
    component: Ratings
  },
  {
    path: "/seller",
    name: "seller",
    component: Seller
  },
  {
    path: "*",
    name: "notfound",
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
