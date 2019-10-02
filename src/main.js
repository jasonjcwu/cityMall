// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'vue-awesome-swiper/node_modules/swiper/dist/css/swiper.css'

import Axios from 'axios'


import { Button, Row, Col, Swipe, SwipeItem, lazyload, List, Field, NavBar } from 'vant'

Vue.use(Button).use(Row).use(Col).use(Swipe).use(SwipeItem).use(lazyload).use(List).use(Field).use(NavBar)

Vue.config.productionTip = false

// 设置axios
Vue.prototype.$axios = Axios
    // Axios.defaults.baseURL = '/apis'
Axios.defaults.headers.post['Content-Type'] = 'application/json'
    //'Content-Type': 'application/x-www-form-urlencoded',
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})