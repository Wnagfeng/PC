import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/views/layout'
import index from '@/views/home/index'
import login from '../views/login/login'
import userCenter from '../views/userCenter/userCenter'
import recharge from '../views/userCenter/recharge/recharge'
import myOrder from '../views/userCenter/myOrder/myOrder'
import userInfo from '../views/userCenter/userInfo/userInfo'
import browseRecords from '../views/userCenter/browseRecords/browseRecords'
import signingAddress from '../views/userCenter/signingAddress/signingAddress'
import favorites from '../views/userCenter/favorites/favorites'
// 自己引入的路由
import orderDetail from '../views/orderDetail/index.vue'//1.订单详情
import productDetail from '../views/productDetail/index.vue'//2.商品详情
import placeOrder from '../views/placeOrder/placeOrder.vue'//3.下单
import evaluate from '../views/evaluate/index.vue'//评价页面
import category from '../views/category/category.vue'//分类页面

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'layout',
            component: layout,
            redirect: { name: 'index' },
            children: [
                // 首页
                {
                    path: '/index',
                    name: 'index',
                    component: index,
                    meta: {
                        logoText: '',
                        searchVisible: true
                    }
                },
                // 用户中心
                {
                    path: '/userCenter',
                    name: 'userCenter',
                    component: userCenter,
                    meta: {
                        logoText: '',
                        searchVisible: false
                    },
                    children: [
                        // 钱包
                        {
                            path: '/recharge',
                            name: 'recharge',
                            component: recharge,
                            meta: {
                                logoText: '',
                                searchVisible: false
                            }
                        },
                        // 地址
                        {
                            path: '/signingAddress',
                            name: 'signingAddress',
                            component: signingAddress,
                            meta: {
                                logoText: '',
                                searchVisible: false
                            }
                        },
                        // 订单
                        {
                            path: '/myOrder',
                            name: 'myOrder',
                            component: myOrder,
                            meta: {
                                logoText: '',
                                searchVisible: false
                            }
                        },
                        // 个人信息
                        {
                            path: '/userInfo',
                            name: 'userInfo',
                            component: userInfo,
                            meta: {
                                logoText: '',
                                searchVisible: false
                            }
                        },
                        // 足迹
                        {
                            path: '/browseRecords',
                            name: 'browseRecords',
                            component: browseRecords,
                            meta: {
                                logoText: '',
                                searchVisible: false
                            }
                        },
                        // 收藏
                        {
                            path: '/favorites',
                            name: 'favorites',
                            component: favorites,
                            meta: {
                                logoText: '',
                                searchVisible: false
                            }
                        },

                    ]
                },
                // 自己添加的路由
                // 1.订单详情
                {
                    path: '/orderDetail',
                    name: 'orderDetail',
                    component: orderDetail,
                    meta: {
                        logoText: '',
                        searchVisible: true
                    }

                },
                // 2.商品详情
                {
                    path: '/productDetail',
                    name: 'productDetail',
                    component: productDetail,
                    meta: {
                        logoText: '',
                        searchVisible: true
                    }
                },
                // 3.下单
                {
                    path: '/placeOrder',
                    name: 'placeOrder',
                    component: placeOrder,
                    meta: {
                        logoText: '',
                        searchVisible: true
                    }
                },
                // 4.订单完成评价页面
                {
                    path: '/evaluate',
                    name: 'evaluate',
                    component: evaluate,
                    meta: {
                        logoText: '',
                        searchVisible: true
                    }

                },
                // 5.分类页面
                {
                    path: "/category",
                    name: "category",
                    component: category,
                    meta: {
                        logoText: '',
                        searchVisible: true
                    }
                }
            ]
        },
        // 登录
        {
            path: '/login',
            name: 'login',
            component: login
        }
    ]
})

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

router.beforeEach((to, from, next) => {
    // cookie没有值就跳到登陆页
    // let area = sessionStorage.getItem('area')
    // if (area === null && to.name !== 'login' && to.name !== 'overview') {
    //   // Vue.prototype.$message.error('用户未登陆')
    //   next('/login')
    // } else {
    next()
    // }
})

export default router
