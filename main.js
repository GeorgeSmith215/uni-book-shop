import App from './App'
// 引入Vuex
import store from '@/store'
Vue.prototype.$store = store
let vuexStore = require("@/store/$u.mixin.js");
Vue.mixin(vuexStore);

// #ifndef VUE3
import Vue from 'vue'
import {router,RouterMount} from '@/common/router.js'  //路径换成自己的
Vue.use(router)
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)
Vue.config.productionTip = false
App.mpType = 'app'
// 将store放入Vue对象创建中
const app = new Vue({
	store,
    ...App
})
// 引入请求封装，将app参数传递到配置中
require('@/common/request.js')(app)

import httpApi from '@/common/http.api.js'
Vue.use(httpApi, app)

import utils from '@/common/utils.js'
Vue.use(utils, app)

//v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5
	RouterMount(app,router,'#app')
// #endif

// #ifndef H5
	app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif
// app.$mount()
// // #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif