<template>
	<div id="label-system">
		<Row class="search-bar">
	        <Col span="14" offset="5">
	        	<Input search icon="ios-search" enter-button="搜索" placeholder="输入关键字搜索..." @on-search="$_search"/>
	        </Col>
	   </Row>
	   	
	   	<Row type="flex" justify="center">
	        <Col :xs="10" :lg="9">
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
	        <Col :xs="{ span: 10, offset: 1 }" :lg="{ span: 9, offset: 1 }">
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

</style>