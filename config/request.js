// 此vm参数为页面的实例，可以通过它引用vuex中的变量
module.exports = (vm) => {
    // 初始化请求配置
    uni.$u.http.setConfig((config) => {
        /* config 为默认全局配置*/
        config.baseURL = 'https://api.shop.eduwork.cn'; /* 根域名 */
		// 注：如果局部custom与全局custom有同名属性，则后面的属性会覆盖前面的属性，相当于Object.assign(全局，局部)
		config.custom = {auth: true}; // 全局自定义参数默认值
		// #ifdef H5 || APP-PLUS || MP-ALIPAY || MP-WEIXIN
		config.timeout = 60000,
		// #endif
		// #ifdef APP-PLUS
		config.sslVerify = true,
		// #endif
		// #ifdef H5
		// 跨域请求时是否携带凭证（cookies）仅H5支持（HBuilderX 2.6.15+）
		config.withCredentials = false,
		// #endif
		config.dataType = 'json';
		// #ifndef MP-ALIPAY
		config.responseType = 'text';
		// #endif
        return config
    })
	
	// 请求拦截
	uni.$u.http.interceptors.request.use((config) => { // 可使用async await 做异步操作
	    // 初始化请求拦截器时，会执行此方法，此时data为undefined，赋予默认{}
	    config.data = config.data || {}
		// 根据custom参数中配置的是否需要token，添加对应的请求头
		if(config?.custom?.auth) {
			// 可以在此通过vm引用vuex中的变量，具体值在vm.$store.state中
			// config.header.Authorization = "Bearer " + vm.$store.state.access_token;
			config.header.Authorization = "Bearer " + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvYXBpLnNob3AuZWR1d29yay5jblwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTY0MTExMTgxOSwiZXhwIjoxNjQxNDcxODE5LCJuYmYiOjE2NDExMTE4MTksImp0aSI6IlFzQVg0akp0RFZ4bVR1NkUiLCJzdWIiOjIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.7vCvrMK7Qpq6nRpc7gHszw58k17GBa1UvQFiq9Oqpls';
		}
	    return config 
	}, config => { // 可使用async await 做异步操作
	    return Promise.reject(config)
	})
	
	// 响应拦截
	uni.$u.http.interceptors.response.use((response) => { /* 对响应成功做点什么 可使用async await 做异步操作*/
		const {statusCode,data} = response;
		// console.log(statusCode);

		// 自定义参数
		const custom = response.config?.custom
		if (statusCode !== 200) { 
			// 如果没有显式定义custom的toast参数为false的话，默认对报错进行toast弹出提示
			if (custom.toast !== false) {
				uni.$u.toast(data.message)
			}

			// 如果需要catch返回，则进行reject
			if (custom?.catch) {
				return Promise.reject(data)
			} else {
				// 否则返回一个pending中的promise，请求不会进入catch中
				return new Promise(() => { })
			}
		}
		return data === undefined ? {} : data
	}, (response) => { 
		// 对响应错误做点什么 （statusCode !== 200）
		const {statusCode,data} = response;
		if (statusCode === 400){
			// 错误请求
			uni.$u.toast(data.message);
			// return false;
		}
		else if(statusCode === 401){
			// 401为token失效，跳转重新登录
			uni.$u.toast('验证失败，请重新登录');
			setTimeout(()=>{
				uni.$u.route({
					url:'pages/index/index'
				})
			},1500);
			// return false;
		}
		else if(statusCode === 422){
			// 422为表单验证未通过,错误信息一般只取第一个
			const {errors} = data;
			// console.log(errors);
			uni.$u.toast(Object.values(errors)[0][0]);
			// return false;
		}
		return Promise.reject(response);
	});
	
	//增加patch请求
	vm.$u.http.patch = (url,params = {},header = {}) =>{
		// 模拟patch请求
		const _params = {
			...params,
			_method:'PATCH'
		}
		return vm.$u.http.post(url,_params);
	}
}