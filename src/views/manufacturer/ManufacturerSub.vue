<template>
	<div class="user-container">
		<!-- 登录信息 -->
    <global-tips></global-tips>
    <!-- 厂商子账号管理 -->
    <el-card class="mt-3">
      <data-tables-server :data="tableData" layout="tool, table,pagination" :total="total" :current-page="currentPage":page-size="pageSize" :pagination-props="{ background: true, pageSizes: [15,30,45,60] }" @query-change="loadData" :filters="filters" :table-props="tableProps">
        <div class="mb-3" slot="tool">
          <h4 class="fs_16 font-weight-semibold m-0 text-000 mb-3">厂商子账号管理</h4>
          <div class="d-flex align-items-center">
          	<div class="mr-auto d-flex align-items-center">
          		<el-input
    				    placeholder="公司名称/营业执照编码/负责人姓名/手机号"
    				    prefix-icon="el-icon-search"
    				    v-model="filters[0].value">
    				  </el-input>
              <el-button type="primary" class="ml-3">查询</el-button>
          	</div>
          </div>
        </div>
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" :index="indexMethod" label="序号" width="50"></el-table-column>
        <el-table-column prop="companyName" label="公司名称"></el-table-column>
        <el-table-column prop="blCode" label="营业执照编码"></el-table-column>
        <el-table-column prop="accountNum" label="账户数目"></el-table-column>
        <el-table-column prop="admin" label="账户名" width="300"></el-table-column>
        <el-table-column prop="psw" label="密码"></el-table-column>
        <el-table-column prop="post" label="职位"></el-table-column>
        <el-table-column fixed="right" label="操作" width="250" align="center">
          <template slot-scope="scope">
            <span class="text-primary cursor-pointer ml-3">修改</span>
            <span class="text-primary cursor-pointer ml-3">删除</span>
          </template>
        </el-table-column>
      </data-tables-server>
    </el-card>
	</div>
</template>

<script>
	import GlobalTips from "@/components/GlobalTips";
	export default {
		name: 'ManufacturerSub',
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
        		companyName:'XX实业有限公司',
        		blCode:"9NLDE1234555553221",
        		accountNum:"3",
        		admin:"常州xxxxxx公司、18211122311",
        		psw:"********",
        		post:"负责人",
        	},
        	{
        		companyName:'XX实业有限公司',
        		blCode:"9NLDE1234555553221",
        		accountNum:"3",
        		admin:"18273727171",
        		psw:"********",
        		post:"技术",
        	},
        	{
        		companyName:'XX实业有限公司',
        		blCode:"9NLDE1234555553221",
        		accountNum:"3",
        		admin:"18211122311",
        		psw:"********",
        		post:"维保",
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
        pageSize: 0, //每页显示条数
        mfuserData:{
        	dialog:false,
        	title:"",
        	id:"",
        },
			}
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
      	this.mfuserData.dialog = true;
      	this.mfuserData.title = "新增厂商用户";
      	this.mfuserData.id = '';
      },
		},
	}
</script>

<style>

</style>