// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'vue-awesome-swiper/node_modules/swiper/dist/css/swiper.css'

import Axios from 'axios'


import {
    Button,
    Row,
    Col,
    Swipe,
    SwipeItem,
    lazyload,
    List,
    Field,
    NavBar,
    Tab,
    Tabs,
    PullRefresh,
    Stepper,
    Tabbar,
    TabbarItem,
    GoodsAction,
    GoodsActionButton,
    GoodsActionIcon,
    Sidebar,
    SidebarItem,
    Icon,
    Cell,
    CellGroup,
} from 'vant'

Vue.use(Button)
    .use(Row)
    .use(Col)
    .use(Swipe)
    .use(SwipeItem)
    .use(lazyload)
    .use(List)
    .use(Field)
    .use(NavBar)
    .use(Tab)
    .use(Tabs)
    .use(PullRefresh)
    .use(Stepper)
    .use(Tabbar)
    .use(TabbarItem)
    .use(GoodsAction)
    .use(GoodsActionIcon)
    .use(GoodsActionButton)
    .use(Sidebar)
    .use(SidebarItem)
    .use(Icon)
    .use(Cell)
    .use(CellGroup)

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