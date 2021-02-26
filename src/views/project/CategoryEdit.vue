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
		  <el-form-item label="状态" prop="is_show">
		    <el-radio-group v-model="categoryForm.is_show">
			    <el-radio label="1">正常</el-radio>
			    <el-radio label="2">禁用</el-radio>
			  </el-radio-group>
		  </el-form-item>
		  <el-form-item label="类型备注">
		    <el-input type="textarea" v-model="categoryForm.remark" placeholder="请输入类型备注" :autosize="{ minRows: 3, maxRows: 5}" maxlength="30" show-word-limit></el-input>
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
					is_show:"1",
				},
				rules: {
          name: [
            { required: true, message: '请输入项目类别', trigger: 'blur' }
          ],
        }
			}
		},
		components: {},
		methods:{
			// dialog初始化
			openEdit(){
				if(this.categoryData.isEdit){ // 编辑
					this.$api.p_categoryEdit({
						id:this.categoryData.id,
						function_type:2,
					}).then(data => {
						if(data.code == 0){
							this.categoryForm.id = data.data.id;
							this.categoryForm.name = data.data.name;
							this.categoryForm.remark = data.data.remark;
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