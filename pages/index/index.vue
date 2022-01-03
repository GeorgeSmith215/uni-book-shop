<template>
	<view class="content">
		首页
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		async onLoad() {
			// 如果想要在http请求异常的时候代码还能继续运行，则需要使用try，catch
			// try{
			// 	const res = await uni.$u.http.post('/api/auth/wx/bind');
			// 	console.log(res);
			//  console.log('1122');
			// }catch(e){
				
			// }
			
			// 测试新增的patch命令
			// const res = await uni.$u.http.patch('/api/orders/1/confirm',{name:'Tom'})
			// console.log(res);
			// console.log('1122');
			
			//测试登录（API集中管理）
			// const data = {
			// 	email:'test@a.com',
			// 	password:'123123'
			// }
			// const res = await uni.$u.api.authLogin(data);
			// console.log(res);
			
			// 测试vuex，在vuex中使用的变量最好加上“vuex_”前缀
			// 而且vuex中定义的数据是绑定到Vue实例中的，可以直接像在data中一样使用
			// console.log(this.vuex_version);
			// 设置vuex
			// this.$u.vuex('vuex_userInfo.name','Sam');
			// console.log(this.vuex_userInfo);
			// this.$u.vuex('vuex_name','George');
			// console.log(this.vuex_name);
		},
		methods: {

		}
	}
</script>

<style>
</style>
