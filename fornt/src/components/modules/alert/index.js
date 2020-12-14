import AlertComponent from './Alert.vue'

const Alert = {}

Alert.install = Vue => {
  const AlertConstructor = Vue.extend(AlertComponent)
  const AlertInstance = new AlertConstructor()
  AlertInstance.$mount(document.createElement('div'))
  document.body.appendChild(AlertInstance.$el)

  // 添加实例方法
  Vue.prototype.$alert = msg => {
    AlertInstance.msg = msg
    AlertInstance.type = 'alert'
    AlertInstance.isShow = true
  }

  Vue.prototype.$confirm = (msg, success, cancel) => {
    AlertInstance.type = 'confirm'
    AlertInstance.msg = msg
    AlertInstance.isShow = true
    if (typeof success === 'function') {
      AlertInstance.success = success
    }
    if (typeof cancel === 'function') {
      AlertInstance.cancel = cancel
    }
  }
}

export default Alert
