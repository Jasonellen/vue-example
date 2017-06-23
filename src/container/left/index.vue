<template>
  <div class="detail">
    <ul>
    	<li v-for="item in datas">
    		<img src="../../assets/logo.png" alt="">
				<div class="right">
					<i>${{item.price}}</i>
					<button @click='incrementAction(item.id)'>+</button>
					<span>{{item.count}}</span>
					<button @click='decrementAction(item.id)'>-</button>
				</div>
    	</li>
    </ul>
		<div class='total'>
			<span>总数量:{{totalCount}}个</span>
			<span>总价格:${{totalPrice}}</span>
		</div>
  </div>
</template>
<style src='./index.scss' lang='scss' scoped></style>
<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

export default {
	data: function () {
		return {}
	},
	// mapState, mapGetters需要绑定在computed上，绑定到data上无效
	computed: {
		/* ****     State    ****  */
		// ...mapState({    没有命名空间的写法
		// 	items: state => state.left.data
		// }),
		...mapState('left', [  // 有命名空间的写法（可以将模块名公用）
			// items: state => state.data
			'datas'
		]),

		/* ****     Getters    ****  */
		// totalCount () {  // 没有命名空间的写法
		// 	return this.$store.getters['left/totalCount']
		// },
		...mapGetters('left', [ // 有命名空间的写法（可以将模块名公用）
			'totalCount',
			'totalPrice'
		])
	},
	methods: {
		...mapActions('left', [
			'incrementAction',
			'decrementAction'
		])
		// ...mapMutations('left', [  //暂时没用到
		// 	'increment',
		// 	'decrement'
		// ])
	}
}
</script>
