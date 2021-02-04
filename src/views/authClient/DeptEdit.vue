<template>
	<el-dialog
	  :title="deptData.title"
	  :visible.sync="deptData.dialog"
	  width="25%"
	  @open="openEdit"
	  @closed="closedEdit('deptForm')"
	  :before-close="handleClose">
	  <el-form :model="deptForm" :rules="rules" ref="deptForm" label-width="100px">
	  	<el-form-item label="上级部门" prop="highLevelDept">
		    <el-input v-model="deptForm.highLevelDept" placeholder="上级部门（带出来）" :disabled="isEdit"></el-input>
		  </el-form-item>
		  <el-form-item label="部门名称" prop="deptName">
		    <el-input v-model="deptForm.deptName" placeholder="请输入部门名称"></el-input>
		  </el-form-item>
		  <el-form-item label="部门层级" prop="deptLevel">
		    <el-input v-model.number="deptForm.deptLevel" placeholder="部门层级（自动算）"></el-input>
		  </el-form-item>
	  </el-form>
	  <span slot="footer" class="dialog-footer">
	    <el-button @click="closedEdit('deptForm')">取 消</el-button>
	    <el-button type="primary" @click="submitForm('deptForm')">确 定</el-button>
	  </span>
	</el-dialog>
</template>

<script>
	export default {
		props:['deptData'],
		inject: ['loadData'],
		name: 'DeptEdit',
		data () {
			return {
				deptForm:{
					highLevelDept:"",
					deptName:"",
					deptLevel:"",
				},
				isEdit:false,
				rules: {
          highLevelDept: [
            { required: true, message: '请输入上级部门', trigger: 'blur' }
          ],
          deptName: [
            { required: true, message: '请输入部门名称', trigger: 'blur' }
          ],
          deptLevel: [
            { required: true, message: '请输入部门层级', trigger: 'blur' },
            { type: 'number', message: '层级必须为数字值'}
          ],
        }
			}
		},
		components: {},
		methods:{
			// dialog初始化
			openEdit(){
				if(this.deptData.id == ''){ // 顶级
					this.deptForm.highLevelDept =  '已是顶级';
					this.isEdit = true;
				}else{ // 子集
					this.isEdit = false;
				}
			},
			// dialog关闭
			closedEdit(formName){
				this.handleClose();
				this.resetForm(formName);
			},
			// 右上角x关闭
			handleClose(){
				this.deptData.dialog = false;
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
		}
	}
</script>

<style>

</style>