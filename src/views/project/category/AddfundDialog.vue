<template>
	<el-dialog
	  :title="fundData.title"
	  :visible.sync="fundData.dialog"
	  width="30%"
	  @open="openEdit"
	  @closed="closedEdit('fundForm')"
	  :before-close="handleClose">
	  <el-form :model="fundForm" :rules="rules" ref="fundForm" label-width="120px">
	  	<el-form-item label="类别名称" prop="depart_id">
				<el-input v-model="fundData.deptName" placeholder="请输入类别名称" :readonly="true"></el-input>
		  </el-form-item>
		  <el-form-item label="年度" prop="years">
				<el-date-picker
				 	class="w-100"
					v-model="fundForm.years"
					type="year"
					value-format="yyyy"
					placeholder="选择年"
					clearable>
				</el-date-picker>
		  </el-form-item>
			<el-form-item label="经费" prop="advance_money">
		    <el-input v-model="fundForm.advance_money" placeholder="请输入经费">
					<span slot="suffix" class="el-input__icon mr-2">元</span>
				</el-input>
		  </el-form-item>
		  <el-form-item label="备注" prop="remark">
		    <el-input type="textarea" v-model="fundForm.remark" placeholder="请输入类型备注" :autosize="{ minRows: 3, maxRows: 5}" maxlength="30" show-word-limit></el-input>
		  </el-form-item>
	  </el-form>
	  <span slot="footer" class="dialog-footer">
	    <el-button @click="closedEdit('fundForm')">取 消</el-button>
	    <el-button type="primary" @click="submitForm('fundForm')">确 定</el-button>
	  </span>
	</el-dialog>
</template>

<script>
	export default {
		props:['fundData'],
		inject: ['loadData'],
		name: 'AddfundDialog',
		data () {
			return {
				fundForm:{
					depart_id:"",
					years:"",
					advance_money:"",
					remark:"",
				},
				deptOptions:[],
				rules: {
          depart_id: [
            { required: true, message: '请选择类别名称', trigger: 'blur' }
          ],
          years: [
            { required: true, message: '请输入年度', trigger: 'change' },
          ],
          advance_money: [
						{ required: true, message: '请输入经费', trigger: 'blur' },
          	{ validator:this.commonJs.checkNumber,trigger: 'blur'},
          ],
					remark: [
            { required: false, message: '请填写备注', trigger: 'blur' }
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
				var _this = this;
				this.fundForm.depart_id = this.fundData.id;
			},
			// dialog关闭
			closedEdit(formName){
				this.handleClose();
				this.resetForm(formName);
			},
			// 右上角x关闭
			handleClose(){
				this.fundData.dialog = false;
			},
			// form提交
			submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
          	this.$api.addFund({
							depart_id:this.fundData.id,
							years:this.fundForm.years,
							advance_money:Number(this.fundForm.advance_money).toFixed(2),
							remark:this.fundForm.remark,
						}).then(data =>{
							if(data.code == 0){
								this.handleClose();
								this.resetForm(formName);
								this.loadData();
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