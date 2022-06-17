<template>
	<el-dialog
	  :title="contentData.title"
	  :visible.sync="contentData.dialog"
	  width="50%"
	  top="5vh"
	  @open="openEdit"
	  @closed="closedEdit('contentForm')"
	  :before-close="handleClose">
	  <el-form :model="contentForm" :rules="rules" ref="contentForm" label-width="100px">
		  <el-form-item label="所属分类" prop="pid_all">
		    <el-cascader class="w-100" v-model="contentForm.pid_all" placeholder="请选择所属分类" :show-all-levels="false" clearable :options="pidOptions" :props="{value:'id',label:'cate_name',children:'children',checkStrictly: true}" @change="handleChange">
		    </el-cascader>
		  </el-form-item>
		  <el-form-item label="标题" prop="title">
		  	<el-input v-model="contentForm.title" placeholder="请输入标题"></el-input>
		  </el-form-item>
		  <el-form-item label="内容类型" prop="type">
		  	<el-select v-model="contentForm.type"  clearable placeholder="请选择内容类型" class="w-100" @change="selectChange">
          <el-option label="文章" :value="1"></el-option>
          <el-option label="文档" :value="2"></el-option>
          <el-option label="图片" :value="3"></el-option>
          <el-option label="多媒体" :value="4"></el-option>
        </el-select>
		  </el-form-item>
		  <el-form-item label="编辑内容" prop="content" v-if="contentForm.type == 1">
		  	<vEditor v-model="contentForm.content"></vEditor>
		  </el-form-item>

		  <el-form-item label="文档上传" prop="fileContent" v-else-if="contentForm.type == 2">
		  	<div class="d-flex align-items-start justify-content-between">
					<el-upload
				  	class="content_upload"
					  drag
					  action="void"
					  :accept="accept"
					  :auto-upload="true"
					  :http-request="myUpload"
					  :file-list="fileList"
					  :on-success="handleSuccess"
					  :on-remove="handleRemove"
					  :before-upload="beforeUpload">
					  <div class="el-upload__text"><i class="el-icon-upload"></i>将文档拖到此处，或<em>点击选择文档</em></div>
					</el-upload>
		  	</div>
		  </el-form-item>

		  <el-form-item label="图片上传" prop="fileContent" v-else-if="contentForm.type == 3">
				<el-upload
				  action="void"
				  :accept="accept"
				  list-type="picture-card"
				  :auto-upload="true"
				  :http-request="myUpload"
				  :file-list="fileList"
				  :on-success="handleSuccess"
				  :on-remove="handleRemove"
				  :before-upload="beforeUpload">
				  <i class="el-icon-plus"></i>
				</el-upload>
		  </el-form-item>

		  <el-form-item label="多媒体上传" prop="fileContent" v-else>
		  	<div class="d-flex align-items-start justify-content-between">
					<el-upload
				  	class="content_upload"
					  drag
					  action="void"
					  :accept="accept"
					  :auto-upload="true"
					  :http-request="myUpload"
					  :file-list="fileList"
					  :on-success="handleSuccess"
					  :on-remove="handleRemove"
					  :before-upload="beforeUpload">
					  <div class="el-upload__text"><i class="el-icon-upload"></i>将多媒体拖到此处，或<em>点击选择多媒体,建议上传.mp4,.rmvb,.webm格式的视频</em></div>
					</el-upload>
		  	</div>
		  </el-form-item>

		  <el-form-item label="简介" prop="desc">
		  	<el-input type="textarea" v-model="contentForm.desc" placeholder="请输入简介" :autosize="{ minRows: 3, maxRows: 8 }"></el-input>
		  </el-form-item>
		  <el-form-item label="是否使用" prop="is_show">
		  	<el-radio-group v-model="contentForm.is_show">
			    <el-radio :label="'1'">正常</el-radio>
			    <el-radio :label="'2'">禁用</el-radio>
			  </el-radio-group>
		  </el-form-item>
		  <el-form-item label="排序" prop="sort">
		  	<el-input v-model="contentForm.sort" placeholder="请输入排序"></el-input>
		  </el-form-item>
	  </el-form>
	  <span slot="footer" class="dialog-footer">
	    <el-button @click="closedEdit('contentForm')">取 消</el-button>
	    <el-button type="primary" @click="submitForm('contentForm')">确 定</el-button>
	  </span>
	</el-dialog>
</template>

<script>
	import vEditor from "@/components/quill-editor/ue";
	import globalUrl from '@/core/globalUrl.js';
	export default {
		props:['contentData'],
		inject: ['loadData'],
		name: 'ContentEdit',
		data () {
			return {
				pidOptions:[],
				accept:'',
				fileList:[],
				removeFilesArr:[],
				contentForm:{
					id:"",
					title:"",
					pid_all:[],
					type:1,
					fileContent:new Array,
					Video:'',
					desc:"",
					is_show:"",
					sort:'0',
				},
				rules: {
					title: [
            { required: true, message: '请输入内容名称', trigger: 'blur' },
          ],
          pid_all: [
            { required: true, message: '请输入所属类别', trigger: 'change' }
          ],
          type: [
            { required: true, message: '请输入内容类型', trigger: 'change' }
          ],
          content: [
            { required: true, message: '请填写内容', trigger: 'blur' },
          ],
          fileContent: [
            { required: true, message: '请上传相关文件', trigger: 'change' },
          ],
        }
			}
		},
		components: {
			vEditor
		},
		mounted(){

		},
		methods:{
			handleChange(value) {
        // console.log(value,'99999');
      },
      selectChange(value){
      	this.fileList = [];
      	this.contentForm.fileContent = []
      	if(value == 2){
      		// 文档
      		this.accept = ".pdf,.doc,.docx,.xls,.xlsx,.zip";
      	}else if(value == 3){
      		// 图片
      		this.accept = ".png,.jpg,.jpeg,.PNG,.JPG,.JPEG,.gif";
      	}else if(value == 4){
      		// 多媒体
      		this.accept = ".mp4,.rmvb,.webm";
      	}
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
				if(this.contentData.isEdit){ // 编辑
					this.$api.kl_contentEdit({
						id:this.contentData.id,
						function_type:2,
					}).then(data => {
						if(data.code == 0){
							this.selectChange(data.data.type);
							var all_parent = data.data.all_parent.reverse();
							this.contentForm.pid_all = all_parent;
							
							this.contentForm.id = data.data.id;
							this.contentForm.title = data.data.title;
							this.contentForm.type = data.data.type;
							this.contentForm.desc = data.data.desc;
							this.contentForm.is_show = data.data.is_show;
							this.contentForm.sort = data.data.sort;
							if(data.data.type == 1){
								this.contentForm.content = data.data.content;
							}else{
								this.contentForm.fileContent = data.data.content;
							 	let arrList = [];
				        for (let i in data.data.content) {
				          var obj = {};
				          var a = data.data.content[i].split("/");
				          var b = a[a.length -1];
				          obj.name = b;
				          obj.url = globalUrl.baseURL + data.data.content[i];
				          obj.path = data.data.content[i];
				          obj.isExist = true;
				          arrList.push(obj);
				        }
				        this.fileList = arrList;
							}
							
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
				this.contentData.dialog = false;
				this.contentForm.type = 1; // 复原
				this.fileList = [];
				this.removeFilesArr = [];
			},
			// form提交
			submitForm(formName) {
				var _this = this;
				var all = this.contentForm.pid_all;
				var content;
				if(this.contentForm.type == 1){
					content = this.contentForm.content;
				}else{
					content = this.contentForm.fileContent.join(",");
				}
        this.$refs[formName].validate((valid) => {
          if (valid) {
          	if(this.contentData.isEdit){ // 编辑后提交
          		this.$api.kl_contentEdit({
          			id:this.contentForm.id,
								title:this.contentForm.title,
          			cate_id:all[all.length-1],
          			type:this.contentForm.type,
          			content:content,
          			desc:this.contentForm.desc,
          			is_show:this.contentForm.is_show,
          			sort:this.contentForm.sort,
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
          		this.$api.kl_contentAdd({
          			title:this.contentForm.title,
          			cate_id:all[all.length-1],
          			type:this.contentForm.type,
          			content:content,
          			desc:this.contentForm.desc,
          			is_show:this.contentForm.is_show,
          			sort:this.contentForm.sort,
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
			// type=2 文档上传
			myUpload(params){
	      // 通过 FormData 对象上传文件
	      const formData = new FormData();
	      formData.append("type", this.contentForm.type);
	      formData.append("file", params.file);
	      formData.append("user_token", this.VueCookies.get("token"));

				this.$api.kl_contentUpload(formData).then(data =>{
					if(data.code == 0){
						// 回调成功的方法
						params.onSuccess(data);
						this.$message.success(data.msg);
						this.contentForm.fileContent.push(data.data.path);
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
				this.contentForm.fileContent.some((item, i)=>{
					if(item = path){
						this.contentForm.fileContent.splice(i, 1);
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
				this.$api.kl_contentUploadDel({
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

		}
	}
</script>

<style>

</style>