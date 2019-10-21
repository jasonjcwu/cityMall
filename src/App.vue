<template>
  <div id="app">
    <keep-alive>
    <router-view/>
    </keep-alive>
    <Tab v-show="!$route.meta.fullScreen" />
  </div>
</template>

<script>
import Tab from '@/components/pages/Tab'
export default {
  name: 'App',
  components:{
    Tab
  }
}
</script>

<style>
#app {
  background-color: #f8f8f8;
  box-sizing: border-box;
}
html, body, #app
  {width:100%;
  height: 100%;}
</style>
