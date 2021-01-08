<template>
	<div class="user-container">
		<!-- 登录信息 -->
    <global-tips></global-tips>
    <!-- 项目节点配置 -->
    <el-card class="mt-3">
      <data-tables-server :data="tableData" layout="tool, table,pagination" :current-page="currentPage":page-size="pageSize" :pagination-props="{ background: true, pageSizes: [15,30,45,60], total: total }" @query-change="loadData" :filters="filters" :table-props="tableProps">
        <div class="mb-3" slot="tool">
          <h4 class="fs_16 font-weight-semibold m-0 text-000 mb-3">项目节点配置</h4>
          <div class="d-flex align-items-center">
          	<div class="mr-auto d-flex align-items-center">
          		<el-input
    				    placeholder="项目类别编号"
    				    prefix-icon="el-icon-search"
    				    v-model="filters[0].value">
    				  </el-input>
              <el-button type="primary" class="ml-3">查询</el-button>
          	</div>
            <div class="ml-auto">
              <el-button type="primary" @click="handleAdd()"><i class="el-icon-plus el-icon--left"></i>新增项目类型</el-button>
            </div>
          </div>
        </div>
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" :index="indexMethod" label="序号" width="50"></el-table-column>
        <el-table-column prop="typeCode" label="项目类型编码"></el-table-column>
        <el-table-column prop="type" label="项目类型"></el-table-column>
        <el-table-column prop="brief" label="项目简介"></el-table-column>
        <el-table-column prop="status" label="状态">
        	<template slot-scope="scope">
	        	<el-switch
						  v-model="scope.row.status"
						  active-value="1"
						  inactive-value="0"
						  active-color="#52C418"
						  inactive-color="#969191">
						</el-switch>
        	</template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <span class="text-primary cursor-pointer">修改</span>
            <span class="text-primary cursor-pointer ml-3">删除</span>
          </template>
        </el-table-column>
      </data-tables-server>
    </el-card>
    <projectnode-edit :projectnodeData="projectnodeData"></projectnode-edit>
	</div>
</template>

<script>
	import GlobalTips from "@/components/GlobalTips";
	import ProjectnodeEdit from "./ProjectnodeEdit";

	export default {
		name: 'Projectnode',
		provide() {
      return {
        loadData: this.loadData
      }
    },
		components: {
			GlobalTips,
			ProjectnodeEdit
		},
		data () {
			return {
				tableProps: {
          'max-height': 670,
        },
        tableData: [
        	{
        		typeCode:"GDX1138934891ERDFKDK",
        		type:"建设类",
        		brief:"简介简介100字",
        		status:"1",
        	},
        	{
        		typeCode:"GDX1138934891ERDFKDK",
        		type:"建设类",
        		brief:"简介简介100字",
        		status:"0",
        	},
        	{
        		typeCode:"GDX1138934891ERDFKDK",
        		type:"建设类",
        		brief:"简介简介100字",
        		status:"1",
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
        projectnodeData:{
        	dialog:false,
        	title:"",
        	id:"",
        },
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
      // 新增项目类型
      handleAdd(){
      	this.projectnodeData.dialog = true;
      	this.projectnodeData.title = "新增项目类型";
      	this.projectnodeData.id = '';
      },
		},
	}
</script>

<style>

</style>