<template>
	<el-dialog
	  :title="cateData.title"
	  :visible.sync="cateData.dialog"
	  width="25%"
	  @open="openEdit"
	  @closed="closedEdit('cateForm')"
	  :before-close="handleClose">
	  <el-form :model="cateForm" :rules="rules" ref="cateForm" label-width="100px">
		  <el-form-item label="所属上级" prop="pid_all">
		    <el-cascader class="w-100" v-model="cateForm.pid_all" placeholder="请选择所属上级" :show-all-levels="false" clearable :options="pidOptions" :props="{value:'id',label:'cate_name',children:'children',checkStrictly: true}" @change="handleChange">
		    </el-cascader>
		  </el-form-item>
		  <el-form-item label="类别名称" prop="cate_name">
		  	<el-input v-model="cateForm.cate_name" placeholder="请输入类别名称"></el-input>
		  </el-form-item>
		  <el-form-item label="是否显示" prop="is_show">
		  	<el-radio-group v-model="cateForm.is_show">
			    <el-radio :label="'1'">显示</el-radio>
			    <el-radio :label="'2'">不显示</el-radio>
			  </el-radio-group>
		  </el-form-item>
	  </el-form>
	  <span slot="footer" class="dialog-footer">
	    <el-button @click="closedEdit('cateForm')">取 消</el-button>
	    <el-button type="primary" @click="submitForm('cateForm')">确 定</el-button>
	  </span>
	</el-dialog>
</template>

<script>
	export default {
		props:['cateData'],
		inject: ['loadData'],
		name: 'CateEdit',
		data () {
			return {
				pidOptions:[],
				cateForm:{
					id:"",
					pid:"",
					pid_all:[],
					cate_name:"",
					is_show:"",
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
				this.$api.cateList({
					is_show:1,
        }).then(data=>{
          if(data.code == 0){
          	var topOptions = [
          		{
          			cate_name:"顶级分类",
          			id:0,
          		},
          	];
            this.pidOptions = [...topOptions,...data.data];
          }else{
            this.$message.error(data.msg);
          }
        });
			},
			
			// dialog初始化
			openEdit(){
				this.initPid();
				if(this.cateData.isEdit){ // 编辑
					this.$api.cateEdit({
						id:this.cateData.id,
						function_type:2,
					}).then(data => {
						if(data.code == 0){
							this.cateForm.id = data.data.id;
							this.cateForm.pid = data.data.pid;
							this.cateForm.cate_name = data.data.cate_name;
							this.cateForm.is_show = data.data.is_show;
							var all_parent = data.data.all_parent.reverse();
							this.cateForm.pid_all = all_parent;
						}else{
							this.$message.error(data.msg);
						}
					})
				}else{ // 新增
					this.cateForm.pid_all = [0]; //初始化是顶级分类
				}
			},
			// dialog关闭
			closedEdit(formName){
				this.handleClose();
				this.resetForm(formName);
			},
			// 右上角x关闭
			handleClose(){
				this.cateData.dialog = false;
			},
			// form提交
			submitForm(formName) {
				var _this = this;
				var all = this.cateForm.pid_all;
        this.$refs[formName].validate((valid) => {
          if (valid) {
          	if(this.cateData.isEdit){ // 编辑后提交
          		this.$api.cateEdit({
          			id:this.cateForm.id,
								pid:all[all.length-1],
								cate_name:this.cateForm.cate_name,
								is_show:this.cateForm.is_show,
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
								cate_name:this.cateForm.cate_name,
								is_show:this.cateForm.is_show,
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