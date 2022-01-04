import App from './App'
// 引入Vuex
import store from '@/store'
Vue.prototype.$store = store
let vuexStore = require("@/store/$u.mixin.js");
Vue.mixin(vuexStore);

// #ifndef VUE3
import Vue from 'vue'
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
require('@/config/request.js')(app)

import httpApi from '@/config/http.api.js'
Vue.use(httpApi, app)

app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif