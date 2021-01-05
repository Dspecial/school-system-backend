<template>
	<el-dialog
	  :title="resourceData.title"
	  :visible.sync="resourceData.dialog"
	  width="40%" top="4vh"
	  @open="openEdit"
	  @closed="closedEdit('form')"
	  :before-close="handleClose">
	  <el-form :model="categoryForm" ref="categoryForm" label-width="100px" label-position="left" class="p-3 resourceAdd_form">
	  	<h4 class="fs_16 font-weight-semibold m-0 mb-3 text-primary">新增类别</h4>
	  	<el-form-item label="类别编号">
		    <el-select v-model="categoryForm.No" placeholder="请选择类别编号" class="w-90">
		      <el-option label="101001" value="1"></el-option>
		      <el-option label="101002" value="2"></el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item label="类别名称">
		    <el-select v-model="categoryForm.name" placeholder="请选择类别编号" class="w-90">
		      <el-option label="服务器1" value="1"></el-option>
		      <el-option label="服务器2" value="2"></el-option>
		    </el-select>
		  </el-form-item>
		  <template v-for="(field, index) in categoryForm.fieldArray">
			  <el-form-item :label="'字段'+ (index+1)">
			  	<div class="d-flex justify-content-between">
				    <el-select v-model="field.value" placeholder="请选择字段" class="w-90">
				      <el-option label="服务器1" value="1"></el-option>
				      <el-option label="服务器2" value="2"></el-option>
				    </el-select>
				    <span class="text-primary cursor-pointer w-10 text-right" v-if="index == 0" @click="addField()">添加</span>
				    <span class="text-danger cursor-pointer w-10 text-right" v-if="index != 0" @click="delField(index)">删除</span>
			  	</div>
			  </el-form-item>
		  </template>
		  <div class="text-center">
		  	<el-button @click="closedEdit('form')">取 消</el-button>
	    	<el-button type="primary" @click="submitForm('form')">确 定</el-button>
		  </div>
	  </el-form>

	  <el-form :model="rescourceForm" ref="rescourceForm" label-position="left" class="mt-3 p-3 resourceAdd_form">
	  	<h4 class="fs_16 font-weight-semibold m-0 mb-3 text-primary">新增内容</h4>
	  	<el-form-item label="编号或类别" label-width="100px">
		    <el-select v-model="rescourceForm.No" placeholder="请选择编号或类别" class="w-100">
		      <el-option label="101001" value="1"></el-option>
		      <el-option label="101002" value="2"></el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item label="内容编号" label-width="100px" class="isisCell">
		    <el-input v-model="rescourceForm.contentNo" placeholder="请输入内容编号"></el-input>
		  </el-form-item>
		  <el-row :gutter="20">
		  	<el-col :span="8">
		  		<el-form-item label="系统" label-width="40px">
				    <el-input v-model="rescourceForm.system" placeholder="请输入系统"></el-input>
				  </el-form-item>
		  	</el-col>
		  	<el-col :span="8">
		  		<el-form-item label="CPU" label-width="40px">
				    <el-input v-model="rescourceForm.cpu" placeholder="请输入CPU大小"></el-input>
				  </el-form-item>
		  	</el-col>
		  	<el-col :span="8">
		  		<el-form-item label="内存" label-width="40px">
				    <el-input v-model="rescourceForm.ram" placeholder="请输入内存大小"></el-input>
				  </el-form-item>
		  	</el-col>
		  	<el-col :span="8">
		  		<el-form-item label="硬盘" label-width="40px">
				    <el-input v-model="rescourceForm.hdd" placeholder="请输入硬盘大小"></el-input>
				  </el-form-item>
		  	</el-col>
		  	<el-col :span="8">
		  		<el-form-item label="带宽" label-width="40px">
				    <el-input v-model="rescourceForm.bandwidth" placeholder="请输入带宽大小"></el-input>
				  </el-form-item>
		  	</el-col>
		  	<el-col :span="8">
		  		<el-form-item label="数量" label-width="40px">
				    <el-input v-model="rescourceForm.num" placeholder="请输入数量"></el-input>
				  </el-form-item>
		  	</el-col>
		  	<el-col :span="16">
		  		<el-form-item label="备注" label-width="40px">
				    <el-input type="textarea" v-model="rescourceForm.remark" placeholder="请输入备注" :autosize="{ minRows: 5, maxRows: 10}"></el-input>
				  </el-form-item>
		  	</el-col>
		  </el-row>

		  <div class="text-center">
		  	<el-button @click="closedEdit('form')">取 消</el-button>
	    	<el-button type="primary" @click="submitForm('form')">确 定</el-button>
		  </div>
	  </el-form>

	</el-dialog>
</template>

<script>
	export default {
		name: 'ResourcesAdd',
		props: ['resourceData'],
		inject: ['loadData'],
		data () {
			return {
				// 新增类别
				categoryForm:{
					No:"",
					name:"",
					fieldArray:[
						{
							id:"",
							value:"",
						},
					],
				},
				// 新增内容
				rescourceForm:{
					No:"",
					contentNo:"",
					system:"",
					cpu:"",
					ram:"",
					hdd:"",
					bandwidth:"",
					num:"",
					remark:"",
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
				this.resourceData.dialog = false;
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
		},
	}
</script>

<style>

</style>