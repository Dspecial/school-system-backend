<template>
	<el-dialog
	  :title="processData.title"
	  :visible.sync="processData.dialog"
	  width="30%"
	  @open="openEdit"
	  @closed="closedEdit('processForm')"
	  :before-close="handleClose">
	  <el-form :model="processForm" :rules="rules" ref="processForm" label-width="100px">
	  	<el-form-item label="流程名称" prop="processName">
		    <el-input v-model="processForm.processName" placeholder="流程名称" class="w-90"></el-input>
		  </el-form-item>
		  <el-form-item label="流程编号" prop="processCode">
		    <el-input v-model="processForm.processCode" placeholder="流程编号" class="w-90"></el-input>
		  </el-form-item>
		  <el-form-item label="设置人" prop="person">
		    <el-input v-model="processForm.person" placeholder="设置人" class="w-90"></el-input>
		  </el-form-item>
		  <el-form-item label="配置类型" prop="type" class="isisCell">
		    <el-select v-model="processForm.type" placeholder="下拉选择配置类型" class="w-90">
			    <el-option label="类型1" value="1"></el-option>
			    <el-option label="类型2" value="2"></el-option>
			  </el-select>
		  </el-form-item>

		  <template v-for="(examine, index) in processForm.examineArray">
		  	<el-row type="flex" align="middle">
		  		<el-col :span="11">
				  	<el-form-item :label="(index+1) + '. 审核部门'">
					  	<div class="d-flex justify-content-between">
						    <el-select v-model="examine.dept" placeholder="请选择审核流程" class="w-100">
						      <el-option label="直属部门" value="1"></el-option>
						      <el-option label="学工办" value="2"></el-option>
						    </el-select>
					  	</div>
					  </el-form-item>
		  		</el-col>
		  		<el-col :span="11">
				  	<el-form-item :label="'审核人'" label-width="80px">
					  	<div class="d-flex justify-content-between">
						    <el-select v-model="examine.person" placeholder="请选择审核流程" class="w-100">
						      <el-option label="刘政" value="1"></el-option>
						      <el-option label="张三" value="2"></el-option>
						    </el-select>
					  	</div>
					  </el-form-item>
		  		</el-col>
		  		<el-col :span="2" style="margin-bottom:18px" class="text-right">
				    <span class="text-primary cursor-pointer" v-if="index == 0" @click="addField()">添加</span>
				    <span class="text-danger cursor-pointer" v-if="index != 0" @click="delField(index)">删除</span>
		  		</el-col>
			  </el-row>
		  </template>
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
		name: 'ProcessEdit',
		data () {
			return {
				processForm:{
					processName:"",
					processCode:"",
					person:"",
					type:"",
					examineArray:[
						{
							id:"",
							dept:"",
							person:"",
						},
					],
				},
				rules: {
          processName: [
            { required: true, message: '请输入流程名称', trigger: 'blur' }
          ],
          processCode: [
            { required: true, message: '请输入流程编号', trigger: 'blur' }
          ],
          person: [
            { required: true, message: '请输入设置人', trigger: 'blur' },
          ],
          type: [
            { required: true, message: '请选择配置类型', trigger: 'change' },
          ],
        }
			}
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
				this.processData.dialog = false;
			},
			// 添加字段
			addField(){
				this.processForm.examineArray.push({});
			},
			// 删除字段
			delField(index){
				this.processForm.examineArray.splice(index, 1);
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