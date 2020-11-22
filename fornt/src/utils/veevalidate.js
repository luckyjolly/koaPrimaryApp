import { extend, localize } from 'vee-validate'
import { required, email, min, length } from 'vee-validate/dist/rules'
import zh from 'vee-validate/dist/locale/zh_CN.json'

extend('required', required)
extend('email', email)
extend('min', min)
extend('length', length)

// Custom validate
extend('name', {
  validate: value => {
    console.log((/^\d+/).test(value))
    return !(/^\d+/).test(value)
  },
  message: '不能以纯数字为昵称'
})

localize('zh_CN', {
  messages: {
    ...zh.messages,
    required: '请输入{_field_}'// 全局定义message
  },
  // 与validation-provider中的name对应
  // key为name, value为对应的中文field名称
  names: {
    email: '邮箱',
    password: '密码',
    name: '昵称',
    username: '账号',
    code: '验证码'
  },
  // 针对不同的name，定义不同的message消息
  fields: {
    email: {
      email: '请输入正确的{_field_}',
      required: '请输入{_field_}'
    },
    name: {
      min: (field, { length }) => {
        return `请在${field}输入至少${length}个字符`
      }
    }
  }
})
