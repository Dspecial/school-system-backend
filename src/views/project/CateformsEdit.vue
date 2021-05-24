<template>
	<el-dialog
	  :title="formData.title"
	  :visible.sync="formData.dialog"
	  width="25%"
	  @open="openEdit"
	  @closed="closedEdit('formForm')"
	  :before-close="handleClose">
	  <el-form :model="formForm" :rules="rules" ref="formForm" label-width="100px">
		  <el-form-item label="参数名称" prop="title">
		  	<el-input v-model="formForm.title" placeholder="请输入参数名称"></el-input>
		  </el-form-item>
		  <el-form-item label="变量名称" prop="name">
		  	<el-input v-model="formForm.name" placeholder="请输入变量名称"></el-input>
		  </el-form-item>
		  <el-form-item label="提示语" prop="placeholder">
		  	<el-input v-model="formForm.placeholder" placeholder="请输入提示语,如：请输入品牌"></el-input>
		  </el-form-item>
		  <el-form-item label="是否必填" prop="is_required">
		  	<el-radio-group v-model="formForm.is_required">
			    <el-radio :label="'2'">是</el-radio>
			    <el-radio :label="'1'">否</el-radio>
			  </el-radio-group>
		  </el-form-item>
		  <el-form-item label="类型" prop="name_type">
		  	<el-select v-model="formForm.name_type" placeholder="请选择类型" class="w-100">
			    <el-option value="1" label="文本框"></el-option>
			    <el-option value="2" label="数字框"></el-option>
			    <el-option value="3" label="下拉单选"></el-option>
			    <el-option value="4" label="日期选择"></el-option>
			    <el-option value="5" label="文件上传"></el-option>
			    <el-option value="6" label="文本域"></el-option>
					<el-option value="7" label="富文本"></el-option>
					<el-option value="8" label="时间选择"></el-option>
					<el-option value="9" label="下拉多选"></el-option>
					<el-option value="10" label="复选"></el-option>
					<el-option value="11" label="单选"></el-option>
					<el-option value="12" label="数组"></el-option>
					<el-option value="13" label="图片上传(单选)"></el-option>
					<el-option value="14" label="图片上传(多选)"></el-option>
					<el-option value="15" label="文件上传(多选"></el-option>
			  </el-select>
		  </el-form-item>
		  <el-form-item label="数据值" prop="extra_val" v-if="formForm.name_type == 3">
		  	<el-input type="textarea" v-model="formForm.extra_val" placeholder="请输入数据值,格式如:是|否" :autosize="{ minRows: 3, maxRows: 8 }"></el-input>
		  </el-form-item>
		  <el-form-item label="备注" prop="remark">
		  	<el-input type="textarea" v-model="formForm.remark" placeholder="请输入备注" :autosize="{ minRows: 3, maxRows: 8 }"></el-input>
		  </el-form-item>
			<el-form-item label="是否使用" prop="is_show">
		  	<el-radio-group v-model="formForm.is_show">
			    <el-radio :label="'1'">是</el-radio>
			    <el-radio :label="'2'">否</el-radio>
			  </el-radio-group>
		  </el-form-item>
	  </el-form>
	  <span slot="footer" class="dialog-footer">
	    <el-button @click="closedEdit('formForm')">取 消</el-button>
	    <el-button type="primary" @click="submitForm('formForm')">确 定</el-button>
	  </span>
	</el-dialog>
</template>

<script>
	// 验证只能是英文
	var checkName = (rule, value, callback) => {
    if (!value) {
      return callback(new Error('请输入变量名称'));
    } else {
      var reg = /^[A-Za-z]+$/;
      if (reg.test(value)) {
        callback();
      } else {
        callback(new Error("变量名称必须为英文字母格式"));
      }
    }
  };
	export default {
		props:['formData'],
		inject: ['loadData'],
		name: 'FormEdit',
		data () {
			return {
				formForm:{
					id:"",
					title:"",
					name:"",
					placeholder:"",
					is_required:"",
					name_type:"1",
					extra_val:"",
					remark:"",
					is_show:"",
				},
				rules: {
          title: [
            { required: true, message: '请输入类别名称', trigger: 'blur' }
          ],
          name: [
            { required: true, validator: checkName, trigger: 'blur' },
          ],
          name_type: [
            { required: true, message: '请选择类型', trigger: 'change' }
          ],
          extra_val: [
            { required: true, message: '请输入数据值', trigger: 'blur' }
          ],
					is_show: [
            { required: true, message: '请选择是否使用', trigger: 'change' }
          ],
        }
			}
		},
		components: {},
		mounted(){
		},
		methods:{
			// dialog初始化
			openEdit(){
				if(this.formData.isEdit){ // 编辑
					this.$api.p_cateformsEdit({
						id:this.formData.id,
						function_type:2,
					}).then(data => {
						if(data.code == 0){
							this.formForm.id = data.data.id;
							this.formForm.title = data.data.title;
							this.formForm.name = data.data.name;
							this.formForm.placeholder = data.data.placeholder;
							this.formForm.is_required = data.data.is_required;
							this.formForm.name_type = data.data.name_type;
							this.formForm.extra_val = data.data.extra_val;
							this.formForm.remark = data.data.remark;
							this.formForm.is_show = data.data.is_show;
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
				this.formData.dialog = false;
			},
			// form提交
			submitForm(formName) {
				var _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
          	if(this.formData.isEdit){ // 编辑后提交
          		this.$api.p_cateformsEdit({
          			id:this.formForm.id,
          			name:this.formForm.name,
								title:this.formForm.title,
								name_type:this.formForm.name_type,
								placeholder:this.formForm.placeholder,
								is_required:this.formForm.is_required,
								extra_val:this.formForm.extra_val,
								remark:this.formForm.remark,
								is_show:this.formForm.is_show,
								function_type:1,
							}).then(data => {
								if(data.code == 0){
									_this.handleClose();
									_this.resetForm(formName);
									_this.loadData();
								}else{
									this.$message.error(data.msg);
								}
							})
          	}else{ // 新增后提交
          		this.$api.p_cateformsAdd({
								name:this.formForm.name,
								title:this.formForm.title,
								name_type:this.formForm.name_type,
								placeholder:this.formForm.placeholder,
								is_required:this.formForm.is_required,
								extra_val:this.formForm.extra_val,
								remark:this.formForm.remark,
								is_show:this.formForm.is_show,
							}).then(data => {
								if(data.code == 0){
									_this.handleClose();
									_this.resetForm(formName);
									_this.loadData();
								}else{
									this.$message.error(data.msg);
								}
							})
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