<template>
	<el-dialog
	  :title="userData.title"
	  :visible.sync="userData.dialog"
	  width="30%"
	  @open="openEdit"
	  @closed="closedEdit('userForm')"
	  :before-close="handleClose">
	  <el-form :model="userForm" :rules="rules" ref="userForm" label-width="120px">

	  	<el-form-item label="所属部门" prop="depart_num">
				<el-select class="w-100" popper-class="params_select" 
					v-model="userForm.depart_num" 
					clearable 
					filterable
					:filter-method="initDept"
					placeholder="下拉选择或搜索所属部门"
					 @change="onDeptChange"
					 @clear="selectClear">
					<el-option
						v-for="item in deptOptions"
						:key="item.wid"
						:label="item.name"
						:value="item.wid">
					</el-option>
					<el-pagination
						class="text-center"
						small
						@size-change="sizeChange"
						@current-change="currentChange"
						:current-page.sync="currentPage"
						:total="total"
						:page-size.sync="pageSize"
						layout="prev,pager,next,total"
						>
					</el-pagination>
				</el-select>
		  </el-form-item>

	  	<el-form-item label="职工号" prop="zgh">
		    <el-select v-model="userForm.zgh" clearable filterable placeholder="请选择教师职工" class="w-100">
			    <el-option
			      v-for="item in zghOptions"
			      :key="item.ZGH"
			      :label="item.ZGH + ' - ' + item.XM"
			      :value="item.ZGH">
			    </el-option>
			  </el-select>
		  </el-form-item>

		  <el-form-item label="所属角色" prop="group_ids">
				<el-select v-model="userForm.group_ids" multiple filterable placeholder="请选择所属角色" class="w-100">
			    <el-option
			      v-for="item in roleParentOptions"
			      :key="item.id"
			      :label="item.name"
			      :value="item.id">
			      {{item.cate_name?item.cate_name+item.name:item.name}}
			    </el-option>
			  </el-select>
		  </el-form-item>

		  <el-form-item label="手机号码" prop="phone">
		    <el-input v-model="userForm.phone" placeholder="请输入手机号码"></el-input>
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
			return {
				userForm:{
					depart_num:"",
					zgh:"",
					group_ids:[],
					phone:"",
					email:"",
				},
				dept_query:"",
				deptOptions:[],
				total: 0, //总条数
        currentPage: 1, //当前页
        pageSize: 8, //每页显示条数

				zghOptions:[],
				roleParentOptions:[],
				rules: {
					depart_num: [
            { required: true, message: '请下拉选择或搜索输入部门', trigger: 'change' }
          ],
          zgh: [
            { required: true, message: '请输入职工号', trigger: 'blur' }
          ],
          group_ids: [
            { required: true, message: '请下拉选择或搜索输入角色', trigger: 'change' }
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
      // 获取部门列表
      initDept(query){
				this.dept_query = query;
      	this.$api.c_dept({
					page:this.currentPage,
          limit:this.pageSize,
					keywords:query,
					type:1,
        }).then(data=>{
          if(data.code == 0){
						this.total = data.data.total;
            this.deptOptions = data.data.data;
          }else{
            this.$message.error(data.msg);
          }
        });
      },

			// 每页显示的条数改变
			sizeChange() {
				this.currentPage = 1;
				this.initDept(this.dept_query);
			},
			// current-change用于监听页数改变，而内容也发生改变
			currentChange(){
				this.initDept(this.dept_query);
			},
			selectClear(){
				this.currentPage = 1;
				this.dept_query = "";
				this.initDept();
			},

      // 部门选择后
      onDeptChange(value) {
        this.initUser_zgh(value);
      },

      // 获取教师职工号列表
      initUser_zgh(wid){
      	this.$api.c_user_form_dept({
      		wid:wid,
        }).then(data=>{
          if(data.code == 0){
            this.zghOptions = data.data;
          }else{
            this.$message.error(data.msg);
          }
        });
      },
			// 获取上级角色
			initRoleParent(){
				this.$api.c_roleParent({
        }).then(data=>{
          if(data.code == 0){
          	var topOptions = [
          		{
          			name:"顶级",
          			id:0,
          		},
          	];
            this.roleParentOptions = [...topOptions,...data.data];
          }else{
            this.$message.error(data.msg);
          }
        });
			},

			// dialog初始化
			openEdit(){
				var _this = this;
				// 部门回显
				this.$api.c_dept({// 展示所有的部门，不分页
        }).then(data=>{
          if(data.code == 0){
						// 先获取所有的数据
            this.deptOptions = data.data;
						// 再分页获取
						this.initDept();
          }else{
            this.$message.error(data.msg);
          }
        });
				this.initRoleParent();
				if(this.userData.isEdit){ // 编辑
					this.$api.c_userEdit({
						id:this.userData.id,
						func_type:2,
					}).then(data => {
						if(data.code == 0){
								this.userForm.id = data.data.id;
								this.userForm.depart_num = data.data.depart_num;
								this.initUser_zgh(data.data.depart_num);
								this.userForm.zgh = data.data.job_number;
								this.userForm.group_ids = data.data.group_arr;
								this.userForm.phone = data.data.phone;
								this.userForm.email = data.data.email;
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
				this.userData.dialog = false;
			},
			// form提交
			submitForm(formName) {
				var _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
          	if(this.userData.isEdit){ // 编辑后提交
          		this.$api.c_userEdit({
          			id:this.userData.id,
	          		zgh:this.userForm.zgh,
	          		group_ids:this.userForm.group_ids.join(","),
	          		phone:this.userForm.phone,
	          		email:this.userForm.email,
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
          		this.$api.c_userAdd({
	          		zgh:this.userForm.zgh,
	          		group_ids:this.userForm.group_ids.join(","),
	          		phone:this.userForm.phone,
	          		email:this.userForm.email,
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