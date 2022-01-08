<template>
	<navigator class="goods-item">
		<!-- 商品图片，通过loading自定义插槽，结合uView的u-loading组件，实现加载中效果 -->
		<u--image :src="goodsItem.cover_url" height="300rpx" width="300rpx" radius="10">
		  <template v-slot:loading>
			<u-loading-icon color="blue"></u-loading-icon>
		  </template>
		  <view slot="error" style="font-size: 24rpx;">加载失败</view>
		</u--image>
		<!-- 商品名称 -->
		<view class="goodsTitle u-line-1">{{goodsItem.title}}</view>
		<!-- 商品详细数据 -->
		<view class="goodsDetails">
			<view class="price">￥{{goodsItem.price}}</view>
			<view class="sales">销量：{{goodsItem.sales}}</view>
		</view>
	</navigator>
</template>

<script>
	export default {
		name:"goods-card",
		props:{
			goodsItem:{
				type:Object,
				// 如果默认值为对象，则需要写成函数形式（与data类似）
				default(){
					return {};
				}
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
.goods-item{
	padding: 28rpx;
	// margin-top: 20rpx;
	box-shadow: 5rpx 15rpx 15rpx 0 rgba(0,0,0,.1);
	border-radius: 10rpx;
	.goodsTitle{
		margin: 10rpx 0;
		font-weight: 500;
		font-size: 28rpx;
		max-width: 300rpx;
	}
	.goodsDetails{
		display: flex;
		justify-content: space-between;
	}
	.price{
		font-size: 26rpx;
		color:red;
	}
	.sales{
		font-size: 26rpx;
		color: #888;
	}
}
</style>
