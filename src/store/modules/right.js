
const state = {
	test: 1
}
// getters
const getters = {
	totalCount: (state, getters, rootState) => {
		return rootState.left.datas.reduce(function (prev, next) {
			return prev.count + next.count
		})
	},
	totalPrice: (state, getters, rootState) => {
		return rootState.left.datas.reduce(function (prev, next) {
			return prev.count * prev.price + next.count * next.price
		})
	}
}

export default {
	state,
	getters,
	namespaced: true
}
