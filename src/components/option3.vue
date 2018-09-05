<template>
    <Tabs value="name1">
        <TabPane label="标签一" name="name1">
        	<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" class="form">
		        <FormItem label="Name" prop="name">
		            <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
		        </FormItem>
		        <FormItem label="City" prop="city">
		            <Select v-model="formValidate.city" placeholder="Select your city">
		                <Option value="beijing">New York</Option>
		                <Option value="shanghai">London</Option>
		                <Option value="shenzhen">Sydney</Option>
		            </Select>
		        </FormItem>
		        <FormItem label="Date">
		            <Row>
		                <Col span="11">
		                    <FormItem prop="date">
		                        <DatePicker type="date" placeholder="Select date" v-model="formValidate.date"></DatePicker>
		                    </FormItem>
		                </Col>
		                <Col span="2" style="text-align: center">-</Col>
		                <Col span="11">
		                    <FormItem prop="time">
		                        <TimePicker type="time" placeholder="Select time" v-model="formValidate.time"></TimePicker>
		                    </FormItem>
		                </Col>
		            </Row>
		        </FormItem>
		        <FormItem label="Gender" prop="gender">
		            <RadioGroup v-model="formValidate.gender">
		                <Radio label="male">Male</Radio>
		                <Radio label="female">Female</Radio>
		            </RadioGroup>
		        </FormItem>
		        <FormItem label="Hobby" prop="interest">
		            <CheckboxGroup v-model="formValidate.interest">
		                <Checkbox label="Eat"></Checkbox>
		                <Checkbox label="Sleep"></Checkbox>
		                <Checkbox label="Run"></Checkbox>
		                <Checkbox label="Movie"></Checkbox>
		            </CheckboxGroup>
		        </FormItem>
		        <FormItem label="Switch">
		            <i-switch v-model="formValidate.switch" size="large">
		                <span slot="open">On</span>
		                <span slot="close">Off</span>
		            </i-switch>
		        </FormItem>
		        <FormItem label="Slider">
		            <Slider v-model="formValidate.slider" range></Slider>
		        </FormItem>
		        <FormItem label="Desc" prop="desc">
		            <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
		        </FormItem>
		        <FormItem>
		            <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
		            <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
		        </FormItem>
		    </Form>
        </TabPane>
        
        <TabPane label="标签二" name="name2">
        	<Button @click="modal12 = true">对话框</Button>
		    <Modal v-model="modal12" draggable scrollable title="Modal 1">
		        <div>This is the first modal</div>
		    </Modal>
		    <Button @click="value1 = true" type="primary">抽屉</Button>
		    <Drawer title="Basic Drawer" :closable="false" v-model="value1">
		        <p>Some contents...</p>
		        <p>Some contents...</p>
		        <p>Some contents...</p>
		    </Drawer>
        </TabPane>
        
        <TabPane label="标签三" name="name3">标签三的内容</TabPane>
    </Tabs>
</template>
<script>
    export default {
        data () {
            return {
                formValidate: {
                    name: '',
                    city: '',
                    gender: '',
                    interest: [],
                    date: '',
                    time: '',
                    switch: true,
                    slider: [0, 50],
                    desc: ''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                },
                modal12:false,
                value1:false
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>

<style scoped="scoped" lang="scss">
	form{
		width: 60%;
		margin-left: 200px;
		margin-top: 20px;
	}
</style>