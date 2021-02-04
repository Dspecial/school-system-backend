<template>
	<el-dialog
	  :title="categoryData.title"
	  :visible.sync="categoryData.dialog"
	  width="25%"
	  @open="openEdit"
	  @closed="closedEdit('categoryForm')"
	  :before-close="handleClose">
	  <el-form :model="categoryForm" :rules="rules" ref="categoryForm" label-width="100px">
		  <el-form-item label="所属上级" prop="pid_all">
		    <el-cascader class="w-100" v-model="categoryForm.pid_all" placeholder="请选择所属上级" :show-all-levels="false" clearable :options="pidOptions" :props="{value:'id',label:'cate_name',children:'children',checkStrictly: true}" @change="handleChange">
		    </el-cascader>
<!-- 			  <el-select v-model="categoryForm.pid" filterable placeholder="请选择所属上级" class="w-100">
			    <el-option
			      v-for="item in pidOptions"
			      :key="item.id"
			      :label="item.cate_name"
			      :value="item.id">
			      
			    </el-option>
			  </el-select> -->
		  </el-form-item>
		  <el-form-item label="类别名称" prop="cate_name">
		  	<el-input v-model="categoryForm.cate_name" placeholder="请输入类别名称"></el-input>
		  </el-form-item>
		  <el-form-item label="是否使用" prop="is_show">
		  	<el-radio-group v-model="categoryForm.is_show">
			    <el-radio :label="'1'">正常</el-radio>
			    <el-radio :label="'2'">禁用</el-radio>
			  </el-radio-group>
		  </el-form-item>
		  <el-form-item label="排序" prop="sort">
		  	<el-input v-model="categoryForm.sort" placeholder="请输入排序"></el-input>
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
		name: 'CateEdit',
		data () {
			return {
				pidOptions:[],
				categoryForm:{
					id:"",
					pid:"",
					pid_all:[],
					cate_name:"",
					is_show:"",
					sort:'0',
				},
				rules: {
          pid_all: [
            { required: true, message: '请输入所属上级', trigger: 'change' }
          ],
          cate_name: [
            { required: true, message: '请输入类别名称', trigger: 'blur' },
          ],
          is_show: [
            { required: true, message: '请选择显示与否', trigger: 'change' }
          ],
        }
			}
		},
		components: {},
		mounted(){

		},
		methods:{
			handleChange(value) {
        // console.log(value,'99999');
      },
			// 获取pid
			initPid(){
				this.$api.kl_categoryUseList({
        }).then(data=>{
          if(data.code == 0){
            this.pidOptions = data.data;
          }else{
            this.$message.error(data.msg);
          }
        });
			},
			
			// dialog初始化
			openEdit(){
				this.initPid();
				if(this.categoryData.isEdit){ // 编辑
					this.$api.cateEdit({
						id:this.categoryData.id,
						function_type:2,
					}).then(data => {
						if(data.code == 0){
							this.categoryForm.id = data.data.id;
							this.categoryForm.pid = data.data.pid;
							this.categoryForm.cate_name = data.data.cate_name;
							this.categoryForm.is_show = data.data.is_show;
							var all_parent = data.data.all_parent.reverse();
							this.categoryForm.pid_all = all_parent;
						}else{
							this.$message.error(data.msg);
						}
					})
				}else{ // 新增
					this.categoryForm.pid_all = [0]; //初始化是顶级分类
				}
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
			// form提交
			submitForm(formName) {
				var _this = this;
				var all = this.categoryForm.pid_all;
        this.$refs[formName].validate((valid) => {
          if (valid) {
          	if(this.categoryData.isEdit){ // 编辑后提交
          		this.$api.cateEdit({
          			id:this.categoryForm.id,
								pid:all[all.length-1],
								cate_name:this.categoryForm.cate_name,
								is_show:this.categoryForm.is_show,
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
          		this.$api.cateAdd({
								pid:all[all.length-1],
								cate_name:this.categoryForm.cate_name,
								is_show:this.categoryForm.is_show,
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