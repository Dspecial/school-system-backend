<template>
	<el-dialog
		class="documentUpload"
	  :title="fundsData.title"
	  :visible.sync="fundsData.dialog"
	  width="30%"
	  @open="openEdit"
	  @closed="closedEdit('fundsForm')"
	  :before-close="handleClose">
	  <el-form :model="fundsForm" :rules="rules" ref="fundsForm" label-width="100px">
	  	<el-form-item label="编号" prop="code">
		    <el-input v-model="fundsForm.code" placeholder="请输入编号"></el-input>
		  </el-form-item>
		  <el-form-item label="年度" prop="year">
		    <el-date-picker v-model="fundsForm.year" type="year" placeholder="请选择年"></el-date-picker>
		  </el-form-item>
		  <el-form-item label="来源部门" prop="sourceDept">
		    <el-select v-model="fundsForm.sourceDept" placeholder="请选择来源部门" class="w-100">
			    <el-option label="学工办" value="1"></el-option>
			    <el-option label="教研部" value="2"></el-option>
			  </el-select>
		  </el-form-item>
		  <el-form-item label="经费额度" prop="totalFunds">
		    <el-input v-model="fundsForm.totalFunds" placeholder="请输入经费额度"></el-input>
		  </el-form-item>
		  <el-form-item label="填写部门" prop="dept">
		    <el-input v-model="fundsForm.dept" placeholder="请输入填写部门（带出来）"></el-input>
		  </el-form-item>
		  <el-form-item label="填写人" prop="person">
		    <el-input v-model="fundsForm.person" placeholder="请输入填写人（带出来）"></el-input>
		  </el-form-item>
	  </el-form>
	  <span slot="footer" class="dialog-footer">
	    <el-button @click="closedEdit('fundsForm')">取 消</el-button>
	    <el-button type="primary" @click="submitForm('fundsForm')">确 定</el-button>
	  </span>
	</el-dialog>
</template>

<script>
	export default {
		props:['fundsData'],
		inject: ['loadData'],
		name: 'FundsEdit',
		data () {
			return {
				fundsForm:{
					code:"",
					year:"",
					sourceDept:"",
					totalFunds:"",
					dept:"",
					person:"",
				},
				rules: {
          code: [
            { required: true, message: '请输入编号', trigger: 'blur' }
          ],
          year: [
            { required: true, message: '请选择年', trigger: 'change' }
          ],
          sourceDept: [
            { required: true, message: '请选择来源部门', trigger: 'change' },
          ],
          totalFunds: [
            { required: true, message: '请输入经费额度', trigger: 'blur' },
          ],
          dept: [
            { required: true, message: '请输入填写部门', trigger: 'blur' },
          ],
          person: [
            { required: true, message: '请输入填写人', trigger: 'blur' },
          ],
        }
			}
		},
		components: {},
		methods:{
			// dialog初始化
			openEdit(){
				if(this.fundsData.id == ''){ // 顶级
					this.fundsForm.highLevelDept =  '已是顶级';
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
				this.fundsData.dialog = false;
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