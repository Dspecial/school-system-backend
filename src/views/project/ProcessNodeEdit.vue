<template>
	<el-dialog
	  :title="nodeData.title"
	  :visible.sync="nodeData.dialog"
	  width="30%"
	  @open="openEdit"
	  @closed="closedEdit('nodeForm')"
	  :before-close="handleClose">
	  <el-form :model="nodeForm" :rules="rules" ref="nodeForm" label-width="110px">
	  	<el-form-item label="节点名称" prop="name">
		    <el-input v-model="nodeForm.name" placeholder="节点名称"></el-input>
		  </el-form-item>
			<el-form-item label="参数" prop="form_ids" v-if="need_show !== 2">
		  	<el-select class="w-100" popper-class="params_select" v-model="nodeForm.form_ids" clearable filterable  :filter-method="getTableList" multiple placeholder="请选择参数" @change="handleChange">
			    <el-option
			      v-for="item in paramsOptions"
			      :key="item.id"
			      :label="item.title"
			      :value="item.id.toString()">
						{{item.title + '---' +item.name_type}}
			    </el-option>
					<el-pagination
						class="text-center"
						small
						@size-change="sizeChange"
						@current-change="currentChange"
						:current-page.sync="currentPage"
						:total="total"
						:page-size.sync="pageSize"
						layout="prev,pager,next,total"
						>
					</el-pagination>
			  </el-select>
		  </el-form-item>
			<el-form-item label="允许资源申请" prop="can_apply_resource">
		    <el-radio-group v-model="nodeForm.can_apply_resource">
			    <el-radio label="2">是</el-radio>
			    <el-radio label="1">否</el-radio>
			  </el-radio-group>
				<p class="m-0 mt-1 text-warning">Tips: 如若开启资源申请，请在类别管理中也同样开启！</p>
		  </el-form-item>
		  <el-form-item label="备注">
		    <el-input type="textarea" v-model="nodeForm.desc" placeholder="请输入备注" :autosize="{ minRows: 5, maxRows: 8}" maxlength="30" show-word-limit></el-input>
		  </el-form-item>
	  </el-form>
	  <span slot="footer" class="dialog-footer">
	    <el-button @click="closedEdit('nodeForm')">取 消</el-button>
	    <el-button type="primary" @click="submitForm('nodeForm')">确 定</el-button>
	  </span>
	</el-dialog>
</template>

<script>
	export default {
		props:['nodeData'],
		inject: ['loadData'],
		name: 'ProcessNodeEdit',
		data () {
			return {
				nodeForm:{
					name:"",
					form_ids:[],
					can_apply_resource:"1",
					desc:"",
				},
				need_show:1,
				paramsOptions:[],
				total: 0, //总条数
        currentPage: 1, //当前页
        pageSize: 8, //每页显示条数

				rules: {
          name: [
            { required: true, message: '请输入节点名称', trigger: 'blur' }
          ],
					can_apply_resource: [
            { required: true, message: '请选择是否允许资源申请', trigger: 'change' }
          ],
        },
			}
		},
		components: {},
		methods:{
			// dialog初始化
			openEdit(){
				this.$api.p_processNodeEdit({
					id:this.nodeData.id,
					function_type:1,
				}).then(data => {
					if(data.code == 0){
						this.$api.p_category_form({
						}).then(data=>{
							if(data.code == 0){
								// 先获取所有的数据
								this.paramsOptions = data.data.data;
								// 再分页获取
								this.getTableList();
							}else{
								this.$message.error(data.msg);
							}
						});

						this.nodeForm.name = data.data.name;
						this.need_show = data.data.need_show;
						if(data.data.form_ids){
							this.nodeForm.form_ids = data.data.form_ids.split(",");
						}
						this.nodeForm.can_apply_resource = data.data.can_apply_resource;
						this.nodeForm.desc = data.data.desc;
					}else{
						this.$message.error(data.msg);
					}
				})
			},
			handleChange(value) {
        // console.log(value,'parms1');
      },
			sizeChange() {
				this.currentPage = 1;
				this.getTableList();
			},
			currentChange(){
				this.getTableList();
			},
			// 获取参数
			getTableList(query){
				this.$api.p_category_form({
					page:this.currentPage,
          limit:this.pageSize,
					keywords:query,
        }).then(data=>{
          if(data.code == 0){
						this.total = data.data.total;
            this.paramsOptions = data.data.data;
          }else{
            this.$message.error(data.msg);
          }
        });
			},
			// dialog关闭
			closedEdit(formName){
				this.handleClose();
				this.resetForm(formName);
				this.currentPage = 1;
			},
			// 右上角x关闭
			handleClose(){
				this.nodeData.dialog = false;
			},
			// form提交
			submitForm(formName) {
				var _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
          	this.$api.p_processNodeEdit({
							id:this.nodeData.id,
							name:this.nodeForm.name,
							form_ids:this.nodeForm.form_ids.join(","),
							can_apply_resource:this.nodeForm.can_apply_resource,
							desc:this.nodeForm.desc,
							function_type:2,
						}).then(data =>{
							if(data.code == 0){
								_this.handleClose();
								_this.resetForm(formName);
								_this.loadData();
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