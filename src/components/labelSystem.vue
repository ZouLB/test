<template>
	<div id="label-system">
		<Row class="search-bar">
	        <Col span="14" offset="5">
	        	<Input search enter-button="搜索" placeholder="输入关键字搜索..."/>
	        </Col>
	   	</Row>
	   	
	   	<Row type="flex" justify="center">
	        <Col span="10">
	            <Card>
	            	<div>
	            		<h2>移动基站</h2>
	            		<img src="../assets/img/1.png"/>
	                	<p>精准检索</p>
	            	</div>
	            </Card>
	        </Col>
	        <Col span="10" offset="1">
	            <Card>
	                <div>
	            		<h2>移动基站</h2>
	            		<img src="../assets/img/1.png"/>
	                	<p>精准检索</p>
	            	</div>
	            </Card>
	        </Col>
	    </Row>
	</div>
</template>

<style scoped="scoped" lang="scss">
	#label-system{
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background-color: rgb(47,50,59);
		.search-bar{
			margin-top: 150px;
			margin-bottom: 100px;
		}
		.ivu-input-group{
			height: 60px;
			font: 20px "微软雅黑";
		}
		.ivu-card{
			text-align: center;
			background-color: rgb(229,229,229);
			h2{
				color: #333;
				font: 30px "微软雅黑";
				padding: 16px 0;
			}
			img{
				padding-bottom: 16px;
			}
			p{
				text-align: right;
				cursor: pointer;
			}
		}
		
	}
	
</style>