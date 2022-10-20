import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars, faHome, faTerminal, faClock, faEdit, faTrash, faCalendar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import vuetify from './plugins/vuetify'

library.add(faBars, faHome, faTerminal, faClock, faEdit, faTrash, faCalendar)

Vue.component('font-awesome-icon', FontAwesomeIcon)

// Import the plugin here
import { Auth0Plugin } from './auth';
import { RawLocation } from 'vue-router'

// Install the authentication plugin here
Vue.use(Auth0Plugin, {
  domain: process.env.VUE_APP_AUTH0_DOMAIN,
  clientId: process.env.VUE_APP_AUTH0_CLIENTID,
  serverUrl: process.env.VUE_APP_AUTH0_CLIENT_ORIGIN_URL,
  onRedirectCallback: (appState: { targetUrl: RawLocation }) => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  }
});

Vue.use(VueAxios, axios.create({
  baseURL: `http://${process.env.VUE_APP_BACKEND_URL}:${process.env.VUE_APP_BACKEND_PORT}/`,
  headers: { 'Content-Type': 'application/json' },
  // this.axios.interceptors.request.use(req => {
  //     req.headers['Authorization'] = `Bearer ${accessToken}`
  //     return req;
  // });
}))


Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
