<template>
	<div class="user-container">
		<!-- 登录信息 -->
    <global-tips></global-tips>
    <!-- 项目类别 -->
    <el-card class="mt-3">
      <data-tables-server :data="tableData" layout="tool, table,pagination" :total="total" :current-page="currentPage":page-size="pageSize" :pagination-props="{ background: true, pageSizes: [15,30,45,60] }" @query-change="loadData" :filters="filters" :table-props="tableProps">
        <div class="mb-3" slot="tool">
          <h4 class="fs_16 font-weight-semibold m-0 text-000 mb-3">项目类别</h4>
          <div class="d-flex align-items-center">
          	<div class="mr-auto d-flex align-items-center">
          		<el-input
    				    placeholder="项目类别、审核流程、设置人"
    				    prefix-icon="el-icon-search"
    				    v-model="filters[0].value">
    				  </el-input>
              <el-button type="primary" class="ml-3">查询</el-button>
          	</div>
            <div class="ml-auto">
              <el-button type="primary" @click="handleAdd()"><i class="el-icon-plus el-icon--left"></i>新增项目类别</el-button>
            </div>
          </div>
        </div>
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" :index="indexMethod" label="序号" width="50"></el-table-column>
        <el-table-column prop="categoryNo" label="项目类别编号"></el-table-column>
        <el-table-column prop="categoryName" label="项目类别"></el-table-column>
        <el-table-column prop="process" label="审核流程"></el-table-column>
        <el-table-column prop="remark" label="类型备注"></el-table-column>
        <el-table-column prop="projectNum" label="配置项目数"></el-table-column>
        <el-table-column prop="time" label="最近编辑时间"></el-table-column>
        <el-table-column prop="person" label="设置人"></el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <span class="text-primary cursor-pointer">修改</span>
            <span class="text-primary cursor-pointer ml-3">删除</span>
          </template>
        </el-table-column>
      </data-tables-server>
    </el-card>
    <category-edit :categoryData="categoryData"></category-edit>
	</div>
</template>

<script>
	import GlobalTips from "@/components/GlobalTips";
	import CategoryEdit from "./CategoryEdit";

	export default {
		name: 'Category',
		provide() {
      return {
        loadData: this.loadData
      }
    },
		components: {
			GlobalTips,
			CategoryEdit
		},
		data () {
			return {
				tableProps: {
          'max-height': 670,
        },
        tableData: [
        	{
        		categoryNo:"1",
        		categoryName:"建设类",
        		process:"A1",
        		remark:"需要进行多项审核",
        		projectNum:"21",
        		time:"2020.11.12",
        		person:"教务处：小王",
        	},
        	{
        		categoryNo:"1",
        		categoryName:"建设类",
        		process:"A1",
        		remark:"需要进行多项审核",
        		projectNum:"21",
        		time:"2020.11.12",
        		person:"教务处：小王",
        	},
        	{
        		categoryNo:"1",
        		categoryName:"建设类",
        		process:"A1",
        		remark:"需要进行多项审核",
        		projectNum:"21",
        		time:"2020.11.12",
        		person:"教务处：小王",
        	},
        	{
        		categoryNo:"1",
        		categoryName:"建设类",
        		process:"A1",
        		remark:"需要进行多项审核",
        		projectNum:"21",
        		time:"2020.11.12",
        		person:"教务处：小王",
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
        categoryData:{
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
      // 新增项目类别
      handleAdd(){
      	this.categoryData.dialog = true;
      	this.categoryData.title = "新增项目类别";
      	this.categoryData.id = '';
      },
		},
	}
</script>

<style>

</style>