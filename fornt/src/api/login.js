import axios from '../utils/request'

/**
 * 获取验证码的接口
 * @param {String} sid
 */
const getCode = (sid) => {
  return axios.get('/public/getCaptcha', {
    params: {
      sid
    }
  })
}

/**
 * 找回密码接口
 * @param {} option 用户信息（邮箱，验证码）
 */
const forget = (option) => {
  return axios.post('/login/forget', option)
}

/**
 * 登录接口
 * @param {*} loginInfo 用户登录信息
 */
const login = (longinInfo) => {
  return axios.post('/login/login', longinInfo)
}

/**
 * 登录接口
 * @param {*} regInfo 用户登录信息
 */
const reg = (regInfo) => {
  return axios.post('/login/reg', regInfo)
}

export {
  getCode,
  forget,
  login,
  reg
}
