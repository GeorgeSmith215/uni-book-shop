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
			const res = await uni.$u.http.post('/api/auth/wx/bind');
			console.log(res);
			console.log('1122');
		},
		methods: {

		}
	}
</script>

<style>
</style>
