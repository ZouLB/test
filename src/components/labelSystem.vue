<template>
	<div id="label-system">
		<Row class="search-bar">
	        <Col span="18">
	        	<Input search icon="ios-search" enter-button="搜索" placeholder="输入关键字搜索..." @on-search="$_search"/>
	        </Col>
	   </Row>
	   	
	   	<Row type="flex" justify="center">
	        <Col v-for="(item,index) in tagsEntity" v-if="index<2" :xs="10" :offset="index>0?'1':'0'" :key="index">
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
	        <!--<Col :xs="10" offset="1">
	            <Card>
	                <div>
	            		<h2>移动基站</h2>
	            		<div class="character">
		            		<img src="../assets/img/1.png"/>
	            		</div>
	                	<p>精确检索</p>
	            	</div>
	            </Card>
	        </Col>-->
	    </Row>
	    
	</div>
</template>

<script>
	import { getEntity } from '../assets/api/api';

	export default {
		data() {
			return {
				tagsEntity:[]
			};
		},
		methods: {
			$_search() {
				this.$router.push({
					path: '/systemDetail'
				});
			},
			$_toBase(id) {
				this.$router.push({
					path: '/baseStation/'+id
				});
			}
		},
		mounted() {
			this.$Loading.start();
			getEntity().then((res)=>{
				if(res&&res.details){
//					console.log(res);
					this.tagsEntity = res.details.data;
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
	};
</script>

<style lang="scss">
	.content{
		max-width: 1080px;
		margin: 0 auto;
		.ivu-card{
			width: 320px;
			height: 240px;
			float: left;
			margin: 20px;
		}
	}
</style>