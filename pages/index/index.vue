<template>
	<view class="content">
		<!-- swiper滑动窗 -->
		<!-- #ifndef APP-NVUE || MP-TOUTIAO -->
		<view>
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
			<u-tabs :list="sorts" lineWidth='50' :scrollable="false" @change="sortChange" sticky></u-tabs>
		</view>
		
		<!-- 商品布局 -->
        <view>
			<u-grid
					:border="false"
					@click="click"
					col="2"
			>
				<u-grid-item
						v-for="(goodsItem,goodsIndex) in goods.length !== 0 ?goods:8"
						:key="goodsIndex"
				>
				<!-- 骨架屏 -->
				<u-skeleton
					    rows="3"
						:loading="isLoading"
						:title="false"
						:rowsHeight="[120,15,12]"
						rowsWidth='100'
						class="skeleton"
					>
					<!-- loading为false时，将会展示此处插槽内容 -->
						<u--text>加载失败</u--text>
					
					<!-- 商品卡片组件 -->
					<goods-card :goodsItem="goodsItem"></goods-card>
					
					</u-skeleton>
				</u-grid-item>
			</u-grid>
			<!-- 底部加载提示 -->
			<u-loadmore :status="isShowLoading" icon-color="#2979ff" color="#2979ff" />
			<!-- 返回顶部 -->
			<u-back-top :scroll-top="scrollTop"></u-back-top>
		</view>
			
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 标签名数组
				sorts: [
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
				page:1,  //当前页数
				currentSort:0,  //当前分类
				isLoading:true, //骨架屏显示
				scrollTop: 0,
				isShowLoading:'loading',  //底部加载显示
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
			click(event) {
				console.log(event);
			},
			// 获取数据
			async getData(){
				// 第一次获取数据时显示骨架屏
				if(this.goods.length === 0) this.isLoading = true;
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
				// 隐藏骨架屏
				this.isLoading = false;
				this.slides = res.slides;
				this.goods.push(...res.goods.data)
				// this.goods = [...this.goods,...res.goods.data]
			}
		},
		onReachBottom() {
			// 重新请求数据，带上分页参数
			if(this.goods.length % 10 ==0){
				this.Page++
				this.getData()
			}else{
				this.isShowLoading="nomore"
			}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		}
	}
</script>

<style lang="scss" scoped>
	.skeleton{
		margin-top: 30rpx;
	}
	
</style>
