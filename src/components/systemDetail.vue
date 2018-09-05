<template>
	<Layout id="sys-detail">
        <Header>
        	<Row>
		        <Col span="15">
		        	<Input search suffix="ios-search" enter-button="搜索" placeholder="输入关键字搜索..."/>
		        </Col>
		        <Col span="2" offset="7">
		        	<Button type="text" ghost>精确检索</Button>
		        </Col>
		   </Row>
        </Header>
        
        <Content>
        	<Tabs value="name1">
		        <TabPane label="基站" name="name1">
		        	<Row class="tab-content">
				        <Col span="15" class="tab-left">
							<ul>
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
				        <Col span="9" class="tab-right">
							<h3>热门标签</h3>
							<ul>
								<li>3G</li>
								<li>4G</li>
								<li>高速</li>
								<li>商圈</li>
								<li>商圈</li>
								<li>商圈</li>
								<li>商圈</li>
								<li>商圈</li>
								<li>更多>></li>
							</ul>
				        </Col>
				   </Row>
		        	
		        </TabPane>
		        
		        <TabPane label="用户" name="name2">标签二的内容</TabPane>
		        <TabPane label="档案" name="name3">标签三的内容</TabPane>
		        <TabPane label="更多>>" name="name3">标签三的内容</TabPane>
		    </Tabs>
        </Content>
    </Layout>
</template>

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
		padding: 0 16px 16px 16px;
	}
	.tab-left{
		border-right: 3px solid rgb(51,54,61);
		li{
			width: 50%;
			padding:10px 20px;
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
		h3{
			font: 16px/50px "微软雅黑";
			color: #e8eaec;
		}
		li{
			display: inline-block;
			font: 14px "微软雅黑";
			color: #909399;
			margin-right: 30px;
			margin-bottom: 15px;
			cursor: pointer;
		}
	}
	
	
	
</style>