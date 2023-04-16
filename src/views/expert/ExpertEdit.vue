<template>
	<el-dialog
	  :title="expertData.title"
	  :visible.sync="expertData.dialog"
	  width="30%"
	  @open="openEdit"
	  @closed="closedEdit('expertForm')"
	  :before-close="handleClose">
	  <el-form :model="expertForm" :rules="rules" ref="expertForm" label-width="120px">
	  	<el-form-item label="专家姓名" prop="e_name">
		    <el-input v-model="expertForm.e_name" placeholder="请输入专家姓名"></el-input>
		  </el-form-item>
		  <el-form-item label="专家手机号" prop="e_phone">
		    <el-input v-model="expertForm.e_phone" placeholder="请输入专家手机号码"></el-input>
		  </el-form-item>
		  <el-form-item label="电子邮箱" prop="e_email">
		    <el-input v-model="expertForm.e_email" placeholder="请输入电子邮箱"></el-input>
		  </el-form-item>
		  <el-form-item label="性别" prop="e_sex">
		    <el-radio-group v-model="expertForm.e_sex">
			    <el-radio label="1">男</el-radio>
			    <el-radio label="2">女</el-radio>
			  </el-radio-group>
		  </el-form-item>
		  <el-form-item label="专业" prop="subject">
		    <el-input v-model="expertForm.subject" placeholder="请输入专业"></el-input>
		  </el-form-item>
		  <el-form-item label="擅长领域" prop="label">
		    <el-input v-model="expertForm.label" placeholder="请输入擅长领域"></el-input>
		  </el-form-item>
		  <el-form-item label="是否使用" prop="is_use">
		    <el-radio-group v-model="expertForm.is_use">
			    <el-radio label="1">使用</el-radio>
			    <el-radio label="2">禁用</el-radio>
			  </el-radio-group>
		  </el-form-item>
		  <el-form-item label="备注">
		    <el-input type="textarea" v-model="expertForm.remark" placeholder="请输入类型备注" :autosize="{ minRows: 3, maxRows: 5}" maxlength="30" show-word-limit></el-input>
		  </el-form-item>
	  </el-form>
	  <span slot="footer" class="dialog-footer">
	    <el-button @click="closedEdit('expertForm')">取 消</el-button>
	    <el-button type="primary" @click="submitForm('expertForm')">确 定</el-button>
	  </span>
	</el-dialog>
</template>

<script>
	export default {
		props:['expertData'],
		inject: ['loadData'],
		name: 'MuserEdit',
		data () {
			var validatePass = (rule, value, callback) => {
	      if (!this.$commonJs.checkSpecialKey(value)) {
	        callback(new Error("不能含有特殊字符！！"));
	      } else {
	        callback();
	      }
	    };
			return {
				expertForm:{
					id:"",
					e_name:"",
					e_phone:"",
					e_email:"",
					e_sex:"",
					subject:"",
					label:"",
					remark:"",
					is_use:"",
				},
				roleOptions:[
				],
				rules: {
          e_name: [
            { required: true, message: '请输入专家姓名', trigger: 'blur' }
          ],
          e_phone: [
            { required: true, validator: this.commonJs.checkPhone, trigger: 'blur' },
          ],
          e_email: [
          	{	validator: this.commonJs.checkEmail, trigger: 'blur' },
          ],
          e_sex: [
            { required: true, message: '请选择负责人性别', trigger: 'change' }
          ],
          subject: [
            { required: true, message: '请输入专业', trigger: 'blur' },
          ],
          is_use: [
            { required: true, message: '请选择是否使用', trigger: 'change' },
          ],
          
        }
			}
		},
		components: {},
		mounted(){
			
		},
		methods:{
			// 获取厂商角色列表
			initRole(){
				this.$api.companyRole({
        }).then(data=>{
          if(data.code == 0){
          	this.roleOptions = data.data;
          }else{
            this.$message.error(data.msg);
          }
        });
			},
			// dialog初始化
			openEdit(){
				var _this = this;
				if(this.expertData.isEdit){ // 编辑
					this.$api.expertEdit({
						id:this.expertData.id,
						func_type:2,
					}).then(data => {
						if(data.code == 0){
								this.expertForm.id = data.data.id;
								this.expertForm.e_name = data.data.e_name;
								this.expertForm.e_phone = data.data.e_phone;
								this.expertForm.e_email = data.data.e_email;
								this.expertForm.e_sex = data.data.e_sex;
								this.expertForm.subject = data.data.subject;
								this.expertForm.label = data.data.label;
								this.expertForm.remark = data.data.remark;
								this.expertForm.is_use = data.data.is_use;
						}else{
							this.$message.error(data.msg);
						}
					})
				}else{ // 新增
					
				}
			},
			// dialog关闭
			closedEdit(formName){
				this.handleClose();
				this.resetForm(formName);
			},
			// 右上角x关闭
			handleClose(){
				this.expertData.dialog = false;
			},
			// form提交
			submitForm(formName) {
				var _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
          	if(this.expertData.isEdit){ // 编辑后提交
          		this.$api.expertEdit({
          			id:this.expertForm.id,
	          		e_name:this.expertForm.e_name,
	          		e_phone:this.expertForm.e_phone,
	          		subject:this.expertForm.subject,
	          		label:this.expertForm.label,
	          		remark:this.expertForm.remark,
	          		is_use:this.expertForm.is_use,
	          		e_email:this.expertForm.e_email,
	          		e_sex:this.expertForm.e_sex,
	          		func_type:1,
	          	}).then(data =>{
	          		if(data.code == 0){
									_this.handleClose();
									_this.resetForm(formName);
									_this.loadData();
	          		}else{
	          			this.$message.error(data.msg);
	          		}
	          	});
          	}else{ // 新增后提交
          		this.$api.expertAdd({
	          		e_name:this.expertForm.e_name,
	          		e_phone:this.expertForm.e_phone,
	          		subject:this.expertForm.subject,
	          		label:this.expertForm.label,
	          		remark:this.expertForm.remark,
	          		is_use:this.expertForm.is_use,
	          		e_email:this.expertForm.e_email,
	          		e_sex:this.expertForm.e_sex,
	          	}).then(data =>{
	          		if(data.code == 0){
									_this.handleClose();
									_this.resetForm(formName);
									_this.loadData();
	          		}else{
	          			this.$message.error(data.msg);
	          		}
	          	});
          	}
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // 表单重置
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
		}
	}
</script>

<style>

</style>