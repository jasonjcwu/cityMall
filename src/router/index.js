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
            component: ShoppingMall
        },
        {
            path: '/CategoryList',
            name: 'CategoryList',
            component: CategoryList
        },
        {
            path: '/Cart',
            name: 'Cart',
            component: Cart
        },
        {
            path: '/User',
            name: 'User',
            component: User
        },

        {
            path: '/register',
            name: 'Register',
            component: Register,
            meta: {
                fullScreen: true
            }
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
            meta: {
                fullScreen: true
            }
        },
        {
            path: '/Goods',
            name: 'Goods',
            component: Goods,
            meta: {
                fullScreen: true
            }
        },
        {
            path: '*',
            name: 'ShoppingMall',
            component: ShoppingMall,
        }
    ]
})