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
			<Row>
				<Col span="16">
				<MenuItem v-for="(tab,index) in tabList" :key="index" :name="index" @click.native="$_changeMain(tab.id)">{{tab.name}}</MenuItem>
				<MenuItem name="4">更多>></MenuItem>
				</Col>
			</Row>
		</Menu>

		<div class="tab-content">
			<Row>
				<Col span="16" class="tab-left">
					<ul>
						<li v-for="(object,index) in objectList" :key="index" v-if="index<15">
							<h3>{{object.name}}</h3>
							<p>AH-DESC-34sSDSDG,地铁，微小站AH-DESC-34sSDSDG,地铁，微小站AH-DESC-34sSDSDG,地铁，微小站AH-DESC-34sSDSDG,地铁，微小站</p>
							<div class="operation">
								<span class="edit" @click="$_edit">【编辑】</span>
								<span>【查看】</span>
							</div>
						</li>
						
						<li class="tip" v-if="tipShow"><Icon type="md-sad" />搜索不到相关数据</li>
					</ul>
				</Col>
				<Col span="8" class="tab-right">
					<h3>热门标签</h3>
					<ul>
						<li v-for="(tag,index) in hotTags" :key="index" @click="$_hotClick(tag.name)" :class="searchVal==tag.name?'active-tag':''">{{tag.name}}</li>
						<li>更多>></li>
					</ul>
				</Col>
			</Row>
		</div>
	</Layout>
</template>

<script>
	import {getEntity,SearchTagsList, getHotTag } from '../assets/api/api';
	
	export default {
		data() {
			return {
				tabList: [],
				eid:'',
				hotTags:[],
				searchVal:'',
				objectList:[],
				tipShow:false
			};
		},
		methods: {
			$_getHot(){
				this.$Loading.start();
				getHotTag({
					tagEntityId:this.eid,
					type:"usageCount"
				})
				.then((res) => {
					if(res && res.details) {
//						console.log(res.details.data)
						this.hotTags = res.details.data;
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
			$_getObject(){
				this.$Loading.start();
				SearchTagsList({
					entityId:this.eid,
					kwd:this.searchVal
				})
				.then((res) => {
					if(res && res.details) {
//						console.log(res.details.data)
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
			$_edit() {
//				this.$store.state.formData = row;
		  		this.$router.push({ path: `/labelCategory/${this.eid}/edit` });
			},
			$_changeMain(id) {
				this.eid = id;
				this.$_getHot();
				this.$_getObject()
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
		},
		watch:{
			
		}
	};
</script>

<style lang="scss">
	
</style>