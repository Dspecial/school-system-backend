<template>
	<el-dialog
	  :title="settingData.title"
	  :visible.sync="settingData.dialog"
	  width="50%"
	  @open="openEdit"
	  @closed="closedEdit('settingForm')"
	  :before-close="handleClose">
	  <el-form :model="settingForm" :rules="rules" ref="settingForm" label-width="100px">
	  	<el-row :gutter="20">
				<el-col :span="12">
					<el-form-item label="项目年份" prop="year">
				    <el-date-picker type="date" placeholder="选择日期" v-model="settingForm.year" style="width: 100%;" clearable></el-date-picker>
				  </el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="项目名称" prop="name">
				    <el-input v-model="settingForm.name" placeholder="请输入项目名称"></el-input>
				  </el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="录入时间" prop="date">
				    <el-date-picker type="date" placeholder="选择日期" v-model="settingForm.date" style="width: 100%;" clearable></el-date-picker>
				  </el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="项目类型" prop="type">
						<el-select v-model="settingForm.type" clearable placeholder="请选择项目类型" style="width: 100%;">
				      <el-option label="建设类" value="1"></el-option>
				      <el-option label="工程类" value="2"></el-option>
				    </el-select>
				  </el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="录入科室" prop="dept">
				    <el-select v-model="settingForm.dept" clearable placeholder="请选择录入科室" style="width: 100%;">
				      <el-option label="教务处" value="1"></el-option>
				      <el-option label="学工办" value="2"></el-option>
				    </el-select>
				  </el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="经费来源" prop="fundSource">
				    <el-select v-model="settingForm.fundSource" clearable placeholder="请选择经费来源" style="width: 100%;">
				      <el-option label="教务处" value="1"></el-option>
				      <el-option label="学工办" value="2"></el-option>
				    </el-select>
				  </el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="预算" prop="budget">
				    <el-input v-model.number="settingForm.budget" placeholder="请输入预算"></el-input>
				  </el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="建设方式" prop="constructionMode">
				    <el-select v-model="settingForm.constructionMode" clearable placeholder="请选择建设方式" style="width: 100%;">
				      <el-option label="中标企业" value="1"></el-option>
				      <el-option label="自建" value="2"></el-option>
				    </el-select>
				  </el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="可用经费" prop="funds">
				    <el-input v-model.number="settingForm.funds" placeholder="请输入可用经费"></el-input>
				  </el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="核定金额" prop="approvedAmount">
				    <el-input v-model.number="settingForm.approvedAmount" placeholder="请输入核定金额"></el-input>
				  </el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="合同金额" prop="contractAmount">
				    <el-input v-model.number="settingForm.contractAmount" placeholder="请输入合同金额"></el-input>
				  </el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="合同状态">
				    <el-input v-model="settingForm.status" placeholder="请输入合同状态"></el-input>
				  </el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="配置服务器">
					  <el-input v-model="settingForm.server" placeholder="请输入服务器"></el-input>
				  </el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="配置资源">
					  <el-input v-model="settingForm.settings" placeholder="请输入配置"></el-input>
				  </el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="配置厂商">
				    <el-select v-model="settingForm.manufacturer"  clearable placeholder="请选择配置厂商" style="width: 100%;">
				      <el-option label="厂商一" value="1"></el-option>
				      <el-option label="厂商二" value="2"></el-option>
				    </el-select>
				  </el-form-item>
				</el-col>
				<el-col :span="24">
					<span class="opacity-60">项目节点付款：</span>
					<span>验收支付95% xxxx元 维保支付5% xxxx元</span>
				</el-col>
			</el-row>
	  </el-form>
	  <span slot="footer" class="dialog-footer">
	    <el-button @click="closedEdit('settingForm')">取 消</el-button>
	    <el-button type="primary" @click="submitForm('settingForm')">确 定</el-button>
	  </span>
	</el-dialog>
</template>

<script>
	export default {
		props:['settingData'],
		inject: ['loadData'],
		name: 'DistributionSetting',
		data () {
			return {
        settingForm: {
					year:"",
          name: "",
          date:"",
          type:"",
          dept:"",
          fundSource:"",
          budget:"",
          constructionMode:"",
          funds:"",
          approvedAmount:"",
          contractAmount:"",
          status:"确认",
          server:"",
          settings:"",
          manufacturer:"",
        },
        rules: {
          year: [
            { type: 'date', required: true, message: '请选择年份', trigger: 'change' }
          ],
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' }
          ],
          date: [
            { type: 'date', required: true, message: '请选择录入时间', trigger: 'change' }
          ],
          type: [
            { required: true, message: '请选择项目类型', trigger: 'change' }
          ],
          dept: [
            { required: true, message: '请选择科室', trigger: 'change' }
          ],
          fundSource: [
            { required: true, message: '请选择经费来源', trigger: 'change' }
          ],
          budget: [
          	{ required: true, message: '请输入预算', trigger: 'blur' },
          	{ type: 'number', message: '预算必须为数字值'}
          ],
          constructionMode: [
            { required: true, message: '请选择建设方式', trigger: 'change' }
          ],
          funds: [
          	{ required: true, message: '请输入可用经费', trigger: 'blur' },
          	{ type: 'number', message: '可用经费必须为数字值'}
          ],
          approvedAmount: [
          	{ type: 'number', message: '核定金额必须为数字值'}
          ],
          contractAmount: [
          	{ type: 'number', message: '合同金额必须为数字值'}
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
				this.settingData.dialog = false;
			},
			// 添加节点
			addField(){
				this.settingForm.tableData.push({node:'项目验收'});
			},
			// 删除节点
			delField(index){
				this.settingForm.tableData.splice(index, 1);
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