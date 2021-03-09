<template>
	<div class="user-container">
		<!-- 登录信息 -->
    <global-tips></global-tips>
    <!-- 角色管理 -->
    <el-card class="mt-3">
      <data-tables-server :data="tableData" layout="tool, table" :current-page="currentPage":page-size="pageSize" :pagination-props="{ background: true, pageSizes: [15,30,45,60], total: total }" @query-change="loadData" :filters="filters" :table-props="tableProps">
        <div class="mb-3" slot="tool">
          <h4 class="fs_16 font-weight-semibold m-0 text-000 mb-3">角色管理</h4>
          <div class="d-flex align-items-center">
          	<div class="mr-auto d-flex align-items-center">
          		<el-input
    				    placeholder="请输入角色名"
    				    prefix-icon="el-icon-search"
    				    v-model="filters[0].value">
    				  </el-input>
          	</div>
            <div class="ml-auto">
              <el-button type="primary" @click="handleAdd()"><i class="el-icon-plus el-icon--left"></i>新增角色</el-button>
            </div>
          </div>
        </div>
        <el-table-column type="index" :index="indexMethod" label="序号" width="50"></el-table-column>
        <el-table-column prop="name" label="角色名称"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column prop="createtime" label="创建时间"></el-table-column>
        <el-table-column prop="updatetime" label="编辑时间"></el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <span class="text-primary cursor-pointer ml-3" @click="editRole(scope.$index,scope.row)">编辑</span>
            <span class="text-primary cursor-pointer ml-3" @click="handleDel(scope.$index,scope.row)">删除</span>
          </template>
        </el-table-column>
      </data-tables-server>
    </el-card>
    <role-edit :roleData="roleData"></role-edit>
	</div>
</template>

<script>
	import GlobalTips from "@/components/GlobalTips";
  import RoleEdit from "./RoleEdit";

	export default {
		name: 'Role',
		provide() {
      return {
        loadData: this.loadData
      }
    },
		components: {
			GlobalTips,
      RoleEdit,
		},
		data () {
			return {
				tableProps: {
          'default-expand-all':true,
          'row-key':"id",
          'tree-props':{
            'children': 'children', 
            'hasChildren': 'hasChildren'
          }
        },
        tableData: [],
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
          isEdit:false,
        },
        rolePersonData:{
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
        this.$api.c_roleList({
        }).then(data =>{
          if(data.code == 0){
            this.tableData = data.data;
          }else{
            this.$message.error(data.msg);
          }
        });
      },

      // 新增角色
      handleAdd(){
      	this.roleData.dialog = true;
      	this.roleData.title = "新增角色";
      	this.roleData.id = '';
        this.roleData.isEdit = false;
      },

      // 编辑角色
      editRole(index,row){
        this.roleData.dialog = true;
        this.roleData.title = "编辑角色";
        this.roleData.id = row.id;
        this.roleData.isEdit = true;
      },

      // 删除
      handleDel(index,row){
        this.$confirm("此操作将永久删除该角色, 是否继续?", "提示", {
          type: 'warning'
        }).then(() => {
          this.$api.c_roleDel({
            id:row.id
          }).then(data=>{ 
             if(data.code == 0){
                this.$message({
                  message: "删除角色成功!",
                  type: 'success'
                });
                this.loadData();
             }else{
               this.$message.error(data.msg);
             }
          })
        }).catch(() => {

        });
      },
		},
	}
</script>

<style>

</style>