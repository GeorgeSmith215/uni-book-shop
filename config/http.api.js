// /common/http.api.js

// 如果没有通过拦截器配置域名的话，可以在这里写上完整的URL(加上域名部分)
// let indexUrl = '/api/index';  //API数量多的话不建议用变量，直接写在请求里也可

// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
// https://uviewui.com/js/http.html#%E4%BD%95%E8%B0%93%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%EF%BC%9F
const install = (Vue, vm) => {
	//定义api对象并挂载到vm.$u.api上
	vm.$u.api = {};
	// 首页
	vm.$u.api.index = (params = {}) => vm.$u.http.get('/api/index', params);
	
	//认证相关的
	// 登录
	vm.$u.api.authLogin = (params = {}) => vm.$u.http.post('/api/auth/login',params)
	
	//订单相关的
	
	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即uni.$u.api)下
	// vm.$u.api = {  //也可直接在函数声明时配置，不需要统一放
	// 	index,
	// 	authLogin
	// };
}

export default {
	install
}