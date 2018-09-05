<template>
	<div>
		<Form ref="formInline" :model="formInline" inline>
	        <FormItem prop="name">
	            <Input type="text" v-model="formInline.name" placeholder="name">
	            </Input>
	        </FormItem>
	        <FormItem>
	            <Button type="primary" @click="search()">search</Button>
	        </FormItem>
	        <FormItem>
	            <Button type="primary" ghost @click="add">add</Button>
	        </FormItem>
	    </Form>
	    
	    <Table border :loading="loading" :columns="columns7" :data="dataShow" ref="table" size="small"></Table>
	    
		<div style="margin:15px 10px;overflow: hidden">
			<Button type="primary" @click="exportData(1)"><Icon type="ios-download-outline"></Icon> 导出数据</Button>
		    <Button type="primary" @click="exportData(2)"><Icon type="ios-download-outline"></Icon> 导出过滤后的数据</Button>
		    <Button type="primary" @click="exportData(3)"><Icon type="ios-download-outline"></Icon> 导出自定义数据</Button>
	        <div style="float: right;">
	            <Page 
	            	:total="tempData.length" 
	            	:current="page" 
	            	:page-size="5"
	            	:page-size-opts="[5,10, 20]"
	            	@on-change="pageChange"
	            	@on-page-size-change="pageSizeChange"
	            	show-total 
	            	show-sizer>
	            </Page>
	        </div>
	    </div>
	</div>
</template>
<script>
    export default {
        data () {
            return {
                columns7: [
                	{
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: 'Name',
                        key: 'name',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.name)
                            ]);
                        }
                    },
                    {
                        title: 'Age',
                        key: 'age',
                        filters: [
                            {
                                label: 'Greater than 25',
                                value: 1
                            },
                            {
                                label: 'Less than 25',
                                value: 2
                            }
                        ],
                        filterMultiple: false,
                        filterMethod (value, row) {
                            if (value === 1) {
                                return row.age > 25;
                            } else if (value === 2) {
                                return row.age < 25;
                            }
                        }
                    },
                    {
                        title: 'Address',
                        key: 'address',
                        sortable: true
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, 'View'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index,params.row)
                                        }
                                    }
                                }, 'Delete')
                            ]);
                        }
                    }
                ],
                tableData: [
                    {
                    	id:0,
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park'
                    },
                    {
                    	id:1,
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park'
                    },
                    {
                    	id:2,
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park'
                    },
                    {
                    	id:3,
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park'
                    },
                    {
                    	id:4,
                        name: 'John 1',
                        age: 38,
                        address: 'New York No. 1 Lake Park'
                    },
                    {
                    	id:5,
                        name: 'Jim 2',
                        age: 45,
                        address: 'London No. 1 Lake Park'
                    },
                    {
                    	id:6,
                        name: 'Joe 3',
                        age: 6,
                        address: 'Sydney No. 1 Lake Park'
                    },
                    {
                    	id:7,
                        name: 'Jon 4',
                        age: 76,
                        address: 'Ottawa No. 2 Lake Park'
                    },
                    {
                    	id:8,
                        name: 'Jim 2',
                        age: 45,
                        address: 'London No. 1 Lake Park'
                    },
                    {
                    	id:9,
                        name: 'Joe 3',
                        age: 6,
                        address: 'Sydney No. 1 Lake Park'
                    },
                    {
                    	id:10,
                        name: 'Jon 4',
                        age: 76,
                        address: 'Ottawa No. 2 Lake Park'
                    }
                ],
                dataShow:[],
                tempData:[],
                loading:false,
                formInline: {
                    name: ''
                },
                page:1,
                pageSize:5,
            }
        },
        methods: {
            show (index) {
                this.$Modal.info({
                    title: 'User Info',
                    content: `Name：${this.tableData[index].name}<br>Age：${this.tableData[index].age}<br>Address：${this.tableData[index].address}`
                })
            },
            //删除
            remove (index,row) {
            	this.$Modal.confirm({
                    title: '删除',
                    content: '<p>确认删除'+row.name+'吗？</p>',
                    onOk: () => {
                    	this.loading = true;
		            	let tmpIndex1 = this.tempData.findIndex((item) => {
		            		return item.id == row.id
		            	})
		                this.tempData.splice(tmpIndex1, 1);
		                
		                let tmpIndex2 = this.tableData.findIndex((item) => {
		            		return item.id == row.id
		            	})
		                this.tableData.splice(tmpIndex2, 1);
		                this.dataShow = this.tempData.slice((this.page-1)*this.pageSize,this.page*this.pageSize);
		            	this.loading = false;
                        this.$Message.success('删除成功！');
                    },
                    onCancel: () => {
                        this.$Message.info('取消删除');
                    }
               });
            },
            //新增
            add(){
//          	this.$Loading.start();
//          	this.$http.post(process.env.API_ROOT + "", params)
//					.then(function(r) {
//						if(r && r.data && r.data.resultValue) {
//							this.$Message.success('新增成功！');
//							this.$Loading.finish();
//						} else {
//							this.$Message.error('新增失败！');
//							this.$Loading.error();
//						}
//					})
//					.catch(function(error) {
//			          	this.$Message.erroe('新增失败！');
//						this.$Loading.error();
//			        });
//				}
            },
            //导出
            exportData (type) {
                if (type === 1) {
                    this.$refs.table.exportCsv({
                        filename: 'The original data'
                    });
                } else if (type === 2) {
                    this.$refs.table.exportCsv({
                        filename: 'Sorting and filtering data',
                        original: false
                    });
                } else if (type === 3) {
                    this.$refs.table.exportCsv({
                        filename: 'Custom data',
                        columns: this.columns7.filter((col, index) => index < 3),
                        data: this.tableData.filter((data, index) => index < 3)
                    });
                }
            },
            //搜索
            search(){
            	this.loading = true;
            	this.page = 1;//返回第一页
            	if(this.formInline.name!=""){
            		this.dataShow = [];
            		this.tempData = [];
            		this.tableData.forEach((item) => {
	            		if(item.name.indexOf(this.formInline.name)!=-1){
	            			this.dataShow.push(item)
	            			this.tempData.push(item)
	            		}
	            	})
            	}else{
            		this.dataShow = this.tableData;
            		this.tempData = this.tableData;
            	}
            	this.dataShow = this.tempData.slice((this.page-1)*this.pageSize,this.page*this.pageSize);
            	this.loading = false;
            },
            //分页
            pageChange(page){
            	this.page = page;
            	this.dataShow = this.tempData.slice((this.page-1)*this.pageSize,this.page*this.pageSize);
            },
            pageSizeChange(pageSize){
            	this.pageSize = pageSize;
            	this.dataShow = this.tempData.slice((this.page-1)*this.pageSize,this.page*this.pageSize);
            }
        },
        mounted(){
        	this.tempData = this.tableData;//tableData为全部数据
        	this.dataShow = this.tableData.slice(0,this.pageSize);//显示数据
        }
    }
</script>
