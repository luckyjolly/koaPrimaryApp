<template>
  <div id="app">
    <imooc-header></imooc-header>
    <router-view></router-view>
    <imooc-footer></imooc-footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  components: {
    'imooc-header': Header,
    'imooc-footer': Footer
  }
}
</script>

<style lang="scss" scoped>
@import "assets/css/global.css";
</style>
