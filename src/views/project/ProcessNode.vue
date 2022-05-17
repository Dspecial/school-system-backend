<template>
	<div class="user-container">
		<!-- 登录信息 -->
    <global-tips></global-tips>
    <!-- 流程节点管理列表 -->
    <el-card class="mt-3">
      <data-tables-server :data="tableData" layout="tool, table" :current-page="currentPage" :page-size="pageSize" :pagination-props="{ background: true, pageSizes: [15,30,45,60], total: total }" @query-change="loadData" :filters="filters" :table-props="tableProps">
        <div class="mb-3" slot="tool">
          <h4 class="fs_18 font-weight-semibold m-0 text-000 mb-3">流程节点管理</h4>
        </div>
        <el-table-column type="index" :index="indexMethod" label="序号" width="50"></el-table-column>
        <el-table-column prop="name" label="节点名称"></el-table-column>
        <el-table-column prop="can_apply_resource" label="允许申请资源">
          <template slot-scope="scope">
            <span v-if="scope.row.can_apply_resource == 1"><i class="dot bg-danger mr-1"></i>否</span>
            <span v-else><i class="dot bg-success mr-1"></i>是</span>
          </template>
        </el-table-column>
        <el-table-column prop="form_info" label="参数"></el-table-column>
        <el-table-column prop="desc" label="备注"></el-table-column>
        <el-table-column prop="updatetime" label="更新时间" width="150"></el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <span v-for="(action,index) in $store.getters.getmoreAction" :key="index" @click="fun(scope.$index,scope.row,action.sign)" class="text-primary cursor-pointer mr-3">{{action.title}}</span>
          </template>
        </el-table-column>
      </data-tables-server>
    </el-card>
    <processNode-edit :nodeData="nodeData"></processNode-edit>
	</div>
</template>

<script>
	import GlobalTips from "@/components/GlobalTips";
	import ProcessNodeEdit from "./ProcessNodeEdit";

	export default {
		name: 'ProcessNode',
		provide() {
      return {
        loadData: this.loadData
      }
    },
		components: {
			GlobalTips,
			ProcessNodeEdit
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
        nodeData:{
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
        this.$api.p_processNode({
          page:this.currentPage,
          limit:this.pageSize,
          keywords:this.filters[0].value,
        }).then(data=>{
          if(data.code == 0){
            this.total = data.data.total;
            this.tableData = data.data;
          }else{
            this.$message.error(data.msg);
          }
        });
      },

      // 操作们
      fun(index,row,sign){
        if(sign == 2){ // 编辑
          this.editNode(index,row);
        }else if(sign == 3){ // 删除
          this.handleDel(index,row);
        }
      },

      // 编辑审核流程
      editNode(index,row){
        this.nodeData.dialog = true;
        this.nodeData.title = '编辑流程节点';
        this.nodeData.id = row.id;
      },

      // 删除
      handleDel(index,row){
        this.$confirm("此操作将永久删除该流程节点, 是否继续?", "提示", {
          type: 'warning'
        }).then(() => {
          this.$api.p_flowDel({
            id:row.id
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

		},
	}
</script>

<style>

</style>