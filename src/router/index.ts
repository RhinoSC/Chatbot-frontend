import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Tracker from '../views/trackerViewer/TrackerView.vue'
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
    meta: {
      hideNavbar: true,
    },
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    meta: {
      hideNavbar: true,
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/donate',
    name: 'Donate',
    meta: {
      hideNavbar: true,
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/DonateView.vue')
  },
  {
    path: '/layout',
    name: 'Layout',
    meta: {
      hideNavbar: true,
    },
    component: Layout
  },
  {
    path: '/tracker',
    name: 'tracker-view',
    component: Tracker,
    meta: {
      hideNavbar: true,
    },
    children: [
      {
        path: 'schedule',
        name: 'tracker.schedule',
        component: () => import('../views/trackerViewer/schedule/scheduleViewer.vue')
      },
      {
        path: 'bids',
        name: 'tracker.bids',
        component: () => import('../views/trackerViewer/bid/bidViewer.vue')
      },
    ]
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
      {
        path: 'runs',
        name: 'manage.tracker.run',
        component: () => import('../views/manage/tracker/run/runs.vue')
      },
      {
        path: 'users',
        name: 'manage.tracker.user',
        component: () => import('../views/manage/tracker/user/users.vue')
      },
      {
        path: 'prizes',
        name: 'manage.tracker.prize',
        component: () => import('../views/manage/tracker/prize/prizes.vue')
      },
      {
        path: 'bids',
        name: 'manage.tracker.bid',
        component: () => import('../views/manage/tracker/bid/bids.vue')
      },
      {
        path: 'donations',
        name: 'manage.tracker.donation',
        component: () => import('../views/manage/tracker/donation/donations.vue')
      },
    ]
  },

  //events
  {
    path: '/manage/tracker/events/edit/:id',
    name: 'manage.tracker.event',
    component: () => import('../views/manage/tracker/event/editEvent.vue')
  },
  {
    path: '/manage/tracker/events/add',
    component: () => import('../views/manage/tracker/event/addEvent.vue')
  },

  // schedules
  {
    path: '/manage/tracker/schedules/edit/:id',
    name: 'manage.tracker.schedules',
    component: () => import('../views/manage/tracker/schedule/editSchedule.vue')
  },
  {
    path: '/manage/tracker/schedules/add',
    component: () => import('../views/manage/tracker/schedule/addSchedule.vue')
  },

  // runs
  {
    path: '/manage/tracker/runs/edit/:id',
    name: 'manage.tracker.runs',
    component: () => import('../views/manage/tracker/run/editRun.vue')
  },
  {
    path: '/manage/tracker/runs/add',
    component: () => import('../views/manage/tracker/run/addRun.vue')
  },

  // users
  {
    path: '/manage/tracker/users/edit/:id',
    name: 'manage.tracker.users',
    component: () => import('../views/manage/tracker/user/editUser.vue')
  },
  {
    path: '/manage/tracker/users/add',
    component: () => import('../views/manage/tracker/user/addUser.vue')
  },


  // prizes
  {
    path: '/manage/tracker/prizes/edit/:id',
    name: 'manage.tracker.prizes',
    component: () => import('../views/manage/tracker/prize/editPrize.vue')
  },
  {
    path: '/manage/tracker/prizes/add',
    component: () => import('../views/manage/tracker/prize/addPrize.vue')
  },

  // bids
  {
    path: '/manage/tracker/bids/edit/:id',
    name: 'manage.tracker.bids',
    component: () => import('../views/manage/tracker/bid/editBid.vue')
  },
  {
    path: '/manage/tracker/bids/add',
    component: () => import('../views/manage/tracker/bid/addBid.vue')
  },

  // donations
  {
    path: '/manage/tracker/donations/edit/:id',
    name: 'manage.tracker.donations',
    component: () => import('../views/manage/tracker/donation/editDonation.vue')
  },
  {
    path: '/manage/tracker/donations/add',
    component: () => import('../views/manage/tracker/donation/addDonation.vue')
  },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
