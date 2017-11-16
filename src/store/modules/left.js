
// initial state
const state = {
	datas: [{id: 1, count: 2, price: 15}, {id: 2, count: 5, price: 21}]
}

// getters
const getters = {
	totalCount: (state, getters, rootState) => {
		// getters将可以取到totalCount 和 totalPrice
		// rootState将可以同时取到right moudle中的state->test
		return state.datas.reduce(function (prev, next) {
			return prev.count + next.count
		})
	},
	totalPrice: state => {
		return state.datas.reduce(function (prev, next) {
			return prev.count * prev.price + next.count * next.price
		})
	}
}

// actions  相当于异步mutations
const actions = {
	incrementAction ({state, commit}, id) {
		let datas = state.datas
		let item = datas.find(function (item) {
			return item.id == id
		})
		item.count++
		commit('increment', datas)
	},
	decrementAction ({state, commit}, id) {
		let datas = state.datas
		let item = datas.find(function (item) {
			return item.id == id
		})
		item.count--
		commit('decrement', datas)
	}
}

// mutations
const mutations = {
	increment(state, payload){
		state.datas = payload
	},
	decrement (state, payload) {
		state.datas = payload
	}
}

export default {
	state,
	getters,
	actions,
	mutations,
	namespaced: true // 带命名空间后合并mapSate.. 才可以将模块名字放在第一个参数
}
