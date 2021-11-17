<template>
	<el-dialog
	  :title="roleData.title"
	  :visible.sync="roleData.dialog"
	  width="30%"
	  @open="openEdit"
	  @closed="closedEdit('roleForm')"
	  :before-close="handleClose">
	  <el-form :model="roleForm" :rules="rules" ref="roleForm" label-width="100px">
	  	<el-form-item label="角色名称" prop="name">
		    <el-input v-model="roleForm.name" placeholder="请输入角色名称"></el-input>
		  </el-form-item>
		  <el-form-item label="上级角色" prop="pid">
		    <el-select v-model="roleForm.pid" clearable filterable placeholder="请选择上级角色" class="w-100" @change="handleChange">
			    <el-option
			      v-for="item in roleParentOptions"
			      :key="item.id"
			      :label="item.name"
			      :value="item.id">
			      {{item.cate_name?item.cate_name+item.name:item.name}}
			    </el-option>
			  </el-select>
		  </el-form-item>
		  <el-form-item label="权限配置" v-if="isAuth">
			  <el-tree
			  	ref="authTree"
			  	class="authTree"
				  :data="roleAuthData"
				  show-checkbox
				  node-key="id"
				  :highlight-current="true"
				  :default-expanded-keys="expandedKeys"
				  :default-checked-keys="roleForm.auth"
				  :props="defaultProps"
				  @check-change="handleCheckChange">
				</el-tree>
		  </el-form-item>
		  <el-form-item label="备注" prop="remark">
		  	<el-input type="textarea" v-model="roleForm.remark" placeholder="请输入备注" :autosize="{ minRows: 3, maxRows: 8 }"></el-input>
		  </el-form-item>
	  </el-form>
	  <span slot="footer" class="dialog-footer">
	    <el-button @click="closedEdit('roleForm')">取 消</el-button>
	    <el-button type="primary" @click="submitForm('roleForm')">确 定</el-button>
	  </span>
	</el-dialog>
</template>

<script>
	export default {
		props:['roleData'],
		inject: ['loadData'],
		name: 'RoleEdit',
		data () {
			return {
				roleForm:{
					id:"",
					name:"",
					pid:"",
					auth:[],
					remark:"",
				},
				roleParentOptions:[
				],
				expandedKeys:[],
				isAuth:false,
				roleAuthData:[],
				defaultProps: {
          children: 'children',
          label: 'title'
        },
				rules: {
          name: [
            { required: true, message: '请输入角色名称', trigger: 'blur' }
          ],
          pid: [
            { required: true, message: '请选择上级角色', trigger: 'change' }
          ],
          auth: [
            { required: true, message: '请选择权限', trigger: 'change' },
          ],
        }
			}
		},
		components: {},
		mounted(){

		},
		methods:{
			handleChange(value) {
        this.isAuth = true;
        this.initRoleAuth(value);
      },
			// 获取上级角色
			initRoleParent(){
				this.$api.roleParent({
        }).then(data=>{
          if(data.code == 0){
          	this.roleParentOptions = data.data;
          }else{
            this.$message.error(data.msg);
          }
        });
			},

			handleCheckChange(data, checked, indeterminate) {
        // console.log(data, checked, indeterminate);
      },
      // 根据角色获取对应的权限列表
			initRoleAuth(id){
				this.$api.roleAuth({
					group_id:id,
        }).then(data=>{
          if(data.code == 0){
            this.roleAuthData = data.data;
          }else{
            this.$message.error(data.msg);
          }
        });
			},
			// dialog初始化
			openEdit(){
				var _this = this;
				this.initRoleParent();
				if(this.roleData.isEdit){ // 编辑
					this.$api.roleEdit({
						id:this.roleData.id,
						func_type:'',
					}).then(data => {
						if(data.code == 0){
							this.roleForm.id = data.data.id;
							this.roleForm.name = data.data.name;
							this.roleForm.pid = data.data.pid;
							this.isAuth = true;
							this.initRoleAuth(data.data.pid);
							this.roleForm.auth = data.data.children_rule; 

							// ES6 查出两个数组的不同部分,即：所有父
							var a = data.data.rules.split(',').map(Number);
							var b = data.data.children_rule;
							var c = [...a,...b];
							var d = new Set(c);
							var e = Array.from(d);
							var f = [...e.filter(_=>!a.includes(_)),...e.filter(_=>!b.includes(_))];
							// 所有父 赋给展开的Key
							// this.expandedKeys = f;
						}else{
							this.$message.error(data.msg);
						}
					})
				}else{ // 新增
					
				}
			},
			// dialog关闭
			closedEdit(formName){
				this.handleClose();
				this.resetForm(formName);
			},
			// 右上角x关闭
			handleClose(){
				this.roleData.dialog = false;
				this.isAuth = false;
			},
			// form提交
			submitForm(formName) {
				var _this = this;
				var halfNode = this.$refs.authTree.getHalfCheckedKeys();
        var checkedNode = this.$refs.authTree.getCheckedKeys();
        var allTreeNode = [...halfNode,...checkedNode].join(',');

        this.$refs[formName].validate((valid) => {
          if (valid) {
          	if(this.roleData.isEdit){ // 编辑后提交
          		this.$api.roleEdit({
          			id:this.roleForm.id,
								name:this.roleForm.name,
								pid:this.roleForm.pid,
								rules:allTreeNode,
								func_type:1,
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
          		this.$api.roleAdd({
								name:this.roleForm.name,
								pid:this.roleForm.pid,
								rules:allTreeNode,
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