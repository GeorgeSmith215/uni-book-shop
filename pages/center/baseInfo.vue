<template>
	<view class="userForm">
		<view class="">
			<u--form :model="form" :errorType="errorType" ref="uForm">
				<u-form-item label="昵称" prop="name" required>
					<u-input v-model="form.name" />
				</u-form-item>
			</u--form>
			<u-button @click="submit" class="formBtn">提交</u-button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			form: {
				name: '',
			},
			errorType: 'message',
			rules: {
				name: [
					{
						required: true,
						message: '请输入昵称',
						trigger: ['blur', 'change']
					}
				]
			},
		};
	},
	onReady() {
		this.form.name = this.vuex_userInfo.name;
		this.$refs.uForm.setRules(this.rules);
	},
	methods: {
		submit() {
			this.$refs.uForm.validate().then(async (valid) => {
				if(valid){
					// console.log(this.form);
					// 更新用户信息
					await this.$u.api.userInfoUpdate(this.form);
					// 刷新用户信息，更新vuex_user
					this.$u.utils.updateUser();
					
					uni.$u.toast('修改成功');
				}
			}).catch(errors => {
				uni.$u.toast('修改失败')
			})
		}
	},
};
</script>

<style>
.userForm{
	margin: 0 50rpx;
}
.formBtn{
	margin: 20rpx 0;
}
</style>
