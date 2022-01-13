<template>
	<view class="wrap">
		<template v-if="Object.keys(goods).length">
			<!-- 商品信息展示 -->
				<view class="goods-show">
					<!-- 图片展示 -->
					<view class="goods-cover">
						<image  mode="heightFix" :src="goods.cover_url"></image>
					</view>
					<view>
						<!-- 商品基本信息 -->
						<view class="base-info">
							<text class="title">{{goods.title}}</text>
							<view class="goods-details">
								<view class="price">￥{{goods.price}}</view>
								<view class="stocks">库存:{{goods.stock}}</view>
								<view class="sales">销量:{{goods.sales}}</view>
							</view>
						</view>
						<!-- tabs组件 -->
						<u-tabs :list="tabsList" :is-scroll="false" :current="tabsCurrent" @change="tabsChange"></u-tabs>
						<view class="tabs">
							<!-- 商品详情区 -->
							<template v-if="tabsCurrent==0">
								<u-parse :content="goods.details"></u-parse>
							</template>
							<!-- 商品评论区 -->
							<template v-if="tabsCurrent==1">
								<template v-if="goods.comments.length">
									<view class="comment" v-for="(res, index) in commentList" :key="index">
										<view class="left">
											<image :src="res.user.avatar_url" mode="aspectFill"></image>
										</view>
										<view class="right">
											<view class="top">
												<view class="name">{{ res.user.name }}</view>
												<!-- <view class="like" :class="{ highlight: res.isLike }">
													<view class="num">{{ res.star }}</view>
													<u-icon v-if="!res.isLike" name="thumb-up" :size="30" color="#9a9a9a"></u-icon>
												</view> -->
											</view>
											<view class="content">{{ res.content }}</view>
											<!-- <view class="reply-box">
												<view class="text">{{ res.reply }}</view>
											</view> -->
											<view class="bottom">
												{{ res.created_at }}
											</view>
										</view>
									</view>
								</template>
								<template v-else>
									<!-- 评论为空 -->
									<u-empty text="暂无评论" src="order"></u-empty>
								</template>
							</template>
							<!-- 商品推荐区 -->
							<template v-if="tabsCurrent==2">
								<u-grid
										:border="false"
										@click="click"
										col="2"
								>
									<u-grid-item
											v-for="(goods,index) in likeGoods" 
											:key="index"
									>
										<goods-card :goodsItem="goods"></goods-card>
									</u-grid-item>
								</u-grid>
							</template>
						</view>
					</view>
				</view>
				<!-- 提交订单栏 -->
				<view class="navigation">
					<view class="left">
						<view class="item" @tap="collect">
							<u-icon v-if="!isCollect" name="star" :size="40"></u-icon>
							<u-icon v-else name="star-fill" :size="40" color="#ffff7f"></u-icon>
							<view class="text">{{isCollect?"已收藏":"收藏"}}</view>
						</view>
						<view class="item" @tap="toCart">
							<u-badge :max="99" :value="cartCount" bgColor="#ff0000" :absolute="true" :offset="[0,-4]"></u-badge>
							<u-icon name="shopping-cart" :size="40"></u-icon>
							<view class="text">购物车</view>
						</view>
					</view>
					<view class="right">
						<u-button :disabled="goods.stock?false:true" class="cart btn" @click="addCart" :ripple="true" type="primary">加入购物车</u-button>
					</view>
				</view>
		</template>
		<template v-else>
			<view class="loading">
				<u-loading-icon text="拼命加载中~" textSize="18"></u-loading-icon>
			</view>
		</template>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 商品基本信息
				goods: {},
				// 推荐商品
				likeGoods: {},
				tabsList: [{
					name: '商品详情'
				}, {
					name: '商品评论',
					count:0
				}, {
					name: '推荐商品'
				}],
				tabsCurrent: 0,
				commentList: {},
				goodsId: null,
				isCollect:0,
				cartCount:0
			}
		},
		onLoad(option) {
			// console.log(option);
			this.goodsId = option.id
			// 获取商品基本信息
			this.getBaseInfo()
			// 获取购物车商品数量
			this.cartLen()
		},
		methods: {
			// 获取商品信息接口
			async getBaseInfo(){
				const res = await this.$u.api.goodsInfo(this.goodsId);
				console.log(res);
				// 商品基本信息
				this.goods = res.goods
				// 是否收藏
				this.isCollect=res.goods.is_collect
				// 商品评论
				this.commentList=res.goods.comments
				this.tabsList[1].count=res.goods.comments.length
				// 推荐商品
				this.likeGoods = res.like_goods
			},
			// 切换tabs
			tabsChange(event) {
				this.tabsCurrent = event.index
			},
			// 收藏节流
			collect(){
				this.$u.throttle(this.collectNot,1500)
			},
			// 收藏和取消收藏
			async collectNot(){
				if(!this.$u.utils.isLogin()){}// 如果没有登录先去登录
				else{
					// 收藏和取消收藏提示
					if(this.isCollect){
						this.$u.toast("取消收藏成功")
					}else{
						this.$u.toast("收藏成功")
					}
					this.isCollect=!this.isCollect
					// 请求收藏API
					await this.$u.api.goodsCollect(this.goodsId)
				}
			},
			// 添加购物车(自带节流效果)
			async addCart(){
				if(!this.$u.utils.isLogin()){}// 如果没有登录先去登录
				else{
					// 准备参数
					const params={goods_id:this.goodsId}
					// 发送请求
					const res= await this.$u.api.cartsAdd(params)
					// 提示消息
					this.$u.toast("添加购物车成功！")
					this.cartCount++
				}
			},
			/**
			 * 获取购物车数量
			 */
			async cartLen(){
				// 如果登录成功在调用这个接口
				if(this.$store.state.vuex_access_token){
					// 获取购物车商品数量
					const res=await this.$u.api.cartsList()
					// console.log(res);
					// 累加总的商品数量
					this.cartCount=res.data.reduce((pre,item)=>{
						 return parseInt(pre) + parseInt(item.num);
					},0)
				}
			},
			/* 跳转到购物车页面 */
			toCart(){
				if(!this.$u.utils.isLogin()){}
				else{
					// TODO 新加入的商品不会显示
					this.$u.route({type:'switchTab',url:'pages/cart/cart'})
				}
			},
			click(event){
				// console.log(event);
			}
		}
	};
</script>

<style lang="scss" scoped>
	.wrap {
		height: 90vh;
		.loading{
			text-align: center;
			position: absolute;
			top: 50%;
			left:50%;
			transform:translate(-50%,-50%);
		}
		.goods-show {
			text-align: center;
			.goods-cover{
				margin: auto;
			}
			.base-info {
				.title{
					font-size: 40rpx;
					font-weight: bold;
				}
				.goods-details{
					margin: 8rpx 0;
					display: flex;
					justify-content: space-around;
					.price {
						font-size: 36rpx;
						font-weight: bolder;
						color: rgb(209, 45, 58);
					}
					.stocks{
						font-size: 30rpx;
						color: grey;
					}
					.sales{
						font-size: 30rpx;
						color: grey;
					}
				}
			}
			
			.tabs{
				padding-bottom: 180rpx;
			}

			.comment {
				display: flex;
				padding: 30rpx;

				.left {
					image {
						width: 64rpx;
						height: 64rpx;
						border-radius: 50%;
						background-color: #f2f2f2;
					}
				}

				.right {
					flex: 1;
					padding-left: 20rpx;
					font-size: 30rpx;

					.top {
						display: flex;
						justify-content: space-between;
						align-items: center;
						margin-bottom: 10rpx;

						.name {
							color: #5677fc;
						}

						.like {
							display: flex;
							align-items: center;
							color: #9a9a9a;
							font-size: 26rpx;

							.num {
								margin-right: 4rpx;
								color: #9a9a9a;
							}
						}

						.highlight {
							color: #5677fc;

							.num {
								color: #5677fc;
							}
						}
					}

					.content {
						margin-bottom: 10rpx;
					}

					.reply-box {
						background-color: rgb(242, 242, 242);
						border-radius: 12rpx;
						text-indent: 1em;
						.item {
							padding: 20rpx;
							border-bottom: solid 2rpx $u-border-color;

							.username {
								font-size: 24rpx;
								color: #999999;
							}
						}

						.all-reply {
							padding: 20rpx;
							display: flex;
							color: #5677fc;
							align-items: center;

							.more {
								margin-left: 6rpx;
							}
						}
					}

					.bottom {
						margin-top: 20rpx;
						display: flex;
						font-size: 24rpx;
						color: #9a9a9a;

						.reply {
							color: #5677fc;
							margin-left: 10rpx;
						}
					}
				}
			}
		}

		// min-height: 100vh;
		.navigation {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			display: flex;
			border: solid 2rpx #f2f2f2;
			background-color: #ffffff;
			padding: 16rpx 0;
			justify-content: space-between;
			.left {
				flex:3;
				display: flex;
				font-size: 20rpx;
				justify-content: space-around;
				.item {
					position: relative;
					text-align: center;
				}
			}

			.right {
				flex:9;
				display: flex;
				font-size: 28rpx;
				justify-content: flex-end;
				align-items: center;
				.btn {
					text-align: center;
					line-height: 66rpx;
					width: 90%;
					border-radius: 10rpx;
					color: #ffffff;
				}

				.cart {
					background-color: #2979ff;
					margin-right: 30rpx;
				}

				.buy {
					background-color: #ff7900;
				}
			}
		}
	}
</style>
