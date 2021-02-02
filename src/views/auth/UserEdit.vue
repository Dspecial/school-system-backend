<template>
	<el-dialog
	  :title="userData.title"
	  :visible.sync="userData.dialog"
	  width="30%"
	  @open="openEdit"
	  @closed="closedEdit('userForm')"
	  :before-close="handleClose">
	  <el-form :model="userForm" :rules="rules" ref="userForm" label-width="120px">
	  	<el-form-item label="工号" prop="job_number">
		    <el-input v-model="userForm.job_number" placeholder="请输入工号"></el-input>
		  </el-form-item>

		  <el-form-item label="真实姓名" prop="name">
		    <el-input v-model="userForm.name" placeholder="请输入姓名"></el-input>
		  </el-form-item>

		  <el-form-item label="所属角色" prop="pid">
			  <el-cascader class="w-100" v-model="userForm.pid" placeholder="请选择所属角色" :show-all-levels="false" clearable :options="roleParentOptions" :props="{value:'id',label:'name',children:'children',checkStrictly: true}" @change="handleChange">
			  </el-cascader>
		  </el-form-item>

		  <el-form-item label="性别">
		    <el-radio-group v-model="userForm.sex">
			    <el-radio :label="1">男</el-radio>
			    <el-radio :label="2">女</el-radio>
			  </el-radio-group>
		  </el-form-item>

		  <el-form-item label="设置密码" prop="password">
		    <el-input v-model="userForm.password" placeholder="请输入密码,默认123456"></el-input>
		  </el-form-item>

		  <el-form-item label="手机号码" prop="phone">
		    <el-input v-model="userForm.phone" placeholder="请输入手机号码"></el-input>
		  </el-form-item>
		  <el-form-item label="电子邮箱" prop="email">
		    <el-input v-model="userForm.email" placeholder="请输入电子邮箱"></el-input>
		  </el-form-item>
		  <el-form-item label="是否禁用">
		    <el-radio-group v-model="userForm.is_normal">
			    <el-radio :label="0">正常</el-radio>
			    <el-radio :label="6">禁用</el-radio>
			  </el-radio-group>
		  </el-form-item>
	  </el-form>
	  <span slot="footer" class="dialog-footer">
	    <el-button @click="closedEdit('userForm')">取 消</el-button>
	    <el-button type="primary" @click="submitForm('userForm')">确 定</el-button>
	  </span>
	</el-dialog>
</template>

<script>
	export default {
		props:['userData'],
		inject: ['loadData'],
		name: 'UserEdit',
		data () {
			var validatePass = (rule, value, callback) => {
	      if (!this.$commonJs.checkSpecialKey(value)) {
	        callback(new Error("不能含有特殊字符！！"));
	      } else {
	        callback();
	      }
	    };
			return {
				userForm:{
					job_number:"",
					name:"",
					pid:"",
					is_normal:"",
					sex:"",
					password:"",
					phone:"",
					email:"",
				},
				roleParentOptions:[
				],
				rules: {
          job_number: [
            { required: true, message: '请输入职工号', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
          ],
          pid: [
            { required: true, message: '请下拉选择或搜索输入角色', trigger: 'change' }
          ],
          passWord: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { 
            	trigger: 'blur',
            	validator: (rule, value, callback) => {
			          var passwordreg = /(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{6,16}/
			          if (!passwordreg.test(value)) {
			            callback(new Error('密码必须由数字、字母、特殊字符组合,请输入6-16位'))
			          }else{
			            callback()
			          }
		        	}
      			}
          ],
          // phone: [
          //   { validator: this.commonJs.checkPhone, trigger: 'blur' },
          // ],
          // email: [
          // 	{ validator: this.commonJs.checkEmail, trigger: 'blur' },
          // ],
        }
			}
		},
		components: {},
		mounted(){

		},
		methods:{
			handleChange(value) {
        // console.log(value,'99999');
      },

			// 获取上级角色
			initRoleParent(){
				this.$api.roleParent({
        }).then(data=>{
          if(data.code == 0){
          	this.roleParentOptions = data.data;
          }else{
            this.$message.error(data.msg);
          }
        });
			},

			// dialog初始化
			openEdit(){
				var _this = this;
				this.initRoleParent();
			},
			// dialog关闭
			closedEdit(formName){
				this.handleClose();
				this.resetForm(formName);
			},
			// 右上角x关闭
			handleClose(){
				this.userData.dialog = false;
			},
			// form提交
			submitForm(formName) {
				var _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
          	var psw;
          	if(this.userForm.password){
          		psw = this.userForm.password;
          	}else{
          		psw = '123456';
          	}
          	this.$api.userAdd({ // 保存失败
          		name:this.userForm.name,
          		job_number:this.userForm.job_number,
          		password:psw,
          		group_ids:this.userForm.pid[this.userForm.pid.length - 1],
          		phone:this.userForm.phone,
          		email:this.userForm.email,
          		is_normal:this.userForm.is_normal,
          	}).then(data =>{
          		if(data.code == 0){
								_this.handleClose();
								_this.resetForm(formName);
								_this.loadData();
          		}
          	});
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