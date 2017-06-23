
<template>
	<div>
		<h1><img src="./assets/logo.png" alt=""></h1>
		<div class='a'>
			<router-link to="/left">详情</router-link>
			<router-link to="/right">总计</router-link>
		</div>
		<transition name="router-fade" mode="out-in">
			<router-view></router-view>
		</transition>
	</div>
</template>

<style lang="scss" scoped>
	.router-fade-enter-active, .router-fade-leave-active {
	  	transition: opacity .2s;
	}
	.router-fade-enter, .router-fade-leave-active {
	  	opacity: 0;
	}
	h1{
		text-align: center;
	}
	.a{
		display: flex;
		justify-content: space-around;
		a{
			font-size: 40px;
		}
	}
</style>
