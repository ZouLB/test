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
        
        <p class="tip" v-if="tipShow"><Icon type="md-sad" />搜索不到相关数据</p>
	    
	</div>
</template>

<script>
	import { getEntity } from '../assets/api/api';

	export default {
		data() {
			return {
				tempEntity:[],
				tagsEntity:[],
				searchVal:'',
				tipShow:false,
//				arrTemp:[]
			};
		},
		methods: {
			$_search() {
				if(this.searchVal){
					this.tagsEntity=[];
					this.tempEntity.forEach((item) => {
						if(item.name.indexOf(this.searchVal)!=-1){
							this.tagsEntity.push(item)
						}
					})
					if(this.tagsEntity.length==0){
						this.tipShow = true;
					}else{
						this.tipShow = false;
					}
				}else{
					this.tagsEntity = this.tempEntity;
				}
				
//				this.$router.push({
//					path: '/systemDetail'
//				});
			},
			$_toBase(id) {
				this.$router.push({
					path: '/baseStation/'+id
				});
			}
		},
		mounted() {
			this.$Loading.start();
//			this.$axios.post(process.env.API_URL+'/QueryTagsCatalog').then((res)=>{
			getEntity().then((res)=>{
				if(res&&res.details){
//					console.log(res.details.data);
					this.tempEntity = this.tagsEntity = res.details.data;
//	                let index = 0;
//	                for (let i = 0; i < this.tagsEntity.length; i++) {
//	                    index = parseInt(i / 3);
//	                    if (this.arrTemp.length <= index) {
//	                        this.arrTemp.push([]);
//	                    }
//	                    this.arrTemp[index].push(this.tagsEntity[i]);
//	                }
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
			searchVal(){
				if(this.searchVal==''){
					this.tagsEntity = this.tempEntity;
				}
			}
		}
	};
</script>

<style lang="scss">
	
</style>