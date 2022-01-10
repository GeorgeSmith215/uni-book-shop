<template>
	<view>
		<u-upload
			@afterRead="afterRead"
			@oversize="oversize"
			:maxSize="5 * 1024 * 1024"
			max-count="1"
			:deletable="false"
		>
			<image :src="userAvatarUrl" class="userAvatar"></image>
		</u-upload>
	</view>
</template>

<script>
	export default {
		name:"oss-upload",
		data() {
			return {
				userAvatarUrl: this.$store.state.vuex_userInfo.avatar_url,
				uploadUrl: '',
				upFileName:'',
				formDate:{}
			};
		},
		methods:{
			oversize(){
				uni.$u.toast('文件过大！');
			},
			/**
			 * @param {Object} url
			 */
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: this.uploadUrl,
						filePath: url,
						name: 'file',
						formData: this.formDate,
						success: async (res) => {
							// 请求API更新头像
							await this.$u.api.userAvatar({avatar: this.upFileName});
							
							// 更新缓存的用户信息
							this.$u.utils.updateUser();
							
							uni.$u.toast('更新成功');
							setTimeout(() => {
								resolve(res)
							}, 1000)
						}
					});
				})
			},
			/**
			 * @param {Object} event
			 * 读取图片后的钩子
			 */
			async afterRead(event){
				const ossToken = await this.$u.api.authOssToken();
				// console.log(ossToken);
				// console.log(event);
				
				// 设置上传域名
				this.uploadUrl = ossToken.host;
				
				// 处理唯一文件名
				this.upFileName = this.$u.guid(20) + '.png'
				
				// 额外的上传参数
				this.formDate = {
					'key': this.upFileName,
					'policy': ossToken.policy,
					'OSSAccessKeyId': ossToken.accessid,
					'success_action_status': '200',
					'signature': ossToken.signature
				}
				const res = await this.uploadFilePromise(event.file.thumb);
				this.userAvatarUrl = event.file.url;
				// console.log(res);
			}
		}
	}
</script>

<style>
.userAvatar{
	width: 180rpx;
	height: 180rpx;
	border-radius: 30rpx;
}
</style>
