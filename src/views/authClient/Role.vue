<template>
	<div class="user-container">
		<!-- 登录信息 -->
    <global-tips></global-tips>
    <!-- 角色管理 -->
    <el-card class="mt-3">
      <data-tables-server :data="tableData" layout="tool, table" :current-page="currentPage" :page-size="pageSize" :pagination-props="{ background: true, pageSizes: [15,30,45,60], total: total }" @query-change="loadData" :filters="filters" :table-props="tableProps">
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
        <el-table-column prop="id" label="序号" width="50" type="id"></el-table-column>
        <el-table-column prop="name" label="角色名称"></el-table-column>
        <el-table-column prop="check_name" label="审核人员"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column prop="createtime" label="创建时间"></el-table-column>
        <el-table-column prop="updatetime" label="编辑时间"></el-table-column>
        <el-table-column fixed="right" label="操作" >
          <template slot-scope="scope">
            <template v-if="scope.row.id == 1 || scope.row.id == 2">
              <span v-for="(action,index) in actions1" :key="index" @click="fun(scope.$index,scope.row,action.sign)" class="text-primary cursor-pointer mr-3">{{action.title}}</span>
            </template>
            <template v-else>
              <template v-if="scope.row.pid == 0">
                <!-- 一级 -->
                <template v-if="scope.row.id == 4 || scope.row.id == 5">
                  <span v-for="(action,index) in actions2" :key="index" @click="fun(scope.$index,scope.row,action.sign)" class="text-primary cursor-pointer mr-3">{{action.title}}</span>
                </template>
                <template v-else>
                  <span v-for="(action,index) in $store.getters.getmoreAction" :key="index" @click="fun(scope.$index,scope.row,action.sign)" class="text-primary cursor-pointer mr-3">{{action.title}}</span>
                </template>
              </template>
              <!-- 二级 -->
              <template v-else>
                <template v-if="scope.row.id == 16 || scope.row.id == 25">
                  <span v-for="(action,index) in actions2" :key="index" @click="fun(scope.$index,scope.row,action.sign)" class="text-primary cursor-pointer mr-3">{{action.title}}</span>
                </template>
                <template v-else>
                  <span v-for="(action,index) in actions4" :key="index" @click="fun(scope.$index,scope.row,action.sign)" class="text-primary cursor-pointer mr-3">{{action.title}}</span>
                </template>
              </template>
            </template>
          </template>
        </el-table-column>
      </data-tables-server>
    </el-card>
    <role-edit :roleData="roleData"></role-edit>
    <role-authperson :rolePersonData="rolePersonData"></role-authperson>
	</div>
</template>

<script>
	import GlobalTips from "@/components/GlobalTips";
  import RoleEdit from "./RoleEdit";
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
      RoleEdit,
      RoleAuthperson
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
          pid:"",
          roleName:"",
        },
        actions1:[],
        actions2:[],
        actions3:[],
        actions4:[],
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
            var actions_1 = new Array,actions_2 = new Array,actions_3 = new Array;
            this.$store.getters.getmoreAction.map((item,index)=>{
              if(item.sign == 2){ // 编辑
                actions_1.push(item);
              }else if (item.sign == 3){ // 删除
                actions_2.push(item);
              }else if (item.sign == 9){ // 添加角色
                actions_3.push(item);
              }
            })
            this.actions1 = [...actions_1];
            this.actions2 = [...actions_2];
            this.actions4 = [...actions_1,...actions_2];
            
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
          if(row.pid == 0){
            this.editRole(index,row);
          }else{
            this.authPerson(index,row);
          }
        }else if(sign == 3){ // 删除
          this.handleDel(index,row);
        }else if(sign == 9){ // 添加角色
          this.authPerson(index,row);
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

      // 添加角色
      authPerson(index,row){
        this.rolePersonData.dialog = true;
        this.rolePersonData.title = "添加角色";
        this.rolePersonData.id = row.id;
        this.rolePersonData.pid = row.pid;
        this.rolePersonData.roleName = row.name;
      },
		},
	}
</script>

<style>

</style>