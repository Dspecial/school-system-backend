<template>
	<el-dialog
		class="documentUpload"
	  :title="uploadData.title"
	  :visible.sync="uploadData.dialog"
	  width="30%"
	  @open="openEdit"
	  @closed="closedEdit('uploadForm')"
	  :before-close="handleClose">
	  <el-form :model="uploadForm" :rules="rules" ref="uploadForm" label-width="100px">
	  	<el-form-item label="项目分类" prop="category">
		    <el-select v-model="uploadForm.category" placeholder="请选择项目分类" class="w-100">
			    <el-option label="建设类" value="1"></el-option>
			    <el-option label="融资类" value="2"></el-option>
			  </el-select>
		  </el-form-item>
		  <el-form-item label="材料类型" prop="materialType">
		    <el-select v-model="uploadForm.materialType" placeholder="请选择材料类型" class="w-100">
			    <el-option label="材料1" value="1"></el-option>
			    <el-option label="材料2" value="2"></el-option>
			  </el-select>
		  </el-form-item>
		  <el-form-item label="项目节点" prop="node">
		    <el-select v-model="uploadForm.node" placeholder="请选择项目节点" class="w-100">
			    <el-option label="合同状态" value="1"></el-option>
			    <el-option label="节点2" value="2"></el-option>
			  </el-select>
		  </el-form-item>
		  <el-form-item label="文件夹名称" prop="name">
		    <el-input v-model="uploadForm.name" placeholder="请输入文件夹名称"></el-input>
		  </el-form-item>
		  <el-form-item label="是否必传" prop="transfer">
		    <el-radio-group v-model="uploadForm.transfer">
			    <el-radio :label="0">是</el-radio>
			    <el-radio :label="1">否</el-radio>
			  </el-radio-group>
		  </el-form-item>
		  <el-form-item label="模板">
		    <el-upload
				  action="https://jsonplaceholder.typicode.com/posts/"
				  drag
				  :auto-upload="false"
				  :on-success="handleAvatarSuccess"
				  :before-upload="beforeAvatarUpload">
				  <i class="el-icon-upload"></i>
				  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
				  <div class="el-upload__tip opacity-60" slot="tip">注：logo必须为白色底，文件格式GIF、JPG、JPEG、PNG，文件大小100k以内，建议尺寸1xxxpx*1xxxpx</div>
				</el-upload>
		  </el-form-item>
	  </el-form>
	  <span slot="footer" class="dialog-footer">
	    <el-button @click="closedEdit('uploadForm')">取 消</el-button>
	    <el-button type="primary" @click="submitForm('uploadForm')">确 定</el-button>
	  </span>
	</el-dialog>
</template>

<script>
	export default {
		props:['uploadData'],
		inject: ['loadData'],
		name: 'DocumentUpload',
		data () {
			return {
				uploadForm:{
					category:"",
					materialType:"",
					node:"",
					name:"",
					transfer:"",
				},
				rules: {
          category: [
            { required: true, message: '请选择项目分类', trigger: 'change' }
          ],
          materialType: [
            { required: true, message: '请选择材料类型', trigger: 'change' }
          ],
          node: [
            { required: true, message: '请选择项目节点', trigger: 'change' },
          ],
          name: [
            { required: true, message: '请输入文件夹名称', trigger: 'blur' },
          ],
          transfer: [
            { required: true, message: '请选择是否必传', trigger: 'change' },
          ],
        }
			}
		},
		components: {},
		methods:{
			// dialog初始化
			openEdit(){
				if(this.uploadData.id == ''){ // 顶级
					this.uploadForm.highLevelDept =  '已是顶级';
					this.isEdit = true;
				}else{ // 子集
					this.isEdit = false;
				}
			},
			// dialog关闭
			closedEdit(formName){
				this.handleClose();
				this.resetForm(formName);
			},
			// 右上角x关闭
			handleClose(){
				this.uploadData.dialog = false;
			},
			// 上传成功
			handleAvatarSuccess(res, file) {
        // this.imageUrl = URL.createObjectURL(file.raw);
      },
      // 上传前验证
      beforeAvatarUpload(file) {
        const isPic = file.type === 'image/gif' || file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png';
        const isLt = file.size / 1024  < 100;
        if (!isPic) {
          this.$message.error('上传头像图片只能是 GIF、JPG、JPEG、PNG 格式!');
          return isPic
        }
        if (!isLt) {
          this.$message.error('上传Logo图片大小不能超过 100kb!');
          return isLt
        }
        return isPic && isLt;
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