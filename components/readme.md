选中状态的图标是用iconfont的，如果需要修改内部样式，需要更换组件内的iconfont


[阿里巴巴矢量图标库](https://www.iconfont.cn)

[uniapp中使用字体图标](https://uniapp.dcloud.io/frame?id=%E5%AD%97%E4%BD%93%E5%9B%BE%E6%A0%87)

更新日志

1.新增domId字段，可在所有的回调中的e.detail.domId中返回，用于标记属于哪个checkBox，但是建议使用$refs去选择 

2.新增禁止选用的回调，如设置:disabled='true'的话，可以使用disabledCallback回调来监听禁止选择时候，点击的事件 例如：@disabledCallback="disabledCallback" 

3.新增functionType配置，默认为default，表现与V1.0.0一致，可以设置为"page"，则表示完全由页面绑定的:checked来控制组件选中状态，点击会触发pageClick事件， 例如：@pageClick="changeBoxFromPage"，则methods里changeBoxFromPage方法可监听选择事件，需要由此事件中，修改绑定的:checked来改变组件选中状态

```
		@change=值变化时候触发事件
		//暴露的变量如下
		value: '', //这里会被带到@change事件的e.detail.value上
		domId: '', //这里会被带到@change事件的e.detail.domId上
		checkBoxSize: {
			//外框大小（宽和高）单位rpx
			type: Number,
			default: uni.upx2px(44)
		},
		borderStyle: {
			//外框样式
			type: String,
			default: '1px solid #d1d1d1'
		},
		borderRadius: {
			//外框样式
			type: Number,
			default: uni.upx2px(6)
		},
		fontSize: {
			//里面icon大小
			type: Number,
			default: uni.upx2px(44)
		},
		disabled: {
			//是否禁止选中
			type: Boolean,
			default: false
		},
		checked: {
			//默认是否选中
			type: Boolean,
			default: false
		},
		color: {
			//里面icon的颜色
			type: String,
			default: '#007aff'
		},
		functionType: {
			//执行方法(page/default)，为page则表示，是否选中完全依赖于:checked属性，执行回调时候，需要js来修改:checked变量来触发选中状态修改
			type: String,
			default: 'default'
		}
```


剩下都在demo里，有问题可以问我哈！，好用的话麻烦您动动手点个五星哈


```
demo代码
<template>
	<view>
		<view class="line">
			<text>啥都不加的：</text>
			<jiuaiCheckbox @change='changeBox'></jiuaiCheckbox>
		</view>
		
		<view class="line">
			<text>改了边框样式的：</text>
			<jiuaiCheckbox @change='changeBox' borderStyle='3px solid #ff0000'></jiuaiCheckbox>
		</view>
		
		<view class="line">
			<text>改了边框样式和icon颜色的：</text>
			<jiuaiCheckbox @change='changeBox' borderStyle='3px solid #ff0000' color='#ff0000'></jiuaiCheckbox>
		</view>
		
		<view class="line">
			<text>禁止操作的：</text>
			<jiuaiCheckbox @change='changeBox' :disabled='true'></jiuaiCheckbox>
		</view>
		
		<view class="line">
			<text>禁止操作且默认选中的：</text>
			<jiuaiCheckbox @change='changeBox' :disabled='true' :checked='true'></jiuaiCheckbox>
		</view>
		
		<view class="line">
			<text>改了框框大小的：</text>
			<jiuaiCheckbox @change='changeBox' value="自定义的一个value" :checked="true" :checkBoxSize='60'></jiuaiCheckbox>
		</view>
		
		<view class="line">
			<text>改了框框大小和圆角的的：</text>
			<jiuaiCheckbox @change='changeBox' value="自定义的一个value" :checked="true" :checkBoxSize='60' :borderRadius='20'></jiuaiCheckbox>
		</view>
		
		<view class="line">
			<text>改了框框大小和icon大小的：</text>
			<jiuaiCheckbox @change='changeBox' value="自定义的一个value" :checked="true" :checkBoxSize='60' :fontSize='60'></jiuaiCheckbox>
		</view>
		
		
		<view class="line">
			<text>js修改选中状态</text>
			<button class='btn' @click='changeCheckedBox(true)'>选中</button>
			<button class='btn' @click='changeCheckedBox(false)'>取消选中</button>
			<jiuaiCheckbox @change='changeBox' ref='checkedBox'></jiuaiCheckbox>
		</view>
		
		<view class="line">
			<text>放弃组件内部方法，纯粹由页面js控制的</text>
			<jiuaiCheckbox functionType="page" :checked="pageChecked" @pageClick="changeBoxFromPage"></jiuaiCheckbox>
		</view>
		
		<view class="line">
			<text>禁止操作的，带有disabled回调的：</text>
			<jiuaiCheckbox @change='changeBox' :disabled='true' @disabledCallback="disabledCallback"></jiuaiCheckbox>
		</view>
		
		<view class="line">
			<text>回调携带标记值domId的，请查看console</text>
			<jiuaiCheckbox domId="the-last-checkbox" @change='changeBox' :disabled='true' @disabledCallback="disabledCallback"></jiuaiCheckbox>
		</view>
		
		
	</view>
</template>

<script>
	import jiuaiCheckbox from "@/components/jiuai-checkbox.vue";
	
	export default {
		data() {
			return {
				title: 'Hello',
				pageChecked:false,
			}
		},
		onLoad() {
			setTimeout(()=>{
				console.log(this.$refs)
			}, 3000);
		},
		components:{
			jiuaiCheckbox
		},
		methods: {
			disabledCallback(e){//禁止选择的回调
				console.log(e,92)
				uni.showToast({
					'title':"禁止选择的回调"
				})
			},
			changeBoxFromPage(e){//由页面完全修改的，不使用组件内部方法的
				this.pageChecked = !this.pageChecked;//修改组件绑定的:checked属性即可，可以理解为双向绑定
				uni.showToast({
					'title':"页面js修改的"
				})
			},
			changeBox(e){//选中切换事件(由组件发起)
				console.log('点击了checkBox',e);
				uni.showToast({
					'title':"点击结果"+e.detail.checked
				})
			},
			changeCheckedBox(result){
				if(result){
					this.$refs.checkedBox.changeTotrue()
				}else{
					this.$refs.checkedBox.changeToFlase()
				}
			},
			showConsole(){
				this.$jiuaiDebounce.canDoFunction({
					key:"showConsole",
					time:3000,
					success:()=>{
						console.log('我被点击了')
					}
				})
			},
			showConsole2(){
				this.$jiuaiDebounce.canDoFunction({
					key:"showConsole2",
					success:()=>{
						console.log('showConsole2我被点击了,1.5秒后，我用js调用了释放')
						setTimeout(()=>{
							this.$jiuaiDebounce.releaseKey("showConsole2")
						},1500)
					},
				})
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200upx;
		width: 200upx;
		margin-top: 200upx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50upx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36upx;
		color: #8f8f94;
	}
	.line{
		font-size: 24upx;
		margin-bottom: 10Upx;
	}
	.btn{
		display: inline-block;
		width: 100upx;
		font-size: 24upx;
		padding: 0;
		margin: 0 10upx;
	}
</style>
```