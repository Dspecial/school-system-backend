<template>
	<el-dialog
	  :title="processData.title"
	  :visible.sync="processData.dialog"
	  width="40%"
	  top="5vh"
	  @open="openEdit"
	  @closed="closedEdit('processForm')"
	  :before-close="handleClose">
	  <el-form :model="processForm" :rules="rules" ref="processForm" label-width="110px">
	  	<el-form-item label="流程名称" prop="name">
		    <el-input v-model="processForm.name" placeholder="流程名称"></el-input>
		  </el-form-item>
		  <el-form-item label="类别名称" prop="cate_id">
		    <el-select v-model="processForm.cate_id"  clearable filterable placeholder="请选择类别名称" class="w-100">
			    <el-option
			      v-for="item in projectCateOptions"
			      :key="item.id"
			      :label="item.name"
			      :value="item.id">
			    </el-option>
			  </el-select>
		  </el-form-item>
			<el-form-item label="使用状态" prop="is_use">
		    <el-radio-group v-model="processForm.is_use">
			    <el-radio label="1">待使用</el-radio>
			    <el-radio label="2">使用中</el-radio>
			  </el-radio-group>
		  </el-form-item>
		  <el-form-item label="是否申请资源" prop="is_resource_apply">
		    <el-radio-group v-model="processForm.is_resource_apply">
			    <el-radio label="2">是</el-radio>
			    <el-radio label="1">否</el-radio>
			  </el-radio-group>
		  </el-form-item>
			<el-form-item label="资源审核流程" v-if="processForm.is_resource_apply == 2">
				<template v-for="(resourceCell,index) in processForm.resource_check_data">
					<el-row type="flex" align="middle" :gutter="10" class="authCheck_row" :key="index">
						<el-col :span="9">
							<el-form-item label-width="0">
								<el-select v-model="resourceCell.rule_id" clearable filterable placeholder="请选择角色" class="w-100" @change="ruleChange(resourceCell)">
									<el-option
										v-for="rule in ruleList"
										:key="rule.id"
										:label="rule.name"
										:value="rule.id">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="9">
							<el-form-item label-width="0">
								<el-select v-model="resourceCell.check_ids" collapse-tags clearable filterable multiple placeholder="请选择人员" class="w-100">
									<el-option
										v-for="user in resourceCell.authUser"
										:key="user.id"
										:label="user.name"
										:value="user.id">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="6" class="text-right">
							<span class="text-primary cursor-pointer" v-if="index == processForm.resource_check_data.length - 1" @click="addPro(processForm.resource_check_data)"><i class="el-icon-plus"></i>审核流程</span>
							<span class="text-danger cursor-pointer ml-2" v-if="processForm.resource_check_data.length != 1" @click="delField(processForm.resource_check_data,index)">删除</span>
						</el-col>
					</el-row>
				</template>
		  </el-form-item>

		  <el-form-item label="简介">
		    <el-input type="textarea" v-model="processForm.brief" placeholder="请输入简介" :autosize="{ minRows: 3, maxRows: 5}" maxlength="30" show-word-limit></el-input>
		  </el-form-item>
		  <el-form-item label="审核流程">
		  	<!-- 节点和审核流程配置 -->
		  	<span class="opacity-60">Tips:请勿在审核流程中选择厂商角色</span>
		  	<div v-for="(item,index) in nodeList" :key="index">
					<div class="title d-flex justify-content-between">
						<span>{{item.name}}</span>
		    		<span class="text-primary cursor-pointer ml-3" @click="addPro(item.cellArray)"><i class="el-icon-plus"></i>审核流程</span>
			    </div>
			    <template v-for="(cell,INDEX) in item.cellArray">
					  <el-row type="flex" align="middle" :gutter="10" class="authCheck_row" :key="INDEX">
				  		<el-col :span="10">
						  	<el-form-item label-width="0">
							  	<el-select v-model="cell.rule_id" clearable filterable placeholder="请选择角色" class="w-100" @change="ruleChange(cell)">
										<el-option
								      v-for="rule in ruleList"
								      :key="rule.id"
								      :label="rule.name"
								      :value="rule.id">
								    </el-option>
							    </el-select>
							  </el-form-item>
				  		</el-col>
				  		<el-col :span="10">
						  	<el-form-item label-width="0">
							  	<el-select v-model="cell.check_ids" clearable filterable multiple collapse-tags placeholder="请选择人员" class="w-100">
							    	<el-option
								      v-for="user in cell.authUser"
								      :key="user.id"
								      :label="user.name"
								      :value="user.id">
								    </el-option>
							    </el-select>
							  </el-form-item>
				  		</el-col>
				  		<el-col :span="4" class="text-right">
						    <span class="text-danger cursor-pointer" @click="delField(item.cellArray,INDEX)">删除</span>
				  		</el-col>
					  </el-row>
				  </template>
			  </div>
		  </el-form-item>
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
		name: 'AuditprocessEdit',
		data () {
			return {
				processForm:{
					id:"",
					name:"",
					cate_id:"",
					is_use:"1",
					is_resource_apply:"1", // 1否 2是 默认否
					resource_check_data:[{}],
					brief:"",
				},
				projectCateOptions:[],
				nodeList:[],
				ruleList:[],
				dataArry:[],
				activeNames:['1'],
				rules: {
          name: [
            { required: true, message: '请输入流程名称', trigger: 'blur' }
          ],
          cate_id: [
            { required: true, message: '请输入类别名称', trigger: 'blur' }
          ],
					is_resource_apply: [
            { required: true, message: '请选择是否申请资源', trigger: 'change' }
          ],
        }
			}
		},
		components: {},
		methods:{
			initProjectCate(){
				this.$api.p_categoryList({
					is_show:1,
        }).then(data=>{
          if(data.code == 0){
            this.projectCateOptions = data.data;
          }else{
            this.$message.error(data.msg);
          }
        });
			},
			initNode(){
				this.$api.p_nodeList({
        }).then(data=>{
          if(data.code == 0){
            this.nodeList = data.data.map((item) => {
            	return {
            		'node_id':item.id,
            		'name':item.name,
            		'cellArray':new Array,
            	};
            });
          }else{
            this.$message.error(data.msg);
          }
        });
			},
			initRule(){
				this.$api.p_group_rule({
        }).then(data=>{
          if(data.code == 0){
          	this.ruleList = data.data;
          }else{
            this.$message.error(data.msg);
          }
        });
			},
			// 添加审核流程
			addPro(item){
				item.push({});
			},
			// 删除字段
			delField(item,index){
				item.splice(index, 1);
			},

			// 角色选择对应人员名单变化
			ruleChange(cell){
				if(cell.rule_id != cell.rule_id_old){
          // 清空已选人员
          cell.check_ids = [];
        }
				this.$api.p_group_rule_user({
					id:cell.rule_id,
        }).then(data=>{
          if(data.code == 0){
						cell.rule_id_old = cell.rule_id
          	// authUser 重新赋值
          	this.$set(cell,'authUser',data.data);
          }else{
            this.$message.error(data.msg);
          }
        });
			},
			// dialog初始化
			openEdit(){
				var _this = this;
				this.initProjectCate();
				this.initRule();
				if(this.processData.isEdit){ // 编辑
					this.$api.p_flowEdit({
						id:this.processData.id,
						function_type:2,
					}).then(data => {
						if(data.code == 0){
							this.processForm.id = data.data.id;
							this.processForm.name = data.data.name;
							this.processForm.cate_id = data.data.cate_id;
							this.processForm.is_use = data.data.is_use;
							this.processForm.is_resource_apply = data.data.is_resource_apply;
							this.processForm.brief = data.data.brief;

							// 资源审核流程
							var resourceData = new Array;
							resourceData = data.data.resource_check_data.map((item,index) =>{
								return {
									rule_id:item.rule_id,
									rule_id_old:item.rule_id,
									check_ids:item.check_ids?item.check_ids.split(',').map(Number):'',
								}
							});
							resourceData.map((item,index) =>{
								// 设置人员接口
								_this.ruleChange(item);
							});

							if(resourceData.length == 0){
								this.processForm.resource_check_data  = [{}]
							}else{
								this.processForm.resource_check_data  = resourceData
							}
						
							// 审核流程
							var relation = new Array;
							data.data.relation.map((item,index) =>{
								item.check_str = item.check_str.map((b,j)=>{
									return {
										rule_id:b.rule_id,
										rule_id_old:b.rule_id,
										check_ids:b.check_ids?b.check_ids.split(',').map(Number):'',
										authUser:[],
									}
								});
								item.check_str.map((b,j)=>{
									// 设置人员接口
									_this.ruleChange(b);
								});
								relation.push(item);
							});

							this.$api.p_nodeList({
							}).then(data=>{
								if(data.code == 0){
									var dataArry = data.data.map((item) => {
										return {
											'node_id':item.id,
											'name':item.name,
											'cellArray':new Array,
										};
									});
									var list = new Array;
									dataArry.forEach(item =>{
										relation.find(_item =>{
											if(item.node_id === _item.node_id){
												item.cellArray = _item.check_str;
											}
										});
										list.push(item);
									});
									this.nodeList = list
								}else{
									this.$message.error(data.msg);
								}
							});
						}else{
							this.$message.error(data.msg);
						}
					})
				}else{ // 新增
					this.initNode();
				}
			},
			// dialog关闭
			closedEdit(formName){
				this.handleClose();
				this.resetForm(formName);
				this.nodeList = [];
			},
			// 右上角x关闭
			handleClose(){
				this.processData.dialog = false;
			},
			// form提交
			submitForm(formName) {
				var _this = this;
				var dataArry = JSON.parse(JSON.stringify(this.nodeList));
				var checkData = new Array;
				dataArry.map((item,index)=>{
					if(item.cellArray.length != 0){
						item.cellArray.map((subItem,subIndex)=>{
							if(subItem.check_ids.length != 0){
								delete item.cellArray[subIndex].authUser;
							}
						});
						item.auth_check = item.cellArray.map((a,i) =>{
							if(!this.commonJs.isEmpty(a.rule_id)){
								return {
									rule_id:a.rule_id?a.rule_id:'',
									check_ids:a.check_ids.join(','),
								}
							}else{
								return {}
							}
						});
						// 过滤掉空的
						item.auth_check = item.auth_check.filter(item => !this.commonJs.isEmpty(item));
						delete item.name;
						delete item.cellArray;
						checkData.push(item);
					}
				});

				var resource_dataArry = new Array;
				if(this.commonJs.isEmpty(this.processForm.resource_check_data[0].check_ids)){
					resource_dataArry = [];
				}else{
					resource_dataArry = this.processForm.resource_check_data.map((item,index)=>{
						return {
							rule_id:item.rule_id,
							check_ids:item.check_ids.join(',')
						}
					});
				}

        this.$refs[formName].validate((valid) => {
          if (valid) {
          	if(this.processData.isEdit){ // 编辑后提交
          		this.$api.p_flowEdit({
          			id:this.processForm.id,
          			name:this.processForm.name,
	          		cate_id:this.processForm.cate_id,
	          		brief:this.processForm.brief,
	          		remark:this.processForm.remark,
	          		is_use:this.processForm.is_use,
								is_resource_apply:this.processForm.is_resource_apply,
								resource_check_data:JSON.stringify(resource_dataArry),
	          		check_data:JSON.stringify(checkData),
	          		function_type:1,
	          	}).then(data =>{
	          		if(data.code == 0){
									_this.handleClose();
									_this.resetForm(formName);
									_this.loadData();
	          		}else{
	          			this.$message.error(data.msg);
	          		}
	          	});
          	}else{ // 新增后提交
          		this.$api.p_flowAdd({
	          		name:this.processForm.name,
	          		cate_id:this.processForm.cate_id,
	          		brief:this.processForm.brief,
	          		remark:this.processForm.remark,
	          		is_use:this.processForm.is_use,
								is_resource_apply:this.processForm.is_resource_apply,
								resource_check_data:JSON.stringify(resource_dataArry),
	          		check_data:JSON.stringify(checkData),
	          	}).then(data =>{
	          		if(data.code == 0){
									_this.handleClose();
									_this.resetForm(formName);
									_this.loadData();
	          		}else{
	          			this.$message.error(data.msg);
	          		}
	          	});
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