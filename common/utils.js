const install = (Vue, vm) => {
	/**
	 * 缓存上一页面的页面路径和请求参数，用于登录或注册后的返回
	 */
	const storeLastUrl = () => {
		// 来自哪个页面
		// console.log(getCurrentPages())
		const currentPage = getCurrentPages().pop();
		// 获取页面路径和请求参数
		const {options, route} = currentPage;
		// 参数的key
		const optionsKeys = Object.keys(options);
		let params = '';
		if(optionsKeys.length !== 0){
			params = optionsKeys.reduce((pre,current) => {
				return `${pre}${current}=${options[current]}&`;
			},'?').slice(0,-1);
		}
		// 缓存当前页，用于登录或注册之后的跳转
		uni.setStorageSync('back_url',currentPage.route + params)
	}
	/**
	 * 是否登录
	 */
	const isLogin = () => {
		// 如果没有登录,跳转到登录页面
		const token = vm.$store.state.vuex_access_token;
		if(!token){
			// 缓存上一页面
			storeLastUrl();
			vm.$u.toast('请登录');
			setTimeout(()=>{
				vm.$u.route({
					type: 'redirect',
					url:'pages/auth/login'
				})
			},1500)
			return false;
		}
		return true;
	}
	
	/**
	 * 更新用户信息，更新vuex_user
	 */
	const updateUser = async ()=>{
		// 请求用户信息
		const userInfo = await uni.$u.api.userInfo();
		// 缓存用户信息
		uni.$u.vuex('vuex_userInfo',userInfo)
	}
	
	vm.$u.utils = {
		isLogin,
		storeLastUrl,
		updateUser
	}
}

export default {
	install
}