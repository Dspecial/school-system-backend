<template>
  <div class="system-container">
    <!-- 登录信息 -->
    <global-tips></global-tips>
    <!-- 配置同步时间 -->
    <el-card>
    	<h4 class="fs_18 font-weight-semibold m-0 mb-3 text-000">配置同步时间</h4>
    	<el-form ref="timeForm" :model="timeForm" label-width="80px" label-position="left">
			  <el-form-item label="上行时间">
			    <el-select v-model="timeForm.upHour" clearable placeholder="时" style="width: 80px">
				    <el-option
				      v-for="i in 23"
				      :key="i-1"
				      :label="i-1"
				      :value="i-1">
				    </el-option>
				  </el-select>
				  <span class="ml-2 mr-3">时</span>
				  <el-select v-model="timeForm.upMinute" clearable placeholder="分" style="width: 80px">
				    <el-option
				      v-for="i in 59"
				      :key="i"
				      :label="i"
				      :value="i">
				    </el-option>
				  </el-select>
				  <span class="ml-2 mr-3">分</span>
				  <el-switch
					  v-model="timeForm.upSwitch"
					  active-color="#032F99"
					  inactive-color="#969191">
					</el-switch>
					<span class="ml-2 opacity-60">*上行为平台数据上传至中心数据</span>
					<span class="ml-2 opacity-60">*下行为平台数据从中心数据下载并同步到本平台</span>
			  </el-form-item>

			  <el-form-item label="下行时间">
			    <el-select v-model="timeForm.downHour" clearable placeholder="时" style="width: 80px">
				    <el-option
				      v-for="i in 23"
				      :key="i-1"
				      :label="i-1"
				      :value="i-1">
				    </el-option>
				  </el-select>
				  <span class="ml-2 mr-3">时</span>
				  <el-select v-model="timeForm.downMinute" clearable placeholder="分" style="width: 80px">
				    <el-option
				      v-for="i in 59"
				      :key="i"
				      :label="i"
				      :value="i">
				    </el-option>
				  </el-select>
				  <span class="ml-2 mr-3">分</span>
				  <el-switch
					  v-model="timeForm.downSwitch"
					  active-color="#032F99"
					  inactive-color="#969191">
					</el-switch>
					<span class="ml-2 opacity-60">*上下行时间为同一时间点的系统，先上行，再下行完成数据处理</span>
			  </el-form-item>
			  <p class="m-0">上次更新时间：2020-10-10 12:00:00上行完成；2020-10-11 13:00:00下行同步完成<span class="cursor-pointer text-primary ml-2">更多</span></p>
			</el-form>
    </el-card>

    <!-- 基础设置 -->
    <el-card class="mt-3">
    	<h4 class="fs_18 font-weight-semibold m-0 mb-3 text-000">基础设置</h4>
    	<el-form ref="basicForm" :model="basicForm" label-width="110px" style="max-width: 470px">
				<el-form-item label="系统名称">
			    <el-input v-model="basicForm.systemName" placeholder="请输入系统名称"></el-input>
			  </el-form-item>
			  <el-form-item label="学校名称">
			    <el-input v-model="basicForm.schoolName" placeholder="请输入学校名称"></el-input>
			  </el-form-item>
			  <el-form-item label="版权企业信息">
			    <el-input v-model="basicForm.companyName" placeholder="请输入版权企业信息"></el-input>
			  </el-form-item>
			  <el-form-item label="LOGO设置">
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
			  <el-form-item class="mb-0">
			    <el-button type="primary">保存</el-button>
			  </el-form-item>
			</el-form>
    </el-card>

    <!-- 系统控制 -->
    <el-card class="mt-3">
    	<h4 class="fs_18 font-weight-semibold m-0 mb-3 text-000">系统控制</h4>
    	<el-form ref="contorlForm" :model="contorlForm" label-width="100px" label-position="right" inline>
				<el-form-item label="平台开关" class="mb-0">
					<el-switch
					  v-model="contorlForm.switch1"
					  active-color="#032F99"
					  inactive-color="#969191">
					</el-switch>
				</el-form-item>
				<el-form-item label="状态更新短信" class="mb-0">
					<el-switch
					  v-model="contorlForm.switch2"
					  active-color="#032F99"
					  inactive-color="#969191">
					</el-switch>
				</el-form-item>
			</el-form>
    </el-card>
	</div>
</template>

<script>
	import GlobalTips from "@/components/GlobalTips";
	export default {
		name: 'System',
		components: {
			GlobalTips,
		},
		data () {
			return {
				// 配置同步时间
				timeForm:{
					upHour:"",
					upMinute:"",
					upSwitch:"",
					downHour:"",
					downMinute:"",
					downSwitch:"",
				},

				// 基础设置
				basicForm:{
					systemName:"",
					schoolName:"",
					companyName:"",
					logo:"",
				},

				// 系统控制
				contorlForm:{
					switch1:'',
					switch2:'',
				},
				
			}
		},
		methods:{
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
		},
	}
</script>

<style>

</style>