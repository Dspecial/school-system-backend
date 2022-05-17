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
			<el-form-item label="分组名称" prop="group_name">
		    <el-input v-model="configForm.group_name" placeholder="请填写分组名称"></el-input>
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
					group_name:"",
					category_id:"",
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
							this.configForm.group_name = data.data.group_name;
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
	          		group_name:this.configForm.group_name,
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
	          		group_name:this.configForm.group_name,
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