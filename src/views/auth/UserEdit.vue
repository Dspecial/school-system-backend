<template>
	<el-dialog
	  :title="userData.title"
	  :visible.sync="userData.dialog"
	  width="30%"
	  @open="openEdit"
	  @closed="closedEdit('deptForm')"
	  :before-close="handleClose">
	  <el-form :model="userForm" :rules="rules" ref="userForm" label-width="120px">
	  	<el-form-item label="工号" prop="employeeNumber">
		    <el-input v-model="userForm.employeeNumber" placeholder="请输入学工号"></el-input>
		  </el-form-item>
		  <el-form-item label="所属部门" prop="dept">
		    <el-select v-model="userForm.dept" filterable placeholder="下拉选择或搜索输入" class="w-100">
			    <el-option label="学工部" value="1"></el-option>
			    <el-option label="教务处" value="2"></el-option>
			  </el-select>
		  </el-form-item>
		  <el-form-item label="真实姓名" prop="name">
		    <el-input v-model="userForm.name" placeholder="请输入姓名"></el-input>
		  </el-form-item>
		  <el-form-item label="性别" prop="sex">
		    <el-radio-group v-model="userForm.sex">
			    <el-radio :label="3">男</el-radio>
			    <el-radio :label="6">女</el-radio>
			  </el-radio-group>
		  </el-form-item>
		  <el-form-item label="用户角色" prop="role">
		    <el-select v-model="userForm.role" filterable placeholder="下拉选择或搜索输入" class="w-100">
			    <el-option label="超级管理员" value="1"></el-option>
			    <el-option label="厂商用户" value="2"></el-option>
			    <el-option label="部门负责人" value="3"></el-option>
			  </el-select>
		  </el-form-item>
		  <el-form-item label="数据权限" prop="auth">
		    <el-radio-group v-model="userForm.auth">
			    <el-radio :label="3">全校</el-radio>
			    <el-radio :label="6">部门权限</el-radio>
			    <el-radio :label="9">个人</el-radio>
			  </el-radio-group>
		  </el-form-item>
		  <el-form-item label="已选权限部门" prop="selectedDept" class="auth_dept_select">
		    <el-select v-model="userForm.selectedDept" multiple placeholder="请选择已选权限部门" class="w-100">
			    <el-option label="科技处" value="1"></el-option>
			    <el-option label="教育处" value="2"></el-option>
			    <el-option label="信息中心" value="3"></el-option>
			  </el-select>
		  </el-form-item>
		  <el-form-item label="设置密码" prop="passWord">
		    <el-input v-model="userForm.passWord" placeholder="请输入密码"></el-input>
		  </el-form-item>
		  <el-form-item label="手机号码" prop="tel">
		    <el-input v-model="userForm.tel" placeholder="请输入手机号码"></el-input>
		  </el-form-item>
		  <el-form-item label="电子邮箱" prop="email">
		    <el-input v-model="userForm.email" placeholder="请输入电子邮箱"></el-input>
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
					employeeNumber:"",
					dept:"",
					name:"",
					sex:"",
					role:"",
					auth:"",
					selectedDept:[],
					passWord:"",
					tel:"",
					email:"",
				},
				isEdit:false,
				rules: {
          employeeNumber: [
            { required: true, message: '请输入学工号', trigger: 'blur' }
          ],
          dept: [
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
          selectedDept: [
            { required: true, message: '请选择已选权限部门', trigger: 'change' }
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
			console.log(this.commonJs);
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
				this.userData.dialog = false;
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