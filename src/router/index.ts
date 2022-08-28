import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Manage from '../views/ManageView.vue'
import Dashboard from '../views/DashboardView.vue'
import Commands from '../views/CommandsView.vue'
import Layout from '../views/LayoutView.vue'
import ScheduleManager from '../views/ScheduleManagerView.vue'
import Tracker from '../views/TrackerView.vue'
import TrackerManager from '../views/TrackerManagerView.vue'

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
    path: '/layout',
    name: 'Layout',
    component: Layout
  },
  {
    path: '/tracker',
    name: 'tracker-view',
    component: Tracker
  },
  {
    path: '/manage',
    component: Manage,
    children: [
      {
        path: 'dashboard',
        name: 'manage.dashboard',
        component: Dashboard
      },
      {
        path: 'commands',
        name: 'manage.commands',
        component: Commands
      },
      {
        path: 'schedule',
        name: 'manage.schedule',
        component: ScheduleManager
      },
      {
        path: 'tracker ',
        name: 'manage.tracker',
        component: TrackerManager
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
