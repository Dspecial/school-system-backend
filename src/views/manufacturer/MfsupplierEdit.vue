<template>
	<el-dialog
	  :title="mfsupplierData.title"
	  :visible.sync="mfsupplierData.dialog"
	  width="30%"
	  @open="openEdit"
	  @closed="closedEdit('mfsupplierForm')"
	  :before-close="handleClose">
	  <el-form :model="mfsupplierForm" :rules="rules" ref="mfsupplierForm" label-width="120px">
	  	<el-form-item label="公司名称" prop="job_number">
		    <el-input v-model="mfsupplierForm.job_number" placeholder="请输入公司名称"></el-input>
		  </el-form-item>
		  <el-form-item label="营业执照编码" prop="sys_id">
		    <el-input v-model="mfsupplierForm.sys_id" placeholder="请输入营业执照编码"></el-input>
		  </el-form-item>
		  <el-form-item label="负责人姓名" prop="name">
		    <el-input v-model="mfsupplierForm.name" placeholder="请输入负责人姓名"></el-input>
		  </el-form-item>
		  <el-form-item label="性别" prop="sex">
		    <el-radio-group v-model="mfsupplierForm.sex">
			    <el-radio label="1">男</el-radio>
			    <el-radio label="2">女</el-radio>
			  </el-radio-group>
		  </el-form-item>
		  <el-form-item label="用户角色" prop="group_ids">
		    <el-select v-model="mfsupplierForm.group_ids" multiple filterable placeholder="下拉选择或搜索输入" class="w-100">
			    <el-option
			      v-for="item in roleOptions"
			      :key="item.id"
			      :label="item.name"
			      :value="item.id">
			      {{item.cate_name?item.cate_name+item.name:item.name}}
			    </el-option>
			  </el-select>
		  </el-form-item>
		  <el-form-item label="设置密码" prop="password" v-if="!mfsupplierData.isEdit">
		    <el-input v-model="mfsupplierForm.password" placeholder="请输入密码，默认123456"></el-input>
		  </el-form-item>
		  <el-form-item label="修改密码" prop="password2" v-else>
		    <el-input v-model="mfsupplierForm.password2" placeholder="请修改密码，不填写默认不修改"></el-input>
		  </el-form-item>
		  <el-form-item label="手机号码" prop="phone">
		    <el-input v-model="mfsupplierForm.phone" placeholder="请输入手机号码"></el-input>
		  </el-form-item>
		  <el-form-item label="电子邮箱" prop="email">
		    <el-input v-model="mfsupplierForm.email" placeholder="请输入电子邮箱"></el-input>
		  </el-form-item>
	  </el-form>
	  <span slot="footer" class="dialog-footer">
	    <el-button @click="closedEdit('mfsupplierForm')">取 消</el-button>
	    <el-button type="primary" @click="submitForm('mfsupplierForm')">确 定</el-button>
	  </span>
	</el-dialog>
</template>

<script>
	export default {
		props:['mfsupplierData'],
		inject: ['loadData'],
		name: 'MfsupplierEdit',
		data () {
			var validatePass = (rule, value, callback) => {
	      if (!this.$commonJs.checkSpecialKey(value)) {
	        callback(new Error("不能含有特殊字符！！"));
	      } else {
	        callback();
	      }
	    };
			return {
				mfsupplierForm:{
					id:"",
					job_number:"",
					sys_id:"",
					name:"",
					sex:"",
					group_ids:[],
					password:"",
					password2:"",
					phone:"",
					email:"",
				},
				roleOptions:[
				],
				rules: {
          job_number: [
            { required: true, message: '请输入公司名称', trigger: 'blur' }
          ],
          sys_id: [
            { required: true, message: '请输入营业执照编码', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入负责人姓名', trigger: 'blur' },
          ],
          sex: [
            { required: true, message: '请选择负责人性别', trigger: 'change' }
          ],
          group_ids: [
            { required: true, message: '请下拉选择或搜索输入角色', trigger: 'change' }
          ],
          phone: [
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
				this.initRole();
				if(this.mfsupplierData.isEdit){ // 编辑
					this.$api.supplierEdit({
						id:this.mfsupplierData.id,
						func_type:2,
					}).then(data => {
						if(data.code == 0){
								this.mfsupplierForm.id = data.data.id;
								this.mfsupplierForm.job_number = data.data.job_number;
								this.mfsupplierForm.sys_id = data.data.sys_id;
								this.mfsupplierForm.name = data.data.name;
								this.mfsupplierForm.sex = data.data.sex;
								this.mfsupplierForm.group_ids = data.data.group_arr;
								this.mfsupplierForm.phone = data.data.phone;
								this.mfsupplierForm.email = data.data.email;
								this.mfsupplierForm.is_normal = data.data.is_normal;
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
				this.mfsupplierData.dialog = false;
			},
			// form提交
			submitForm(formName) {
				var _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
          	if(this.mfsupplierData.isEdit){ // 编辑后提交
          		this.$api.supplierEdit({
          			id:this.mfsupplierForm.id,
	          		job_number:this.mfsupplierForm.job_number,
	          		sys_id:this.mfsupplierForm.sys_id,
	          		name:this.mfsupplierForm.name,
	          		sex:this.mfsupplierForm.sex,
	          		password:this.mfsupplierForm.password2,
	          		group_ids:this.mfsupplierForm.group_ids.join(","),
	          		phone:this.mfsupplierForm.phone,
	          		email:this.mfsupplierForm.email,
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
          		var psw;
          		if(this.mfsupplierForm.password){
	          		psw = this.mfsupplierForm.password;
	          	}else{
	          		psw = '123456';
	          	}
          		this.$api.supplierAdd({
	          		job_number:this.mfsupplierForm.job_number,
	          		sys_id:this.mfsupplierForm.sys_id,
	          		name:this.mfsupplierForm.name,
	          		sex:this.mfsupplierForm.sex,
	          		password:psw,
	          		group_ids:this.mfsupplierForm.group_ids.join(","),
	          		phone:this.mfsupplierForm.phone,
	          		email:this.mfsupplierForm.email,
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