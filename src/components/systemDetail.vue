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
	.ivu-layout-header{
		padding: 10px;
		background-color: rgb(47,50,59);
		line-height: 44px;
	}
	.ivu-input-group{
		font: 16px "微软雅黑";
	}
	.ivu-col-span-2{
		height: 40px;
		button{
			font-size: 16px;
		}
	}
	.tab-content{
		padding: 20px;
		height: 100%;
	}
	.ivu-tabs{
		position: absolute;
		top: 64px;
		left: 0;
		right: 0;
		bottom: 0;
	}
	
	.tab-left{
		border-right: 3px solid rgb(51,54,61);
		height: 100%;
		overflow: auto;
		li{
			width: 50%;
			padding:12px 20px;
			h3{
				font: 18px/40px "微软雅黑";
				color: #e8eaec;
			}
			p{
				width: 100%;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				font: 13px/22px "微软雅黑";
				color: #808695;
			}
			.operation{
				color: #909399;
				.edit{
					color: rgb(23,143,254);
					&:hover{
						color: #5cadff;
					}
				}
				span{
					cursor: pointer;
					&:hover{
						color: rgb(23,143,254);
					}
				}
			}
		}
		
	}
	.tab-right{
		padding: 0 40px;
		height: 100%;
		h3{
			font: 16px/50px "微软雅黑";
			color: #e8eaec;
		}
		li{
			display: inline-block;
			font: 14px "微软雅黑";
			color: rgb(180,181,182);
			margin-right: 25px;
			margin-bottom: 15px;
			cursor: pointer;
			&:hover{
				color: rgb(23,143,254);
			}
		}
	}
</style>