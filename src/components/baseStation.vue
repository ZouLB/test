<template>
	<div id="base-station" class="demo-split">
	    
	    <Split v-model="split1">
            <div slot="left" class="demo-split-pane left">
            	<Input size="large" v-model="search" clearable/>
				<!--<Tree :data="treeData"></Tree>-->
				
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
						        <Button>新增</Button>
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
				        								<Checkbox></Checkbox>
				        							</div>
				        						</th>
				        						
				        						<th class="ivu-table-column-center ignore-elements">
				        							<div class='ivu-table-cell small-width'>
				        								<span>操作</span>
				        							</div>
				        						</th>	
			        						<draggable v-model="columns" :move="$_onMoved" :options="{group:{name:'people', pull:'clone'},ghostClass:'ghostLi',dragClass:'dragTh',filter:'.ignore-elements'}" element="tr">	
					            				
					            				<!--<th v-for="v in test" class="ivu-table-column-center ignore-elements">
				        							<div v-if="v.type=='selection'" class="ivu-table-cell ivu-table-cell-with-selection xs-width">
				        								<Checkbox></Checkbox>
				        							</div>
				        							<div class='ivu-table-cell small-width' v-else>
				        								<span>操作</span>
				        							</div>
				        						</th>-->
					            				<!--<th class="ivu-table-column-center ignore-elements">
				        							<div class="ivu-table-cell ivu-table-cell-with-selection xs-width">
				        								<Checkbox></Checkbox>
				        							</div>
				        						</th>
				        						
				        						<th class="ivu-table-column-center ignore-elements">
				        							<div class='ivu-table-cell small-width'>
				        								<span>操作</span>
				        							</div>
				        						</th>-->
				        						
				        						<th v-for="(v,i) in columns" :key="i">
				        							<div class="ivu-table-cell">
				        								<span>{{v.name}} </span>
				        								<Icon type="md-close" title='移除' @click="$_delLabel(v.name);"/>
				        								<Icon type="ios-create-outline" title='批量更新值' @click.stop="$_showModel('update',v.name);"/>
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
				        					<tr v-for="(row,index) in data" :key="index">
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
				        						<td class="input-td" v-for="(item,i) in row" :key="i">
				        							<div class="ivu-table-cell">
				        								<AutoComplete
													        v-model="row[i]"
													        :data="data3"
													        clearable
													        @on-search="handleSearch"
													        @on-focus="$_saveOldVal(row[i])"
													        @on-select="$_changeVal1(row[i])"
													        @on-blur="$_changeVal(row[i],index,i)"
													        @keyup.native.enter="$_changeVal(row[i])"
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
	
	import { getTags, changeTags, searchTags } from '../assets/api/api';
	
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
	        columns: [
//				{ type: 'selection' },
//              { name: '操作' },
            ],
            paramsId:'',
            data: [["test1","false","0"],["test2","false","0"],["test3","false","0"]],
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
		      
		    current:[],
		    editForm:{
		    	title:'',
		    	value:''
		    },
            tableLoading:false,
            search:'',
            
            tmpVal:'',
            selectVal:'',
		    value3: 'old',
		    
            tableSelect:[],
            data3: ['是','否'],
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
	  		this.$router.push({ path: '/labelCategory'+id });
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
	  		let para = {
	  			entityId:this.paramsId,
	  			primaryKey:"1600010605799",
//	  			columnNames:[],
//	  			where:'1=1'
	  		}
	  		console.log(this.columns);
//	  		for(let i=2;i<this.columns.length;i++){
//		  		para.columnNames.push(this.columns[i].name);
//	  		}
	  		console.log(para)
//	  		console.log(JSON.stringify(para))
	  		searchTags(para).then((res)=>{
//				if(res&&res.details){
//					console.log(res.details);
//				}else{
//					this.$Message.error(res.message);
//				}
				console.log(res)
            })
            .catch((err) => {
            	console.log(err)
            	this.$Message.error(err.message);
            });
	  	},
	  	
	  	//移除标签
	  	$_delLabel(index){
	  		var tmpIndex = this.columns.findIndex((item) => {
	  			return item.name == index
	  		})
	  		this.columns.splice(tmpIndex,1);
	  	},
	  	//删除卡片
	  	$_delCard(index){
	  		var tmpIndex = this.list2.findIndex((item) => {
	  			return item.name == index
	  		})
	  		this.list2.splice(tmpIndex,1);
	  	},
	  	//清空
	  	$_clearCard(){
	  		this.list2=[];
	  	},
//	  	onMove({ relatedContext, draggedContext }) {
//	      const relatedElement = relatedContext.element;
//	      const draggedElement = draggedContext.element;
//	      console.log(relatedElement,draggedElement)
//	      return (
//	        (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
//	      );
//	   	},
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
       	handleSearch (value) {
            this.data3 = !value ? [] : ['是','否'];
        },
       	$_saveOldVal(oldval){
       		this.tmpVal = oldval;
       	},
       	$_changeVal(val,i,j){
       		if(val&&this.tmpVal != val){
       			this.$Modal.confirm({
	                title: '系统提示',
	                content: '<p>确定修改吗？</p>',
	                onOk: () => {
	                	let para = {
				  			entityId:this.paramsId,
				  			primaryKey:"799003fd-1ff0-4808-b4b1-2b81793518f2",
				  			columnNames:"区域",
			//	  			where:''
				  		}
				  		changeTags(para).then((res)=>{
			//				if(res&&res.details){
			//					console.log(res.details);
			//				}else{
			//					this.$Message.error(res.message);
			//				}
							console.log(res)
			            })
			            .catch((err) => {
			            	console.log(err)
			            	this.$Message.error(err.message);
			            });
	                	
	                    this.$Message.success('修改成功');
	                },
	                onCancel: () => {
	                	this.data[i][j] = this.tmpVal;
	                	console.log(this.data)
	                }
	            });
       		}
      	},
      	$_changeVal1(value){
      		this.selectVal = value;
//    		console.log(value)
      		if(value){
      			this.$Modal.confirm({
	                title: '系统提示',
	                content: '<p>确定修改吗？</p>',
	                onOk: () => {
	                	this.value3 = value;
	                    this.$Message.success('修改成功');
	                },
	                onCancel: () => {
	                	this.value3 = this.tmpVal;
	                }
	            });
      		}
      	},
      	$_onMoved(evt){
      		console.log(this.columns)
      		console.log(evt.draggedContext.index,evt.relatedContext.index)
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
			getTags({type:'tenant',tagEntityId:this.paramsId}).then((res)=>{
				if(res&&res.details&&res.details.data){
					console.log(res.details.data[0].children);
					this.treeData = res.details.data[0].children;
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
	.left-indent{
		position: relative;
		left: -3px;
	}
	/*tr th:nth-of-type(1){
		display: inherit;
		position: absolute;
		left: 0;
	}
	tr th:nth-of-type(2){
		position: absolute;
		left:62px;
		margin-right: 154px;
	}*/
	/*tr th:nth-of-type(1){*/
		/*margin-left: 152px;*/
	/*}*/
	
	
</style>