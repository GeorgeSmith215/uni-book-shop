(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-center-collection~pages-goods-goodsInfo~pages-index-index"],{"05dd":function(t,n,e){var r=e("24fb");n=r(!1),n.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */uni-view[data-v-74b0fcb4], uni-scroll-view[data-v-74b0fcb4], uni-swiper-item[data-v-74b0fcb4]{display:flex;flex-direction:column;flex-shrink:0;flex-grow:0;flex-basis:auto;align-items:stretch;align-content:flex-start}.u-grid-item[data-v-74b0fcb4]{align-items:center;justify-content:center;position:relative;flex-direction:column;box-sizing:border-box;display:flex}.u-grid-item--hover-class[data-v-74b0fcb4]{opacity:.5}',""]),t.exports=n},"09c3":function(t,n,e){"use strict";e("a9e3"),Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r={props:{name:{type:[String,Number,null],default:uni.$u.props.gridItem.name},bgColor:{type:String,default:uni.$u.props.gridItem.bgColor}}};n.default=r},"1a07":function(t,n,e){"use strict";var r=e("4ea4");e("d81d"),Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=r(e("5305")),a={name:"u-grid",mixins:[uni.$u.mpMixin,uni.$u.mixin,i.default],data:function(){return{index:0,width:0}},watch:{parentData:function(){this.children.length&&this.children.map((function(t){"function"==typeof t.updateParentData&&t.updateParentData()}))}},created:function(){this.children=[]},computed:{parentData:function(){return[this.hoverClass,this.col,this.size,this.border]},gridStyle:function(){var t={};switch(this.align){case"left":t.justifyContent="flex-start";break;case"center":t.justifyContent="center";break;case"right":t.justifyContent="flex-end";break;default:t.justifyContent="flex-start"}return uni.$u.deepMerge(t,uni.$u.addStyle(this.customStyle))}},methods:{childClick:function(t){this.$emit("click",t)}}};n.default=a},2409:function(t,n,e){var r=e("e18b");"string"===typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);var i=e("4f06").default;i("2e9ceb8a",r,!0,{sourceMap:!1,shadowMode:!1})},3356:function(t,n,e){"use strict";e.r(n);var r=e("9f7f1"),i=e("bd0b");for(var a in i)"default"!==a&&function(t){e.d(n,t,(function(){return i[t]}))}(a);e("4645");var o,u=e("f0c5"),s=Object(u["a"])(i["default"],r["b"],r["c"],!1,null,"66622cd3",null,!1,r["a"],o);n["default"]=s.exports},4039:function(t,n,e){"use strict";e.r(n);var r=e("4263"),i=e.n(r);for(var a in r)"default"!==a&&function(t){e.d(n,t,(function(){return r[t]}))}(a);n["default"]=i.a},4263:function(t,n,e){"use strict";var r=e("4ea4");e("c740"),e("d81d"),e("a9e3"),Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0,e("96cf");var i=r(e("1da1")),a=r(e("09c3")),o={name:"u-grid-item",mixins:[uni.$u.mpMixin,uni.$u.mixin,a.default],data:function(){return{parentData:{col:3,border:!0},classes:[]}},mounted:function(){this.init()},computed:{width:function(){return 100/Number(this.parentData.col)+"%"},itemStyle:function(){var t={background:this.bgColor,width:this.width};return uni.$u.deepMerge(t,uni.$u.addStyle(this.customStyle))}},methods:{init:function(){var t=this;uni.$on("$uGridItem",(function(){t.gridItemClasses()})),this.updateParentData(),uni.$emit("$uGridItem"),this.gridItemClasses()},updateParentData:function(){this.getParentData("u-grid")},clickHandler:function(){var t,n=this,e=this.name,r=null===(t=this.parent)||void 0===t?void 0:t.children;r&&null===this.name&&(e=r.findIndex((function(t){return t===n}))),this.parent&&this.parent.childClick(e),this.$emit("click",e)},getItemWidth:function(){var t=this;return(0,i.default)(regeneratorRuntime.mark((function n(){var e,r;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(e=0,!t.parent){n.next=6;break}return n.next=4,t.getParentWidth();case 4:r=n.sent,e=r/Number(t.parentData.col)+"px";case 6:t.width=e;case 7:case"end":return n.stop()}}),n)})))()},getParentWidth:function(){},gridItemClasses:function(){var t=this;if(this.parentData.border){var n=[];this.parent.children.map((function(e,r){if(t===e){var i=t.parent.children.length;(r+1)%t.parentData.col!==0&&r+1!==i&&n.push("u-border-right");var a=i%t.parentData.col===0?t.parentData.col:i%t.parentData.col;r<i-a&&n.push("u-border-bottom")}})),this.classes=n}}},beforeDestroy:function(){uni.$off("$uGridItem")}};n.default=o},4645:function(t,n,e){"use strict";var r=e("2409"),i=e.n(r);i.a},"4c91":function(t,n,e){var r=e("775c");"string"===typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);var i=e("4f06").default;i("697412d3",r,!0,{sourceMap:!1,shadowMode:!1})},5305:function(t,n,e){"use strict";e("a9e3"),Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r={props:{col:{type:[String,Number],default:uni.$u.props.grid.col},border:{type:Boolean,default:uni.$u.props.grid.border},align:{type:String,default:uni.$u.props.grid.align}}};n.default=r},"536f":function(t,n,e){"use strict";var r=e("7699"),i=e.n(r);i.a},"60df":function(t,n,e){"use strict";e.r(n);var r=e("f520"),i=e("9930");for(var a in i)"default"!==a&&function(t){e.d(n,t,(function(){return i[t]}))}(a);var o,u=e("f0c5"),s=Object(u["a"])(i["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],o);n["default"]=s.exports},7699:function(t,n,e){var r=e("05dd");"string"===typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);var i=e("4f06").default;i("789938e9",r,!0,{sourceMap:!1,shadowMode:!1})},"775c":function(t,n,e){var r=e("24fb");n=r(!1),n.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */uni-view[data-v-7e166126], uni-scroll-view[data-v-7e166126], uni-swiper-item[data-v-7e166126]{display:flex;flex-direction:column;flex-shrink:0;flex-grow:0;flex-basis:auto;align-items:stretch;align-content:flex-start}.u-grid[data-v-7e166126]{justify-content:center;display:flex;flex-direction:row;flex-wrap:wrap;align-items:center}',""]),t.exports=n},"7dcf":function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r={name:"goods-card",props:{goodsItem:{type:Object,default:function(){return{}}}},data:function(){return{}}};n.default=r},"80ad":function(t,n,e){"use strict";e.r(n);var r=e("89f0"),i=e("bdc3");for(var a in i)"default"!==a&&function(t){e.d(n,t,(function(){return i[t]}))}(a);e("c1b4");var o,u=e("f0c5"),s=Object(u["a"])(i["default"],r["b"],r["c"],!1,null,"7e166126",null,!1,r["a"],o);n["default"]=s.exports},"89f0":function(t,n,e){"use strict";var r;e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return a})),e.d(n,"a",(function(){return r}));var i=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("v-uni-view",{ref:"u-grid",staticClass:"u-grid",style:[t.gridStyle]},[t._t("default")],2)},a=[]},"97f5":function(t,n,e){"use strict";var r;e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return a})),e.d(n,"a",(function(){return r}));var i=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("v-uni-view",{staticClass:"u-grid-item",class:t.classes,style:[t.itemStyle],attrs:{"hover-class":"u-grid-item--hover-class","hover-stay-time":200},on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.clickHandler.apply(void 0,arguments)}}},[t._t("default")],2)},a=[]},9930:function(t,n,e){"use strict";e.r(n);var r=e("a215"),i=e.n(r);for(var a in r)"default"!==a&&function(t){e.d(n,t,(function(){return r[t]}))}(a);n["default"]=i.a},"9f7f1":function(t,n,e){"use strict";e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return a})),e.d(n,"a",(function(){return r}));var r={"u-Image":e("60df").default,uLoadingIcon:e("773e").default},i=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("v-uni-navigator",{staticClass:"goods-item",attrs:{url:"/pages/goods/goodsInfo?id="+t.goodsItem.id}},[e("u--image",{attrs:{src:t.goodsItem.cover_url,height:"300rpx",width:"300rpx",radius:"10"},scopedSlots:t._u([{key:"loading",fn:function(){return[e("u-loading-icon",{attrs:{color:"blue"}})]},proxy:!0}])},[e("v-uni-view",{staticStyle:{"font-size":"24rpx"},attrs:{slot:"error"},slot:"error"},[t._v("加载失败")])],1),e("v-uni-view",{staticClass:"goodsTitle u-line-1"},[t._v(t._s(t.goodsItem.title))]),e("v-uni-view",{staticClass:"goodsDetails"},[e("v-uni-view",{staticClass:"price"},[t._v("￥"+t._s(t.goodsItem.price))]),e("v-uni-view",{staticClass:"sales"},[t._v("销量："+t._s(t.goodsItem.sales))])],1)],1)},a=[]},a215:function(t,n,e){"use strict";var r=e("4ea4");Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=r(e("f6be")),a=r(e("b807")),o={name:"u--image",mixins:[uni.$u.mpMixin,a.default,uni.$u.mixin],components:{uvImage:i.default}};n.default=o},bd0b:function(t,n,e){"use strict";e.r(n);var r=e("7dcf"),i=e.n(r);for(var a in r)"default"!==a&&function(t){e.d(n,t,(function(){return r[t]}))}(a);n["default"]=i.a},bdc3:function(t,n,e){"use strict";e.r(n);var r=e("1a07"),i=e.n(r);for(var a in r)"default"!==a&&function(t){e.d(n,t,(function(){return r[t]}))}(a);n["default"]=i.a},c1b4:function(t,n,e){"use strict";var r=e("4c91"),i=e.n(r);i.a},e18b:function(t,n,e){var r=e("24fb");n=r(!1),n.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.goods-item[data-v-66622cd3]{padding:%?28?%;box-shadow:%?5?% %?15?% %?15?% 0 rgba(0,0,0,.1);border-radius:%?10?%}.goods-item .goodsTitle[data-v-66622cd3]{margin:%?10?% 0;font-weight:500;font-size:%?28?%;max-width:%?300?%}.goods-item .goodsDetails[data-v-66622cd3]{display:flex;justify-content:space-between}.goods-item .price[data-v-66622cd3]{font-size:%?26?%;color:red}.goods-item .sales[data-v-66622cd3]{font-size:%?26?%;color:#888}',""]),t.exports=n},e300:function(t,n,e){"use strict";e.r(n);var r=e("97f5"),i=e("4039");for(var a in i)"default"!==a&&function(t){e.d(n,t,(function(){return i[t]}))}(a);e("536f");var o,u=e("f0c5"),s=Object(u["a"])(i["default"],r["b"],r["c"],!1,null,"74b0fcb4",null,!1,r["a"],o);n["default"]=s.exports},f520:function(t,n,e){"use strict";var r;e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return a})),e.d(n,"a",(function(){return r}));var i=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("uvImage",{attrs:{src:t.src,mode:t.mode,width:t.width,height:t.height,shape:t.shape,radius:t.radius,lazyLoad:t.lazyLoad,showMenuByLongpress:t.showMenuByLongpress,loadingIcon:t.loadingIcon,errorIcon:t.errorIcon,showLoading:t.showLoading,showError:t.showError,fade:t.fade,webp:t.webp,duration:t.duration,bgColor:t.bgColor,customStyle:t.customStyle},on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.$emit("click")},error:function(n){arguments[0]=n=t.$handleEvent(n),t.$emit("error")},load:function(n){arguments[0]=n=t.$handleEvent(n),t.$emit("load")}},scopedSlots:t._u([{key:"loading",fn:function(){return[t._t("loading")]},proxy:!0},{key:"error",fn:function(){return[t._t("error")]},proxy:!0}],null,!0)})},a=[]}}]);