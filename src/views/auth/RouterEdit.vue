<template>
	<el-dialog
	  :title="routerData.title"
	  :visible.sync="routerData.dialog"
	  width="30%"
	  @open="openEdit"
	  @closed="closedEdit('routerForm')"
	  :before-close="handleClose">
	  <el-form :model="routerForm" :rules="rules" ref="routerForm" label-width="100px">
	  	<el-form-item label="ID" prop="id" :hidden="true">
		    <el-input v-model="routerForm.id" placeholder="请输入路由ID"></el-input>
		  </el-form-item>
		  <el-form-item label="所属上级id" prop="pid">
		    <el-input v-model="routerForm.pid" placeholder="所属上级id" :disabled="true"></el-input>
		  </el-form-item>
		  <el-form-item label="菜单名称" prop="title">
		  	<el-input v-model="routerForm.title" placeholder="请输入菜单名称"></el-input>
		  </el-form-item>
		  <!-- <el-form-item label="路由" prop="name">
		    <el-input v-model="routerForm.name" placeholder="请输入路由" readonly></el-input>
		  </el-form-item> -->
		  <el-form-item label="路径" prop="path" v-if="routerForm.is_menu == 1">
		    <el-input v-model="routerForm.path" placeholder="请输入路径"></el-input>
		  </el-form-item>
			<el-form-item label="菜单类型" prop="is_menu">
		    <el-select v-model="routerForm.is_menu" clearable placeholder="请选择菜单类型" class="w-100">
			    <el-option label="菜单" value="1"></el-option>
			    <el-option label="按钮" value="2"></el-option>
			  </el-select>
		  </el-form-item>
			<el-form-item label="标识" v-if="routerForm.is_menu == 2">
		    <el-input v-model="routerForm.sign" placeholder="请输入标识"></el-input>
		  </el-form-item>
		  <el-form-item label="图标" prop="icon" v-if="isTop">
		  	<e-icon-picker v-model="routerForm.icon"/>
		  </el-form-item>
		  <el-form-item label="排序" prop="sort">
		    <el-input v-model="routerForm.sort" placeholder="请输入排序"></el-input>
		  </el-form-item>
	  </el-form>
	  <span slot="footer" class="dialog-footer">
	    <el-button @click="closedEdit('routerForm')">取 消</el-button>
	    <el-button type="primary" @click="submitForm('routerForm')">确 定</el-button>
	  </span>
	</el-dialog>
</template>

<script>
	import { globalBus } from '@/core/globalBus';
	export default {
		props:['routerData'],
		inject: ['loadData'],
		name: 'RouterEdit',
		data () {
			return {
				routerForm:{
					id:"",
					pid:"",
					title:"",
					name:"",
					path:"",
					icon:"",
					sort:"",
					sign:'',
					is_menu:"",
				},
				isTop:false,
				rules: {
          pid: [
            { required: true, message: '请输入所属上级ID', trigger: 'blur' }
          ],
          title: [
            { required: true, message: '请输入菜单名称', trigger: 'blur' },
          ],
          name: [
            { required: true, message: '请输入路由', trigger: 'blur' }
          ],
          path: [
            { required: true, message: '请输入路径', trigger: 'blur' }
          ],
          sort: [
            { required: true, message: '请输入排序', trigger: 'blur' }
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
				if(this.routerData.isEdit){ // 编辑
					this.$api.routerEdit({
						id:this.routerData.id,
						func_type:'',
					}).then(data => {
						if(data.code == 0){
							this.routerForm.id = data.data.id;
							this.routerForm.pid = data.data.pid;
							this.routerForm.title = data.data.title;
							this.routerForm.name = data.data.name;
							this.routerForm.path = data.data.path;
							this.routerForm.icon = data.data.icon;
							this.routerForm.sort = data.data.sort;

							this.routerForm.sign = data.data.sign;
							this.routerForm.is_menu = data.data.is_menu;
							if(data.data.pid == 0){
								this.isTop = true;
							}else{
								this.isTop = false;
							}
						}else{
							this.$message.error(data.msg);
						}
					})
				}else{ // 新增
					this.routerForm.pid = this.routerData.pid;
					if(this.routerData.pid == 0){
						this.isTop = true;
					}else{
						this.isTop = false;
					}
				}
			},
			// dialog关闭
			closedEdit(formName){
				this.handleClose();
				this.resetForm(formName);
			},
			// 右上角x关闭
			handleClose(){
				this.routerData.dialog = false;
			},
			// form提交
			submitForm(formName) {
				var _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
          	if(this.routerData.isEdit){ // 编辑后提交
          		this.$api.routerEdit({
								id:this.routerForm.id,
								pid:this.routerForm.pid,
								title:this.routerForm.title,
								name:this.routerForm.name,
								path:this.routerForm.path,
								icon:this.routerForm.icon,
								sort:this.routerForm.sort,
								sign:this.routerForm.sign,
								is_menu:this.routerForm.is_menu,
								func_type:1,
							}).then(data => {
								if(data.code == 0){
									_this.handleClose();
									_this.resetForm(formName);
									_this.loadData();
									globalBus.$emit('reMenu');
								}else{
									this.$message.error(data.msg);
								}
							})
          	}else{ // 新增后提交
          		this.$api.routerAdd({
								id:this.routerForm.id,
								pid:this.routerForm.pid,
								title:this.routerForm.title,
								name:this.routerForm.name,
								path:this.routerForm.path,
								icon:this.routerForm.icon,
								sort:this.routerForm.sort,
								sign:this.routerForm.sign,
								is_menu:this.routerForm.is_menu,
							}).then(data => {
								if(data.code == 0){
									_this.handleClose();
									_this.resetForm(formName);
									_this.loadData();
									globalBus.$emit('reMenu');
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