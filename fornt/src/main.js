import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import veeValidate, { Validator } from 'vee-validate'
// import zhCN from 'vee-validate/dist/locale/zh_CN'//使用中文默认提示
import './local/index'

Vue.use(veeValidate)
// Validator.localize('zh-CN', zhCN)//使用中文默认提示

const validator = new Validator()
validator.localize('zh-CN')

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
