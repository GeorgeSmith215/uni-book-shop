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
	vm.$u.api.authLogin = (params = {}) => vm.$u.http.post('/api/auth/login',params);  //登录
	vm.$u.api.authRegister = params => vm.$u.http.post('/api/auth/register',params);  //注册
	vm.$u.api.authLogout = params => vm.$u.http.post('/api/auth/logout',params);  //退出登录
	vm.$u.api.authOssToken = params => vm.$u.http.get('/api/auth/oss/token',params);  //获取OSS token
	
	// 用户相关的
	vm.$u.api.userInfo = () => vm.$u.http.get('/api/user');  //用户详情
	vm.$u.api.userInfoUpdate = params => vm.$u.http.put('/api/user',params);  //修改用户信息
	vm.$u.api.userAvatar = params => vm.$u.http.post('/api/user/avatar',params);  //更新用户头像
	
	// 商品相关的
	vm.$u.api.goodsInfo = (id) => vm.$u.http.get(`/api/goods/${id}`);  //商品详情
	vm.$u.api.goodsCollect = (id) => vm.$u.http.post(`/api/collects/goods/${id}`);  //商品收藏
	vm.$u.api.goodsList = (params = {}) => vm.$u.http.get('/api/goods',params);  //获取商品列表
	vm.$u.api.collects = (params = {}) => vm.$u.http.get(`/api/collects`,params);// 我的收藏
	
	// 购物车相关的
	vm.$u.api.cartsAdd = (params = {}) => vm.$u.http.post('/api/carts',params);// 加入购物车
	vm.$u.api.cartsList = (params = {}) => vm.$u.http.get(`/api/carts?include=goods`,params);// 获取购物车列表
	vm.$u.api.cartsNum = (cartId,params = {}) => vm.$u.http.put(`/api/carts/${cartId}`,params);// 购物车数量变化
	vm.$u.api.cartsDel = cartId => vm.$u.http.delete(`/api/carts/${cartId}`);// 移出购物车
	vm.$u.api.cartsChecked = (params = {}) => vm.$u.http.patch(`/api/carts/checked`,params);// 购物车改变选中
	
	// 地址相关的
	vm.$u.api.addressList = () => vm.$u.http.get(`/api/address`);// 地址列表
	vm.$u.api.addressAdd = params => vm.$u.http.post(`/api/address`,params);// 新增地址
	vm.$u.api.addressDetail = id => vm.$u.http.get(`/api/address/${id}`);// 地址详情
	vm.$u.api.addressEdit = (id,params) => vm.$u.http.put(`/api/address/${id}`,params);// 地址详情
	vm.$u.api.addressDefault = id => vm.$u.http.patch(`/api/address/${id}/default`);// 设置默认地址
	vm.$u.api.addressDel = id => vm.$u.http.delete(`/api/address/${id}`);// 删除地址
	
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