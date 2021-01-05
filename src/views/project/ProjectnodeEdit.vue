<template>
	<el-dialog
	  :title="projectnodeData.title"
	  :visible.sync="projectnodeData.dialog"
	  width="48%"
	  @open="openEdit"
	  @closed="closedEdit('projectnodeForm')"
	  :before-close="handleClose">
	  <el-form :model="projectnodeForm" :rules="rules" ref="projectnodeForm" label-width="100px">
	  	<el-form-item label="类型名称" prop="type">
		    <el-input v-model="projectnodeForm.type" placeholder="项目类别"></el-input>
		  </el-form-item>
		  <el-form-item label="类型编码" prop="typeCode">
		    <el-select v-model="projectnodeForm.typeCode" filterable placeholder="下拉选择或搜索输入" class="w-100">
			    <el-option label="v1" value="1"></el-option>
			    <el-option label="v2" value="2"></el-option>
			  </el-select>
		  </el-form-item>
		  <el-form-item label="类型简介" prop="brief">
		    <el-input v-model="projectnodeForm.brief" placeholder="请输入类型简介"></el-input>
		  </el-form-item>
		  <el-form-item label="是否维保" prop="maintenance">
		    <el-radio-group v-model="projectnodeForm.maintenance">
			    <el-radio :label="0">是</el-radio>
			    <el-radio :label="1">否</el-radio>
			  </el-radio-group>
		  </el-form-item>
		  <el-form-item label="排序" prop="order">
		    <el-input v-model="projectnodeForm.order" placeholder="请输入排序"></el-input>
		  </el-form-item>
			<template>
		    <el-table :data="projectnodeForm.tableData" style="width: 100%">
			    <el-table-column type="selection" width="55"></el-table-column>
	        <el-table-column type="index" :index="indexMethod" label="序号" width="50"></el-table-column>
	        <el-table-column prop="node" label="节点"></el-table-column>
	        <el-table-column prop="step1" label="合同及付款方式确认">
	        	<template slot-scope="scope">
		        	<el-switch
							  v-model="scope.row.step1"
							  active-value="1"
							  inactive-value="0"
							  active-color="#52C418"
							  inactive-color="#969191">
							</el-switch>
	        	</template>
	        </el-table-column>
	        <el-table-column prop="step2" label="二次审核流程开关">
	        	<template slot-scope="scope">
		        	<el-switch
							  v-model="scope.row.step2"
							  active-value="1"
							  inactive-value="0"
							  active-color="#52C418"
							  inactive-color="#969191">
							</el-switch>
	        	</template>
	        </el-table-column>
	        <el-table-column prop="step3" label="申请资源开关">
	        	<template slot-scope="scope">
		        	<el-switch
							  v-model="scope.row.step3"
							  active-value="1"
							  inactive-value="0"
							  active-color="#52C418"
							  inactive-color="#969191">
							</el-switch>
	        	</template>
	        </el-table-column>
	        <el-table-column fixed="right" label="操作" align="center">
	          <template slot-scope="scope">
	            <span class="text-primary cursor-pointer ml-3" @click="delField()">删除</span>
	          </template>
	        </el-table-column>
		    </el-table>
		    <span class="text-center text-primary d-block mt-3"  @click="addField()">
		    	<i class="el-icon-plus el-icon--left"></i>添加节点
		    </span>
		  </template>

	  </el-form>
	  <span slot="footer" class="dialog-footer">
	    <el-button @click="closedEdit('projectnodeForm')">取 消</el-button>
	    <el-button type="primary" @click="submitForm('projectnodeForm')">确 定</el-button>
	  </span>
	</el-dialog>
</template>

<script>
	export default {
		props:['projectnodeData'],
		inject: ['loadData'],
		name: 'ProjectnodeEdit',
		data () {
			return {
				projectnodeForm:{
					type:"",
					typeCode:"",
					brief:"",
					maintenance:"",
					order:"",
					tableData:[
						{
							node:"合同确认",
							step1:"1",
							step2:"1",
							step3:"1",
						},
						{
							node:"项目实施",
							step1:"1",
							step2:"0",
							step3:"1",
						},
						{
							node:"项目测试",
							step1:"1",
							step2:"0",
							step3:"0",
						},
						{
							node:"项目验收",
							step1:"1",
							step2:"1",
							step3:"0",
						},
					],
				},
				rules: {
          type: [
            { required: true, message: '请输入项目类型', trigger: 'blur' }
          ],
          typeCode: [
            { required: true, message: '请输入项目类型编码', trigger: 'blur' }
          ],
          brief: [
            { required: true, message: '请输入类型简介', trigger: 'blur' },
          ],
          maintenance: [
            { required: true, message: '请选择是否维保', trigger: 'change' },
          ],
          order: [
            { required: true, message: '请输入排序', trigger: 'blur' },
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
				this.projectnodeData.dialog = false;
			},
			// 添加节点
			addField(){
				this.projectnodeForm.tableData.push({node:'项目验收'});
			},
			// 删除节点
			delField(index){
				this.projectnodeForm.tableData.splice(index, 1);
			},
			// 自增序列
      indexMethod(index) { 
        return ++index;
      },
      // 加载数据
      loadData(queryInfo) { 
        let _this = this;
        if (queryInfo != null) {
          this.currentPage = queryInfo.page;
          this.pageSize = queryInfo.pageSize;
        }
        // this.MyAxios.post(this.globalUrl.baseURL + "/forklift/achievements/achievements_list", {
        //   page: this.currentPage,
        //   limit: this.pageSize,
        //   name: this.filters[0].value
        // }).then(data => {
        //   if (data) {
        //     if (data.code == 0) {
        //       _this.total = data.count;
        //       _this.tableData = data.data;
        //     } else {
        //       _this.$message.error("接口失败");
        //     }
        //   }
        // })
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