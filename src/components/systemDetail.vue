<template>
	<Layout id="sys-detail">
        <Header>
        	<Row>
		        <Col span="16">
		        	<Input search icon="ios-search" enter-button=" 搜索" placeholder="输入关键字搜索..."/>
		        </Col>
		        <Col span="2" offset="6">
		        	<Button type="text" ghost>精确检索</Button>
		        </Col>
		   </Row>
        </Header>
        
    	<Tabs value="baseStation">
	        <TabPane label="基站" name="baseStation">
	        	<Row class="tab-content">
			        <Col span="16" class="tab-left">
						<ul>
							<li>
								<h3>AH-DESC-34sSDSDG</h3>
								<p>AH-DESC-34sSDSDG,地铁，微小站AH-DESC-34sSDSDG,地铁，微小站AH-DESC-34sSDSDG,地铁，微小站AH-DESC-34sSDSDG,地铁，微小站</p>
								<div class="operation">
									<span class="edit" @click="$_edit">【编辑】</span>
									<span>【查看】</span>
								</div>
							</li>
							<li>
								<h3>AH-DESC-34sSDSDG</h3>
								<p>AH-DESC-34sSDSDG,地铁，微小站AH-DESC-34sSDSDG,地铁，微小站AH-DESC-34sSDSDG,地铁，微小站AH-DESC-34sSDSDG,地铁，微小站</p>
								<div class="operation">
									<span class="edit">【编辑】</span>
									<span>【查看】</span>
								</div>
							</li>
							<li>
								<h3>AH-DESC-34sSDSDG</h3>
								<p>AH-DESC-34sSDSDG,地铁，微小站AH-DESC-34sSDSDG,地铁，微小站AH-DESC-34sSDSDG,地铁，微小站AH-DESC-34sSDSDG,地铁，微小站</p>
								<div class="operation">
									<span class="edit">【编辑】</span>
									<span>【查看】</span>
								</div>
							</li>
							<li>
								<h3>AH-DESC-34sSDSDG</h3>
								<p>AH-DESC-34sSDSDG,地铁，微小站AH-DESC-34sSDSDG,地铁，微小站AH-DESC-34sSDSDG,地铁，微小站AH-DESC-34sSDSDG,地铁，微小站</p>
								<div class="operation">
									<span class="edit">【编辑】</span>
									<span>【查看】</span>
								</div>
							</li>
							<li>
								<h3>AH-DESC-34sSDSDG</h3>
								<p>AH-DESC-34sSDSDG,地铁，微小站AH-DESC-34sSDSDG,地铁，微小站AH-DESC-34sSDSDG,地铁，微小站AH-DESC-34sSDSDG,地铁，微小站</p>
								<div class="operation">
									<span class="edit">【编辑】</span>
									<span>【查看】</span>
								</div>
							</li>
						</ul>
			        </Col>
			        <Col span="8" class="tab-right">
						<h3>热门标签</h3>
						<ul>
							<li>3G</li>
							<li>4G</li>
							<li>高速</li>
							<li>商圈</li>
							<li>地铁</li>
							<li>商务区</li>
							<li>居住区</li>
							<li>更多>></li>
						</ul>
			        </Col>
			   </Row>
	        	
	        </TabPane>
	        
	        <TabPane label="用户" name="user">标签二的内容</TabPane>
	        <TabPane label="档案" name="archives">标签三的内容</TabPane>
	        <TabPane label="更多>>" name="more">标签四的内容</TabPane>
	    </Tabs>
    </Layout>
</template>

<script>
	export default {
	  data() {
	    return {
	    	
	    };
	  },
	  methods: {
	  	$_edit(){
	  		this.$router.push({ path: '/baseStation' });
	  	}
	  },
	  mounted() {
	  	
	  },
	};
</script>

<style scoped="scoped" lang="scss">
	
</style>