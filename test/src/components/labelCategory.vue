<template>
	<div id="label-cate">
		<header>
			<Row>
				<Col span="24">
					<router-link to="baseStation"><Icon type="md-home" /></router-link>
					<Icon type="md-pricetag"/>
					<span>name</span>
					<div class="opra right-float">
						<Button type="default" ghost @click="$_add"> 新增标签 </Button>
						<Input placeholder="标签检索" style="width: 235px" />
						<RadioGroup v-model="formSize" type="button">
				            <Radio label="12">&nbsp;I</Radio>
				            <Radio label="24">II</Radio>
				        </RadioGroup>
						<Button type="primary" ghost>保存</Button>
					</div>
				</Col>
			</Row>
		</header>
		<content>
			<Row>
				<Col span="4">
					<div class="left">
						<Anchor :affix="false">
					        <AnchorLink href="#sort" title="标签类别"/>
					        <AnchorLink href="#other" title="其他标签" />
					    </Anchor>
					</div>
				</Col>
				<Col span="20">
					<div class="right">
						<div class="rightWrap">
							<div class="item">
								<h5 id="sort"><Icon type="ios-radio-button-on" />标签类别</h5>
								 <Form :label-width="75">
								 	<Row >
								    	<!--<Col :xs="{ span: formSize, offset: 0 }" :sm="{ span: formSize, offset: 1 }">-->
								        <Col :span="formSize" offset="1">
								        	<FormItem label="性别">
									            <Input></Input>
									        </FormItem>
								        </Col>
								   </Row>
							    </Form>
							</div>
							
							<div class="item">
							    <h5 id="other"><Icon type="ios-radio-button-on" />其他标签</h5>
								<Row>
								    <Col :span="formSize" offset="1">
										<Form :label-width="75">
									        <FormItem label="性别">
									            <Input></Input>
									        </FormItem>
									        <FormItem label="性别">
									            <Input></Input>
									        </FormItem>
									        <FormItem label="性别">
									            <Input></Input>
									        </FormItem>
									        <FormItem label="性别">
									            <Input></Input>
									        </FormItem>
									        <FormItem label="性别">
									            <Input></Input>
									        </FormItem>
									    </Form>
								    </Col>
								</Row>
						    </div>
					    </div>
					</div>
				</Col>
			</Row>
		</content>
		
		<Modal
	        v-model="addShow"
	        title="新增标签"
	        width="400"
	        >
	        <Form :label-width="50" ref="" >
		        <FormItem label="标签">
		            <Input placeholder=""></Input>
		        </FormItem>
		    </Form>
	    </Modal>
	</div>
</template>

<script>
	export default {
	  data() {
	    return {
	    	formSize:'12',
	    	addShow:false,
	    };
	  },
	  methods: {
	  	$_add(){
	  		this.addShow = true;
	  	}
	  },
	  mounted() {
	  	
	  },
	};
</script>

<style lang="scss">
	
</style>