import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Tracker from '../views/TrackerView.vue'
import Layout from '../views/LayoutView.vue'
import Manage from '../views/manage/ManageView.vue'
import Dashboard from '../views/manage/DashboardView.vue'
import Commands from '../views/manage/CommandsView.vue'
import ScheduleManager from '../views/manage/ScheduleManagerView.vue'
import TrackerManager from '../views/manage/tracker/TrackerManagerView.vue'

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
  },
  {
    path: '/manage/dashboard',
    name: 'manage.dashboard',
    component: Dashboard
  },
  {
    path: '/manage/commands',
    name: 'manage.commands',
    component: Commands
  },
  {
    path: '/manage/schedule',
    name: 'manage.schedule',
    component: ScheduleManager
  },
  {
    path: '/manage/tracker',
    name: 'manage.tracker',
    component: TrackerManager,
    children: [
      {
        path: 'events',
        name: 'manage.tracker.event',
        component: () => import('../views/manage/tracker/event/events.vue')
      },
      {
        path: 'schedules',
        name: 'manage.tracker.schedule',
        component: () => import('../views/manage/tracker/schedule/schedules.vue')
      },
    ]
  },
  {
    path: '/manage/tracker/events/edit/:id',
    name: 'manage.tracker.event',
    component: () => import('../views/manage/tracker/event/editEvent.vue')
  },
  {
    path: '/manage/tracker/events/add',
    component: () => import('../views/manage/tracker/event/addEvent.vue')
  },
  {
    path: '/manage/tracker/schedules/edit/:id',
    name: 'manage.tracker.schedules',
    component: () => import('../views/manage/tracker/schedule/editSchedule.vue')
  },
  {
    path: '/manage/tracker/schedules/add',
    component: () => import('../views/manage/tracker/schedule/addSchedule.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
