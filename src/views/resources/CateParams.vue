<template>
	<el-dialog
	  :title="paramsData.title"
	  :visible.sync="paramsData.dialog"
	  width="30%"
	  @open="openEdit"
	  @closed="closedEdit('paramsForm')"
	  :before-close="handleClose">
	  <el-form :model="paramsForm" :rules="rules" ref="paramsForm" label-width="100px" @submit.native.prevent>
		  <el-form-item label="参数信息" prop="form_text">
		  	<el-select class="w-100" v-model="paramsForm.form_text" clearable filterable multiple :collapse-tags="false" placeholder="请选择参数信息" @change="handleChange">
			    <el-option
			      v-for="item in paramsOptions"
			      :key="item.id"
			      :label="item.title"
			      :value="item.id">
			    </el-option>
			  </el-select>
		  </el-form-item>
	  </el-form>
	  <span slot="footer" class="dialog-footer">
	    <el-button @click="closedEdit('paramsForm')">取 消</el-button>
	    <el-button type="primary" @click="submitForm('paramsForm')">确 定</el-button>
	  </span>
	</el-dialog>
</template>

<script>
	export default {
		props:['paramsData'],
		inject: ['loadData'],
		name: 'CateEdit',
		data () {
			return {
				paramsOptions:[],
				paramsForm:{
					form_text:[],
				},
				rules:{
					form_text: [
            { required: true, message: '请选择参数信息', trigger: 'change' }
          ],
				},
			}
		},
		components: {},
		mounted(){
		},
		methods:{
			handleChange(value) {
        // console.log(value,'parms1');
      },
			// 获取参数信息
			initParams(){
				this.$api.cateParamsOption({
					cate_id:this.paramsData.id,
					function_type:2,
        }).then(data=>{
          if(data.code == 0){
            this.paramsOptions = data.data;
          }else{
            this.$message.error(data.msg);
          }
        });
			},

			// dialog初始化
			openEdit(){
				this.initParams();
				this.$api.setformparams({
					id:this.paramsData.id,
					function_type:2,
				}).then(data => {
					if(data.code == 0){
						if(data.data.form_ids&&data.data.form_ids!=null){
							var formText = data.data.form_ids.split(",").map(Number);
							this.paramsForm.form_text = formText;
						}else{
							this.paramsForm.form_text = [];
						}
						
					}else{
						this.$message.error(data.msg);
					}
				})
			},
			// dialog关闭
			closedEdit(formName){
				this.handleClose();
				this.resetForm(formName);
			},
			// 右上角x关闭
			handleClose(){
				this.paramsData.dialog = false;
			},
			// form提交
			submitForm(formName) {
				var _this = this;
				var formIds = this.paramsForm.form_text.toString();
        this.$refs[formName].validate((valid) => {
          if (valid) {
          	this.$api.setformparams({
							id:this.paramsData.id,
							form_ids:formIds,
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