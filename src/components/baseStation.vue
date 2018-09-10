<template>
	<div id="base-station" class="demo-split">
	    
	    <Split v-model="split1">
            <div slot="left" class="demo-split-pane left">
            	<Input size="large"/>
				<!--<Tree :data="treeData"></Tree>-->
				
				<!--<draggable class="list-group" element="ul" v-model="list" :options="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
			        <transition-group type="transition" :name="'flip-list'">
			          <li class="list-group-item" v-for="element in list" :key="element.order">
			            {{element.name}}
			          </li>
			        </transition-group>
			    </draggable>-->
			    
			    
		        <div class="ivu-tree" :key="1">
		          	<ul class="ivu-tree-children" visible="visible" v-for="(v,i) in treeData">
		          		<li>
		          			<span class="ivu-tree-arrow" @click="$_showTree(i)">
		          				<Icon :type="current.indexOf(i)!=-1?'ios-arrow-down':'ios-arrow-forward'" />
		          			</span>
		          			<span class="ivu-tree-title" @click="$_showTree(i)">{{v.title}}</span> 
		          			<draggable v-if="current.indexOf(i)!=-1" class="list-group ivu-tree-children" element="ul" v-model="v.children" :options="dragOptions" @start="isDragging=true" @end="isDragging=false">
			        			<transition-group type="transition" :name="'flip-list'">
			          				<li v-for="n in v.children" :key="n.title">
			          					<span class="ivu-tree-arrow"></span> 
			          					<span class="ivu-tree-title">{{n.title}}</span> 
			          				</li>
			          			</transition-group>
			    			</draggable>
		          		</li>
		          	</ul>
		        </div>
			    
            </div>
            <div slot="right" class="demo-split-pane demo-split-right">
                <Split v-model="split" mode="vertical">
		            <div slot="top" class="demo-split-pane top">
		            	<div class="top-head">
		            		<span>基站对象</span>
		            		<ButtonGroup>
						        <Button class="refresh">刷新</Button>
						        <Button @click="$_batchDel">删除</Button>
						        <Button>新增</Button>
						    </ButtonGroup>
		            	</div>
		            	<div class="top-con">
		            		<draggable element="div" v-model="columns1" :options="dragOptions">
						        <transition-group name="no" class="tableWrap">
		            				<Table border size="small" :columns="columns1" :data="data1" :key="1" @on-selection-change="handleSelectionChange"></Table>
						        </transition-group>	
						    </draggable> 
						    
				        	<!--<div class="ivu-table-wrapper" draggable="false">
				        		<div class="ivu-table ivu-table-small ivu-table-border">
				        			<div class="ivu-table-header">
				        				<table cellspacing="0" cellpadding="0" border="0">
				        					<colgroup>
				        						<col width="60"><col width="90"> 
				        					</colgroup> 
				        					<thead>
				        						<tr>
					        						<th class="ivu-table-column-center">
					        							<div class="ivu-table-cell ivu-table-cell-with-selection">
					        								<label class="ivu-checkbox-wrapper ivu-checkbox-wrapper-disabled ivu-checkbox-default"><span class="ivu-checkbox ivu-checkbox-disabled">
					        									<span class="ivu-checkbox-inner"></span> 
					        									<input type="checkbox" disabled="disabled" class="ivu-checkbox-input">
					        									</span> 
					        								</label>
					        							</div>
					        						</th>
					        						<th class="ivu-table-column-center">
					        							<div class="ivu-table-cell">
					        								<span class="">操作</span> 
					        							</div>
					        						</th> 
					        						<draggable  v-model="columns1" :options="dragOptions" class="tableWrap">
												        <transition-group name="no">
								            				<th v-for="(v,i) in columns1" :key="i">
							        							<div class="ivu-table-cell">
							        								{{v.type}} 
							        							</div>
							        						</th> 
												        </transition-group>	
												    </draggable> 
					        					</tr>
				        					</thead>
				        					<tbody>
				        						<tr>
				        							<td></td>
				        						</tr>
				        					</tbody>
				        				</table>
				        			</div>  
				        		</div> 
				        	</div>-->
		            	</div>
		            </div>
		            <div slot="bottom" class="demo-split-pane bottom">
		            	<div class="bot-head">
			                <Button type="default" ghost @click="$_clearCard">清空</Button>
		            	</div>
		            	<div class="bot-con">
		            		<draggable element="div" v-model="list2" :options="dragOptions" class="cardGroup">
						        <transition-group name="no" class="list-group" tag="ul">
			            			<Card v-for="element in list2" :key="element.title">
			            				<Icon type="md-close" title="删除" @click.stop="$_delCard(element.title)"/>
						                <h4>{{element.title}}</h4>
						                <p>=[]</p>
						            </Card>
						        </transition-group>
						    </draggable>
		            	</div>
		            </div>
		        </Split>
            </div>
        </Split>
	    
	    <Modal
	        v-model="modelShow"
	        title="批量更新标签值"
	        draggable
	        width="400"
	        >
	        <Form :label-width="60" ref="editForm" v-model="editForm">
		        <FormItem label="标签名称">
		        	<span>{{editForm.title}}</span>
		        </FormItem>
		        <FormItem label="值">
		        	<Select>
				        <Option v-for="item in cityList" :value="item.value" :key="item.value"></Option>
				    </Select>
		            <!--<Input placeholder=""></Input>-->
		        </FormItem>
		    </Form>
	    </Modal>
		
	   	
	</div>
</template>

<script>
	
	import draggable from 'vuedraggable'
	
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
	    	split1:0.3,
	    	split:0.65,
	    	treeData: [
	            {
	                title: '基本属性',
	                children: message.map((title, index) => {
				        return { 
				        	title,
				        	width:150,
				        	renderHeader: (h, params) => {
						        return h('div',
						        [	
						        	h('span', params.column.title),
						        	h('Icon', {
		                                props: {
		                                    type: 'md-close',
		                                },
		                                domProps: {
		                                    title: '移除'
		                                },
		                                on: {
		                                    click: () => {
		                                        this.$_delLabel(params.column.title);
		                                    }
		                                }
		                            }),
						        	h('Icon', {
		                                props: {
		                                    type: 'ios-create-outline',
		                                },
		                                domProps: {
		                                    title: '批量更新值'
		                                },
		                                on: {
		                                    click: () => {
		                                        this.$_showModel(params.column.title);
		                                    }
		                                }
		                            }),
						        ]
						        );
					        }
				        };
				    }),
//	                [
//	                    {title: '性别'},
//	                    {title: '学历'},
//	                    {title: '省份'},
//	                    {title: '社会角色'},
//	                    {title: '民族'},
//	                ]
	            },
	            {
	                title: '经济状况',
	                children: [
	                    {title: '收入'},
	                ]
	            },
	            {
	                title: '违法行为',
	                children: [
	                    {title: '违法'},
	                ]
	            }
	        ],
	        columns1: [
        		{
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 90,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Icon', {
                                props: {
                                    type: 'ios-create-outline',
                                },
                                domProps: {
                                    title: '编辑'
                                },
                                style: {
                                    marginRight: '5px',
                                    fontSize: "20px"
                                },
                                on: {
                                    click: () => {
                                        this.linkTo(h,params)
                                    }
                                }
                            }),
                            h('Icon', {
                                props: {
                                    type: 'ios-trash-outline'
                                },
                                domProps: {
                                    title: '删除'
                                },
                                style: {
                                    fontSize: "18px"
                                },
                                on: {
                                    click: () => {
                                        this.$_del(h,params)
                                    }
                                }
                            }),
                        ]);
                    }
                },
//              {
//                  title: 'Name',
//                  key: 'name',
//                  width:150,
//                  renderHeader: (h, params) => {
//				        return h('div',
//				        [	
//				        	h('span', params.column.title),
//				        	h('Icon', {
//                              props: {
//                                  type: 'md-close',
//                              },
//                              domProps: {
//                                  title: '移除'
//                              },
//                              on: {
//                                  click: () => {
//                                      this.$_delLabel(params.column.title);
//                                  }
//                              }
//                          }),
//				        	h('Icon', {
//                              props: {
//                                  type: 'ios-create-outline',
//                              },
//                              domProps: {
//                                  title: '批量更新值'
//                              },
//                              on: {
//                                  click: () => {
//                                      this.$_showModel(params.column.title);
//                                  }
//                              }
//                          }),
//				        ]
//				        );
//			        }
//              },
//              {
//                  title: 'Age',
//                  key: 'age',
//                  render: (h, params) => {
//                      return h('div', [
//                          h('Input', {
//                              props: {
//                              	type:'text',
//                                  value:params.row.age
//                              },
//                              on: {
//                              	'on-change':(event) => {
//                                      console.log(params)
//                                  }
//                              }
//                          }),
//                      ]);
//                  }
//              },
//              {
//                  title: '性别',
//                  key: 'sex',
//                  render: (h, params) => {
//                      return h('Select',{  
//					        props:{  
//					            value: params.row.sex,  
//					        },  
//					        on: {  
//					            'on-change':(event) => {  
//					            	
//					            }  
//					        },  
//					    },
//                      [
//                          h('Option', {
//                              props: {
//                                  value: '1',
//                              }
//                          }, '男'),
//                          h('Option', {
//                              props: {
//                                  value: '2',
//                              }
//                          }, '女')
//                      ]);
//                  }
//              }
            ],
            data1: [
//              {
//                  name: 'John Brown',
//                  age: 18,
//                  address: 'New York No. 1 Lake Park',
//                  sex: '1'
//              },
//              {
//                  name: 'Jim Green',
//                  age: 24,
//                  address: 'London No. 1 Lake Park',
//                  sex: '1'
//              },
//              {
//                  name: 'Joe Black',
//                  age: 30,
//                  address: 'Sydney No. 1 Lake Park',
//                  sex: '1'
//              },
//              {
//                  name: 'Jon Snow',
//                  age: 26,
//                  address: 'Ottawa No. 2 Lake Park',
//                  sex: '2'
//              }
            ],
            modelShow:false,
            cityList: [
                {
                    value: 'New York',
                    label: 'New York'
                }
            ],
            tableSelect:[],
            
            
            list: message.map((name, index) => {
		        return { name, order: index + 1, fixed: false };
		    }),
		    list2: [],
		    editable: true,
		    isDragging: false,
		    delayedDragging: false,
		      
		    current:[],
		    editForm:{
		    	title:'',
		    	value:''
		    },
		      
	    };
	  },
	  methods: {
	  	linkTo(h,index){
	  		this.$router.push({ path: '/labelCategory' });
	  	},
	  	handleSelectionChange(selection) {
	      	this.tableSelect = selection;
	    },
	    $_del(){
	    	this.$Modal.confirm({
                title: '提示',
                content: '<p>删除后将不能恢复，确认删除<>吗?</p>',
                onOk: () => {
                	
                },
                onCancel: () => {
                	
                }
           	});
	    },
	  	$_batchDel(){
		    if (this.tableSelect.length == 0) {
		    	this.$Message.warning('请选择需要删除的对象');
		        return;
		    }
		    this.$Modal.confirm({
                title: '提示',
                content: '<p>删除后将不能恢复，确认删除所选对象吗?</p>',
                onOk: () => {
                    this.$Message.info('Clicked ok');
                },
                onCancel: () => {
                	
                }
           	});
	  	},
	  	//移除标签
	  	$_delLabel(index){
	  		var tmpIndex = this.columns1.findIndex((item) => {
	  			return item.title == index
	  		})
	  		this.columns1.splice(tmpIndex,1);
	  	},
	  	//删除卡片
	  	$_delCard(index){
	  		var tmpIndex = this.list2.findIndex((item) => {
	  			return item.title == index
	  		})
	  		this.list2.splice(tmpIndex,1);
	  	},
	  	//清空
	  	$_clearCard(){
	  		this.list2=[];
	  	},
	  	onMove({ relatedContext, draggedContext }) {
	      const relatedElement = relatedContext.element;
	      const draggedElement = draggedContext.element;
	      console.log(relatedElement,draggedElement)
	      return (
	        (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
	      );
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
	   	$_showModel(name){
	   		this.modelShow=true;
	   		this.editForm.title = name;
	   	},
	   	onEnd(item){
	   		console.log(item)
	   	}
	  },
	  mounted() {
	  	
	  },
	  components: {
		　　draggable
		},
		computed: {
		    dragOptions() {
		      return {
		        animation: 0,
//		        group: "description",
		        group:{name:'description', pull:'clone'},
		        disabled: !this.editable,
		        ghostClass: "ghost"
		      };
		    },
		  },
		  watch: {
		    isDragging(newValue) {
		      if (newValue) {
		        this.delayedDragging = true;
		        return;
		      }
		      this.$nextTick(() => {
		        this.delayedDragging = false;
		      });
		    },
		    columns1(){
		    	console.log(this.columns1)
		    }
		  }
	};
</script>

<style scoped="scoped" lang="scss">
	.left{
		position: absolute;
		top: 12px;
		right: 0;
		bottom: 12px;
		left: 12px;
		background-color: rgb(59,61,71);
		padding: 10px;
		overflow: auto;
	}
	
	.top{
		.top-head{
			padding-bottom:12px;
			span{
				color: rgb(178,178,179);
				font-size: 18px;
				line-height: 35px;
				padding-right: 12px;
			}
			.ivu-radio-group{
				position: relative;
				top: -2px;
			}
		}
	}
	.bottom{
		padding: 24px 12px 12px 12px;
		.bot-con{
			padding-top: 12px;
			position: absolute;
			top: 69px;
			left: 12px;
			right: 12px;
			bottom: 12px;
		}
	}
	.demo-split-right{
		position: absolute;
		top: 12px;
		left: 12px;
		right: 12px;
		bottom: 12px;
	}
	.demo-split-pane{
		background-color: rgb(59,61,71);
	}
	.demo-split{
		background-color: rgb(47,50,59);
	}
	.ivu-split-trigger-horizontal{
		height: 12px;
	}
	
	.cardGroup,
	.cardGroup>.list-group{
		width: 100%;
		height: 100%;
	}
	
	.tableWrap{
		position: absolute;
		left: 12px;
		top: 60px;
		right: 12px;
		bottom: 12px;
	}
	
	
	
</style>