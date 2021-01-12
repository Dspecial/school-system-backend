<template>
	<div class="user-container">
		<!-- 登录信息 -->
    <global-tips></global-tips>
    <!-- 日志管理 -->
    <el-card class="mt-3">
      <data-tables-server :data="tableData" layout="tool, table,pagination" :current-page="currentPage":page-size="pageSize" :pagination-props="{ background: true, pageSizes: [15,30,45,60], total: total }" @query-change="loadData" :filters="filters" :table-props="tableProps">
        <div class="mb-3" slot="tool">
          <h4 class="fs_16 font-weight-semibold m-0 text-000 mb-3">日志管理</h4>
          <div class="d-flex align-items-center">
          	<div class="mr-auto d-flex align-items-center">
          		<el-input
    				    placeholder="请输入关键词"
    				    prefix-icon="el-icon-search"
    				    v-model="filters[0].value">
    				  </el-input>
              <el-button type="primary" class="ml-3">查询</el-button>
          	</div>
          </div>
        </div>
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" :index="indexMethod" label="序号" width="50"></el-table-column>
        <el-table-column prop="id" label="ID" width="100"></el-table-column>
        <el-table-column prop="content" label="日志内容" width="300">
        	<template slot-scope="scope">
            <span class="text-truncate">{{scope.row.content}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="actionName" label="操作名称"></el-table-column>
        <el-table-column prop="actionRoute" label="操作路由"></el-table-column>
        <el-table-column prop="actionType" label="操作类型"></el-table-column>
        <el-table-column prop="role" label="角色名"></el-table-column>
        <el-table-column prop="time" label="操作时间"></el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <span class="text-primary cursor-pointer">删除</span>
          </template>
        </el-table-column>
      </data-tables-server>
    </el-card>
	</div>
</template>

<script>
	import GlobalTips from "@/components/GlobalTips";

	export default {
		name: 'Log',
		provide() {
      return {
        loadData: this.loadData
      }
    },
		components: {
			GlobalTips,
		},
		data () {
			return {
				tableProps: {
          'max-height': 670,
        },
        tableData: [
        	{
        		id:"2568",
        		content:"刘丽于2020-12-25 16:58:49 登录系统",
        		actionName:"登录",
        		actionRoute:"login",
        		actionType:"登录",
        		role:"管理员",
        		time:"2020-12-25 16:58:49"
        	},
        	{
        		id:"2569",
        		content:"jsx于2020-12-26 10:42:00 编辑项目类别",
        		actionName:"编辑",
        		actionRoute:"project/category",
        		actionType:"",
        		role:"管理员,教务处",
        		time:"2020-12-26 10:42:00"
        	},
        	{
        		id:"2672",
        		content:"王淑玉于2021-01-05 12:00:05 登录系统",
        		actionName:"登录",
        		actionRoute:"login",
        		actionType:"登录",
        		role:"管理员",
        		time:"2021-01-05 12:00:05"
        	},
        	{
        		id:"2987",
        		content:"刘震于2021-01-06 08:00:00 编辑审核流程",
        		actionName:"编辑",
        		actionRoute:"auditProcess",
        		actionType:"",
        		role:"教务处",
        		time:"2021-01-06 08:00:00"
        	},
        	{
        		id:"2990",
        		content:"刘丽于2021-01-12 17:25:49 登录系统",
        		actionName:"登录",
        		actionRoute:"login",
        		actionType:"登录",
        		role:"管理员",
        		time:"2021-01-12 17:25:49"
        	},
        ],
        filters: [
	        {
	          value: '',
	          prop: 'name'
	        }
        ],
        total: 0, //总条数
        currentPage: 1, //当前页
        pageSize: 15, //每页显示条数
			}
		},
    mounted(){

    },
		methods:{
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
        this.total = this.tableData.length;
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
		},
	}
</script>

<style>

</style>