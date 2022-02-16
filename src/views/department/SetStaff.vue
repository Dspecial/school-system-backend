<template>
	<el-dialog
	  :title="staffData.title"
	  :visible.sync="staffData.dialog"
	  width="30%"
	  @open="openEdit"
	  @closed="closedEdit('staffForm')"
	  :before-close="handleClose">
	  <el-form :model="staffForm" :rules="rules" ref="staffForm" label-width="120px">
			<el-form-item label="负责人" prop="charge_ids">
		  	<el-select class="w-100" popper-class="params_select" 
					v-model="staffForm.charge_ids" 
					clearable 
					filterable
					multiple
					:filter-method="getUserList"
					:collapse-tags="true" 
					placeholder="下拉选择或搜索输入姓名/企业/部门"
					@clear="selectClear">
			    <el-option
			      v-for="item in chargeIdOptions"
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

			<el-form-item label="分管领导" prop="leader_ids">
		  	<el-select class="w-100" popper-class="params_select" 
					v-model="staffForm.leader_ids" 
					clearable 
					filterable
					multiple
					:filter-method="getLeaderList"
					:collapse-tags="true" 
					placeholder="下拉选择或搜索输入姓名/企业/部门"
					@clear="selectLeaderClear">
			    <el-option
			      v-for="item in leaderIdOptions"
			      :key="item.id.toString()"
			      :label="item.name"
			      :value="item.id.toString()">
						{{item.name + '---' +item.job_number + '---' +item.depart_name}}
			    </el-option>
					<el-pagination
						class="text-center"
						small
						@size-change="sizeLeaderChange"
						@current-change="currentLeaderChange"
						:current-page.sync="currentLeaderPage"
						:total="totalLeader"
						:page-size.sync="pageLeaderSize"
						layout="prev,pager,next,total"
						>
					</el-pagination>
			  </el-select>
		  </el-form-item>
	  </el-form>
	  <span slot="footer" class="dialog-footer">
	    <el-button @click="closedEdit('staffForm')">取 消</el-button>
	    <el-button type="primary" @click="submitForm('staffForm')">确 定</el-button>
	  </span>
	</el-dialog>
</template>

<script>
	export default {
		props:['staffData'],
		inject: ['loadData'],
		name: 'SetStaff',
		data () {
			return {
				staffForm:{
					charge_ids:[],
					leader_ids:[],
				},
				// 负责人
				chargeIdOptions:[],
				total: 0, //总条数
        currentPage: 1, //当前页
        pageSize: 8, //每页显示条数
				chargeId_query:"",

				// 分管领导
				leaderIdOptions:[],
				totalLeader: 0, //总条数
        currentLeaderPage: 1, //当前页
        pageLeaderSize: 8, //每页显示条数
				leaderId_query:"",

				rules: {
        }
			}
		},
		components: {},
		mounted(){
			
		},
		methods:{
			// 获取人员列表
			getUserList(query){
				this.chargeId_query = query;
				this.$api.c_getTeacherList({
					page:this.currentPage,
          limit:this.pageSize,
					keywords:query,
					type:1,
        }).then(data=>{
          if(data.code == 0){
						this.total = data.data.total;
            this.chargeIdOptions = data.data.data;
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
				this.getUserList(this.chargeId_query);
			},
			selectClear(){
				this.currentPage = 1;
				this.chargeId_query = "";
				this.getUserList();
			},

			// 获取分管领导列表
			getLeaderList(query){
				this.leaderId_query = query;
				this.$api.c_getTeacherList({
					page:this.currentLeaderPage,
          limit:this.pageLeaderSize,
					keywords:query,
					type:1,
        }).then(data=>{
          if(data.code == 0){
						this.totalLeader = data.data.total;
            this.leaderIdOptions = data.data.data;
          }else{
            this.$message.error(data.msg);
          }
        });
			},
			// 每页显示的条数改变
			sizeLeaderChange() {
				this.currentLeaderPage = 1;
				this.getLeaderList();
			},
			// current-change用于监听页数改变，而内容也发生改变
			currentLeaderChange(){
				this.getLeaderList(this.leaderId_query);
			},
			selectLeaderClear(){
				this.currentLeaderPage = 1;
				this.leaderId_query = "";
				this.getLeaderList();
			},

			// dialog初始化
			openEdit(){
				var _this = this;
				this.staffForm.depart_id = this.staffData.id;

				// 人员
				this.$api.c_getTeacherList({// 展示所有的人员，不分页
        }).then(data=>{
          if(data.code == 0){
						// 先获取所有的数据
            this.chargeIdOptions = data.data;
						// 先获取所有的数据
            this.leaderIdOptions = data.data;

						// 再分页获取
						this.selectClear();
						this.selectLeaderClear();
          }else{
            this.$message.error(data.msg);
          }
        });

				// 回显
				this.$api.deptSetUser({
					id:this.staffForm.depart_id,
					function_type:1,
        }).then(data=>{
          if(data.code == 0){
						this.staffForm.charge_ids =  data.data.charge_ids?data.data.charge_ids.split(","):[];
						this.staffForm.leader_ids =  data.data.leader_ids?data.data.leader_ids.split(","):[];
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
				this.staffData.dialog = false;
			},
			// form提交
			submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
          	this.$api.deptSetUser({
							id:this.staffForm.depart_id,
							charge_ids:this.staffForm.charge_ids.join(","),
							leader_ids:this.staffForm.leader_ids.join(","),
							function_type:2,
						}).then(data=>{
							if(data.code == 0){
								this.handleClose();
								this.resetForm(formName);
								this.loadData();
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
      }
		}
	}
</script>

<style>

</style>