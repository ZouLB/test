<template>
	<div id="base-station" class="demo-split">
	    
	    <Split v-model="split1">
            <div slot="left" class="demo-split-pane left">
            	<Input size="large" v-model="search" @on-keyup="$_searchLabel"/>
				<!--<Tree :data="treeData"></Tree>-->
				
		        <!--<div class="ivu-tree">
		          	<ul v-if="search==''" class="ivu-tree-children" visible="visible" v-for="(v,i) in treeData">
		          		<li>
		          			<span class="ivu-tree-arrow" @click="$_showTree(i)">
		          				<Icon :type="current.indexOf(i)!=-1?'ios-arrow-down':'ios-arrow-forward'" />
		          			</span>
		          			<span class="ivu-tree-title" @click="$_showTree(i)">{{v.title}}</span> 
		          			<draggable 
		          				v-if="current.indexOf(i)!=-1" 
		          				class="list-group ivu-tree-children" 
		          				element="ul" 
		          				v-model="v.children" 
		          				:options="dragOptions" 
		          				@start="isDragging=true" 
		          				@end="isDragging=false">
			        			<transition-group type="transition" :name="'flip-list'">
			          				<li v-for="n in v.children" :key="n.title">
			          					<span class="ivu-tree-arrow"></span> 
			          					<span class="ivu-tree-title">{{n.title}}</span> 
			          				</li>
			          			</transition-group>
			    			</draggable>
		          		</li>
		          	</ul>
		          	<ul v-if="search!=''" class="ivu-tree-children no-padding" visible="visible" v-for="(v,i) in treeData">
		          		<li>
		          			<draggable 
		          				class="list-group ivu-tree-children" 
		          				element="ul" 
		          				v-model="v.children" 
		          				:options="dragOptions" 
		          				@start="isDragging=true" 
		          				@end="isDragging=false">
			        			<transition-group type="transition" :name="'flip-list'">
			          				<li v-for="n in v.children" v-if="n.title.indexOf(search)!=-1" :key="n.title">
			          					<span class="ivu-tree-arrow"></span> 
			          					<span class="ivu-tree-title">{{n.title}}</span> 
			          				</li>
			          			</transition-group>
			    			</draggable>
		          		</li>
		          	</ul>
		        </div>-->
		        
		        <div class="ivu-tree">
		          	<ul v-if="search==''" class="ivu-tree-children" visible="visible" v-for="(v,i) in treeData">
		          		<li>
		          			<span class="ivu-tree-arrow" @click="$_showTree(i)">
		          				<Icon :type="current.indexOf(i)!=-1?'ios-arrow-down':'ios-arrow-forward'" />
		          			</span>
		          			<span class="ivu-tree-title" @click="$_showTree(i)">{{v.title}}</span>
			    			<ul v-if="current.indexOf(i)!=-1" class="list-group ivu-tree-children" >
				    			<draggable :list="v.children" class="dragArea" :options="{group:{name:'people', pull:'clone', put:false },ghostClass:'ghostLi',dragClass:'dragLi'}" :move='allow'>
					                <li v-for="(n,i) in v.children"  :key="i">
					                    <span class="ivu-tree-arrow"></span> 
			          					<span class="ivu-tree-title">{{n.title}}</span> 
					                </li>
					             </draggable>
				             </ul>
		          		</li>
		          	</ul>
		          	<ul v-if="search!=''" class="ivu-tree-children no-padding" visible="visible" v-for="(v,i) in treeData">
		          		<li>
		          			<draggable v-model="v.children" class="ivu-tree-children" :options="{group:{name:'people', pull:'clone', put:false},ghostClass:'ghostLi',dragClass:'dragLi'}">
		          				<li v-for="n in v.children" v-if="n.title.indexOf(search)!=-1" :key="n.title">
		          					<span class="ivu-tree-arrow"></span> 
		          					<span class="ivu-tree-title">{{n.title}}</span> 
		          				</li>
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
						        <Button @click="$_refresh">刷新</Button>
						        <Button @click="$_batchDel">删除</Button>
						        <Button>新增</Button>
						    </ButtonGroup>
		            	</div>
		            	<div class="top-con tableWrap">
		            		<!--<draggable element="div" v-model="columns1" :options="dragOptions">
						        <transition-group name="no" class="tableWrap">
		            				<Table border size="small" :columns="columns1" :data="data1" :key="1" @on-selection-change="handleSelectionChange"></Table>
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
			        						<draggable v-model="columns1" :options="{group:{name:'people', pull:'clone'},ghostClass:'ghostLi',dragClass:'dragTh',filter:'.ignore-elements'}" element="tr">	
					            				<th v-for="(v,i) in columns1" :key="i" v-if="v.title">
				        							<div :class='["ivu-table-cell",v.title=="操作"?"small-width ignore-elements":""]'>
				        								<span>{{v.title}} </span>
				        								<Icon v-if="v.title!='操作'" type="md-close" title='移除' @click="$_delLabel(v.title);"/>
				        								<Icon v-if="v.title!='操作'" type="ios-create-outline" title='批量更新值' @click.stop="$_showModel('update',v.title);"/>
				        							</div>
				        						</th>
				        						<th class="ivu-table-column-center ignore-elements" v-else>
				        							<div class="ivu-table-cell ivu-table-cell-with-selection xs-width">
				        								<Checkbox></Checkbox>
				        							</div>
				        						</th>
										    </draggable> 
			        					</thead>
				        				<tbody>
				        					<tr>
				        						<td>
				        							<div class="ivu-table-cell ivu-table-cell-with-selection cell-edit xs-width">
				        								<Checkbox></Checkbox>
				        							</div>
				        						</td>
				        						<td>
				        							<div class="ivu-table-cell cell-edit">
				        								<Icon type="ios-create-outline" title='编辑' @click="linkTo()"/>
				        								<Icon type="ios-trash-outline" title='删除' @click="$_del();"/>
				        							</div>
				        						</td>
				        						<td>
				        							<div class="ivu-table-cell">
				        								<AutoComplete
													        v-model="value3"
													        :data="data3"
													        :filter-method="filterMethod"
													        @on-blur="$_changeVal"
													        >
													    </AutoComplete>
				        							</div>
				        						</td>
				        					</tr>
				        				</tbody>
				        			</table> 
				        		</div> 
				        	</div>
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
				            			<Card @click.native.stop="$_showModel('filter',element.title)">
				            				<Icon type="md-close" title="删除" @click.stop="$_delCard(element.title)"/>
							                <h4>{{element.title}}</h4>
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
	        :title="editType=='update'?'批量更新标签值':'筛选'"
	        :class-name="editType=='update'?'':'vertical-center-modal'"
	        width="400"
	        >
	        <Form :label-width="60" ref="editForm" v-model="editForm">
		        <FormItem label="标签名称">
		        	<span>{{editForm.title}}</span>
		        </FormItem>
		        <FormItem label="值">
		        	<Select v-model="check">
				        <Option v-for="item in conditions" :value="item.value" :key="item.value"></Option>
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
	    	split1:0.26,
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
            editType:'',
            check:'and',
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
            list: message.map((name, index) => {
		        return { name, order: index + 1, fixed: false };
		    }),
		    list2: [],
//		    editable: true,
//		    isDragging: false,
//		    delayedDragging: false,
		      
		    current:[0,1,2],
		    editForm:{
		    	title:'',
		    	value:''
		    },
            tableLoading:false,
            search:'',
            
            tableSelect:[],
		    value3: '',
            data3: ['true', 'false'],
            cityList: [
                {
                    value: 'New York',
                    label: 'New York'
                }
            ],
		      
	    };
	  },
	  methods: {
	  	linkTo(){
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
	  	//刷新
	  	$_refresh(){
//	  		this.tableLoading = true;
	  		this.tableLoading = !this.tableLoading;
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
	   	$_showModel(type,name){
	   		this.modelShow=true;
	   		this.editType = type;
	   		this.editForm.title = name;
	   	},
	   	filterMethod (value, option) {
            return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
       	},
       	$_searchLabel(){
//     		console.log(this.search)
       	},
       	$_changeVal(){
//     		this.$Modal.confirm({
//              title: 'Title',
//              content: '<p>是否保存更改</p>',
//              onOk: () => {
//                  this.$Message.info('Clicked ok');
//              },
//              onCancel: () => {
//              }
//          });
      	},
      	allow(evt) {
//		    console.log(evt.draggedContext.index)
//		    console.log(evt.draggedContext.element)
//		    console.log(evt.draggedContext.futureIndex)
//		    console.log(evt.relatedContext.index)
//		    console.log(evt.relatedContext.element)
//		    console.log(evt.relatedContext.list)
//		    console.log(evt.relatedContext.component.element)
		    return (evt.draggedContext.element.name!== 'b')
		  }
	  },
	  mounted() {
	  		//防止拖拽时打开新网页
            document.body.ondrop = function (event) {
                event.preventDefault();
                event.stopPropagation();
            }
	  },
	  components: {
		　　draggable
		},
		computed: {
//		    dragOptions() {
//		      return {
//		        animation: 0,
////		        group: "description",
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