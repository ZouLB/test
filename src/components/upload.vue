<template>
	<div>
	    <Button type="primary" @click="showModal()">Display dialog box</Button>
	    <Modal
	        v-model="modal1"
	        title="Common Modal dialog box title"
	        @on-ok="ok"
	        @on-cancel="cancel">
	        <Upload
		        multiple
		        type="drag"
		        show-upload-list
		        :default-file-list="fileList"
		        :on-success = "uploadSuccess"
		        :on-remove = "handleRemove"
		        :on-error = "uploadError"
		        action="//jsonplaceholder.typicode.com/posts/">
		        <div style="padding: 20px 0">
		            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
		            <p>Click or drag files here to upload</p>
		        </div>
		    </Upload>
	    </Modal>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                modal1: false,
                fileList:[
				]
            }
        },
        methods: {
            ok () {
                this.$Message.info('Clicked ok');
            },
            cancel () {
                this.$Message.info('Clicked cancel');
            },
            showModal(){
            	this.modal1 = true;
            	this.fileList = [
				    {
				        name: 'img1.jpg',
				        url: 'http://www.xxx.com/img1.jpg'
				    },
				    {
				        name: 'img2.jpg',
				        url: 'http://www.xxx.com/img2.jpg'
				    }]
           },
           uploadSuccess(response, file, fileList){
           		console.log(response)
           		console.log(file)
           		console.log(fileList)
           },
           handleRemove(file, fileList){
           		console.log(file)
           		console.log(fileList)
           },
           uploadError(){
           	this.$Message.error('上传失败');
           }
        }
    }
</script>
