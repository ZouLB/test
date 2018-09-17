import Vue from 'vue'
import Router from 'vue-router'

const labelSystem = resolve => require(['@/components/labelSystem'],resolve);
const systemDetail = resolve => require(['@/components/systemDetail'],resolve);
const baseStation = resolve => require(['@/components/baseStation'],resolve);
const labelCategory = resolve => require(['@/components/labelCategory'],resolve);

Vue.use(Router)

export default new Router({
	routes: [
		{path:'/',redirect:'/labelSystem'},
		{path:'/labelSystem',component:labelSystem},
		{path:'/systemDetail',component:systemDetail},
		{path:'/baseStation/:id',component:baseStation},
		{path:'/labelCategory/:id',component:labelCategory},
	]
})
