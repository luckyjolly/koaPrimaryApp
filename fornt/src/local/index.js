import { Validator } from 'vee-validate'

const dictionary = {
  'zh-CN': {
    messages: {
      required: field => '请输入' + field,
      email: () => '请输入正确的邮箱格式',
      min: () => '不符合最小长度要求',
      length: (field, param) => field + '长度要求为' + param[0]// 函数可接受3个参数：字段名；验证规则使用的参数，类型为数组；任何类型的数据
    },
    attributes: {
      name: '账号',
      email: '邮箱',
      code: '验证码',
      password: '密码'
    }
  }
}

// Override and merge the dictionaries
Validator.localize(dictionary)
