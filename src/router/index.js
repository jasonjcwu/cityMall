import Vue from 'vue'
import Router from 'vue-router'
import ShoppingMall from '@/components/pages/ShoppingMall'
import Register from '@/components/pages/Register'
import Login from '@/components/pages/Login'
import Goods from '@/components/pages/Goods'
import CategoryList from '@/components/pages/CategoryList'
import Cart from '@/components/pages/Cart'
import User from '@/components/pages/User'
import Tab from '@/components/pages/Tab'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'ShoppingMall',
            component: ShoppingMall,
            meta: {
                keepAlive:true
            }
        },
        {
            path: '/CategoryList',
            name: 'CategoryList',
            component: CategoryList,
            meta: {
                keepAlive:true
            }
        },
        {
            path: '/Cart',
            name: 'Cart',
            component: Cart,
            meta: {
                keepAlive:false
            }
        },
        {
            path: '/User',
            name: 'User',
            component: User,
            meta: {
                keepAlive:true
            }
        },

        {
            path: '/register',
            name: 'Register',
            component: Register,
            meta: {
                fullScreen: true,
                keepAlive:false
            }
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
            meta: {
                fullScreen: true,
                keepAlive:false
            }
        },
        {
            path: '/Goods',
            name: 'Goods',
            component: Goods,
            meta: {
                fullScreen: true,
                keepAlive:false //不需要被缓存的组件
            }
        },
        {
            path: '*',
            name: 'ShoppingMall',
            component: ShoppingMall,
            meta: {
                keepAlive:true
            }
        }
    ]
})