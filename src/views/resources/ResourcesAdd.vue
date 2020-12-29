<template>
	<el-dialog
	  :title="resourceData.title"
	  :visible.sync="resourceData.dialog"
	  width="40%" top="6vh"
	  @open="openEdit"
	  @closed="closedEdit('form')"
	  :before-close="handleClose">
	  <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="pl-3 pr-3">
	  	新增资质
	  </el-form>

	  <span slot="footer" class="dialog-footer">
	    <el-button @click="closedEdit('form')">取 消</el-button>
	    <el-button type="primary" @click="submitForm('form')">确 定</el-button>
	  </span>
	</el-dialog>
</template>

<script>
	export default {
		name: 'ResourcesAdd',
		props: ['resourceData'],
		inject: ['loadData'],
		data () {
			return {}
		},
		components: {},
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
				this.resourceData.dialog = false;
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
      }
		},
	}
</script>

<style>

</style>