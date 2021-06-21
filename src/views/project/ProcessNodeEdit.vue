<template>
	<el-dialog
	  :title="nodeData.title"
	  :visible.sync="nodeData.dialog"
	  width="30%"
	  @open="openEdit"
	  @closed="closedEdit('nodeForm')"
	  :before-close="handleClose">
	  <el-form :model="nodeForm" :rules="rules" ref="nodeForm" label-width="110px">
	  	<el-form-item label="节点名称" prop="name">
		    <el-input v-model="nodeForm.name" placeholder="节点名称"></el-input>
		  </el-form-item>
			<el-form-item label="允许资源申请" prop="can_apply_resource">
		    <el-radio-group v-model="nodeForm.can_apply_resource">
			    <el-radio label="2">是</el-radio>
			    <el-radio label="1">否</el-radio>
			  </el-radio-group>
				<p class="m-0 mt-1 text-warning">Tips: 如若开启资源申请，请在类别管理中也同样开启！</p>
		  </el-form-item>
		  <el-form-item label="备注">
		    <el-input type="textarea" v-model="nodeForm.desc" placeholder="请输入备注" :autosize="{ minRows: 5, maxRows: 8}" maxlength="30" show-word-limit></el-input>
		  </el-form-item>
	  </el-form>
	  <span slot="footer" class="dialog-footer">
	    <el-button @click="closedEdit('nodeForm')">取 消</el-button>
	    <el-button type="primary" @click="submitForm('nodeForm')">确 定</el-button>
	  </span>
	</el-dialog>
</template>

<script>
	export default {
		props:['nodeData'],
		inject: ['loadData'],
		name: 'ProcessNodeEdit',
		data () {
			return {
				nodeForm:{
					name:"",
					can_apply_resource:"1",
					desc:"",
				},
				rules: {
          name: [
            { required: true, message: '请输入节点名称', trigger: 'blur' }
          ],
					can_apply_resource: [
            { required: true, message: '请选择是否允许资源申请', trigger: 'change' }
          ],
        },
			}
		},
		components: {},
		methods:{
			// dialog初始化
			openEdit(){
				this.$api.p_processNodeEdit({
					id:this.nodeData.id,
					function_type:1,
				}).then(data => {
					if(data.code == 0){
						this.nodeForm.name = data.data.name;
						this.nodeForm.can_apply_resource = data.data.can_apply_resource;
						this.nodeForm.desc = data.data.desc;
					}else{
						this.$message.error(data.msg);
					}
				})
			},
			// dialog关闭
			closedEdit(formName){
				this.handleClose();
				this.resetForm(formName);
				this.currentPage = 1;
			},
			// 右上角x关闭
			handleClose(){
				this.nodeData.dialog = false;
			},
			// form提交
			submitForm(formName) {
				var _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
          	this.$api.p_processNodeEdit({
							id:this.nodeData.id,
							name:this.nodeForm.name,
							can_apply_resource:this.nodeForm.can_apply_resource,
							desc:this.nodeForm.desc,
							function_type:2,
						}).then(data =>{
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
      }
		}
	}
</script>

<style>

</style>