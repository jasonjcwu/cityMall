<template>
  <div>
    <van-tabbar
      v-model="active"
    >
      <van-tabbar-item icon="shop" to='/'>首页</van-tabbar-item>
      <van-tabbar-item icon="records" to='/CategoryList'>分类</van-tabbar-item>
      <van-tabbar-item icon="cart" to='/Cart'>购物车</van-tabbar-item>
      <van-tabbar-item icon="contact" to='User'>我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name:'Tab',
  data() {
    return {
      active: 0,
    }
  },
  watch: {
    $route(to, from) {
      console.log(to)
      switch (to.fullPath) {
        case '/':
          this.active = 0;
          break;
        case '/CategoryList':
          this.active = 1;
          break;
        case '/Cart':
          this.active = 2;
          break;
        case '/User':
          this.active = 3;
          break;
        default:
          this.active = 0;
      }
    }
  }
}
</script>

<style scoped>
</style>