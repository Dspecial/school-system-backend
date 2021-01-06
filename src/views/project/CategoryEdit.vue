<template>
	<el-dialog
	  :title="categoryData.title"
	  :visible.sync="categoryData.dialog"
	  width="30%"
	  @open="openEdit"
	  @closed="closedEdit('categoryForm')"
	  :before-close="handleClose">
	  <el-form :model="categoryForm" :rules="rules" ref="categoryForm" label-width="110px">
	  	<el-form-item label="项目类别" prop="category">
		    <el-input v-model="categoryForm.category" placeholder="项目类别" class="w-90"></el-input>
		  </el-form-item>
		  <el-form-item label="项目类别编号" prop="categoryNum">
		    <el-select v-model="categoryForm.categoryNum" filterable placeholder="下拉选择或搜索输入" class="w-90">
			    <el-option label="v1" value="1"></el-option>
			    <el-option label="v2" value="2"></el-option>
			  </el-select>
		  </el-form-item>
		  <el-form-item label="设置人" prop="person">
		    <el-input v-model="categoryForm.person" placeholder="请输入设置人" class="w-90"></el-input>
		  </el-form-item>
		  <el-form-item label="类型备注" prop="remark">
		    <el-input type="textarea" v-model="categoryForm.remark" placeholder="请输入类型备注" :autosize="{ minRows: 5, maxRows: 10}" maxlength="30" show-word-limit class="w-90"></el-input>
		  </el-form-item>
		  <template v-for="(field, index) in categoryForm.fieldArray">
			  <el-form-item :label="'流程'+ (index+1)">
			  	<div class="d-flex justify-content-between">
				    <el-select v-model="field.value" placeholder="请选择审核流程" class="w-90">
				      <el-option label="流程1" value="1"></el-option>
				      <el-option label="流程2" value="2"></el-option>
				    </el-select>
				    <span class="text-primary cursor-pointer w-10 text-right" v-if="index == 0" @click="addField()">添加</span>
				    <span class="text-danger cursor-pointer w-10 text-right" v-if="index != 0" @click="delField(index)">删除</span>
			  	</div>
			  </el-form-item>
		  </template>
		  <el-form-item label="项目节点" prop="node">
		    <el-select v-model="categoryForm.node" filterable placeholder="选择项目节点" class="w-90">
			    <el-option label="节点1" value="1"></el-option>
			    <el-option label="节点2" value="2"></el-option>
			  </el-select>
		  </el-form-item>
	  </el-form>
	  <span slot="footer" class="dialog-footer">
	    <el-button @click="closedEdit('categoryForm')">取 消</el-button>
	    <el-button type="primary" @click="submitForm('categoryForm')">确 定</el-button>
	  </span>
	</el-dialog>
</template>

<script>
	export default {
		props:['categoryData'],
		inject: ['loadData'],
		name: 'CategoryEdit',
		data () {
			return {
				categoryForm:{
					category:"",
					categoryNum:"",
					person:"",
					remark:"",
					fieldArray:[
						{
							id:"",
							value:"",
						},
					],
					node:"",
				},
				rules: {
          category: [
            { required: true, message: '请输入项目类别', trigger: 'blur' }
          ],
          categoryNum: [
            { required: true, message: '请选择项目类别编号', trigger: 'change' }
          ],
          person: [
            { required: true, message: '请输入设置人', trigger: 'blur' },
          ],
          remark: [
            { required: true, message: '请输入类型备注', trigger: 'blur' },
          ],
          node: [
            { required: true, message: '请选择项目节点', trigger: 'change' }
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
				this.categoryData.dialog = false;
			},
			// 添加字段
			addField(){
				this.categoryForm.fieldArray.push({});
			},
			// 删除字段
			delField(index){
				this.categoryForm.fieldArray.splice(index, 1);
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