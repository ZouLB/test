import Vue from 'vue'
import Router from 'vue-router'

//const index = resolve => require(['@/components/index'],resolve);
//const option1 = resolve => require(['@/components/option1'],resolve);
//const option2 = resolve => require(['@/components/option2'],resolve);
//const option3 = resolve => require(['@/components/option3'],resolve);
//const upload = resolve => require(['@/components/upload'],resolve);
const labelSystem = resolve => require(['@/components/labelSystem'],resolve);
const systemDetail = resolve => require(['@/components/systemDetail'],resolve);

Vue.use(Router)

export default new Router({
routes: [
//		{path:'/',redirect:'/index'},
//		{	
//			path:'/index',
//			component:index,
//				children:[
//					{path: '/index', redirect: '/index/option1' },
//					{path:'option1',component:option1},
//					{path:'option2',component:option2},
//					{path:'option3',component:option3},
//					{path:'upload',component:upload},
//				]
//		}

	{path:'/',redirect:'/labelSystem'},
	{path:'/labelSystem',component:labelSystem},
	{path:'/systemDetail',component:systemDetail},
			
]
})
