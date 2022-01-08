// router.js
import {RouterMount,createRouter} from 'uni-simple-router';

const router = createRouter({
	platform: process.env.VUE_APP_PLATFORM,  
	routes: [...ROUTES]
});
//全局路由前置守卫
router.beforeEach((to, from, next) => {
	if(to.name == 'center'){
		if(!uni.getStorageSync('lifeData').vuex_access_token){
			// uni.$u.toast('请先登录');
			// 缓存上一页面
			uni.$u.utils.storeLastUrl();
			next({
				name:'login',
				NAVTYPE: 'push'
			});
		}
		else next();
	}
	next();
});
// 全局路由后置守卫
// router.afterEach((to, from) => {
//     console.log('跳转结束')
// })

export {
	router,
	RouterMount
}