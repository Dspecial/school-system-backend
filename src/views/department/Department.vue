<template>
	<div class="dept-container">
		<!-- 登录信息 -->
    <global-tips></global-tips>
    <!-- 部门列表 -->
    <el-card class="mt-3">
      <data-tables-server :data="tableData" layout="tool, table, pagination" :current-page="currentPage" :page-size="pageSize" :pagination-props="{ background: true, pageSizes: [15,30,45,60], total: total }" @query-change="loadData" :filters="filters" :table-props="tableProps">
        <div class="mb-3" slot="tool">
          <h4 class="fs_18 font-weight-semibold m-0 text-000 mb-3">部门列表</h4>
          <div class="d-flex align-items-center">
          	<div class="mr-auto d-flex align-items-center">
          		<el-input
    				    placeholder="请输入部门名称、部门编号"
    				    prefix-icon="el-icon-search"
    				    v-model="filters[0].value"
                clearable>
    				  </el-input>
          	</div>
          </div>
        </div>
        <el-table-column type="index" :index="indexMethod" label="序号" width="50"></el-table-column>
        <el-table-column prop="name" label="部门名称"></el-table-column>
        <el-table-column prop="alias_name" label="简称"></el-table-column>
        <el-table-column prop="code" label="编号"></el-table-column>
        <el-table-column prop="createtime" label="创建时间" width="250"></el-table-column>
        <el-table-column prop="updatetime" label="更新时间" width="250"></el-table-column>
        <el-table-column fixed="right" label="操作" width="250" align="center" v-if="$store.getters.getmoreAction.length>0">
          <template slot-scope="scope">
            <span v-for="(action,index) in $store.getters.getmoreAction" :key="index" @click="fun(scope.$index,scope.row,action.sign)" class="text-primary cursor-pointer mr-3">{{action.title}}</span>
          </template>
        </el-table-column>
      </data-tables-server>
    </el-card>
    <addfund-dialog :fundData="fundData"></addfund-dialog>
    <fund-list :fundListData="fundListData"></fund-list>
    <use-details :detailsData="detailsData"></use-details>
	</div>
</template>

<script>
	import GlobalTips from "@/components/GlobalTips";
	import AddfundDialog from "./AddfundDialog";
  import FundList from "./FundList";
  import UseDetails from "./UseDetails";

	export default {
		name: 'Department',
		provide() {
      return {
        loadData: this.loadData
      }
    },
		components: {
			GlobalTips,
			AddfundDialog,
      FundList,
      UseDetails
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
        fundData:{
        	dialog:false,
        	title:"",
        	id:"",
          deptName:"",
        },
        fundListData:{
          dialog:false,
        	title:"",
        	id:"",
        },
        detailsData:{
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
        this.$api.deptList({
          page:this.currentPage,
          limit:this.pageSize,
          keywords:this.filters[0].value,
        }).then(data =>{
          if(data.code == 0){
            this.total = data.data.total;
            this.tableData = data.data.data;
          }else{
            this.$message.error(data.msg);
          }
        });
      },
      // 操作们
      fun(index,row,sign){
        if(sign == 7.1){ // 添加预算
          this.handleFund(index,row);
        }else if(sign == 7.2){ // 预算列表
          this.goFundList(index,row);
        }else if(sign == 7.3){ // 经费明细
          this.goDetails(index,row);
        }
      },
      // 添加预算
      handleFund(index,row){
      	this.fundData.dialog = true;
      	this.fundData.title = "添加预算";
      	this.fundData.id = row.wid;
        this.fundData.deptName = row.name;
      },
      // 预算列表
      goFundList(index,row){
        this.fundListData.dialog = true;
      	this.fundListData.title = row.name+" — 预算列表";
      	this.fundListData.id = row.wid;
      },
      // 经费明细
      goDetails(index,row){
        this.detailsData.dialog = true;
      	this.detailsData.title = row.name+" — 使用明细";
      	this.detailsData.id = row.wid;
      },
		},
	}
</script>

<style>

</style>