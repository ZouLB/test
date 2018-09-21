<template>
	<div id="base-station" class="demo-split">
	    
	    <Split v-model="split1">
            <div slot="left" class="demo-split-pane left">
            	<Input size="large" v-model="search" clearable/>
				
		        <div class="ivu-tree">
		          	<ul v-if="search==''" class="ivu-tree-children" visible="visible" v-for="(v,i) in treeData">
		          		<li>
		          			<span class="ivu-tree-arrow" @click="$_showTree(i)">
		          				<Icon :type="current.indexOf(i)!=-1?'ios-arrow-down':'ios-arrow-forward'" />
		          			</span>
		          			<span class="ivu-tree-title" @click="$_showTree(i)">{{v.name}}</span>
			    			<ul v-if="current.indexOf(i)!=-1" class="list-group ivu-tree-children" >
				    			<draggable 
				    				:list="v.children" 
				    				class="dragArea" 
				    				:options="{group:{name:'people', pull:'clone', put:false },ghostClass:'ghostLi',dragClass:'dragLi'}">
					                <li v-for="(n,i) in v.children"  :key="i">
					                    <span class="ivu-tree-arrow"></span>
			          					<span class="ivu-tree-title">{{n.name}}</span>
					                </li>
					             </draggable>
				             </ul>
		          		</li>
		          	</ul>
		          	<ul v-if="search!=''" class="ivu-tree-children no-padding" visible="visible" v-for="(v,i) in treeData">
	          			<draggable v-model="v.children" class="ivu-tree-children" :options="{group:{name:'people', pull:'clone', put:false},ghostClass:'ghostLi',dragClass:'dragLi'}">
	          				<li v-for="n in v.children" v-if="n.name.indexOf(search)!=-1" :key="n.name">
	          					<span class="ivu-tree-arrow"></span> 
	          					<span class="ivu-tree-title">{{n.name}}</span> 
	          				</li>
		    			</draggable>
		          	</ul>
		        </div>
            </div>
            
            <div slot="right" class="demo-split-pane demo-split-right">
                <Split v-model="split" mode="vertical">
		            <div slot="top" class="demo-split-pane top">
		            	<div class="top-head">
		            		<span>基站对象</span>
		            		<ButtonGroup>
						        <Button @click="$_refresh">刷新</Button>
						        <Button @click="$_batchDel">删除</Button>
						        <Button @click="$_addLink">新增</Button>
						    </ButtonGroup>
		            	</div>
		            	<div class="top-con tableWrap">
		            		<!--<draggable element="div" v-model="columns" :options="dragOptions">
						        <transition-group name="no" class="tableWrap">
		            				<Table border size="small" :columns="columns" :data="data1" :key="1" @on-selection-change="handleSelectionChange"></Table>
						        </transition-group>	
						    </draggable> -->
						    
						    
						    <Spin fix v-if="tableLoading">
				                <Icon type="ios-loading" size=20 class="demo-spin-icon-load"></Icon>
				                <div>Loading</div>
				            </Spin>
						    <div class="ivu-table-wrapper" draggable="false">
				        		<div class="ivu-table ivu-table-small ivu-table-border">
			        				<table cellspacing="0" cellpadding="0" border="0">
			        					<thead>
			        						<th class="ivu-table-column-center ignore-elements">
			        							<div class="ivu-table-cell ivu-table-cell-with-selection xs-width">
			        								<Checkbox
			        									:indeterminate="indeterminate"
											            :value="checkAll"
											            @click.prevent.native="handleCheckAll">
											        </Checkbox>
			        							</div>
			        						</th>
			        						
			        						<th class="ivu-table-column-center ignore-elements">
			        							<div class='ivu-table-cell small-width'>
			        								<span>操作</span>
			        							</div>
			        						</th>	
			        						<draggable v-model="columns" @add="$_addColumn" :options="{group:{name:'people', pull:'clone'},ghostClass:'ghostLi',dragClass:'dragTh',filter:'.ignore-elements'}" element="tr">	
					            				
				        						<th v-for="(v,i) in columns" :key="i">
				        							<div class="ivu-table-cell">
				        								<span>{{v.name}} </span>
				        								<Icon type="md-close" title='移除' @click="$_delLabel(v.name);"/>
				        								<Icon v-if="v.code!='PID'" type="ios-create-outline" title='批量更新值' @click.stop="$_showModel('update',v);"/>
				        							</div>
				        						</th>
				        						
					            				<!--<th v-for="(v,i) in columns" :key="i" v-if="v.name">
				        							<div :class='["ivu-table-cell",v.name=="操作"?"small-width ignore-elements":""]'>
				        								<span>{{v.name}} </span>
				        								<Icon v-if="v.name!='操作'" type="md-close" title='移除' @click="$_delLabel(v.name);"/>
				        								<Icon v-if="v.name!='操作'" type="ios-create-outline" title='批量更新值' @click.stop="$_showModel('update',v.name);"/>
				        							</div>
				        						</th>-->
										    </draggable> 
			        					</thead>
				        				<tbody>
				        					<tr v-for="(row,index) in data" :key="index" v-if="index<100">
				        						<td>
				        							<div class="ivu-table-cell ivu-table-cell-with-selection cell-edit xs-width">
				        								<!--<Checkbox 
				        									v-model="checkAllGroup" 
				        									@on-change="checkAllGroupChange"
				        									:label="row.PID">
				        								</Checkbox>-->
				        								<CheckboxGroup  v-model="checkAllGroup" @on-change="checkAllGroupChange">
													        <Checkbox :label="row.PID"></Checkbox>
													    </CheckboxGroup>
				        							</div>
				        						</td>
				        						<td>
				        							<div class="ivu-table-cell cell-edit">
				        								<Icon type="ios-create-outline" title='编辑' @click.native="linkTo(row)"/>
				        								<Icon type="ios-trash-outline" title='删除' @click="$_del(row.PID);"/>
				        							</div>
				        						</td>
				        						<td class="input-td" v-for="(item,i) in columns" :key="i">
				        							<div class="ivu-table-cell">
				        								<AutoComplete
													        v-model="row[item.code]"
													        :disabled="item.code=='PID'?true:false"
													        @on-focus="$_saveOldVal(row[item.code])"
													        @on-blur="$_changeVal(row[item.code],row.PID,item.code,'change')"
													        @keyup.native.enter="$_changeVal(row[item.code],row.PID,item.code,'change')"
													        @on-select="$_changeSel(row.PID,item.code,'select',$event)">
													        <div class="demo-auto-complete-item" v-if="item.featureValue">
													            <Option v-for="(v,i) in item.featureValue" :value="v[1]" :key="i">{{v[0]}}
													            </Option>
													        </div>
													    </AutoComplete>
													    <!--<Input
													    	v-model="row[item.code]"
													    	@on-search="handleSearch"
													        @on-focus="$_saveOldVal(row[item.code])"
													        @on-blur="$_changeVal(row[item.code],row.PID,item.code)"
													        @keyup.native.enter="$_changeVal(row[item.code],row.PID,item.code)"/>-->
				        							</div>
				        						</td>
				        					</tr>
				        				</tbody>
				        			</table> 
				        		</div> 
				        	</div>
		            	</div>
						<div class="labe-page">
							<Page @on-change="changeCurPage" @on-page-size-change="changePageSize" :current="labePageOpt.curPage" :total="labePageOpt.total" :page-size="labePageOpt.pageSize" :page-size-opts="labePageOpt.pageSizeOpts" show-total show-sizer />
						</div>
		            </div>
		            <div slot="bottom" class="demo-split-pane bottom">
		            	<div class="bot-head">
			                <Button type="default" ghost @click="$_clearCard">清空</Button>
		            	</div>
		            	<div class="bot-con">
		            		<!--<draggable element="div" v-model="list2" :options="dragOptions" class="cardGroup">
						        <transition-group name="no" class="list-group" tag="ul">
						        	<li v-for="(element,i) in list2" :key="i" class="clearfix left-float" >
							        	<div class="left-float" v-if="i>0">
							        		<Select style="width:75px" v-model="check">
								        		<Option v-for="item in conditions" :value="item.value" :key="item.value">{{ item.label }}</Option>
								    		</Select>
							        	</div>
				            			<Card @click.native="$_showModel('filter',element.title)" >
				            				<Icon type="md-close" title="删除" @click.stop="$_delCard(element.title)"/>
							                <h4>{{element.title}}</h4>
							                <p>=[]</p>
							            </Card>
						           </li>
						        </transition-group>
						    </draggable>-->
						    
					    	<ul class="cardGroup">
					    		
						    	<draggable :list="list2" :options="{group:{name:'people', pull:'clone'},ghostClass:'ghostCard',dragClass:'dragCard'}" class="cardGroup">
					    			<li v-for="(element,i) in list2" :key="i" class="clearfix left-float" >
				            			<!--<div class="left-float" v-if="i>0">
							        		<Select style="width:75px" v-model="check">
								        		<Option v-for="item in conditions" :value="item.value" :key="item.value">{{ item.label }}</Option>
								    		</Select>
							        	</div>-->
				            			<Card @click.native.stop="$_showModel('filter',element.name)">
				            				<Icon type="md-close" title="删除" @click.stop="$_delCard(element.name)"/>
							                <h4>{{element.name}}</h4>
							                <p>=[]</p>
							            </Card>
					           		</li>
					        	</draggable>
					    	</ul>
		            	</div>
		            </div>
		        </Split>
            </div>
        </Split>
	    
	    <Modal
	        v-model="modelShow"
	        :title="editType=='update'?'批量更新值':'筛选'"
	        :class-name="editType=='update'?'':'vertical-center-modal'"
	        @on-ok="$_batchChange"
	        @on-cancel="cancel"
	        width="400"
	        >
	        <Form :label-width="60" ref="editForm" v-model="editForm">
		        <FormItem label="名称">
		        	<span>{{editForm.name}}</span>
		        </FormItem>
		        <FormItem label="值">
		        	<AutoComplete
				        v-model="check"
				        @on-select="$_selCheck">
				        <div class="demo-auto-complete-item" v-if="editForm.featureValue">
				            <Option v-for="(v,i) in editForm.featureValue" :value="v[1]" :key="i">{{v[0]}}
				            </Option>
				        </div>
				    </AutoComplete>
		        	<!--<Select v-model="check">
				        <Option v-for="item in conditions" :value="item.value" :key="item.value"></Option>
				    </Select>-->
		            <!--<Input placeholder=""></Input>-->
		        </FormItem>
		    </Form>
	    </Modal>
	    
	</div>
</template>

<script>
	
	import draggable from 'vuedraggable'
	
	import { getTags, changeTags, searchTags, deleteObject } from '../assets/api/api';
	
	const message = [
	  "性别",
	  "学历",
	  "省份",
	  "社会角色",
	  "民族",
	];
	
	export default {
		data() {
		    return {
		    	split1:0.26,
		    	split:0.65,
		    	treeData: [],
		        columns: [],
	            paramsId:'',
	            data: [],
	            modelShow:false,
	            editType:'',
	             
	            list: message.map((name, index) => {
			        return { name, order: index + 1, fixed: false };
			    }),
			    list2: [],
	//		    editable: true,
	//		    isDragging: false,
	//		    delayedDragging: false,
			      
			    current:[],
	            check:'',
			    editForm:{},
	            tableLoading:false,
	            search:'',
	            
	            tmpVal:'',
//	            selectVal:'',
	            
	            indeterminate: true,
	            checkAll: false,
	            checkAllGroup: [],
	            
			    value3: 'old',
//	            tableSelect:[],
	            feature: [],
	            cityList: [
	                {
	                    value: 'New York',
	                    label: 'New York'
	                }
	            ],
	            
	            conditions: [
	            	{
	                    value: 'or',
	                    label: 'or'
	               	},
	               	{
	                    value: 'and',
	                    label: 'and'
	                }
	            ],
				labePageOpt: {
                    curPage: 1,
		    		total: 0,
					pageSize: 50,
                    pageSizeOpts: [50, 100, 150, 200]		//每页条数下拉选择
				}
		    };
		  },
		  methods: {
		  	linkTo(row){
		  		this.$store.state.formData = row;
		  		this.$router.push({ path: `/labelCategory/${this.paramsId}/edit` });
		  	},
//		  	handleSelectionChange(selection) {
//		      	this.tableSelect = selection;
//		    },
			$_addLink(){
				this.$store.state.formData = [];
		  		this.$router.push({ path: `/labelCategory/${this.paramsId}/add` });
			},
		    $_del(pid){
		    	this.$Modal.confirm({
	                title: '提示',
	                content: `<p>删除后将不能恢复，确认删除<${pid}>吗?</p>`,
	                onOk: () => {
				  		deleteObject({entityId:this.paramsId,primaryKeys:[pid]}).then((res)=>{
							if(res&&res.details){
								let tmp = this.data.findIndex((item) => {
									return item.PID == pid;
								})
								console.log(tmp)
								this.data.splice(tmp,1);
				                this.$Message.success('删除成功');
							}else{
								this.$Message.error(res.message);
							}
			            })
			            .catch((err) => {
			            	this.$Message.error(err.message);
			            });
	                },
	                onCancel: () => {
	                	
	                }
	           	});
		    },
		  	$_batchDel(){
			    if (this.checkAllGroup.length == 0) {
			    	this.$Message.warning('请选择需要删除的对象');
			        return;
			    }
			    this.$Modal.confirm({
	                title: '提示',
	                content: '<p>删除后将不能恢复，确认删除所选对象吗?</p>',
	                onOk: () => {
	                	deleteObject({entityId:this.paramsId,primaryKeys:this.checkAllGroup}).then((res)=>{
							if(res&&res.details){
								this.checkAllGroup.map((id) => {
				                	let tmp = this.data.findIndex((item) => {
										return item.PID == id;
									})
									this.data.splice(tmp,1);
								})
								this.indeterminate=true;
					            this.checkAll = false;
					            this.checkAllGroup=[];
				                this.$Message.success('删除成功');
							}else{
								this.$Message.error(res.message);
							}
			            })
			            .catch((err) => {
			            	this.$Message.error(err.message);
			            });
	                },
	                onCancel: () => {
	                	
	                }
	           	});
		  	},
		  	//刷新
		  	$_refresh(){
		  		if(this.columns.length==0){
		  			this.$Message.warning("请拖动相关属性");
		  		}else if(this.columns.length>0&&this.data.length==0){
		  		  this.getTagData();
		  		}
		  	},
			changeCurPage(curPage){
		  	  this.labePageOpt.curPage = curPage;
		  	  this.getTagData();
			},
			changePageSize(pageSize){
		  	  this.labePageOpt.pageSize = pageSize;
		  	  this.labePageOpt.curPage = 1;
		  	  this.getTagData();
			},
			getTagData(){
              this.tableLoading = true;
              let skip = (this.labePageOpt.curPage - 1) * this.labePageOpt.pageSize;
              let limit = this.labePageOpt.pageSize;
              let param = {
                entityId:this.paramsId,
                skip,limit,
                //	  			primaryKey:"1600010605799",
                //	  			columnNames:[],
//			  			where:"PID=1617031277599"
              }
              searchTags(param).then((res)=>{
                if(res&&res.details){
                  this.labePageOpt.total = res.details.pageParam.recordTotal;
                  this.data = res.details.data;
                  //						this.filterData();
                  this.tableLoading = false;
                  console.log(this.data);
                  console.log(this.columns)
                }else{
                  this.$Message.error(res.message);
                }
              }).catch((err) => {
				  this.$Message.error(err.message);
			  });
			},
//		  	filterData(){
	//	  		let codeArr = [];
	//			for(let i=0;i<this.columns.length;i++){
	//		  		codeArr.push(this.columns[i].code);
	//	  		}
	//			this.data = this.allTableData.map((item) => {
	//				let arr = [];
	//				codeArr.map((opra) =>{
	//					arr.push(item[opra]);
	//				})
	//				return arr;
	//		    })
	//			console.log(this.data);
	//			this.tableLoading = false;
	
	//			console.log(this.columns)
//		  	},
		  	//移除标签
		  	$_delLabel(name){
		  		var tmpIndex = this.columns.findIndex((item) => {
		  			return item.name == name;
		  		})
		  		this.columns.splice(tmpIndex,1);
//		  		this.data.forEach((item,i) => {
//		  			this.data[i].splice(tmpIndex,1);
//		  		})
		  	},
		  	//删除卡片
		  	$_delCard(name){
		  		var tmpIndex = this.list2.findIndex((item) => {
		  			return item.name == name;
		  		})
		  		this.list2.splice(tmpIndex,1);
		  	},
		  	//清空
		  	$_clearCard(){
		  		this.list2=[];
		  	},
		   	//导航栏
		   	$_showTree(index){
				if(this.current.indexOf(index)==-1){
					this.current.push(index);
				}else{
					let tmpIndex  = this.current.findIndex((item) =>{
						return item==index;
					})
					this.current.splice(tmpIndex,1);
				}
		   	},
		   	//编辑
		   	$_showModel(type,arr){
		   		this.modelShow=true;
		   		this.editType = type;
		   		this.check = '';
				this.editForm = arr;
		   	},
//	       	handleSearch (value,val) {
//	            this.feature = !value ? [] : val;
//	        },
	       	$_saveOldVal(oldval){
	       		this.tmpVal = oldval;
	       	},
	       	$_changeVal(val,pid,tkey,type){
	       		console.log(val,pid,tkey)
	       		let tmpValue = this.tmpVal;
	       		if(val&&tmpValue != val&&type=='change'){
		       		console.log('失焦')
	       			this.$Modal.confirm({
	                title: '系统提示',
	                content: '<p>确定修改吗？</p>',
		                onOk: () => {
		                	this.$Loading.start();
		                	let para = {
					  			entityId:this.paramsId,
					  			primaryKeys:[pid],
					  			tags:{}
					  		}
		                	para.tags[tkey] = val;
					  		changeTags(para).then((res)=>{
								if(res&&res.details){
				                    this.$Loading.finish();
				                    this.$Message.success('修改成功');
								}else{
									this.$Loading.error();
									this.$Message.error(res.message);
								}
				            })
				            .catch((err) => {
				            	this.$Loading.error();
				            	this.$Message.error(err.message);
				            });
		                },
		                onCancel: () => {
		                	let tmpIndex = this.data.findIndex((item) => {
		                		return item.PID == pid; 
		                	})
		                	this.data[tmpIndex][tkey] = tmpValue;
		                }
		            });
	       		}
	      	},
	      	$_changeSel(pid,tkey,type,val){
	      		let tmpValue = this.tmpVal;
	      		if(val&&tmpValue != val&&type=='select'){
		      		console.log('选择')
	      			this.$Modal.confirm({
		                title: '系统提示',
		                content: '<p>确定修改吗？</p>',
		                onOk: () => {
		                	this.$Loading.start();
		                	let para = {
					  			entityId:this.paramsId,
					  			primaryKeys:[pid],
					  			tags:{}
					  		}
		                	para.tags[tkey] = val;
					  		changeTags(para).then((res)=>{
								if(res&&res.details){
									this.$Loading.finish();
				                    this.$Message.success('修改成功');
								}else{
									this.$Loading.error();
									this.$Message.error(res.message);
								}
				           	})
					  		.catch((err) => {
				            	this.$Loading.error();
				            	this.$Message.error(err.message);
				            });
		                },
		                onCancel: () => {
		                	let tmpIndex = this.data.findIndex((item) => {
		                		return item.PID == pid; 
		                	})
		                	this.data[tmpIndex][tkey] = tmpValue;
		                }
		            });
	      		}
	      	},
	      	$_selCheck(val){
	      		this.check = val;
	      	},
	      	cancel(){
	      		this.$refs['editForm'].resetFields();
	      	},
	      	$_batchChange(){
	      		if(this.check==''){
	      			this.$Message.warning('请选择或输入值');
	      		}else{
//				this.$refs['editForm'].validate((valid) => {
	      			this.$Loading.start();
		      		let para = {
			  			entityId:this.paramsId,
			  			primaryKeys:[],
			  			tags:{}
			  		}
		      		this.data.forEach((item) => {
		      			para.primaryKeys.push(item.PID);
		      		})
	            	para.tags[this.editForm.code] = this.check;
	            	console.log(para);
			  		changeTags(para).then((res)=>{
						if(res&&res.details){
							this.data.forEach((item) => {
				      			item[this.editForm.code]=this.check;
				      		})
							this.$Loading.finish();
		                    this.$Message.success('修改成功');
						}else{
							this.$Loading.error();
							this.$Message.error(res.message);
						}
		           	})
			  		.catch((err) => {
		            	this.$Loading.error();
		            	this.$Message.error(err.message);
		           });
//	      		})
				}
	      	},
//	      	$_onMoved(evt){
	//    		console.log(evt.draggedContext.index,evt.relatedContext.index);
	//    		let oldIndex = evt.draggedContext.index;
	//    		let newIndex = evt.relatedContext.index;
	//    		this.data.forEach((item,i) => {
	//    			let tem1 = this.data[i][oldIndex];
	//				let tem2 = this.data[i][newIndex];
	//				this.data[i].splice(oldIndex,1,tem2);
	//				this.data[i].splice(newIndex,1,tem1);
	//    		})
//	      	},
	      	$_addColumn(evt){
	      		let last = this.columns.length-1;
	      		for(let i=0;i<last;i++){
	  				if(this.columns[i].id==this.columns[last].id){
		  				this.columns.splice(last,1);
		  				this.$Message.warning('该属性已存在');
		  				last--;
	      			}
	      		}
	      	},
	      	handleCheckAll () {
                if (this.indeterminate) {
                    this.checkAll = false;
                } else {
                    this.checkAll = !this.checkAll;
                }
                this.indeterminate = false;

                if (this.checkAll) {
                	this.data.forEach((item) => {
	                    this.checkAllGroup.push(item.PID);
                	})
                } else {
                    this.checkAllGroup = [];
                }
            },
            checkAllGroupChange (info) {
            	console.log(this.checkAllGroup);
                if (info.length === this.data.length) {
                    this.indeterminate = false;
                    this.checkAll = true;
                } else if (info.length > 0) {
                    this.indeterminate = true;
                    this.checkAll = false;
                } else {
                    this.indeterminate = false;
                    this.checkAll = false;
                }
            }
	  	},
	  	mounted() {
            this.$Loading.start();
            
	  		//防止拖拽时打开新网页
            document.body.ondrop = function (event) {
                event.preventDefault();
                event.stopPropagation();
            };
            
            this.paramsId = this.$route.params.id;
			getTags({type:'platform',tagEntityId:this.paramsId}).then((res)=>{
				if(res&&res.details&&res.details.data){
					console.log(res.details.data[0].children);
					let tmpTree = res.details.data[0].children;
					this.treeData = tmpTree;
//					this.treeData.unshift({name:"关键字",children:[{name:tmpTree[0].entityName}]});
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
	  	},
	  	components: {
		　　draggable
		},
		computed: {
//		    dragOptions() {
//		      return {
//		        animation: 0,
////		        group: "description"
//		        group:{name:'people', pull:'clone'},
//		        disabled: !this.editable,
//		        ghostClass: "ghost"
//		      };
//		    },
		},
		watch: {
//		    isDragging(newValue) {
//		      if (newValue) {
//		        this.delayedDragging = true;
//		        return;
//		      }
//		      this.$nextTick(() => {
//		        this.delayedDragging = false;
//		      });
//		    },
		  }
	};
</script>

<style lang="scss">

</style>