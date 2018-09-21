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
	import { getEntity, getHotTag} from '../assets/api/api';
	let echarts = require('echarts/lib/echarts')
	require('echarts-wordcloud');

	export default {
		data() {
			return {
				tagsEntity:[],
				searchVal:'',
			};
		},
		methods: {
			$_search() {
				this.$store.state.searchValue = this.searchVal;
				this.$router.push({
					path: '/systemDetail'
				});
			},
			$_toBase(id) {
				this.$router.push({path: '/baseStation/'+id});
			},
			drawWordCloud(index){
				let chart = echarts.init(document.getElementsByClassName('character')[index]);
//				let message=[{name:'Sam S Club'},{name:'Macys'},{name:'sdasd'},{name:'sdasd'},{name:'sdasd'},{name:'sdasd'},{name:'sdasd'},{name:'sdasd'},{name:'sdasd'},{name:'sdasd'},{name:'sdasd'},{name:'sdasd'},{name:'sdasd'},{name:'sdasd'}]
				var option = {
					tooltip: {
				        show: true
				    },
	                series: [ {
	                    type: 'wordCloud',
	                    size: ['80%', '80%'],
				        textRotation : [0, 45, 90, -45],
				        textPadding: 0,
	                    autoSize: {
				            enable: true,
				            minSize: 14
				        },
	                    textStyle: {
	                        normal: {
	                            color: function () {
	                                return 'rgb(' + [
	                                    Math.round(Math.random() * 160),
	                                    Math.round(Math.random() * 160),
	                                    Math.round(Math.random() * 160)
	                                ].join(',') + ')';
	                            }
	                        },
//	                        emphasis: {
//	                            color: 'red'
//	                        }
	                   	},
//	                    data: message.map((item, index) => {
//					        return { name:item.name,value:10000-(index*500)};
//					    }),
	                    data: [ {
			                name: "Sam S Club",
			                value: 8000,
			            },
			            {
			                name: "Macys",
			                value: 6181,
			            }]
	                } ]
	            };
				chart.setOption(option);
			},
			getHot(id,arr){
				getHotTag({
					tagEntityId:id,
					type:"usageCount"
				})
				.then((res) => {
					if(res && res.details) {
						arr.tags=res.details.data;
					} else {
						this.$Message.error(res.message);
					}
				})
				.catch((err) => {
					this.$Message.error(err.message);
				});
			}
		},
		mounted() {
			this.$Loading.start();
//			this.$axios.post(process.env.API_HOST+'/QueryTagsCatalog').then((res)=>{
			getEntity().then((res)=>{
				if(res&&res.details){
					this.tagsEntity = res.details.data;
					this.$store.state.entityData = res.details.data;
					this.tagsEntity.forEach((entity) => {
						this.getHot(entity.id,entity);
					})
					console.log(this.tagsEntity);
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
            
            
			
//          this.drawWordCloud(0);
//			this.drawWordCloud(1);
		},
		watch:{
			
		}
	};
</script>

<style lang="scss">
	.character{
		/*width: 100%;
		height: 180px;
		background-color: pink;*/
	}
</style>