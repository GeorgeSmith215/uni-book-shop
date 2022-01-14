<template>
	<view>
		<view v-if="collectionList.length">
			<u-grid
					:border="false"
					col="2"
			>
				<u-grid-item
						v-for="(goodsItem,goodsIndex) in collectionList"
						:key="goodsIndex"
				>
					
					<!-- 商品卡片组件 -->
					<goods-card :goodsItem="goodsItem.goods"></goods-card>
				</u-grid-item>
			</u-grid>
		</view>
		<view v-else class="empty">
			<u-empty text="暂无收藏" mode="favor"></u-empty>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				collectionList: [], // 收藏数据列表
			}
		},
		async onLoad() {
			const res = await this.$u.api.collects()
			this.collectionList = res.data
			// console.log(res.data)
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.goods-item {
		padding: 20rpx;
		margin-bottom: 20rpx;
		box-shadow: 0 12rpx 20rpx rgba(0, 0, 0, .1);

		// 标题
		.name {
			font-size: 32rpx;
			font-weight: bold;
			margin-top: 20rpx;
			margin-bottom: 20rpx;
			width: 100%;
		}

		// 价格
		.price {
			width: 100%;
			color: red;
		}
	}
</style>
