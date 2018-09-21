<template>
	<Layout id="sys-detail">
		<Header class="tab-content">
			<Row>
				<Col span="16">
				<Input search v-model="searchVal" @on-search="$_getObject" icon="ios-search" enter-button=" 搜索" placeholder="输入关键字搜索..."/>
				</Col>
				<Col class="btn">
				<Button type="text" ghost :to="'/baseStation/'+eid">精确检索</Button>
				</Col>
			</Row>
		</Header>

		<Menu class="tab-content" mode="horizontal" :active-name="0" ref="side_menu">
			<Icon type="ios-arrow-back" class="back-icon" title="返回" @click="$_goBack"/>
			<Row>
				<Col span="16">
				<MenuItem 
					v-for="(tab,index) in tabList" 
					:key="index" 
					:name="index" 
					@click.native="$_changeMain(tab.id,index)" 
					:class="currentIndex==index?'current-menu':''">
					{{tab.name}}
				</MenuItem>
				<MenuItem name="more" @click="currentIndex='more'">更多>></MenuItem>
				</Col>
			</Row>
		</Menu>

		<div class="tab-content">
			<Row>
				<Col span="16" class="tab-left">
					<ul>
						<li v-for="(object,index) in objectList" :key="index" v-if="index<15">
							<h3>{{object.PID}}</h3>
							<p>
								<span v-for="(val,key,i) in object" :key="i">
									<span v-for="(tree,j) in treeData" :key="j">
										<span v-for="(tval,i) in tree" v-if="tval.code==key">
											{{tval.name}} =
										</span>
									</span>
									<span id="value" :class="val==searchVal?'current-val':''">【{{val}}】</span>
								</span>
								
							</p>
							<div class="operation">
								<span class="edit" @click="$_edit(object)">【编辑】</span>
								<span>【查看】</span>
							</div>
						</li>
						<li class="tip" v-if="tipShow"><Icon type="md-sad" />搜索不到相关数据</li>
					</ul>
				</Col>
				<Col span="8" class="tab-right">
					<h3>热门标签</h3>
					<ul>
						<li v-for="(tag,index) in hotTags" v-if="index<hotSize" :key="index" @click="$_hotClick(tag.name)" :class="searchVal==tag.name?'active-tag':''">{{tag.name}}</li>
						<li v-if="hotSize==hotTags.length" @click="hotSize=10">收起<<</li>
						<li v-if="hotSize<hotTags.length" @click="hotSize=hotTags.length">更多>></li>
					</ul>
				</Col>
			</Row>
		</div>
	</Layout>
</template>

<script>
	import {getEntity,SearchTagsList, getHotTag, getTags } from '../assets/api/api';
	
	export default {
		data() {
			return {
				tabList: [],
				eid:'',
				hotTags:[],
				searchVal:'',
				objectList:[],
				tipShow:false,
				treeData:[],
				currentIndex:0,
				hotSize:10,
			};
		},
		methods: {
			$_goBack(){
				this.$router.go(-1);
			},
			$_getHot(){
//				this.$Loading.start();
				getHotTag({
					tagEntityId:this.eid,
					type:"usageCount"
				})
				.then((res) => {
					if(res && res.details) {
//						console.log(res.details.data)
						this.hotTags = res.details.data;
//						this.$Loading.finish();
					} else {
						this.$Loading.error();
						this.$Message.error(res.message);
					}
				})
				.catch((err) => {
					this.$Loading.error();
					this.$Message.error(err.message);
				});
			},
			$_getObject(){
				this.$Loading.start();
				SearchTagsList({
					entityId:this.eid,
					kwd:this.searchVal
				})
				.then((res) => {
					if(res && res.details) {
						console.log(res.details.data)
						this.objectList = res.details.data;
						if(this.objectList.length==0){
							this.tipShow = true;
						}else{
							this.tipShow = false;
						}
						this.$Loading.finish();
					} else {
						this.$Loading.error();
						this.$Message.error(res.message);
					}
				})
				.catch((err) => {
					this.$Loading.error();
					this.$Message.error(err.message);
				});
			},
			$_getTree(){
				this.treeData=[];
				getTags({type:'platform',tagEntityId:this.eid}).then((res)=>{
					if(res&&res.details&&res.details.data){
						console.log(res.details.data[0].children);
						let tmp = res.details.data[0].children;
						tmp.forEach((item) => {
							this.treeData.push(item.children)
						})
						console.log(this.treeData)
					}else{
						this.$Message.error(res.message);
					}
	            })
	            .catch((err) => {
	            	this.$Message.error(err.message);
	            });
			},
			$_edit(row) {
				this.$store.state.formData = row;
		  		this.$router.push({ path: `/labelCategory/${this.eid}/edit` });
			},
			$_changeMain(id,index) {
				this.currentIndex = index;
				this.eid = id;
				this.$_getHot();
				this.$_getObject();
				this.$_getTree();
			},
			$_hotClick(tag){
				this.searchVal = tag;
				this.$_getObject();
			}
		},
		mounted() {
			this.searchVal = this.$store.state.searchValue;
			this.tabList = this.$store.state.entityData;
			this.eid = this.tabList[0].id;
			this.$_getHot();
			this.$_getObject();
			this.$_getTree();
		},
		watch:{
			
		}
	};
</script>

<style lang="scss">
	
</style>