<template>
	<div class="user-container">
		<!-- 登录信息 -->
    <global-tips></global-tips>
    <!-- 经费管理 -->
    <el-card class="mt-3">
      <data-tables-server :data="tableData" layout="tool, table,pagination" :current-page="currentPage":page-size="pageSize" :pagination-props="{ background: true, pageSizes: [15,30,45,60], total: total }" @query-change="loadData" :filters="filters" :table-props="tableProps">
        <div class="mb-3" slot="tool">
          <h4 class="fs_16 font-weight-semibold m-0 text-000 mb-3">经费管理</h4>
          <div class="d-flex align-items-center">
          	<div class="mr-auto d-flex align-items-center">
          		<el-input
    				    placeholder="请输入"
    				    prefix-icon="el-icon-search"
    				    v-model="filters[0].value">
    				  </el-input>
              <el-button type="primary" class="ml-3">查询</el-button>
          	</div>
            <div class="ml-auto">
              <el-button type="primary" @click="handleAdd()"><i class="el-icon-plus el-icon--left"></i>新增经费</el-button>
            </div>
          </div>
        </div>
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" :index="indexMethod" label="序号" width="50"></el-table-column>
        <el-table-column prop="code" label="编号"></el-table-column>
        <el-table-column prop="year" label="年度"></el-table-column>
        <el-table-column prop="sourceDept" label="来源部门"></el-table-column>
        <el-table-column prop="totalFunds" label="共有经费"></el-table-column>
        <el-table-column prop="advanceFunds" label="本年度预支出经费"></el-table-column>
        <el-table-column prop="dept" label="填写部门"></el-table-column>
        <el-table-column prop="person" label="填写人"></el-table-column>
        <el-table-column fixed="right" label="操作" width="250" align="center">
          <template slot-scope="scope">
            <span class="text-primary cursor-pointer">查看</span>
            <span class="text-primary cursor-pointer ml-3">修改</span>
          </template>
        </el-table-column>
      </data-tables-server>
    </el-card>
    <funds-edit :fundsData="fundsData"></funds-edit>
	</div>
</template>

<script>
	import GlobalTips from "@/components/GlobalTips";
	import FundsEdit from "./FundsEdit";

	export default {
		name: 'Outlay',
		provide() {
      return {
        loadData: this.loadData
      }
    },
		components: {
			GlobalTips,
			FundsEdit,
		},
		data () {
			return {
				tableProps: {
          'max-height': 670,
        },
        tableData: [
        	{
            code:"0005891",
        		year:"2021",
        		sourceDept:"教研部",
        		totalFunds:"1,000,000",
        		advanceFunds:"400,000",
            dept:"学工办",
        		person:"张三",
        	},
        	{
            code:"0005891",
        		year:"2021",
        		sourceDept:"教研部",
        		totalFunds:"1,000,000",
        		advanceFunds:"400,000",
            dept:"学工办",
        		person:"张三",
        	},
        	{
            code:"0005891",
        		year:"2021",
        		sourceDept:"教研部",
        		totalFunds:"1,000,000",
        		advanceFunds:"400,000",
            dept:"学工办",
        		person:"张三",
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
        fundsData:{
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
      // 新增顶级菜单
      handleAdd(){
      	this.fundsData.dialog = true;
      	this.fundsData.title = "新增用户";
      	this.fundsData.id = '';
      },
		},
	}
</script>

<style>

</style>