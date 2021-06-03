<template>
	<el-dialog
	  :title="categoryData.title"
	  :visible.sync="categoryData.dialog"
	  width="30%"
	  @open="openEdit"
	  @closed="closedEdit('categoryForm')"
	  :before-close="handleClose">
	  <el-form :model="categoryForm" :rules="rules" ref="categoryForm" label-width="110px">
	  	<el-form-item label="项目类别" prop="name">
		    <el-input v-model="categoryForm.name" placeholder="项目类别"></el-input>
		  </el-form-item>
			<el-form-item label="参数" prop="formids">
		  	<el-select class="w-100" popper-class="params_select" v-model="categoryForm.formids" filterable :filter-method="getTableList" multiple clearable :collapse-tags="true" placeholder="请选择参数" @change="handleChange">
			    <el-option
			      v-for="item in paramsOptions"
			      :key="item.id"
			      :label="item.title"
			      :value="item.id.toString()">
						{{item.title + '---' +item.name_type}}
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
			<el-form-item label="开启金额申请" prop="is_open_money">
		    <el-radio-group v-model="categoryForm.is_open_money">
			    <el-radio label="2">是</el-radio>
			    <el-radio label="1">否</el-radio>
			  </el-radio-group>
		  </el-form-item>
			<el-form-item label="开启企业选择" prop="is_need_company">
		    <el-radio-group v-model="categoryForm.is_need_company">
			    <el-radio label="2">是</el-radio>
			    <el-radio label="1">否</el-radio>
			  </el-radio-group>
		  </el-form-item>
		  <el-form-item label="状态" prop="is_show">
		    <el-radio-group v-model="categoryForm.is_show">
			    <el-radio label="1">正常</el-radio>
			    <el-radio label="2">禁用</el-radio>
			  </el-radio-group>
		  </el-form-item>
		  <el-form-item label="类型备注">
		    <el-input type="textarea" v-model="categoryForm.remark" placeholder="请输入类型备注" :autosize="{ minRows: 5, maxRows: 8}" maxlength="30" show-word-limit></el-input>
		  </el-form-item>
	  </el-form>
	  <span slot="footer" class="dialog-footer">
	    <el-button @click="closedEdit('categoryForm')">取 消</el-button>
	    <el-button type="primary" @click="submitForm('categoryForm')">确 定</el-button>
	  </span>
	</el-dialog>
</template>

<script>
	export default {
		props:['categoryData'],
		inject: ['loadData'],
		name: 'CategoryEdit',
		data () {
			return {
				categoryForm:{
					name:"",
					remark:"",
					is_open_money:"1",
					is_need_company:"1",
					formids:[],
					is_show:"1",
				},
				selected_all:[],
				paramsOptions:[],
				total: 0, //总条数
        currentPage: 1, //当前页
        pageSize: 8, //每页显示条数
				rules: {
          name: [
            { required: true, message: '请输入项目类别', trigger: 'blur' }
          ],
        },
			}
		},
		components: {},
		methods:{
			handleChange(value) {
        // console.log(value,'parms1');
      },
			sizeChange() {
				this.currentPage = 1;
				this.getTableList();
			},
			currentChange(){
				this.getTableList();
			},
			// 获取参数
			getTableList(query){
				this.$api.p_category_form({
					page:this.currentPage,
          limit:this.pageSize,
					keywords:query,
        }).then(data=>{
          if(data.code == 0){
						this.total = data.data.total;
            this.paramsOptions = data.data.data;
          }else{
            this.$message.error(data.msg);
          }
        });
			},
			// dialog初始化
			openEdit(){
				this.$api.p_category_form({
        }).then(data=>{
          if(data.code == 0){
						// 先获取所有的数据
            this.paramsOptions = data.data.data;
						// 再分页获取
						this.getTableList();
          }else{
            this.$message.error(data.msg);
          }
        });
				if(this.categoryData.isEdit){ // 编辑
					this.$api.p_categoryEdit({
						id:this.categoryData.id,
						function_type:2,
					}).then(data => {
						if(data.code == 0){	
							this.categoryForm.id = data.data.id;
							this.categoryForm.name = data.data.name;
							this.categoryForm.remark = data.data.remark;
							this.categoryForm.is_open_money = data.data.is_open_money;
							this.categoryForm.is_need_company = data.data.is_need_company;
							if(data.data.formids){
								this.categoryForm.formids = data.data.formids.split(",");
							}
							this.categoryForm.is_show = data.data.is_show;
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
				this.currentPage = 1;
			},
			// 右上角x关闭
			handleClose(){
				this.categoryData.dialog = false;
			},
			// form提交
			submitForm(formName) {
				var _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
          	if(this.categoryData.isEdit){ // 编辑后提交
          		this.$api.p_categoryEdit({
          			id:this.categoryForm.id,
          			name:this.categoryForm.name,
	          		remark:this.categoryForm.remark,
	          		is_show:this.categoryForm.is_show,
								is_open_money:this.categoryForm.is_open_money,
								is_need_company:this.categoryForm.is_need_company,
								formids:this.categoryForm.formids.join(","),
	          		function_type:1,
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
          		this.$api.p_categoryAdd({
	          		name:this.categoryForm.name,
	          		remark:this.categoryForm.remark,
	          		is_show:this.categoryForm.is_show,
								is_open_money:this.categoryForm.is_open_money,
								is_need_company:this.categoryForm.is_need_company,
								formids:this.categoryForm.formids.join(","),
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