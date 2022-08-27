import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Commands from '../views/CommandsView.vue'
import Layout from '../views/LayoutView.vue'
import Schedule from '../views/ScheduleManagerView.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home-view',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/commands',
    name: 'Commands',
    component: Commands
  },
  {
    path: '/layout',
    name: 'Layout',
    component: Layout
  },
  {
    path: '/schedule/manage',
    name: 'Schedule',
    component: Schedule
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
