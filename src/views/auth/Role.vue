<template>
	<div class="user-container">
		<!-- 登录信息 -->
    <global-tips></global-tips>
    <!-- 角色管理 -->
    <el-card class="mt-3">
      <data-tables-server :data="tableData" layout="tool, table,pagination" :total="total" :current-page="currentPage":page-size="pageSize" :pagination-props="{ background: true, pageSizes: [15,30,45,60] }" @query-change="loadData" :filters="filters" :table-props="tableProps">
        <div class="mb-3" slot="tool">
          <h4 class="fs_16 font-weight-semibold m-0 text-000 mb-3">角色管理</h4>
          <div class="d-flex align-items-center">
          	<div class="mr-auto d-flex align-items-center">
          		<el-input
    				    placeholder="请输入角色名"
    				    prefix-icon="el-icon-search"
    				    v-model="filters[0].value">
    				  </el-input>
              <el-button type="primary" class="ml-3">查询</el-button>
          	</div>
            <div class="ml-auto">
              <el-button type="primary" @click="handleAdd()"><i class="el-icon-plus el-icon--left"></i>新增角色</el-button>
            </div>
          </div>
        </div>
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" :index="indexMethod" label="序号" width="50"></el-table-column>
        <el-table-column prop="roleName" label="角色名称"></el-table-column>
        <el-table-column prop="status" label="状态">
        	<template slot-scope="scope">
	        	<el-switch
						  v-model="scope.row.status"
						  active-value="1"
						  inactive-value="0"
						  active-color="#005DDA"
						  inactive-color="#969191">
						</el-switch>
        	</template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
          	<span class="text-primary cursor-pointer" @click="authSetting()">权限配置</span>
            <span class="text-primary cursor-pointer ml-3" @click="authPerson()">人员配置</span>
            <span class="text-primary cursor-pointer ml-3">修改</span>
            <span class="text-primary cursor-pointer ml-3">删除</span>
          </template>
        </el-table-column>
      </data-tables-server>
    </el-card>
    <role-authsetting :roleData="roleData"></role-authsetting>
    <role-authperson :rolePersonData="rolePersonData"></role-authperson>
	</div>
</template>

<script>
	import GlobalTips from "@/components/GlobalTips";
	import RoleAuthsetting from "./RoleAuthsetting";
  import RoleAuthperson from "./RoleAuthperson";

	export default {
		name: 'Role',
		provide() {
      return {
        loadData: this.loadData
      }
    },
		components: {
			GlobalTips,
			RoleAuthsetting,
      RoleAuthperson,
		},
		data () {
			return {
				tableProps: {
          'max-height': 670,
        },
        tableData: [
        	{
        		roleName:"超级管理员",
        		status:"1",
        	},
        	{
        		roleName:"厂商用户",
        		status:"1",
        	},
        	{
        		roleName:"部门负责人",
        		status:"0",
        	},
        	{
        		roleName:"部门人员",
        		status:"0",
        	}
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
        roleData:{
        	dialog:false,
        	title:"",
        	id:"",
        },
        rolePersonData:{
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
      	this.roleData.dialog = true;
      	this.roleData.title = "新增用户";
      	this.roleData.id = '';
      },
      // 权限配置
      authSetting(){
      	this.roleData.dialog = true;
      	this.roleData.title = "权限配置";
      	this.roleData.id = '';
      },
      // 人员配置
      authPerson(){
        this.rolePersonData.dialog = true;
        this.rolePersonData.title = "人员配置";
        this.rolePersonData.id = '';
      },
		},
	}
</script>

<style>

</style>