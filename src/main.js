import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'

import './assets/reset.css'
import 'element-ui/lib/theme-chalk/index.css';
import router from './router/index'
import store from './store'
import api from './api/index'

Vue.config.productionTip = false
Vue.prototype.$message = ElementUI.Message
Vue.prototype.$api = api
Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
