// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import { sync } from 'vuex-router-sync'
import store from './store'
import Vuelidate from 'vuelidate'

Vue.use(Vuetify)
Vue.use(Vuelidate)
Vue.config.productionTip = false
sync(store, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
