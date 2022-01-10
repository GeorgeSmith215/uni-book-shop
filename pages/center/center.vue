<template>
	<view>
		<view class="user-box">
			<view class="user-avatar">
				<oss-upload></oss-upload>
			</view>
			<view class="user-info">
				<view class="user-name">{{vuex_userInfo.name}}</view>
				<view class="user-email u-font-14 u-tips-color">邮箱:{{vuex_userInfo.email}}</view>
			</view>
		</view>
		
		<view class="cell-group">
			<u-cell-group>
				<u-cell icon="setting" title="个人信息" rightIcon='arrow-right' :isLink="true"  arrow-direction="right" size="large" @click="toBaseInfo"></u-cell>
			</u-cell-group>
		</view>
		
		<view class="cell-group">
			<u-cell-group>
				<u-cell icon="rmb-circle" title="所有订单" rightIcon='arrow-right' :isLink="true"  arrow-direction="right" size="large"></u-cell>
				<u-cell icon="star" title="商品收藏" :isLink="true"  arrow-direction="right" size="large"></u-cell>
				<u-cell icon="home" title="收货地址" :isLink="true"  arrow-direction="right" size="large"></u-cell>
			</u-cell-group>
		</view>
		
		<view class="cell-group">
			<u-cell-group>
				<u-cell icon="reload" :isLink="true"  title="退出登录" size="large" @click="logout"></u-cell>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pic:'https://uviewui.com/common/logo.png',
				show:true
			}
		},
		onLoad() {
			
		},
		methods: {
			toBaseInfo(){
				this.$u.route({
					url: 'pages/center/baseInfo'
				})
			},
			// 退出登录
			async logout(){
				// 请求API,退出登录
				await this.$u.api.authLogout();
				
				uni.$u.toast('退出成功');
				
				setTimeout(()=>{
					// 清除缓存的token和用户信息
					this.$u.vuex('vuex_access_token',null);
					// 设置userInfo为空对象防止一些地方报错
					this.$u.vuex('vuex_userInfo',{});
					
					// 跳转到首页
					uni.$u.route({
						type: 'reLaunch',
						url: 'Pages/index/index'
					})
				},1500);
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: #ededed;
}
.cell-group{
	background-color: #fff;
	margin: 20rpx 0;
}
.user-box{
	display: flex;
	padding: 30rpx;
	background-color: #fff;
	align-items: center;
	.user-info{
		padding: 20rpx;
		.user-name{
			font-size: 36rpx;
			font-weight: bold;
		}
		.user-email{
			font-size: 28rpx;
		}
	}
}

</style>
