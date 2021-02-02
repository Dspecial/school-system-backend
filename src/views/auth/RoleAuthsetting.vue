<template>
	<el-dialog
	  :title="roleSettingData.title"
	  :visible.sync="roleSettingData.dialog"
	  width="45%"
	  @open="openEdit"
	  @closed="closedEdit('authSettingForm')"
	  :before-close="handleClose">
	  <el-form :model="authSettingForm" :rules="rules" ref="authSettingForm" label-width="150px">
	  	<el-form-item label="当前授权角色名称" prop="roleName">
		    <el-select v-model="authSettingForm.roleName" filterable placeholder="下拉选择或搜索输入学工号/姓名/部门" class="w-100">
			    <el-option label="学工部" value="1"></el-option>
			    <el-option label="教务处" value="2"></el-option>
			  </el-select>
		  </el-form-item>
		  <el-tree
		  	class="authTree"
			  :data="data"
			  show-checkbox
			  node-key="id"
			  :default-expanded-keys="[2, 3]"
			  :default-checked-keys="[5]"
			  :props="defaultProps">
			</el-tree>
	  </el-form>

	  <span slot="footer" class="dialog-footer">
	    <el-button @click="closedEdit('authSettingForm')">取 消</el-button>
	    <el-button type="primary" @click="submitForm('authSettingForm')">确 定</el-button>
	  </span>

	</el-dialog>
</template>

<script>
	export default {
		props:['roleSettingData'],
		inject: ['loadData'],
		name: 'RoleAuthsetting',
		data () {
			return {
				authSettingForm:{
					roleName:"",
				},
				rules: {
          roleName: [
            { required: true, message: '下拉选择或搜索输入学工号', trigger: 'change' }
          ],
        },
        data: [
	        {
	          id: 1,
	          label: '访问节点文档管理',
	        }, 
	        {
	          id: 2,
	          label: '后台入口访问',
	          children: [{
	            id: 21,
	            label: '后台入口访问'
	          }]
	        }, 
	        {
	          id: 3,
	          label: '项目',
	          children: [{
	            id: 31,
	            label: '删除项目'
	          }, {
	            id: 32,
	            label: '添加项目任务'
	          }, {
	            id: 33,
	            label: '访问项目页面'
	          }, {
	            id: 34,
	            label: '添加项目'
	          }, {
	            id: 35,
	            label: '项目文件下载'
	          }, {
	            id: 36,
	            label: '项目数据导出'
	          }, {
	            id: 37,
	            label: '编辑项目详情'
	          }, {
	            id: 38,
	            label: '编辑项目商务信息'
	          }, {
	            id: 39,
	            label: '编辑项目付款信息'
	          }, {
	            id: 310,
	            label: '项目状态回退'
	          }, {
	            id: 311,
	            label: '项目状态变更'
	          }, {
	            id: 312,
	            label: '项目详情文件上传'
	          }]
	        }, 
	        {
	          id: 4,
	          label: '文档',
	          children: [{
	            id: 41,
	            label: '访问文档页面'
	          }, {
	            id: 42,
	            label: '文档删除'
	          }, {
	            id: 43,
	            label: '文档上传'
	          }]
	        }, 
	        {
	          id: 5,
	          label: '付款',
	          children: [{
	            id: 51,
	            label: '访问付款页面'
	          }, {
	            id: 52,
	            label: '查看项目付款详情'
	          }]
	        }
        ],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
				
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
				this.roleSettingData.dialog = false;
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

<style lang="scss">

</style>