<template>
	<view class="wrap">
		<view class="top"></view>
		<view class="content">
			<view class="title">欢迎光临小书店</view>
			<input class="u-border-bottom" v-model="email" placeholder="请输入邮箱" />
			<input class="u-border-bottom" type="password" v-model="password" placeholder="请输入密码" />
			<button @tap="$u.throttle(submit, 500)" :style="[inputStyle]" class="getCaptcha">登录</button>
			<view class="alternative">
				<!-- <view class="password">暂不支持找回密码</view> -->
				<view class="issue" @tap="register">注册</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			email: '',
			password:''
		}
	},
	async onLoad(){

	},
	computed: {
		inputStyle() {
			let style = {};
			if(uni.$u.test.email(this.email) && this.password) {
				style.color = "#fff";
				style.backgroundColor = this.$u.color['warning'];
			}
			return style;
		}
	},
	methods: {
		register(){
			uni.$u.route({
				url:'pages/auth/register'
			});
		},
		async submit() {
			if(!uni.$u.test.email(this.email) || !this.password) return;
			// 处理登录用的参数
			const loginParams = {
				email: this.email,
				password: this.password
			}
			// 请求API，执行登录
			const loginRes = await uni.$u.api.authLogin(loginParams);
			// console.log(loginRes);
			// 缓存token
			uni.$u.vuex('vuex_access_token',loginRes.access_token);
			uni.$u.toast('登录成功');
			// 刷新用户信息，更新vuex_user
			this.$u.utils.updateUser();
			// console.log(userInfo);
			// 登录之后，跳转到来源页
			const backUrl = uni.getStorageSync('back_url') || 'pages/index/index';
			setTimeout(()=>{
				uni.$u.route({
					type: 'reLaunch',
					url: backUrl
				})
			},1500)
		}
	}
};
</script>

<style lang="scss" scoped>
.u-border-bottom{
	margin-bottom: 40rpx !important;
}
.wrap {
	font-size: 28rpx;
	.content {
		width: 600rpx;
		margin: 80rpx auto 0;

		.title {
			text-align: left;
			font-size: 60rpx;
			font-weight: 500;
			margin-bottom: 100rpx;
		}
		input {
			text-align: left;
			margin-bottom: 10rpx;
			padding-bottom: 6rpx;
		}
		.tips {
			color: $u-info;
			margin-bottom: 60rpx;
			margin-top: 8rpx;
		}
		.getCaptcha {
			background-color: rgb(253, 243, 208);
			color: $u-tips-color;
			border: none;
			font-size: 30rpx;
			padding: 12rpx 0;
			
			&::after {
				border: none;
			}
		}
		.alternative {
			color: $u-tips-color;
			display: flex;
			flex-direction: row-reverse;
			justify-content: space-between;
			margin-top: 30rpx;
		}
	}
}
</style>
