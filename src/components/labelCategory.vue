<template>
	<div id="label-cate">
		<header>
			<Row>
				<Col span="24">
					<Icon type="ios-arrow-back"  @click="$_goBack"/>
					<Icon type="md-pricetag"/>
					<span>{{form.PID}}</span>
					<div class="opra right-float">
						<Button type="default" ghost @click="$_add"> 新增标签 </Button>
						<Input placeholder="标签检索" style="width: 235px" v-model="searchTag"/>
						<RadioGroup v-model="formSize" type="button">
				            <Radio label="12" :class="formSize==12?'current-radio':''">&nbsp;I</Radio>
				            <Radio label="24" :class="formSize==24?'current-radio':''">II</Radio>
				        </RadioGroup>
						<Button type="primary" ghost @click="$_save">保存</Button>
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
										<Form :label-width="75" ref="editForm" :model="editForm">
									        <FormItem 
									        	v-for="(label,index) in item.children" 
									        	v-if="label.name.indexOf(searchTag)!=-1"
									        	:key="index" 
									        	:label="label.name">
									            <Input v-model="editForm[label.code]" :disabled="type=='edit'&&label.code=='PID'?true:false"></Input>
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
	        :loading="loading"
	        @on-ok="$_addSubmit"
	        @on-cancel="cancel"
	        >
	        <Form :label-width="70" ref="addTagForm" :model="addTagForm" :rules="rule">
	        	<FormItem label="分类" prop="parentTreeId">
		            <Select v-model="addTagForm.parentTreeId">
				        <Option v-for="(item,i) in anchorData" :value="item.id" :key="i">{{ item.name }}</Option>
				    </Select>
		        </FormItem>
		        <FormItem label="标签名称" prop="tagName">
		            <Input placeholder="请输入标签名称" v-model="addTagForm.tagName"></Input>
		        </FormItem>
		        <FormItem label="标签值" prop="tagVal">
		            <Input placeholder="请输入标签值" v-model="addTagForm.tagVal"></Input>
		        </FormItem>
		    </Form>
	    </Modal>
	</div>
</template>

<script>

	import { getTags, changeTags, searchTags} from '../assets/api/api';
	
	export default {
	  data() {
	    return {
	    	formSize:'12',
	    	addShow:false,
	    	paramsId:'',
	    	type:'',
	    	anchorData:[],
	    	searchTag:'',
	    	form:[],
	    	editForm:{},
	    	addTagForm:{
		    	parentTreeId:'',
	    		tagName:'',
	    		tagVal:''
	    	},
	    	rule: {
                parentTreeId: [{ required: true, message: '请选择分类', trigger: 'blur' }],
                tagName: [{ required: true, message: '标签名称不能为空', trigger: 'blur' }],
                tagVal: [{ required: true, message: '标签值不能为空', trigger: 'blur' }]
           },
           loading:true
	    };
	  },
	  methods: {
	  	$_add(){
	  		this.addShow = true;
	  	},
	  	$_goBack(){
//	  		this.$router.go(-1);
	  		this.$router.push('/baseStation/'+this.paramsId);
	  	},
	  	//新增标签
	  	$_addSubmit(){
	  		this.$Loading.start();
	  		this.$refs['addTagForm'].validate((valid) => {
	  			if (valid) {
	  				let para = {
			  			entityId:this.paramsId,
			  			primaryKeys:[this.form.PID],
			  			status:'shelved',
			  			catalogId:this.addTagForm.parentTreeId,
			  			tags:{}
			  		}
		        	para.tags[this.addTagForm.tagName] = this.addTagForm.tagVal;
			  		changeTags(para).then((res)=>{
						if(res&&res.details){
							this.$refs['addTagForm'].resetFields();
							this.$Loading.finish();
							this.loading = false;
							this.addShow = false;
		                    this.$Message.success('新增成功');
						}else{
							this.$Loading.error();
							this.$Message.error(res.message);
						}
		            })
		            .catch((err) => {
		            	this.$Loading.error();
		            	this.$Message.error(err.message);
		            });
					
	  			}else{
	  				this.loading = false;
	  			}
	  		})
		  },
		  cancel(){
		  	this.$refs['addTagForm'].resetFields();
		  },
		  $_save(){
		  	let para = {
	  			entityId:this.paramsId,
	  			primaryKeys:[this.form.PID],
	  			tags:{}
	  		}
		  	para.tags = this.editForm;
		  	if(this.type=='edit'){
		  		for (const key in para.tags) {          
				    if (para.tags[key] === ''||key=='PID') {
				      	delete para.tags[key];
				    }
				}
		  		this.changeApi();
		  	}else if(this.type=='add'){
		  		if(para.tags.PID!=''){
		  			searchTags({entityId:this.paramsId,where:"PID="+para.tags.PID}).then((res)=>{
		                if(res&&res.details&&res.datails.data){
		                  console.log(res.datails);
//		                  if(res.datails.data.length!=0){
//		                  	this.changeApi();
//		                  }else{
//		                  	this.$Message.error('该PID已存在，请重新输入');
//		                  }
		                }
//		                else{
//		                  this.$Message.error(res.message);
//		                }
		            })
//		  			.catch((err) => {
//		  				console.log('sad')
//						  this.$Message.error(err.message);
//					});
		  		}else{
		  			this.$Message.error('请输入PID');
		  		}
		  		
		  	}
//	  		
		  },
		  	changeApi(){
		  		changeTags(para).then((res)=>{
					if(res&&res.details){
	                    this.$Message.success('保存成功');
					}else{
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
        this.paramsId = this.$route.params.id;
        this.type = this.$route.params.type;
		getTags({type:'platform',tagEntityId:this.paramsId}).then((res)=>{
			if(res&&res.details&&res.details.data){
				console.log(res.details.data[0].children);
				this.anchorData = res.details.data[0].children;
				this.anchorData.forEach((item) => {
					item.children.forEach((child) => {
						this.editForm[child.code]='';
					})
				})
				if(this.type=='edit'){
		        	this.form = this.$store.state.formData;
					Object.assign(this.editForm, this.form);
		        	console.log(this.editForm);
		        }
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
        
//      console.log(this.$store.state.formData)
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