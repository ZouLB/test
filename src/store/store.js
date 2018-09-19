import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

var store=new Vuex.Store({
	
	state:{
		searchValue:'',
		entityData:[],
		formData:[]
	},
	mutations:{
	
	}

})

export default store