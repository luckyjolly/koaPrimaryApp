<template>
  <div id="app">
    <div class="layui-container">
      <form action class="layui-form layui-form-pane">
        <div class="layui-form-item">
          <label for class="layui-form-label">用户名</label>
          <div class="layui-input-block">
            <input
              type="text"
              name="title"
              required="required"
              lay-verify="required"
              placeholder="请输入标题"
              autocomplete="off"
              class="layui-input"
              v-model="name"
            />
          </div>
        </div>
        <div class="layui-form-item">
          <label for class="layui-form-label">密码</label>
          <div class="layui-input-block">
            <input
              type="password"
              name="title"
              required="required"
              lay-verify="required"
              placeholder="请输入标题"
              autocomplete="off"
              class="layui-input"
              v-model="password"
            />
          </div>
        </div>
        <div class="layui-form-item">
          <label for class="layui-form-label">验证码</label>
          <div class="layui-input-inline">
            <input
              type="text"
              name="title"
              required="required"
              lay-verify="required"
              placeholder="请输入标题"
              autocomplete="off"
              class="layui-input"
              v-model="code"
            />
          </div>
          <div class="layui-form-mid svg" v-html="svg" @click="getCaptcha"></div>
        </div>
        <button class="layui-btn" @click="checkForm">点击登录</button>
        <a href="" class="imook-link">忘记密码</a>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'app',
  data () {
    return {
      svg: '',
      name: '',
      password: '',
      code: ''
    }
  },
  mounted () {
    this.getCaptcha()
  },
  methods: {
    getCaptcha () {
      axios.get('http://localhost:3000/getCaptcha').then(res => {
        if (res.status === 200) {
          const obj = res.data

          if (obj.code === 200) {
            this.svg = obj.data
          }
        }
      })
    },

    checkForm () {
      this.errorMsg = [];

      if (!this.name) {
        this.errorMsg.push('登录名为空')
      }
      if (!this.password) {
        this.errorMsg.psuh('密码不能为空')
      }
      if (!this.code) {
        this.errorMsg.push('验证码为空')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#app{
  background: #f5f5f5;
}
.layui-container{
  background: #fff;
}
input{
  width: 190px;
}
.imook-link{
  margin-left: 10px;
  &:hover{
    color: #009688;
  }
}

.svg {
  position: relative;
  top: -15px;
}
</style>
