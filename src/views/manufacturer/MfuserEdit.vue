<template>
	<el-dialog
	  :title="mfuserData.title"
	  :visible.sync="mfuserData.dialog"
	  width="30%"
	  @open="openEdit"
	  @closed="closedEdit('mfuserForm')"
	  :before-close="handleClose">
	  <el-form :model="mfuserForm" :rules="rules" ref="mfuserForm" label-width="120px">
	  	<el-form-item label="公司名称" prop="companyName">
		    <el-input v-model="mfuserForm.companyName" placeholder="请输入公司名称"></el-input>
		  </el-form-item>
		  <el-form-item label="营业执照编码" prop="blCode">
		    <el-select v-model="mfuserForm.blCode" filterable placeholder="下拉选择或搜索输入" class="w-100">
			    <el-option label="学工部" value="1"></el-option>
			    <el-option label="教务处" value="2"></el-option>
			  </el-select>
		  </el-form-item>
		  <el-form-item label="负责人姓名" prop="name">
		    <el-input v-model="mfuserForm.name" placeholder="请输入负责人姓名"></el-input>
		  </el-form-item>
		  <el-form-item label="性别" prop="sex">
		    <el-radio-group v-model="mfuserForm.sex">
			    <el-radio :label="3">男</el-radio>
			    <el-radio :label="6">女</el-radio>
			  </el-radio-group>
		  </el-form-item>
		  <el-form-item label="用户角色" prop="role">
		    <el-select v-model="mfuserForm.role" filterable placeholder="下拉选择或搜索输入" class="w-100">
			    <el-option label="超级管理员" value="1"></el-option>
			    <el-option label="合作厂商" value="2"></el-option>
			    <el-option label="部门负责人" value="3"></el-option>
			  </el-select>
		  </el-form-item>
		  <el-form-item label="数据权限" prop="auth">
		    <el-radio-group v-model="mfuserForm.auth">
			    <el-radio label="1">合作厂商</el-radio>
			  </el-radio-group>
		  </el-form-item>
		  <el-form-item label="设置密码" prop="passWord">
		    <el-input v-model="mfuserForm.passWord" placeholder="请输入密码"></el-input>
		  </el-form-item>
		  <el-form-item label="手机号码" prop="tel">
		    <el-input v-model="mfuserForm.tel" placeholder="请输入手机号码"></el-input>
		  </el-form-item>
		  <el-form-item label="电子邮箱" prop="email">
		    <el-input v-model="mfuserForm.email" placeholder="请输入电子邮箱"></el-input>
		  </el-form-item>
	  </el-form>
	  <span slot="footer" class="dialog-footer">
	    <el-button @click="closedEdit('mfuserForm')">取 消</el-button>
	    <el-button type="primary" @click="submitForm('mfuserForm')">确 定</el-button>
	  </span>
	</el-dialog>
</template>

<script>
	export default {
		props:['mfuserData'],
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
				mfuserForm:{
					companyName:"",
					blCode:"",
					name:"",
					sex:"",
					role:"2",
					auth:"1",
					passWord:"",
					tel:"",
					email:"",
				},
				isEdit:false,
				rules: {
          companyName: [
            { required: true, message: '请输入学工号', trigger: 'blur' }
          ],
          blCode: [
            { required: true, message: '请下拉选择或搜索输入所属部门', trigger: 'change' }
          ],
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
          ],
          sex: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
          role: [
            { required: true, message: '请下拉选择或搜索输入角色', trigger: 'change' }
          ],
          auth: [
            { required: true, message: '请选择权限', trigger: 'change' }
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
          tel: [
            { required: true, validator: this.commonJs.checkPhone, trigger: 'blur' },
          ],
          email: [
          	{ required: true, validator: this.commonJs.checkEmail, trigger: 'blur' },
          ],
        }
			}
		},
		components: {},
		mounted(){
			
		},
		methods:{
			// dialog初始化
			openEdit(){
				
			},
			// dialog关闭
			closedEdit(formName){
				this.handleClose();
				this.resetForm(formName);
			},
			// 右上角x关闭
			handleClose(){
				this.mfuserData.dialog = false;
			},
			// form提交
			submitForm(formName) {
				var _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
          	_this.handleClose();
						_this.resetForm(formName);
            alert('submit!');
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