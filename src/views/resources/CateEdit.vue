<template>
	<el-dialog
	  :title="cateData.title"
	  :visible.sync="cateData.dialog"
	  width="30%"
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
			<el-form-item label="图片上传">
				<el-upload
					:limit="1"
				  action="void"
				  :accept="accept"
				  list-type="picture-card"
				  :auto-upload="true"
				  :http-request="myUpload"
				  :file-list="fileList"
				  :on-success="handleSuccess"
				  :on-remove="handleRemove"
				  :before-upload="beforeUpload"
					:on-exceed="onExceed"
					:class="fileList.length>0?'limit_upload':''">
				  <i class="el-icon-plus"></i>
				</el-upload>
		  </el-form-item>
	  </el-form>
	  <span slot="footer" class="dialog-footer">
	    <el-button @click="closedEdit('cateForm')">取 消</el-button>
	    <el-button type="primary" @click="submitForm('cateForm')">确 定</el-button>
	  </span>
	</el-dialog>
</template>

<script>
	import globalUrl from '@/core/globalUrl.js';
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
					icon:[],
				},
				accept: ".jpg,.png,.JGEG",
				fileList:[],
				removeFilesArr:[],
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

							let arrList = [];
							for (let i in data.data.icon) {
								var obj = {};
								var a = data.data.icon[i].split("/");
								var b = a[a.length -1];
								obj.name = b;
								obj.url = globalUrl.baseURL + data.data.icon[i];
								obj.path = data.data.icon[i];
								obj.isExist = true;
								arrList.push(obj);
							}
							this.fileList = arrList;
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
				this.fileList = [];
				this.removeFilesArr = [];
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
								icon:this.cateForm.icon.join(","),
								function_type:1,
							}).then(data => {
								if(data.code == 0){
									// _this.removeFilesArr.map((path)=>{
									// 	_this.removeFile(path);
									// })
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
								icon:this.cateForm.icon.join(","),
							}).then(data => {
								if(data.code == 0){
									// _this.removeFilesArr.map((path)=>{
									// 	_this.removeFile(path);
									// })
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
      },

			/****  上传  ****/
			myUpload(params){
	      // 通过 FormData 对象上传文件
	      const formData = new FormData();
	      formData.append("file", params.file);
	      formData.append("user_token", this.VueCookies.get("token"));

				this.$api.cateUpload(formData).then(data =>{
					if(data.code == 0){
						// 回调成功的方法
						params.onSuccess(data);
						this.$message.success(data.msg);
						this.cateForm.icon.push(data.data.path);
					}else{
						this.$message.error(data.msg);
					}
				});
			},
      // 上传成功
			handleSuccess(res, file, fileList) {
				this.fileList = fileList;
      },
      // 移除上传文件
      handleRemove(file,fileList) {
      	var path;
      	if(file.isExist){ // 原先上传已存在的
      		path = file.path;
      	}else{ // 刚刚上传的
      		if(file.status == 'success'){
						path = file.response.data.path;
					}else{
						return false
					}
      	}
      	this.fileList = fileList;
				this.cateForm.icon.some((item, i)=>{
					if(item = path){
						this.cateForm.icon.splice(i, 1);
						//在数组的some方法中，如果return true，就会立即终止这个数组的后续循环
						return true
					}
				});
				this.$message({message: '成功移除' + file.name, type: 'success'});
				if(this.removeFilesArr.indexOf(path) == -1){
					this.removeFilesArr.push(path);
				}
      },

			// 删除调接口
			removeFile(path){
				this.$api.cateUploadDel({
      		path:path,
      	}).then(data =>{
					if(data.code == 0){
						// this.$message.success("文件更新成功");
					}else{
						this.$message.error(data.msg);
					}
				});
			},

      // 上传前验证
      beforeUpload(file) {
				var isUpload = true;
      	// 验证大小等
				this.fileList.map((fff)=>{
					if(fff.name == file.name){
						this.$message.warning("请不要重复上传相同文件！");
						isUpload = false;
						return
					}
				})
				return isUpload;
      },
			
			// 文件超出限制
			onExceed(file,fileList){
				this.$message.error("只能上传一张图片哦，可以先删除再重新上传！");
			},
		}
	}
</script>

<style>

</style>