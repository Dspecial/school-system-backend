<template>
	<div class="user-container">
		<!-- 登录信息 -->
    <global-tips></global-tips>
    <!-- 项目资源分配 -->
    <el-card class="mt-3">
      <data-tables-server :data="tableData" layout="tool, table,pagination" :current-page="currentPage" :page-size="pageSize" :pagination-props="{ background: true, pageSizes: [15,30,45,60], total: total }" @query-change="loadData" :filters="filters" :table-props="tableProps">
        <div class="mb-3" slot="tool">
          <h4 class="fs_18 font-weight-semibold m-0 text-000 mb-3">项目资源分配</h4>
          <div class="d-flex align-items-center">
          	<div class="mr-auto d-flex align-items-center">
          		<el-input
    				    placeholder="项目名称、阶段、供应商名字、负责人名"
    				    prefix-icon="el-icon-search"
    				    v-model="filters[0].value"
                clearable>
    				  </el-input>
              <el-button type="primary" class="ml-3">查询</el-button>
          	</div>
          </div>
        </div>
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" :index="indexMethod" label="序号" width="50"></el-table-column>
        <el-table-column prop="type" label="项目类型"></el-table-column>
        <el-table-column prop="name" label="项目名称"></el-table-column>
        <el-table-column prop="period" label="项目阶段"></el-table-column>
        <el-table-column prop="distribution" label="资源分配"></el-table-column>
        <el-table-column prop="supplier" label="分配供应商"></el-table-column>
        <el-table-column prop="director" label="项目负责人"></el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
          	<span class="text-primary cursor-pointer">查看</span>
            <span class="text-primary cursor-pointer ml-3" @click="setting(scope.$index,scope.row)">资源配置</span>
            <span class="text-primary cursor-pointer ml-3">删除</span>
          </template>
        </el-table-column>
      </data-tables-server>
    </el-card>
    <distribution-setting :settingData="settingData"></distribution-setting>
	</div>
</template>

<script>
	import GlobalTips from "@/components/GlobalTips";
	import DistributionSetting from "./DistributionSetting";

	export default {
		name: 'Distribution',
		provide() {
      return {
        loadData: this.loadData
      }
    },
		components: {
			GlobalTips,
			DistributionSetting
		},
		data () {
			return {
				tableProps: {
          
        },
        tableData: [
        	{
        		type:"建设类",
        		name:"后勤管理系统",
        		period:"实施",
        		distribution:"完成",
        		supplier:"上海xxxx技术有限企业",
        		director:"学工部DKDK张三",
        	},
        	{
        		type:"建设类",
        		name:"后勤管理系统",
        		period:"实施",
        		distribution:"完成",
        		supplier:"上海xxxx技术有限企业",
        		director:"学工部DKDK张三",
        	},
        	{
        		type:"建设类",
        		name:"后勤管理系统",
        		period:"实施",
        		distribution:"完成",
        		supplier:"上海xxxx技术有限企业",
        		director:"学工部DKDK张三",
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
        settingData:{
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
      // 资源配置
      setting(index,row){
      	this.settingData.dialog = true;
      	this.settingData.title = "资源配置";
      	this.settingData.id = row.id;
      },
		},
	}
</script>

<style>

</style>