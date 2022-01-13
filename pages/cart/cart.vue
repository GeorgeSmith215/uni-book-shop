<template>
	<view>
		<view class="container">
			<view v-if="cartList.length" class="cartItem" v-for="(item, index) in cartList" :key="item.id">
				<view class="left">
					<jiuai-checkbox :value="item.id" @change="changeCheck" ref='checkedBox' :checked="item.is_checked ? true : false"></jiuai-checkbox>
				</view>
				<view class="image">
					<u-image width="200rpx" height="240rpx" border-radius="20"
						:src="item.goods.cover_url"></u-image>
				</view>
				<view class="right">
					<view class="top">
						<view class="title">{{item.goods.title}}</view>
						<view class="desc">{{item.goods.description}}</view>
					</view>
					<view class="bottom">
						<view class="price">
							￥{{item.goods.price}}
						</view>
						<view class="num" style="width: 200rpx;">
							<u-number-box v-model="item.num" @minus="handleNum(item)" @plus="handleNum(item)"></u-number-box>
						</view>
						<view class="icon" @click="del(item.id)">
							<u-icon name="trash" size="30"></u-icon>
						</view>
					</view>
				</view>
			</view>
			<view class="empty" v-else>
				<u-empty text="购物车空空如也" mode="car"></u-empty>
			</view>
		</view>
		<view class="footer">
			<view class="checkboxAll">
				<u-checkbox-group>
					<u-checkbox :checked="allCheck" size="30" shape="circle" label="全选" name="全选" @change="allCheckClick"></u-checkbox>
				</u-checkbox-group>
			</view>
			<view class="bottom-check">
				<view class="total-price">
					<text class="title">合计:</text>
					<text class="price">￥{{totalPrice}}</text>
				</view>
				<view>
					<u-button type="error" :ripple="true" shape="square" disabled>去结算</u-button>
				</view>
			</view>
		</view>
		<u-modal :show="show" content="确认要移除商品吗？" :show-cancel-button="true" @cancel="show = false" @confirm="confirm"></u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cardId: '',// 要删除的id
				cartList: [],// 购物车数据列表
				show: false,// 删除提示
				checkboxList: [],
				// dataList: [
				// 	{
				// 		id: 1,
				// 		store: '夏日流星限定贩卖',
				// 		deal: '交易成功',
		// 				goodsUrl: '//img13.360buyimg.com/n7/jfs/t1/103005/7/17719/314825/5e8c19faEb7eed50d/5b81ae4b2f7f3bb7.jpg',
		// 				title: '【冬日限定】现货 原创jk制服女2020冬装新款小清新宽松软糯毛衣外套女开衫短款百搭日系甜美风',
		// 				type: '灰色;M',
		// 				deliveryTime: '付款后30天内发货',
		// 				price: '348.58',
		// 				number: 2,
		// 				is_checked: 1
				// 	},
				// 	{
				// 		id: 2,
				// 		store: '江南皮革厂',
				// 		deal: '交易失败',
		// 				goodsUrl: '//img14.360buyimg.com/n7/jfs/t1/60319/15/6105/406802/5d43f68aE9f00db8c/0affb7ac46c345e2.jpg',
		// 				title: '【冬日限定】现货 原创jk制服女2020冬装新款小清新宽松软糯毛衣外套女开衫短款百搭日系甜美风',
		// 				type: '粉色;M',
		// 				deliveryTime: '付款后7天内发货',
		// 				price: '128.05',
		// 				number: 1,
		// 				is_checked: 1
				// 	},
				// 	{
				// 		id: 3,
				// 		store: '三星旗舰店',
				// 		deal: '交易失败',
		// 				goodsUrl: '//img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg',
		// 				title: '三星（SAMSUNG）京品家电 UA65RUF70AJXXZ 65英寸4K超高清 HDR 京东微联 智能语音 教育资源液晶电视机',
		// 				type: '4K，广色域',
		// 				deliveryTime: '保质5年',
		// 				price: '1998',
		// 				number: 3,
		// 				is_checked: 1
				// 	},
				// 	{
				// 		id: 4,
				// 		store: '三星旗舰店',
				// 		deal: '交易失败',
		// 				goodsUrl: '//img10.360buyimg.com/n7/jfs/t22300/31/1505958241/171936/9e201a89/5b2b12ffNe6dbb594.jpg!q90.jpg',
		// 				title: '法国进口红酒 拉菲（LAFITE）传奇波尔多干红葡萄酒750ml*6整箱装',
		// 				type: '4K，广色域',
		// 				deliveryTime: '珍藏10年好酒',
		// 				price: '1543',
		// 				number: 3,
		// 				is_checked: 1
		// 	},
				// 	{
				// 		id: 5,
				// 		store: '三星旗舰店',
				// 		deal: '交易成功',
		// 				goodsUrl: '//img12.360buyimg.com/n7/jfs/t1/52408/35/3554/78293/5d12e9cfEfd118ba1/ba5995e62cbd747f.jpg!q90.jpg',
		// 				title: '企业微信 中控人脸指纹识别考勤机刷脸机 无线签到异地多店打卡机WX108',
		// 				type: '识别效率高',
		// 				deliveryTime: '使用方便',
		// 				price: '451',
		// 				number: 9,
		// 				is_checked: 1
			}
		},
		computed:{
			//合计
			totalPrice(){
				return this.cartList.filter(item => {
					return item.is_checked ? true : false;
				}).reduce((pre,curr) => {
					return parseFloat(pre) + parseFloat(curr.goods.price) * curr.num;
				},0)
			},
			// 全选或全不选
			allCheck: {
				get(){
					return this.cartList.every(item => {
						return item.is_checked;
					});
				},
				set(val){
					console.log(val);
				}
			}
		},
		onLoad() {
			this.getCartList();
		},
		onPullDownRefresh(){
			setTimeout(() => {
				this.getCartList();
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			allCheckClick(val){
				// console.log(val);
				this.checkAll(val)
			},
			// 获取购物车数据
			async getCartList(){
				const res = await this.$u.api.cartsList();
				this.cartList = res.data;
			},
			// 移除购物车数据
			del(id) {
				this.show = true
				this.cardId = id
			},
			async confirm(){
				await this.$u.api.cartsDel(this.cardId)
				this.$u.toast('移除商品成功')
				this.getCartList()
				this.show = false
			},
			//单选
			async changeCheck(event){
				// console.log(this.$refs.checkedBox[event.detail.domId]);
				// this.$refs.checkedBox[event.detail.domId].changeTotrue()
				// console.log(event.detail)
				let idArr = [];
				this.cartList.forEach(item => {
					if(item.is_checked){
						idArr.push(item.id)
					}
				})
				// console.log(idArr);
				if(event.detail.checked){
					// 未选中 -> 选中
					idArr.push(event.detail.value);
				}else{
					//选中状态 -> 未选中状态
					idArr.splice(idArr.indexOf(event.detail.value), 1);
				}
				// 更新选中状态
				// console.log(idArr);
				await this.$u.api.cartsChecked({cart_ids: idArr})
				// 重新获取数据刷新
				this.getCartList();
			},
			// 全选/全不选
			async checkAll(val){
				// console.log(this.$refs.checkedBox);
				let idArr = []
				if(!val){
					// 取消全选
					await this.$u.api.cartsChecked({cart_ids: []});
					this.$refs.checkedBox.forEach(item => {
						item.changeFalse();
						// console.log(item);
					});
				}else{
					// 全选
					this.cartList.map(item => {
						idArr.push(item.id)
					})
					await this.$u.api.cartsChecked({cart_ids: idArr});
					await this.$refs.checkedBox.forEach(item => {
						item.changeTrue();
						// console.log(item);
					})
				}
				this.getCartList();
			},
			
			// 数量增加或减少
			async handleNum(item){
				await this.$u.api.cartsNum(item.id,{num: item.num})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		height: calc(100vh - 298rpx);
		overflow-y: scroll;
		.empty {
			height: 80vh;
		}
		.cartItem {
			width: 100%;
			display: flex;
			align-items: center;
			border: 1rpx solid #eee;
			border-radius: 20rpx;
			margin-bottom: 20rpx;

			.left {
				width: 80rpx;
				height: 80rpx;
				padding: 10rpx;
			}

			.image {}

			.right {
				flex-grow: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				height: 240rpx;
				align-items: flex-start;

				.top {
					margin-top: 10rpx;
					width: 100%;

					text {
						height: 40rpx;
						line-height: 40rpx;
						width: 100%;
						text-align: left;
					}
				}

				.bottom {
					margin-bottom: 10rpx;
					display: flex;
					align-items: center;
					justify-content:space-around;
					width: 100%;

					.price {
						height: 50rpx;
						line-height: 50rpx;
						overflow: hidden;
						color: red;
						font-weight: bold;
						font-size: 35rpx;
					}
				}

			}
		}
	}

	.footer {
		position: fixed;
		display: flex;
		align-items: center;
		justify-content: space-between;
		bottom: 100rpx;
		height: 100rpx;
		line-height: 100rpx;
		width: 100%;
		.checkboxAll{
			margin-left: 10rpx;
		}
		.bottom-check{
			flex-grow: 1;
			display: flex;
			justify-content: space-around;
			align-items: center;
		}
		.price{
			font-weight: bold;
			color: red;
		}
	}
</style>
