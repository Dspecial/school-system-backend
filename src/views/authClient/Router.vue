<template>
	<div class="user-container">
		<!-- 登录信息 -->
    <global-tips></global-tips>
    <!-- 路由管理 -->
    <el-card class="mt-3">
      <data-tables-server :data="tableData" layout="tool, table" :current-page="currentPage" :page-size="pageSize" :pagination-props="{ background: true, pageSizes: [15,30,45,60], total: total }" @query-change="loadData" :filters="filters" :table-props="tableProps" :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <div class="mb-3" slot="tool">
          <h4 class="fs_18 font-weight-semibold m-0 text-000 mb-3">路由管理</h4>
          <div class="d-flex align-items-center">
          	<div class="mr-auto d-flex align-items-center">
          		<!-- <el-input
    				    placeholder="请输入菜单名称"
    				    prefix-icon="el-icon-search"
    				    v-model="filters[0].value"
                clearable>
    				  </el-input> -->
          	</div>
            <div class="ml-auto">
              <el-button type="primary" @click="handleAdd()" v-if="$store.getters.getaddAction.title" ><i class="el-icon-plus el-icon--left"></i>{{$store.getters.getaddAction.title}}顶级路由</el-button>
            </div>
          </div>
        </div>
        <el-table-column type="index" :index="indexMethod" label="序号" width="50"></el-table-column>
        <el-table-column prop="title" label="菜单名称"></el-table-column>
        <el-table-column prop="name" label="路由" width="200"></el-table-column>
        <el-table-column prop="path" label="路径" width="200"></el-table-column>
        <el-table-column prop="icon" label="图标">
        	<template slot-scope="scope">
	        	<i :class="scope.row.icon"></i>
        	</template>
        </el-table-column>
        <el-table-column prop="sort" label="排序"></el-table-column>
        <el-table-column prop="createtime" label="创建时间"></el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <span class="text-primary cursor-pointer mr-3" @click="handleAddSub(scope.$index,scope.row)">新增子级</span>
            <span v-for="(action,index) in $store.getters.getmoreAction" :key="index" @click="fun(scope.$index,scope.row,action.sign)" class="text-primary cursor-pointer mr-3">{{action.title}}</span>
          </template>
        </el-table-column>
      </data-tables-server>
    </el-card>
    <router-edit :routerData="routerData"></router-edit>
	</div>
</template>

<script>
	import GlobalTips from "@/components/GlobalTips";
  import RouterEdit from "./RouterEdit";

	export default {
		name: 'Router',
		provide() {
      return {
        loadData: this.loadData
      }
    },
		components: {
			GlobalTips,
      RouterEdit
		},
		data () {
			return {
        isShow:false,
				tableProps: {
          'default-expand-all':false,
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
        routerData:{
        	dialog:false,
        	title:"",
        	id:"",
          pid:"",
          isEdit:false,
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
        this.$api.c_routerList({
        }).then(data =>{
        	if(data.code == 0){
        		this.tableData = data.data;
        	}else{
        		this.$message.error(data.msg);
        	}
        })
      },

      // 操作们
      fun(index,row,sign){
        if(sign == 2){ // 编辑
          this.editRouter(index,row);
        }else if(sign == 3){ // 删除
          this.handleDel(index,row);
        }
      },

      // 编辑
      editRouter(index,row){
        this.routerData.dialog = true;
        this.routerData.title = '编辑路由';
        this.routerData.pid = row.pid;
        this.routerData.id = row.id;
        this.routerData.isEdit = true;
      },

      // 新增顶级路由
      handleAdd(){
        this.routerData.dialog = true;
        this.routerData.title = '新增顶级路由';
        this.routerData.pid = 0;
        this.routerData.isEdit = false;
      },

      // 新增子级路由
      handleAddSub(index,row){
        this.routerData.dialog = true;
        this.routerData.title = '新增子级路由';
        this.routerData.pid = row.id;
        this.routerData.isEdit = false;
      },

      // 删除
      handleDel(index,row){
        this.$confirm("此操作将永久删除该路由, 是否继续?", "提示", {
          type: 'warning'
        }).then(() => {
          // this.$api.c_routerDel({// 没有接口

          // }).then(data=>{ 
          //    if(data.code == 0){
          //       this.$message({
          //         message: "删除路由成功!",
          //         type: 'success'
          //       });
          //       this.loadData();
          //    }else{
          //      this.$message.error(data.msg);
          //    }
          // })
        }).catch(() => {

        });
      },
		},
	}
</script>

<style>

</style>