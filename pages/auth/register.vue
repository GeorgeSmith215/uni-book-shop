<template>
	<view class="wrap">
		<!-- 昵称 -->
		<!-- 邮箱 -->
		<!-- 密码 -->
		<!-- 确认密码 -->
		<!-- 注册按钮 -->
		<view class="top"></view>
		<view class="content">
			<view class="title">感谢加入小书店</view>
			<input class="u-border-bottom" v-model="name" placeholder="请输入昵称" />
			<input class="u-border-bottom" v-model="email" placeholder="请输入邮箱" />
			<input class="u-border-bottom" type="password" v-model="password" placeholder="请输入密码" />
			<input class="u-border-bottom" type="password" v-model="password_confirmation" placeholder="请确认密码" />
			<button @tap="$u.throttle(submit,500)" :style="[inputStyle]" class="getCaptcha">注册</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: '',
				email: '',
				password: '',
				password_confirmation: ''
			}
		},
		computed: {
			inputStyle() {
				let style = {};
				if(this.name && uni.$u.test.email(this.email) && this.password && this.password_confirmation) {
					style.color = "#fff";
					style.backgroundColor = this.$u.color['warning'];
				}
				return style;
			}
		},
		methods: {
			/**
			 * 执行注册
			 */
			async submit(){
				// 1.表单验证
				if(!this.name || !uni.$u.test.email(this.email) || !this.password || !this.password_confirmation) return;
				// 2.准备提交参数
				const params = {
					name: this.name,
					email: this.email,
					password: this.password,
					password_confirmation: this.password_confirmation
				}
				// 3.请求API，执行注册
				const res = await this.$u.api.authRegister(params);
				// console.log(res);
				// 4.注册成功之后，重定向到登录(redirect)
				uni.$u.toast('注册成功，跳转登录');
				setTimeout(() => {
					uni.$u.route({
						type: 'redirectTo',
						url: 'pages/auth/login',
					})
				}, 1500)
			}
		}
	}
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
			justify-content: space-between;
			margin-top: 30rpx;
		}
	}
}
</style>
