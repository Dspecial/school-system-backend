<template>
	<el-dialog
	  :title="rolePersonData.title"
	  :visible.sync="rolePersonData.dialog"
	  width="45%"
	  @open="openEdit"
	  @closed="closedEdit('authPersonForm')"
	  :before-close="handleClose">
	  <el-form :model="authPersonForm" :rules="rules" ref="authPersonForm" label-width="110px">
	  	<el-form-item label="角色名称" prop="roleName">
		    <el-input v-model="authPersonForm.deptName" placeholder="请输入角色名称"></el-input>
		  </el-form-item>

	  	<el-form-item label="添加人员" prop="personName">
		    <el-select v-model="authPersonForm.personName" filterable placeholder="下拉选择或搜索输入学工号/姓名/部门" class="w-100">
			    <el-option label="学工部" value="1"></el-option>
			    <el-option label="教务处" value="2"></el-option>
			  </el-select>
		  </el-form-item>

		  <el-form-item label="已有人员">
		    <el-row class="hasSelected">
		    	<el-col :span="6" class="mb-2" v-for="(tag,index) in personList" :key="index">
						<el-tag closable type="primary" size="large" effect="dark" class="bg-cyan">
							<span>{{tag.id}}</span>
							<span class="ml-2 mr-2">{{tag.name}}</span>
							<span>{{tag.dept}}</span>
						</el-tag>
		    	</el-col>
		    </el-row>
				<el-pagination 
					class="text-center mt-3"
					background
		      layout="prev, pager, next, sizes, jumper"
		      @size-change="handleSizeChange"
		      @current-change="handleCurrentChange"
		      :current-page.sync="currentPage"
		      :page-sizes="[20, 40, 60]"
		      :page-size="pageSize"
		      :total="total"
		      :hide-on-single-page="total < pageSize">
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
					personName:"",
				},
				personList:[
					{
						id:"ID8457",
						name:"刘瑞丽",
						dept:"教务处",
					},
					{
						id:"ID8456",
						name:"刘瑞丽",
						dept:"教务处",
					},
					{
						id:"ID8457",
						name:"刘瑞丽",
						dept:"教务处",
					},
					{
						id:"ID8455",
						name:"刘瑞丽",
						dept:"教务处",
					},
					{
						id:"ID8457",
						name:"刘瑞丽",
						dept:"教务处",
					},
					{
						id:"ID8457",
						name:"刘瑞丽",
						dept:"教务处",
					},
					{
						id:"ID8457",
						name:"刘瑞丽",
						dept:"教务处",
					},
					{
						id:"ID8456",
						name:"刘瑞丽",
						dept:"教务处",
					},
					{
						id:"ID8457",
						name:"刘瑞丽",
						dept:"教务处",
					},
					{
						id:"ID8455",
						name:"刘瑞丽",
						dept:"教务处",
					},
					{
						id:"ID8457",
						name:"刘瑞丽",
						dept:"教务处",
					},
					{
						id:"ID8457",
						name:"刘瑞丽",
						dept:"教务处",
					},
				],
				total: 0, //总条数
      	currentPage: 1, //当前页
      	pageSize: 20, //每页显示条数
				rules: {
          roleName: [
            { required: true, message: '请输入角色名称', trigger: 'blur' }
          ],
          personName: [
            { required: true, message: '下拉选择或搜索输入学工号', trigger: 'change' }
          ],
        },
				
			}
		},
		components: {},
		mounted(){
			this.total = this.personList.length;
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
				this.rolePersonData.dialog = false;
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
      },
      // 每页显示的条数改变
      handleSizeChange(val) {
      	this.pageSize = val;
      	this.currentPage = 1;
        console.log(`每页 ${val} 条`);
      },
      // current-change用于监听页数改变，而内容也发生改变
      handleCurrentChange(val) {
      	this.currentPage = val;
        console.log(`当前页: ${val}`);
      },
      // 加载数据
      loadSelectedPerson(){
      	
      },
		},
	}
</script>

<style lang="scss">

</style>