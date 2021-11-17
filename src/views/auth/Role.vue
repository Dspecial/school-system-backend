<template>
	<div class="user-container">
		<!-- 登录信息 -->
    <global-tips></global-tips>
    <!-- 角色管理 -->
    <el-card class="mt-3">
      <data-tables-server :data="tableData" layout="tool, table" :current-page="currentPage":page-size="pageSize" :pagination-props="{ background: true, pageSizes: [15,30,45,60], total: total }" @query-change="loadData" :filters="filters" :table-props="tableProps">
        <div class="mb-3" slot="tool">
          <h4 class="fs_18 font-weight-semibold m-0 text-000 mb-3">角色管理</h4>
          <div class="d-flex align-items-center">
          	<div class="mr-auto d-flex align-items-center">
          		<el-input
    				    placeholder="请输入角色名"
    				    prefix-icon="el-icon-search"
    				    v-model="filters[0].value"
                clearable>
    				  </el-input>
          	</div>
            <div class="ml-auto">
              <el-button type="primary" @click="handleAdd()" v-if="$store.getters.getaddAction.title" ><i class="el-icon-plus el-icon--left"></i>{{$store.getters.getaddAction.title}}</el-button>
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
            <template v-if="scope.row.id != 1">
              <!-- <span class="text-primary cursor-pointer mr-3" @click="authPerson()">人员配置</span> -->
              <span v-for="(action,index) in $store.getters.getmoreAction" :key="index" @click="fun(scope.$index,scope.row,action.sign)" class="text-primary cursor-pointer mr-3">{{action.title}}</span>
            </template>
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
        this.$api.roleList({
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

      // 操作们
      fun(index,row,sign){
        if(sign == 2){ // 编辑
          this.editRole(index,row);
        }else if(sign == 3){ // 删除
          this.handleDel(index,row);
        }
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
          this.$api.roleDel({ 
            id:row.id,
          }).then(data=>{ 
             if(data.code == 0){
                this.$message({
                  message: data.msg,
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