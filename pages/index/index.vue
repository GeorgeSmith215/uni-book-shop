<template>
	<view class="content">
		<!-- swiper滑动窗 -->
		<!-- #ifndef APP-NVUE || MP-TOUTIAO -->
		<view class="u-demo-block">
			<u-swiper
					:list="slides"
					keyName="img_url"
					previousMargin="30"
					nextMargin="30"
					circular
					:autoplay="true"
					radius="5"
					bgColor="#ffffff"
					height="320rpx"
			></u-swiper>
		</view>
		<!-- #endif -->
		
		<!-- 标签选择 -->
		<view>
			<u-tabs :list="tabs" lineWidth='50' :scrollable=false @change="sortChange" sticky></u-tabs>
		</view>
		
		<!-- 商品布局 -->
        <view>
			<u-grid
					:border="false"
					@click="click"
					col="2"
			>
				<u-grid-item
						v-for="(goodsItem,goodsIndex) in goods"
						:key="goodsIndex"
				>
				<navigator class="goods-item">
					<!-- 商品图片，通过loading自定义插槽，结合uView的u-loading组件，实现加载中效果 -->
					<u--image :src=goodsItem.cover_url height="300rpx" width="300rpx" radius="10">
					  <template v-slot:loading>
					    <u-loading-icon color="blue"></u-loading-icon>
					  </template>
					</u--image>
					<!-- 商品名称 -->
					<view class="goodsTitle u-line-1">{{goodsItem.title}}</view>
					<!-- 商品详细数据 -->
					<view class="goodsDetails">
						<view class="price">￥{{goodsItem.price}}</view>
						<view class="sales">销量：{{goodsItem.sales}}</view>
					</view>
				</navigator>
					
				</u-grid-item>
			</u-grid>
		</view>
			
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 标签名数组
				tabs: [
					{
						name: '默认',
					}, {
						name: '销量',
					}, {
						name: '推荐'
					}, {
						name: '最新'
					}
				],
				// 商品数组
				goods: [],
				// 轮播图图片路径数组
				slides:[],
				page:1,
				currentSort:0
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
			
			// 测试新增的patch命令
			// const res = await uni.$u.http.patch('/api/orders/1/confirm',{name:'Tom'})
			// console.log(res);
			// console.log('1122');
			
			//测试登录（API集中管理）
			// const data = {
			// 	email:'test@a.com',
			// 	password:'123123'
			// }
			// const res = await uni.$u.api.authLogin(data);
			// console.log(res);
			
			// 测试vuex，在vuex中使用的变量最好加上“vuex_”前缀
			// 而且vuex中定义的数据是绑定到Vue实例中的，可以直接像在data中一样使用
			// console.log(this.vuex_version);
			// 设置vuex
			// this.$u.vuex('vuex_userInfo.name','Sam');
			// console.log(this.vuex_userInfo);
			// this.$u.vuex('vuex_name','George');
			// console.log(this.vuex_name);
			
			// 用await改造promise使异步操作用同步写法（可以防止回调地狱）
			// uni.$u.api.index().then( res =>{
			// 	console.log(res);
			// 	this.slides = res.slides;
			// 	this.goods = res.goods.data;
			// });
			// 因为数据需要经常获取，把获取数据代码封装在method里
			// const res = await uni.$u.api.index();
			// this.slides = res.slides;
			// this.goods = res.goods.data;
			this.getData()
		},
		methods: {
			sortChange(item){
				// console.log(item);
				this.currentSort = item.index;
				// 重置商品数据和分页
				this.goods = [];
				this.page = 1;
				this.getData();
			},
			click(id) {
				console.log(this.$data.goodsList[id]);
			},
			// 获取数据
			async getData(){
				const params = {
					params:{
						page:this.page,
					}
				}
				// 增加排序条件
				if(this.currentSort === 1) params.params.sales = 1; 
				else if(this.currentSort === 2) params.params.recommend = 1; 
				else if(this.currentSort === 3) params.params.new = 1; 
				const res = await uni.$u.api.index(params);
				this.slides = res.slides;
				this.goods = [...this.goods,...res.goods.data]
			}
		},
		onReachBottom() {
			// 重新请求数据，带上分页参数
			this.page = this.page+1;
			this.getData();
		}
	}
</script>

<style lang="scss" scoped>
	.goods-item{
		padding: 28rpx;
		margin-top: 20rpx;
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
