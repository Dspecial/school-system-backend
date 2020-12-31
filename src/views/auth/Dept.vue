<template>
	<div class="dept-container">
		<!-- 登录信息 -->
    <global-tips></global-tips>
    <!-- 部门列表 -->
    <el-card class="mt-3">
      <data-tables-server :data="tableData" layout="tool, table,pagination" :total="total" :current-page="currentPage":page-size="pageSize" :pagination-props="{ background: true, pageSizes: [15,30,45,60] }" @query-change="loadData" :filters="filters" :table-props="tableProps">
        <div class="mb-3" slot="tool">
          <h4 class="fs_16 font-weight-semibold m-0 text-000 mb-3">部门管理列表</h4>
          <div class="d-flex align-items-center">
            <div class="ml-auto">
              <el-button type="primary" @click="handleAdd()"><i class="el-icon-plus el-icon--left"></i>新增顶级菜单</el-button>
              <el-button type="primary"><i class="el-icon-office-building el-icon--left"></i>合作厂商修改</el-button>
            </div>
          </div>
        </div>
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" :index="indexMethod" label="序号" width="50"></el-table-column>
        <el-table-column prop="deptName" label="部门名称"></el-table-column>
        <el-table-column prop="level" label="层级"></el-table-column>
        <el-table-column fixed="right" label="操作" width="250" align="center">
          <template slot-scope="scope">
          	<span class="text-primary cursor-pointer" @click="handleSonAdd(scope.$index,scope.row)">新增子集</span>
            <span class="text-primary cursor-pointer ml-3">修改</span>
            <span class="text-primary cursor-pointer ml-3">删除</span>
          </template>
        </el-table-column>
      </data-tables-server>
    </el-card>
    <dept-edit :deptData="deptData"></dept-edit>
	</div>
</template>

<script>
	import GlobalTips from "@/components/GlobalTips";
	import DeptEdit from "./DeptEdit";

	export default {
		name: 'Dept',
		provide() {
      return {
        loadData: this.loadData
      }
    },
		components: {
			GlobalTips,
			DeptEdit,
		},
		data () {
			return {
				tableProps: {
          'max-height': 670,
          'row-key':'id',
          'default-expand-all':true,
          'tree-props':{
          	hasChildren: 'hasChildren', 
          	children: 'children',
          },
        },
        tableData: [
        	{
        		id:1,
            level:"1",
            deptName:"常州信息职业技术学院",
            children: [
            	{
	              id:11,
            		level:"2",
            		deptName:"信息中心",
            		children: [
            			{
            				id:111,
            				level:"3",
            				deptName:"信息中心子集",
            			},
            		],
	            }, 
	            {
	              id:12,
            		level:"2",
            		deptName:"教务处",
	            },
	            {
	              id:13,
            		level:"2",
            		deptName:"审计处",
	            },
	            {
	              id:14,
            		level:"2",
            		deptName:"宣传部",
	            },
	            {
	              id:15,
            		level:"2",
            		deptName:"人事处",
	            },
	            {
	              id:16,
            		level:"2",
            		deptName:"资后处",
	            },
	            {
	              id:17,
            		level:"2",
            		deptName:"采购办",
	            },
	            {
	              id:18,
            		level:"2",
            		deptName:"科技处",
	            },
	            {
	              id:19,
            		level:"2",
            		deptName:"合作厂商",
	            },
	          ]
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
        deptData:{
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
      	this.deptData.dialog = true;
      	this.deptData.title = "新增子集";
      	this.deptData.id = '';
      },
      // 新增子集
      handleSonAdd(index,row){
      	this.deptData.dialog = true;
      	this.deptData.title = "新增子集";
      	this.deptData.id = row.id;
      },
		},
	}
</script>

<style>

</style>