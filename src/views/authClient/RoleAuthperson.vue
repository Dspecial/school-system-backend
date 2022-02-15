<template>
	<el-dialog
	  :title="rolePersonData.title"
	  :visible.sync="rolePersonData.dialog"
	  width="30%"
	  @open="openEdit"
	  @closed="closedEdit('authPersonForm')"
	  :before-close="handleClose">
	  <el-form :model="authPersonForm" :rules="rules" ref="authPersonForm" label-width="110px">
	  	<el-form-item label="角色名称" prop="roleName">
		    <el-input v-model="authPersonForm.roleName" placeholder="请输入角色名称"></el-input>
		  </el-form-item>

			<el-form-item label="绑定部门" prop="belong_depart">
				<el-select class="w-100" popper-class="params_select" 
					v-model="authPersonForm.belong_depart" 
					clearable 
					filterable
					:filter-method="initDept"
					:collapse-tags="true" 
					@clear="dept_selectClear"
					placeholder="下拉选择或搜索绑定部门">
					<el-option
						v-for="item in deptOptions"
						:key="item.wid"
						:label="item.name"
						:value="item.wid">
					</el-option>
					<el-pagination
						class="text-center"
						small
						@size-change="dept_sizeChange"
						@current-change="dept_currentChange"
						:current-page.sync="dept_currentPage"
						:total="dept_total"
						:page-size.sync="dept_pageSize"
						layout="prev,pager,next,total"
						>
					</el-pagination>
				</el-select>
			</el-form-item>

			<el-form-item label="审核人员" prop="uid">
		  	<el-select class="w-100" popper-class="params_select" 
					v-model="authPersonForm.uid" 
					clearable 
					filterable
					multiple
					:filter-method="getUserList"
					:collapse-tags="true" 
					placeholder="下拉选择或搜索输入姓名/企业/部门"
					@change="handleChange"
					@clear="selectClear">
			    <el-option
			      v-for="item in uidOptions"
			      :key="item.id.toString()"
			      :label="item.name"
			      :value="item.id.toString()">
						{{item.name + '---' +item.job_number + '---' +item.depart_name}}
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

			<el-form-item label="状态" prop="status">
				<el-radio-group v-model="authPersonForm.status">
					<el-radio label="1">使用</el-radio>
					<el-radio label="2">禁用</el-radio>
				</el-radio-group>
			</el-form-item>

			<el-form-item label="备注" prop="remark">
		  	<el-input type="textarea" v-model="authPersonForm.remark" placeholder="请输入备注" :autosize="{ minRows: 3, maxRows: 8 }"></el-input>
		  </el-form-item>

	  </el-form>

	  <span slot="footer" class="dialog-footer">
	    <el-button @click="closedEdit('authPersonForm')">取 消</el-button>
	    <el-button type="primary" @click="submitForm('authPersonForm')">确 定</el-button>
	  </span>

	</el-dialog>
</template>

<script>
	export default {
		props:['rolePersonData'],
		inject: ['loadData'],
		name: 'RoleAuthperson',
		data () {
			return {
				authPersonForm:{
					roleName:"",
					belong_depart:"",
					uid:[],
					status:"1",
					remark:"",
				},
				personUidArr:[],
				uidOptions:[],
				total: 0, //总条数
        currentPage: 1, //当前页
        pageSize: 8, //每页显示条数
				uid_query:"",

				dept_query:"",
				deptOptions:[],
				dept_total: 0, //总条数
        dept_currentPage: 1, //当前页
        dept_pageSize: 8, //每页显示条数

				// 已选人员
				personList:[],
				userTotal: 0, //总条数
      	userCurrentPage: 1, //当前页
      	userPageSize: 15, //每页显示条数
				rules: {
          roleName: [
            { required: true, message: '请输入角色名称', trigger: 'blur' }
          ],
					belong_depart:[
						{ required: true, message: '请选择绑定部门', trigger: 'change' },
					],
          uid: [
            { required: true, message: '下拉选择或搜索输入学工号', trigger: 'change' }
          ],
					status:[
						{ required: true, message: '请选择状态', trigger: 'change' },
					],
        },
				
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
					page:this.dept_currentPage,
          limit:this.dept_pageSize,
					keywords:query,
					type:1,
        }).then(data=>{
          if(data.code == 0){
						this.dept_total = data.data.total;
            this.deptOptions = data.data.data;
          }else{
            this.$message.error(data.msg);
          }
        });
      },
			
			// 表格前端分页
			dept_sizeChange(val) {
				this.currentPage = 1;
				this.initDept(this.dept_query);
			},
			dept_currentChange(val) {
				this.initDept(this.dept_query);
			},
			dept_selectClear(){
				this.currentPage = 1;
				this.dept_query = "";
				this.initDept();
			},

			// 获取人员列表
			getUserList(query){
				this.uid_query = query;
				this.$api.c_getTeacherList({
					page:this.currentPage,
          limit:this.pageSize,
					keywords:query,
					type:1,
        }).then(data=>{
          if(data.code == 0){
						this.total = data.data.total;
            this.uidOptions = data.data.data;
          }else{
            this.$message.error(data.msg);
          }
        });
			},
			// 每页显示的条数改变
			sizeChange() {
				this.currentPage = 1;
				this.getUserList();
			},
			// current-change用于监听页数改变，而内容也发生改变
			currentChange(){
				this.getUserList(this.uid_query);
			},
			selectClear(){
				this.currentPage = 1;
				this.uid_query = "";
				this.getUserList();
			},

			// change改变
			handleChange(val) {
				let del_arr = new Array();
				let add_arr = new Array();
				if(val.length < this.personUidArr.length){ // 删除
					this.personUidArr.forEach((item, index) => {
						if (!val.includes(item)) {
							del_arr.push(item);
						}
					});
					this.personList.map((item,index)=>{
						if(del_arr.includes(item.id)){
							this.personList.splice(index,1);
						}
					});
				}else{ // 增加
					val.forEach((item, index) => {
						if (!this.personUidArr.includes(item)) {
							add_arr.push(item);
						}
					});
					var obj = {};
					obj = this.uidOptions.find((item) => {
						return item.id == add_arr[add_arr.length - 1];
					});
					this.personList.unshift(obj);
				};
				// 设置personList总条数
				this.userTotal = this.personList.length;
				// 更新当前已选的uids
				this.personUidArr = val;
      },
			// 删除已选人员
			closeTag(item){
				// 删除personList
				this.personList.some((list,i)=> {
					if(list.id === item.id){
						this.personList.splice(i,1);
					}
				});
				// 设置personList总条数
				this.userTotal = this.personList.length;
				
				// 删除authPersonForm.uid
				this.authPersonForm.uid.some((id,i)=> {
					if(id === item.id){
						this.authPersonForm.uid.splice(i,1);
					}
				});
			},
			// dialog初始化
			openEdit(){
				// 部门回显
				this.$api.c_dept({// 展示所有的部门，不分页
        }).then(data=>{
          if(data.code == 0){
						// 先获取所有的数据
            this.deptOptions = data.data;
						// 再分页获取
						this.dept_selectClear();
          }else{
            this.$message.error(data.msg);
          }
        });

				// 人员回显
				this.$api.c_getTeacherList({// 展示所有的人员，不分页
        }).then(data=>{
          if(data.code == 0){
						// 先获取所有的数据
            this.uidOptions = data.data;
						// 再分页获取
						this.selectClear();
          }else{
            this.$message.error(data.msg);
          }
        });

				if(this.rolePersonData.pid != 0){ // 编辑回显
					this.$api.c_role_setusergroup({
						id:this.rolePersonData.id, // 角色id
						function_type:1,
					}).then(data =>{
						if(data.code == 0){
							this.authPersonForm.roleName = data.data.name;
							this.authPersonForm.belong_depart =  data.data.belong_depart;
							this.authPersonForm.uid =  data.data.user_ids.split(",");
							this.authPersonForm.status =  data.data.status;
							this.authPersonForm.remark =  data.data.remark;
						}else{
							this.$message.error(data.msg);
						}
					});
				}
			},
			// dialog关闭
			closedEdit(formName){
				this.handleClose();
				this.resetForm(formName);
			},
			// 右上角x关闭
			handleClose(){
				this.rolePersonData.dialog = false;
			},
			// form提交
			submitForm(formName) {
				var _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
						if(this.rolePersonData.pid == 0){ // 添加角色
							this.$api.c_role_setusergroup({
								pid:this.rolePersonData.id,
								name:this.authPersonForm.roleName,
								wid:this.authPersonForm.belong_depart,
								user_ids:this.authPersonForm.uid.join(","),
								status:this.authPersonForm.status,
								remark:this.authPersonForm.remark,
								// function_type:"",
							}).then(data => {
								if(data.code == 0){
									_this.handleClose();
									_this.resetForm(formName);
									_this.loadData();
								}else{
									this.$message.error(data.msg);
								}
							});
						}else{
							this.$api.c_role_setusergroup({ // 编辑
								id:this.rolePersonData.id, // 角色id
								pid:this.rolePersonData.pid,
								name:this.authPersonForm.roleName,
								wid:this.authPersonForm.belong_depart,
								user_ids:this.authPersonForm.uid.join(","),
								status:this.authPersonForm.status,
								remark:this.authPersonForm.remark,
								function_type:2,
							}).then(data => {
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
      },
      // 每页显示的条数改变
      userSizeChange(val) {
      	this.userPageSize = val;
      	this.userCurrentPage = 1;
      },
      // current-change用于监听页数改变，而内容也发生改变
      userCurrentChange(val) {
      	this.userCurrentPage = val;
      },
		},
	}
</script>

<style lang="scss">

</style>