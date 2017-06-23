
import App from '@/App.vue'
const left = r => require.ensure([], () => r(require('../container/left')), 'left')
const right = r => require.ensure([], () => r(require('../container/right')), 'right')
export default[{
	path: '/',
	component: App,
	children: [
		{path: '', redirect: '/left'},   // 地址为空时跳转left页面
		{path: '/left', component: left, meta: {savedPosition: true}}, // 购物车页面
		{path: '/right', component: right, meta: {savedPosition: true}} // Count页面
	] // meta: {savedPosition: true}是为了这个路由跳转记录滚动值用的->main.js
}]
