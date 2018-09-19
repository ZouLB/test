<template>
	<div id="label-cate">
		<header>
			<Row>
				<Col span="24">
					<Icon type="md-home" @click="$_goBack"/>
					<Icon type="md-pricetag"/>
					<span>name</span>
					<div class="opra right-float">
						<Button type="default" ghost @click="$_add"> 新增标签 </Button>
						<Input placeholder="标签检索" style="width: 235px" v-model="searchTag"/>
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
						<Anchor>
					        <AnchorLink v-for="(v,i) in anchorData" :key="i" :href="'#'+v.id" :title="v.name"/>
					    </Anchor>
					</div>
				</Col>
				<Col span="20">
					<div class="right">
						<div class="rightWrap">
							<div class="item" v-for="(item,i) in anchorData" :key="i">
							    <h5 :id="item.id"><Icon type="ios-radio-button-on" />{{item.name}}</h5>
								<Row>
								    <Col :span="formSize" offset="1">
										<Form :label-width="75">
									        <FormItem v-for="(label,index) in item.children" :key="index" :label="label.name">
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
	        @on-ok="$_addSubmit"
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

	import { getTags, changeTags} from '../assets/api/api';
	
	export default {
	  data() {
	    return {
	    	formSize:'12',
	    	addShow:false,
	    	paramsId:'',
	    	anchorData:[],
	    	searchTag:''
	    };
	  },
	  methods: {
	  	$_add(){
	  		this.addShow = true;
	  	},
	  	$_goBack(){
	  		this.$router.push('/baseStation/'+this.paramsId);
	  	},
	  	$_addSubmit(){
	  		let para = {
	  			entityId:this.paramsId,
	  			primaryKeys:["F0E9F4"],
	  			tagCode:"test",
	  			tagValue:"car"
	  		}
	  		changeTags(para).then((res)=>{
//				if(res&&res.details){
//					console.log(res.details);
//          		this.$Message.success('新增成功');
//				}else{
//					this.$Message.error(res.message);
//				}
				console.log(res)
            })
            .catch((err) => {
            	console.log(err)
            	this.$Message.error(err.message);
            });
        	
	  	}
	  },
	  mounted() {
	  	this.$Loading.start();
        this.paramsId = this.$route.params.id;
		getTags({type:'platform',tagEntityId:this.paramsId}).then((res)=>{
			if(res&&res.details&&res.details.data){
				console.log(res.details.data[0].children);
				this.anchorData = res.details.data[0].children;
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
        console.log(this.$store.state.formData)
	  },
	};
</script>

<style lang="scss">
	@media only screen and (min-width:860px ) {
		#label-cate .right .ivu-form-item{
			margin-right: 40px;
		}
	}
</style>