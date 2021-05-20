<template>
	<div class="user-container">
		<!-- 登录信息 -->
    <global-tips></global-tips>
    <!-- 流程管理列表 -->
    <el-card class="mt-3">
      <data-tables-server :data="tableData" layout="tool, table,pagination" :current-page="currentPage":page-size="pageSize" :pagination-props="{ background: true, pageSizes: [15,30,45,60], total: total }" @query-change="loadData" :filters="filters" :table-props="tableProps">
        <div class="mb-3" slot="tool">
          <h4 class="fs_16 font-weight-semibold m-0 text-000 mb-3">流程管理</h4>
          <div class="d-flex align-items-center">
          	<div class="mr-auto d-flex align-items-center">
          		<el-input
    				    placeholder="流程名称、创建人、编辑人"
    				    prefix-icon="el-icon-search"
    				    v-model="filters[0].value">
    				  </el-input>
          	</div>
            <div class="ml-auto">
              <el-button type="primary" @click="handleAdd()" v-if="$store.getters.getaddAction.title" ><i class="el-icon-plus el-icon--left"></i>{{$store.getters.getaddAction.title}}</el-button>
            </div>
          </div>
        </div>
        <el-table-column type="index" :index="indexMethod" label="序号" width="50"></el-table-column>
        <el-table-column prop="name" label="流程名称"></el-table-column>
        <el-table-column prop="brief" label="简介"></el-table-column>
        <el-table-column prop="caname" label="类别名称"></el-table-column>
        <el-table-column prop="is_use" label="使用状态">
          <template slot-scope="scope">
            <span v-if="scope.row.is_use == 1"><i class="dot bg-warning mr-1"></i>待使用</span>
            <span v-else><i class="dot bg-primary mr-1"></i>使用中</span>
          </template>
        </el-table-column>
        <el-table-column prop="desc" label="项目节点" width="200">
          <template slot-scope="scope">
            <el-popover
              placement="top-start"
              title="项目节点"
              width="200"
              trigger="hover"
              :content="scope.row.check_process_text">
              <span class="text-truncate" slot="reference">{{scope.row.check_process_text}}</span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="desc" label="审核信息" width="200">
          <template slot-scope="scope">
            <el-popover
              placement="top-start"
              title="审核信息"
              width="200"
              trigger="hover"
              :content="scope.row.check_process_member">
              <span class="text-truncate" slot="reference">{{scope.row.check_process_member}}</span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="aname" label="创建人"></el-table-column>
        <el-table-column prop="aename" label="最新编辑人"></el-table-column>
        <el-table-column prop="createtime" label="创建时间" width="150"></el-table-column>
        <el-table-column prop="updatetime" label="更新时间" width="150"></el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <span v-for="(action,index) in $store.getters.getmoreAction" :key="index" @click="fun(scope.$index,scope.row,action.sign)" class="text-primary cursor-pointer mr-3">{{action.title}}</span>
          </template>
        </el-table-column>
      </data-tables-server>
    </el-card>
    <auditprocess-edit :processData="processData"></auditprocess-edit>
	</div>
</template>

<script>
	import GlobalTips from "@/components/GlobalTips";
	import AuditprocessEdit from "./AuditprocessEdit";

	export default {
		name: 'Category',
		provide() {
      return {
        loadData: this.loadData
      }
    },
		components: {
			GlobalTips,
			AuditprocessEdit
		},
		data () {
			return {
				tableProps: {
          'max-height': 670,
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
        processData:{
        	dialog:false,
        	title:"",
        	id:"",
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
        let _this = this;
        if (queryInfo != null) {
          this.currentPage = queryInfo.page;
          this.pageSize = queryInfo.pageSize;
        }
        this.$api.p_flowList({
          page:this.currentPage,
          limit:this.pageSize,
          keywords:this.filters[0].value,
        }).then(data=>{
          if(data.code == 0){
            this.total = data.data.total;
            this.tableData = data.data.data;
          }else{
            this.$message.error(data.msg);
          }
        });
      },

      // 新增审核流程
      handleAdd(){
      	this.processData.dialog = true;
      	this.processData.title = "新增审核流程";
      	this.processData.id = '';
        this.processData.isEdit = false;
      },

      // 操作们
      fun(index,row,sign){
        if(sign == 2){ // 编辑
          this.editCate(index,row);
        }else if(sign == 3){ // 删除
          this.handleDel(index,row);
        }
      },

      // 编辑审核流程
      editCate(index,row){
        this.processData.dialog = true;
        this.processData.title = '编辑审核流程';
        this.processData.id = row.id;
        this.processData.isEdit = true;
      },

      // 删除
      handleDel(index,row){
        this.$confirm("此操作将永久删除该审核流程, 是否继续?", "提示", {
          type: 'warning'
        }).then(() => {
          this.$api.p_flowDel({
            id:row.id
          }).then(data=>{ 
             if(data.code == 0){
                this.$message({
                  message: "删除审核流程成功!",
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