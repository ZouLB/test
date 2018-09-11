<template>
	<div id="label-cate">
		<header>
			<router-link to="baseStation"><Icon type="md-home" /></router-link>
			<Icon type="md-pricetag"/>
			<span>name</span>
			<div class="opra">
				<Button type="default" ghost> 新增标签 </Button>
				<Input placeholder="标签检索" style="width: 250px" />
				<RadioGroup v-model="formSize" type="button">
		            <Radio label="12">单行</Radio>
		            <Radio label="22">并列</Radio>
		        </RadioGroup>
				<Button type="primary" ghost>保存</Button>
			</div>
		</header>
		<content>
			<div class="left">
				<Anchor :affix="false" show-ink>
			        <AnchorLink href="#sort" title="标签类别" />
			        <AnchorLink href="#other" title="其他标签" />
			    </Anchor>
			</div>
			<div class="right">
				<div class="rightWrap">
					<div class="item">
						<h5 id="sort"><Icon type="ios-radio-button-on" />标签类别</h5>
						 <Form :label-width="80">
						 	<Row >
						    	<Col :sm="{ span: formSize, offset: 1 }" :lg="{ span: formSize, offset: 2 }">
						        	<FormItem label="性别">
							            <Input style="width: 260px"></Input>
							        </FormItem>
						        </Col>
						   </Row>
					    </Form>
					</div>
					
					<div class="item">
					    <h5 id="other"><Icon type="ios-radio-button-on" />其他标签</h5>
						<Row>
						    <Col :sm="{ span: formSize, offset: 1 }" :lg="{ span: formSize, offset: 2 }">
								<Form :label-width="80">
							        <FormItem label="性别">
							            <Input style="width: 260px"></Input>
							        </FormItem>
							        <FormItem label="性别">
							            <Input style="width: 260px"></Input>
							        </FormItem>
							        <FormItem label="性别">
							            <Input style="width: 260px"></Input>
							        </FormItem>
							        <FormItem label="性别">
							            <Input style="width: 260px"></Input>
							        </FormItem>
							        <FormItem label="性别">
							            <Input style="width: 260px"></Input>
							        </FormItem>
							    </Form>
						    </Col>
						</Row>
				    </div>
			    </div>
			</div>
		</content>
	</div>
</template>

<script>
	export default {
	  data() {
	    return {
	    	formSize:'12'
	    };
	  },
	  methods: {
	  	
	  },
	  mounted() {
	  	
	  },
	};
</script>

<style scoped="scoped" lang="scss">
	header{
		padding: 10px;
		height: 52px;
		border-bottom: 1px solid rgb(77,81,93);
		i.ivu-icon{
			font-size: 24px;
			line-height: 32px;
			&.ivu-icon-md-home{
				padding-right: 10px;
				border-right: 1px solid rgb(77,81,93);
				cursor: pointer;
				color:rgb(81,90,110); 
				&:hover{
					color: rgb(197,200,206);
				}
			}
		}
		span{
			font-size: 15px;
			color: rgb(198,198,200);
		}
		.opra{
			float: right;
		}
	}
	.left{
		position: absolute;
		width: 230px;
		left: 0;
		top: 52px;
		bottom: 0;
		padding: 12px;
	}
	.right{
		position: absolute;
		left: 230px;
		top: 52px;
		right: 0;
		bottom: 0;
		padding: 12px;
		h5{
			font-size: 15px;
			color: rgb(23,143,254);
			margin: 15px 0;
			.ivu-icon{
				position: relative;
				top: -2px;
				padding-right: 10px;
			}
		}
		.item{
			margin-bottom:35px ;
		}
		.rightWrap{
			max-width: 1100px;
		}
		
	}
	
</style>