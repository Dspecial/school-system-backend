<template>
	<el-dialog
	  :title="processData.title"
	  :visible.sync="processData.dialog"
	  width="30%"
	  @open="openEdit"
	  @closed="closedEdit('processForm')"
	  :before-close="handleClose">
	  <el-form :model="processForm" :rules="rules" ref="processForm" label-width="110px">
	  	<el-form-item label="流程名称" prop="name">
		    <el-input v-model="processForm.name" placeholder="流程名称"></el-input>
		  </el-form-item>
		  <el-form-item label="类别名称" prop="cate_id">
		    <el-select v-model="processForm.cate_id" placeholder="请选择类别名称" class="w-100">
			    <el-option
			      v-for="item in projectCateOptions"
			      :key="item.id"
			      :label="item.name"
			      :value="item.id">
			    </el-option>
			  </el-select>
		  </el-form-item>
		  <el-form-item label="使用状态" prop="is_use">
		    <el-radio-group v-model="processForm.is_use">
			    <el-radio label="1">待使用</el-radio>
			    <el-radio label="2">使用中</el-radio>
			  </el-radio-group>
		  </el-form-item>
		  <el-form-item label="简介">
		    <el-input type="textarea" v-model="processForm.brief" placeholder="请输入简介" :autosize="{ minRows: 3, maxRows: 5}" maxlength="30" show-word-limit></el-input>
		  </el-form-item>
		  <el-form-item label="节点" prop="check_data">
		  	<!-- 节点和审核流程配置 -->
		  	<div v-for="(item,index) in nodeList" :key="index">
					<div class="title">
						<span>{{item.name}}</span>
		    		<span class="text-primary cursor-pointer ml-3"><i class="el-icon-plus"></i>添加审核流程</span>
			    </div>
			  </div>
		  </el-form-item>
	  </el-form>
	  <span slot="footer" class="dialog-footer">
	    <el-button @click="closedEdit('processForm')">取 消</el-button>
	    <el-button type="primary" @click="submitForm('processForm')">确 定</el-button>
	  </span>
	</el-dialog>
</template>

<script>
	export default {
		props:['processData'],
		inject: ['loadData'],
		name: 'AuditprocessEdit',
		data () {
			return {
				processForm:{
					name:"",
					cate_id:"",
					is_use:"1",
					brief:"",
					check_data:"",
				},
				projectCateOptions:[],
				nodeList:[],
				activeNames:['1'],
				rules: {
          name: [
            { required: true, message: '请输入流程名称', trigger: 'blur' }
          ],
          cate_id: [
            { required: true, message: '请输入类别名称', trigger: 'blur' }
          ],
        }
			}
		},
		components: {},
		methods:{
			initProjectCate(){
				this.$api.p_categoryList({
					is_show:1,
        }).then(data=>{
          if(data.code == 0){
            this.projectCateOptions = data.data.data;
          }else{
            this.$message.error(data.msg);
          }
        });
			},
			initNode(){
				this.$api.p_nodeList({
        }).then(data=>{
          if(data.code == 0){
          	console.log();
            this.nodeList = data.data;
          }else{
            this.$message.error(data.msg);
          }
        });
			},
			handleChange(val) {
        console.log(val);
      },
			// dialog初始化
			openEdit(){
				this.initProjectCate();
				this.initNode();
				if(this.processData.isEdit){ // 编辑
					this.$api.p_categoryEdit({
						id:this.processData.id,
						function_type:2,
					}).then(data => {
						if(data.code == 0){
							this.processForm.id = data.data.id;
							this.processForm.name = data.data.name;
							this.processForm.remark = data.data.remark;
							this.processForm.is_show = data.data.is_show;
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
				this.processData.dialog = false;
			},
			// form提交
			submitForm(formName) {
				var _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
          	if(this.processData.isEdit){ // 编辑后提交
          		this.$api.p_categoryEdit({
          			id:this.processForm.id,
          			name:this.processForm.name,
	          		remark:this.processForm.remark,
	          		is_show:this.processForm.is_show,
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
	          		name:this.processForm.name,
	          		remark:this.processForm.remark,
	          		is_show:this.processForm.is_show,
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