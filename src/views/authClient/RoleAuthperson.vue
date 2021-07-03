<template>
	<el-dialog
	  :title="rolePersonData.title"
	  :visible.sync="rolePersonData.dialog"
	  width="50%"
	  @open="openEdit"
	  @closed="closedEdit('authPersonForm')"
	  :before-close="handleClose">
	  <el-form :model="authPersonForm" :rules="rules" ref="authPersonForm" label-width="110px">
	  	<el-form-item label="角色名称" prop="roleName">
		    <el-input v-model="authPersonForm.roleName" placeholder="请输入角色名称" readonly></el-input>
		  </el-form-item>
			<el-form-item label="添加人员" prop="uid">
		  	<el-select class="w-100" popper-class="params_select" 
					v-model="authPersonForm.uid" 
					filterable :filter-method="getUserList" 
					multiple :collapse-tags="true" 
					placeholder="下拉选择或搜索输入姓名/企业/部门"
					@change="handleChange">
			    <el-option
			      v-for="item in uidOptions"
			      :key="item.id"
			      :label="item.name"
			      :value="item.id">
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

		  <el-form-item label="已有人员">
		    <el-row class="hasSelected flex-wrap" type="flex" :gutter="20">
					<template v-if="personList.length == 0">
						<el-col :span="8" class="mb-2">
							<el-tag type="primary" size="large" effect="dark" class="bg-cyan w-100 d-flex justify-content-between align-items-center">
								<div class="w-90 text-truncate">
									<span>暂无，在添加人员中选择并添加</span>
								</div>
							</el-tag>
						</el-col>
					</template>
					<template v-else>
						<el-col :span="8" class="mb-2" v-for="(tag,index) in personList.slice((userCurrentPage - 1)*userPageSize,userCurrentPage*userPageSize)" :key="index">
							<el-tag closable @close="closeTag(tag)" type="primary" size="large" effect="dark" class="bg-cyan w-100 d-flex justify-content-between align-items-center">
								<div class="w-90 text-truncate">
									<span>{{tag.job_number}}</span>
									<span class="ml-2 mr-2">{{tag.name}}</span>
									<span>{{tag.depart_name}}</span>
								</div>
							</el-tag>
						</el-col>
					</template>
		    </el-row>
				<el-pagination
					class="text-center mt-3"
					background
					@size-change="userSizeChange"
					@current-change="userCurrentChange"
					:current-page.sync="userCurrentPage"
					:total="userTotal"
					:page-size.sync="userPageSize"
					layout="prev,pager,next,total"
					:page-sizes="[9, 15, 21, 30]"
					:hide-on-single-page="userTotal < userPageSize"
					>
				</el-pagination>
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
					uid:[],
				},
				personUidArr:[],
				uidOptions:[],
				total: 0, //总条数
        currentPage: 1, //当前页
        pageSize: 8, //每页显示条数

				// 已选人员
				personList:[],
				userTotal: 0, //总条数
      	userCurrentPage: 1, //当前页
      	userPageSize: 15, //每页显示条数
				rules: {
          roleName: [
            { required: true, message: '请输入角色名称', trigger: 'blur' }
          ],
          uid: [
            { required: true, message: '下拉选择或搜索输入学工号', trigger: 'change' }
          ],
        },
				
			}
		},
		components: {},
		mounted(){
			
		},
		methods:{
			// 获取人员列表
			getUserList(query){
				this.$api.c_getUserList({
					page:this.currentPage,
          limit:this.pageSize,
					keywords:query,
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
				this.authPersonForm.roleName = this.rolePersonData.roleName;
				// 人员回显
				this.$api.c_getUserList({
					type:1, // 展示所有的人员，不分页
        }).then(data=>{
          if(data.code == 0){
						// 先获取所有的数据
            this.uidOptions = data.data;
						// 再分页获取
						this.getUserList();
          }else{
            this.$message.error(data.msg);
          }
        });

				this.$api.c_user_setuser({
					id:this.rolePersonData.id, // 角色id
					function_type:1,
        }).then(data =>{
          if(data.code == 0){
            // 添加人员回显
						this.authPersonForm.uid =  data.data.user_ids;
						// 默认塞入的uids
						this.personUidArr = data.data.user_ids;
						// 已有人员
						this.personList = data.data.user_list;
						this.userTotal = data.data.user_list.length;
          }else{
            this.$message.error(data.msg);
          }
        });
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
						this.$api.c_user_setuser({
							id:this.rolePersonData.id, // 角色id
							function_type:2,
							uid:this.authPersonForm.uid.join(","),
						}).then(data => {
							if(data.code == 0){
								_this.handleClose();
								_this.resetForm(formName);
								_this.loadData();
							}else{
								this.$message.error(data.msg);
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