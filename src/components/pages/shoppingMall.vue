<template>
  <div>
    <div class="search-bar">
      <van-row class="test-row">
        <van-col span="3">icon</van-col>
        <van-col span="16">search</van-col>
        <van-col span="5">button</van-col>
      </van-row>
    </div>
    <!-- <van-button type="primary">主要按钮</van-button> -->
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to 主页"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.search-bar{
    height: 2.2rem;
    background: #e5017b;
    line-height: 2.2rem;
}
</style>
