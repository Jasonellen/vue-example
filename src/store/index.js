import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import VuexPersistence from 'vuex-persist'
Vue.use(Vuex)

import left from './modules/left'
import right from './modules/right'
const vuexLocal = new VuexPersistence({
	storage: window.sessionStorage
})
export default new Vuex.Store({
	modules: {
		left,
		right
	},
	plugins: process.env.NODE_ENV === 'development' ? [createLogger({collapsed: false}), vuexLocal.plugin] : [vuexLocal.plugin]
})

// ****可以自己编写插件，像下面这样，只要返回一个store作为参数的function就行 ***/
// 同步socket数据源到store：
// 	① socket监听到data -> store commit receiveData
// 	② store监听到commit mutation -> socket触发update到后台
// export default function createWebSocketPlugin (socket) {
//   return store => {
//     socket.on('data', data => {
//       store.commit('receiveData', data)
//     })
//     store.subscribe(mutation => {
//       if (mutation.type === 'UPDATE_DATA') {
//         socket.emit('update', mutation.payload)
//       }
//     })
//   }
// }
// const plugin = createWebSocketPlugin(socket)
// const store = new Vuex.Store({
//   state,
//   mutations,
//   plugins: [plugin]
// })

