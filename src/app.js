
require('es6-promise').polyfill()
require('isomorphic-fetch')
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router'
import store from './store'
import './style/common.scss'
import _fetch from './service/fetch'
global._fetch = _fetch
Vue.use(VueRouter)

const router = new VueRouter({
	routes,
	mode: 'history', //	只有路由模式history才可以有滚动效果
	scrollBehavior (to, from, savedPosition) {
		if (savedPosition) { // 只有通过浏览器的前进后退才会有savedPosition（值是body的offsetTop)
			return savedPosition
		} else {
			return {
				x: 0,
				y: to.meta.savedPosition || 0 // 动态设置滚动值，不需要通过浏览器前进后退也可以
			}
		}
	}
})
router.beforeEach((to, from, next) => {
	if (from.meta.keepAlive) {
		// 记录每次路由离开的body滚动的值（meta.savedPosition必须在router中配置才会有）
		from.meta.savedPosition = document.body.scrollTop
	}
	next()
})
new Vue({
	router,
	store
}).$mount('#app')
