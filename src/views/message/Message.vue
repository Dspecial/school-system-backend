<template>
	<div class="user-container">
		<!-- 登录信息 -->
    <global-tips></global-tips>
    <!-- 信息处理 -->
		<el-card :body-style="{ padding: '0px' }">
			<div class="d-flex align-items-center isCell">
				<h4 class="fs_16 font-weight-semibold m-0 text-000">信息处理</h4>
				<div class="tab_nav ml-3">
					<template v-for="(nav,index) in handleNav">
						<span :class="['cursor-pointer ml-3 opacity-60',handleNavIndex == nav.id?'active':'']" @click="handleTab(nav.id)">{{nav.title}}</span>
					</template> 
				</div>
			</div>
			<div class="tab_content">
				<el-row class="isCell handleType">
					<template v-for="(type,index) in handleType">
						<el-col :span="8" class="text-center">
							<span class="opacity-60">{{type.typeName}}</span>
							<p class="m-0 fs_30 mt-2">{{type.num}}/{{type.total}}</p>
						</el-col>
					</template>
				</el-row>
			</div>
		</el-card>

    <!-- 信息管理 -->
    <el-card class="mt-3">
      <data-tables-server :data="tableData" layout="tool, table,pagination" :total="total" :current-page="currentPage":page-size="pageSize" :pagination-props="{ background: true, pageSizes: [15,30,45,60] }" @query-change="loadData" :filters="filters" :table-props="tableProps">
        <div class="mb-3" slot="tool">
          <div class="d-flex align-items-center">
          	<div class="mr-auto d-flex align-items-center">
					    <el-date-picker
					    	class="w-100"
					      v-model="filters[0].value"
					      type="daterange"
					      range-separator="至"
					      start-placeholder="开始日期"
					      end-placeholder="结束日期">
					    </el-date-picker>
          		<el-input
          			class="ml-3 w-100"
    				    placeholder="标题/发出部门/发出人/状态/类型"
    				    prefix-icon="el-icon-search"
    				    v-model="filters[1].value">
    				  </el-input>
              <el-button type="primary" class="ml-3">查询</el-button>
          	</div>
          </div>
        </div>
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" :index="indexMethod" label="序号" width="50"></el-table-column>
        <el-table-column prop="startTime" label="日期"></el-table-column>
        <el-table-column prop="type" label="类型"></el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="dept" label="发出部门"></el-table-column>
        <el-table-column prop="sender" label="发出人"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column prop="endTime" label="完结时间"></el-table-column>
        <el-table-column fixed="right" label="操作" width="250" align="center">
          <template slot-scope="scope">
          	<span class="text-primary cursor-pointer" @click="showDetail(scope.$index,scope.row)">查看</span>
            <span class="text-primary cursor-pointer ml-3">修改</span>
          </template>
        </el-table-column>
      </data-tables-server>
    </el-card>
    <message-reply :replyData="replyData"></message-reply>
	</div>
</template>

<script>
	import GlobalTips from "@/components/GlobalTips";
	import MessageReply from "./MessageReply";
	export default {
		name: 'Message',
		provide() {
      return {
        loadData: this.loadData
      }
    },
		components: {
			GlobalTips,
			MessageReply
		},
		data () {
			return {
				// 信息处理Tab
				handleNav:[
					{
						id:0,
						title:"全部",
					},
					{
						id:1,
						title:"警报",
					},
					{
						id:2,
						title:"审批",
					},
					{
						id:3,
						title:"维保",
					},
					{
						id:4,
						title:"信息公告",
					},
					{
						id:5,
						title:"我发出的",
					},
				],
				// 默认选中的tab
				handleNavIndex:0,
				handleType:[
					{
						typeName:"待处理",
						num:"8",
						total:"100",
					},
					{
						typeName:"处理中",
						num:"10",
						total:"22",
					},
					{
						typeName:"已完结",
						num:"20",
						total:"20",
					},
				],
				tableProps: {
          'max-height': 670,
        },
        tableData: [
        	{
        		startTime:'2020.11.11',
        		type:"审批",
        		title:"xxx项目请审核",
        		dept:"学工处",
        		sender:"D9382张三",
        		status:"已完结",
        		endTime:"2020.11.11 20:12",
        	},
        	{
        		startTime:'2020.11.11',
        		type:"审批",
        		title:"xxx项目请审核",
        		dept:"学工处",
        		sender:"D9382张三",
        		status:"已完结",
        		endTime:"2020.11.11 20:12",
        	},
        	{
        		startTime:'2020.11.11',
        		type:"审批",
        		title:"xxx项目请审核",
        		dept:"学工处",
        		sender:"D9382张三",
        		status:"已完结",
        		endTime:"2020.11.11 20:12",
        	},
        ],
        filters: [
	        {
	          value: '',
	          prop: 'date'
	        },
	        {
	          value: '',
	          prop: 'name'
	        }
        ],
        total: 0, //总条数
        currentPage: 1, //当前页
        pageSize: 15, //每页显示条数
        replyData:{
        	dialog:false,
        	title:"",
        	id:"",
        },
			}
		},
		methods:{
			handleTab(id){
				this.handleNavIndex = id; 
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
      // 查看详细
      showDetail(index,row){
      	this.replyData.dialog = true;
      	this.replyData.title = "工单回复";
      	this.replyData.id = '';
      }
		},
	}
</script>

<style>

</style>