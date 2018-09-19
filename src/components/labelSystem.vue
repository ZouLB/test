<template>
	<div id="label-system">
		<Row class="search-bar">
	        <Col span="18">
	        	<Input search v-model="searchVal" @on-search="$_search" icon="ios-search" enter-button="搜索" placeholder="输入关键字搜索..."/>
	        </Col>
	   	</Row>
	   	
	   	
	    <!--<Row type="flex" justify="center" v-for="(groud,i) in arrTemp" :key="i">
	        <Col v-for="(item,index) in groud" :xs="10" :offset="index>0?'1':'0'" :key="index">
	            <Card class="clearfix" @click.native="$_toBase(item.id)">
	            	<div>
	            		<h2>{{item.name}}</h2>
	            		<div class="character">
		            		<img src="../assets/img/1.png"/>
	            		</div>
	                	<p>精确检索</p>
	            	</div>
	            </Card>
	        </Col>
	    </Row>-->
	    
	    <div class="content clearfix">
    		<Card v-for="(item,index) in tagsEntity" class="clearfix card" @click.native="$_toBase(item.id)" :key="index">
	        	<div>
	        		<h2>{{item.name}}</h2>
	        		<div class="character">
	            		<img src="../assets/img/1.png"/>
	        		</div>
	            	<p>精确检索</p>
	        	</div>
	      	</Card>
        </div>
        
	</div>
</template>

<script>
	import { getEntity} from '../assets/api/api';

	export default {
		data() {
			return {
				tagsEntity:[],
				searchVal:'',
			};
		},
		methods: {
			$_search() {
//				if(this.searchVal==''){
//					this.$Message.warning('请输入关键字进行搜索');
//				}else{
					this.$store.state.searchValue = this.searchVal;
					this.$router.push({
						path: '/systemDetail'
					});
//				}
			},
			$_toBase(id) {
				this.$router.push({
					path: '/baseStation/'+id
				});
			}
		},
		mounted() {
			this.$Loading.start();
//			this.$axios.post(process.env.API_HOST+'/QueryTagsCatalog').then((res)=>{
			getEntity().then((res)=>{
				if(res&&res.details){
//					console.log(res.details.data);
					this.tagsEntity = res.details.data;
					this.$store.state.entityData = res.details.data;
            		this.$Loading.finish();
				}else{
					this.$Loading.error();
					this.$Message.error(res.message);
				}
            })
            .catch((err) => {
            	this.$Loading.error();
            	this.$Message.error(err.message);
            });
		},
		watch:{
			
		}
	};
</script>

<style lang="scss">
	
</style>