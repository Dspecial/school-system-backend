<template>
	<el-dialog
	  :title="configData.title"
	  :visible.sync="configData.dialog"
	  width="30%"
	  top="5vh"
	  @open="openEdit"
	  @closed="closedEdit('configForm')"
	  :before-close="handleClose">
	  <el-form :model="configForm" :rules="rules" ref="configForm" label-width="110px">
	  	<el-form-item label="验收名称" prop="title">
		    <el-input v-model="configForm.title" placeholder="请填写验收名称"></el-input>
		  </el-form-item>
			<el-form-item label="文件上传格式" prop="file_type">
		    <el-input v-model="configForm.file_type" placeholder="请填写文件上传格式，如:zip,doc...不填则不限制"></el-input>
		  </el-form-item>
		  <el-form-item label="文件模式" prop="file_model">
		    <el-radio-group v-model="configForm.file_model">
			    <el-radio label="1">单文件</el-radio>
			    <el-radio label="2">多文件</el-radio>
			  </el-radio-group>
		  </el-form-item>
		  <el-form-item label="备注">
		    <el-input type="textarea" v-model="configForm.remark" placeholder="请输入备注" :autosize="{ minRows: 3, maxRows: 5}" maxlength="30" show-word-limit></el-input>
		  </el-form-item>
			<el-form-item label="排序" prop="sort">
		    <el-input v-model="configForm.sort" placeholder="请填写排序，值越小越靠前"></el-input>
		  </el-form-item>
	  </el-form>
	  <span slot="footer" class="dialog-footer">
	    <el-button @click="closedEdit('configForm')">取 消</el-button>
	    <el-button type="primary" @click="submitForm('configForm')">确 定</el-button>
	  </span>
	</el-dialog>
</template>

<script>
	export default {
		props:['configData'],
		inject: ['loadData'],
		name: 'AuditprocessEdit',
		data () {
			return {
				configForm:{
					title:"",
					category_id:"",
					file_type:"",
					file_model:"1",
					remark:"",
					sort:"0",
				},
				projectCateOptions:[],
				nodeList:[],
				ruleList:[],
				dataArry:[],
				activeNames:['1'],
				rules: {
          title: [
            { required: true, message: '请输入验收名称', trigger: 'blur' }
          ],
        }
			}
		},
		components: {},
		methods:{
			// dialog初始化
			openEdit(){
				var _this = this;
				if(this.configData.isEdit){ // 编辑
					this.$api.p_accpetConfigEdit({
						id:this.configData.id,
						function_type:2,
					}).then(data => {
						if(data.code == 0){
							this.configForm.id = data.data.id;
							this.configForm.title = data.data.title;
							this.configForm.file_type = data.data.file_type;
							this.configForm.file_model = data.data.file_model;
							this.configForm.remark = data.data.remark;
							this.configForm.sort = data.data.sort;
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
				this.configData.dialog = false;
			},
			// form提交
			submitForm(formName) {
				var _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
          	if(this.configData.isEdit){ // 编辑后提交
          		this.$api.p_accpetConfigEdit({
								id:this.configForm.id,
          			title:this.configForm.title,
	          		category_id:this.$route.query.id,
	          		file_type:this.configForm.file_type,
	          		file_model:this.configForm.file_model,
	          		remark:this.configForm.remark,
	          		sort:this.configForm.sort,
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
          		this.$api.p_accpetConfigAdd({
	          		title:this.configForm.title,
	          		category_id:this.$route.query.id,
	          		file_type:this.configForm.file_type,
	          		file_model:this.configForm.file_model,
	          		remark:this.configForm.remark,
	          		sort:this.configForm.sort,
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