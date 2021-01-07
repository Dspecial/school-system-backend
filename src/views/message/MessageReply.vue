<template>
	<el-dialog
	  :title="replyData.title"
	  :visible.sync="replyData.dialog"
	  width="40%"
	  @open="openEdit"
	  @closed="closedEdit"
	  :before-close="handleClose"
	  top="2vh"
	  class="reply-dialog">
	  <div class="orderDetail panel fs_16">
	  	<div class="d-flex align-items-center justify-content-between">
		  	<p class="m-0 mb-3">
		  		<label class="m-0">类型：</label>
		  		<span class="opacity-70 mr-1">{{orderInfo.type}}</span>
		  		<span class="opacity-70">{{orderInfo.time}}</span>
		  	</p>
		  	<p class="m-0 mb-3">
		  		<label class="m-0">状态：</label>
		  		<span class="opacity-70 mr-1 text-success" v-if="orderInfo.status == 0">已解决</span>
		  		<span class="opacity-70 mr-1 text-danger" v-else>未解决</span>
		  	</p>
		  </div>
	  	<p class="m-0 mb-3">
	  		<label class="m-0">标题：</label>
	  		<span class="opacity-70 mr-1">{{orderInfo.title}}</span>
	  	</p>
	  	<div class="d-flex align-items-center">
		  	<p class="m-0 mb-3 mr-3">
		  		<label class="m-0">编号：</label>
		  		<span class="opacity-70 mr-1">{{orderInfo.code}}</span>
		  	</p>
		  	<p class="m-0 mb-3">
		  		<label class="m-0">发起人：</label>
		  		<span class="opacity-70 mr-1">{{orderInfo.author}}</span>
		  	</p>
	  	</div>
	  </div>

	  <div class="replayList">
	  	<template v-for="item in replayList">
		  	<div class="d-flex mt-3 mr-auto" v-if="item.role == 0">
		  		<div class="replay_avatar w-20 order-0">
		  			<div class="text-center pl-3 pr-3">
			  			<img src="@/assets/images/man.png" width="80" alt="" v-if="item.sex == 0" />
			  			<img src="@/assets/images/women.png" width="80" alt="" v-else />
			  			<p class="m-0 mt-2">{{item.company}}</p>
			  			<p class="m-0 mt-2">{{item.person}} 提问</p>
		  			</div>
		  		</div>
		  		<div class="replay_content panel w-60 order-1">
		  			<h5 class="fs_16 m-0 font-weight-normal">
		  				<span class="text-warning">问题描述:</span>
		  				<span>{{item.title}}</span>
		  			</h5>
		  			<el-row class="mt-3" :gutter="20">
		  				<el-col :span="12" v-for="(list,index) in item.imgList" :key="index">
		  					<el-image :src="list.url" fit="contain"></el-image>
		  				</el-col>
		  			</el-row>
		  		</div>
		  		<div class="w-20 order-2">
		  		</div>
		  	</div>
		  	<div class="d-flex mt-3 ml-auto" v-else>
		  		<div class="replay_avatar w-20 order-2">
		  			<div class="text-center pl-3 pr-3">
			  			<img src="@/assets/images/man.png" width="80" alt="" v-if="item.sex == 0" />
			  			<img src="@/assets/images/women.png" width="80" alt="" v-else />
			  			<p class="m-0 mt-2">{{item.company}}</p>
			  			<p class="m-0 mt-2">{{item.person}} 答复</p>
		  			</div>
		  		</div>
		  		<div class="replay_content w-60 order-1">
		  			<h5 class="fs_16 m-0 font-weight-normal">
		  				<span class="text-success">问题答复:</span>
		  				<span>{{item.title}}</span>
		  			</h5>
		  			<el-row class="mt-3" :gutter="20">
		  				<el-col :span="12" v-for="(list,index) in item.imgList" :key="index">
		  					<el-image :src="list.url" fit="contain"></el-image>
		  				</el-col>
		  			</el-row>
		  		</div>
		  		<div class="w-20 order-0">
		  		</div>
		  	</div>
	  	</template>
	  </div>
	</el-dialog>
</template>

<script>
	export default {
		props:['replyData'],
		inject: ['loadData'],
		name: 'MessageEdit',
		data () {
			return {
				orderInfo:{
					type:"维保",
					time:"2020.11.11 12:00",
					title: "xxx项目，出现系统故障请xx公司快递排除并提交对应文件",
					code:"XD12345",
					author:"张三 教务处",
					status:"0",// 0：已解决；1：未解决
				},
				replayList:[
					{
						role:"0", // 0：提问；1：回答
						person:"张三",
						sex:"1", // 0:男；1：女
						company:"",
						title:"发现提示问题如下图",
						imgList:[
							{
								url:require("@/assets/images/avatar.jpg"),
							},
							{
								url:require("@/assets/images/avatar.jpg"),
							},
						],
					},
					{
						role:"1", // 0：提问；1：回答
						person:"李四",
						sex:"0", // 0:男；1：女
						company:"xxxx公司xxxx公司xxxx公司",
						title:"此类问题解决方法如下",
						imgList:[
							{
								url:require("@/assets/images/avatar.jpg"),
							},
							{
								url:require("@/assets/images/avatar.jpg"),
							},
						],
					},
				],
			}
		},
		components: {},
		mounted(){
			
		},
		methods:{
			// dialog初始化
			openEdit(){
				
			},
			// dialog关闭
			closedEdit(){
				this.handleClose();
			},
			// 右上角x关闭
			handleClose(){
				this.replyData.dialog = false;
			},
		}
	}
</script>

<style>

</style>