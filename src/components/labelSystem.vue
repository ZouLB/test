<template>
	<div id="label-system">
		<Row class="search-bar">
	        <Col span="14" offset="5">
	        	<Input search icon="ios-search" enter-button="搜索" placeholder="输入关键字搜索..." @on-search="$_search"/>
	        </Col>
	   </Row>
	   	
	   	<Row type="flex" justify="center">
	        <Col span="10">
	            <Card class="clearfix">
	            	<div>
	            		<h2>移动基站</h2>
	            		<div class="character">
		            		<img src="../assets/img/1.png"/>
	            		</div>
	                	<p>精确检索</p>
	            	</div>
	            </Card>
	        </Col>
	        <Col span="10" offset="1">
	            <Card>
	                <div>
	            		<h2>移动基站</h2>
	            		<div class="character">
		            		<img src="../assets/img/1.png"/>
	            		</div>
	                	<p>精确检索</p>
	            	</div>
	            </Card>
	        </Col>
	    </Row>
	</div>
</template>

<script>
	export default {
	  data() {
	    return {
	    	
	    };
	  },
	  methods: {
	  	$_search(){
	  		this.$router.push({ path: '/systemDetail' });
	  	}
	  },
	  mounted() {
	  	
	  },
	};
</script>

<style scoped="scoped" lang="scss">
	.search-bar{
		margin: 148px 0;
	}
	.ivu-input-group{
		font: 20px "微软雅黑";
	}
	.ivu-input-group-append{
		background-color: rgb(23,143,254);
	}
	.ivu-card{
		text-align: center;
		background-color: rgb(229,229,229);
		h2{
			color: #333;
			font: 22px "微软雅黑";
			padding: 16px 0;
		}
		.character{
			height: 230px;
			overflow: hidden;
			margin-bottom: 16px;
		}
		img{
			width: 100%;
			height: 100%;
		}
		p{
			text-align: right;
			cursor: pointer;
			&:hover{
				color: rgb(23,143,254);
			}
		}
	}
	
	
</style>