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
Vue.prototype.openLoading = function () {
  const loading = this.$loading({ // 声明一个loading对象
    lock: true, // 是否锁屏
    target: '.sub-main', // 需要遮罩的区域
    body: true,
    background: '#ffffff',
    customClass: 'mask' // 遮罩层新增类名
  })
  setTimeout(function () { // 设定定时器，超时5S后自动关闭遮罩层，避免请求失败时，遮罩层一直存在的问题
    loading.close() // 关闭遮罩层
  }, 5000)
  return loading
}
Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
