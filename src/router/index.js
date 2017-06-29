
import App from '@/App.vue'
const left = r => require.ensure([], () => r(require('../container/left')), 'left')
const right = r => require.ensure([], () => r(require('../container/right')), 'right')
const NotFoundComponent = {template: '<div>not found</div>'}
export default[{
	path: '/',
	component: App,
	children: [
		{path: '', redirect: '/left'}, // 地址为空时跳转left页面
		{path: '/left', component: left, meta: {keepAlive: true}}, // 购物车页面
		{path: '/right', component: right, meta: {keepAlive: true}}, // Count页面
		{path: '*', component: NotFoundComponent}
		// 设置404页面，需要配合connect-history-api-fallback使用
		// {path: '*', redirect: '/'}或者跳转到首页
	]
}]
