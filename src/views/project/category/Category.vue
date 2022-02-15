<template>
	<div class="user-container">
		<!-- 登录信息 -->
    <global-tips></global-tips>
    <!-- 项目类别列表 -->
    <el-card class="mt-3">
      <data-tables-server :data="tableData" layout="tool, table,pagination" :current-page="currentPage" :page-size="pageSize" :pagination-props="{ background: true, pageSizes: [15,30,45,60], total: total }" @query-change="loadData" :filters="filters" :table-props="tableProps">
        <div class="mb-3" slot="tool">
          <h4 class="fs_18 font-weight-semibold m-0 text-000 mb-3">项目类别</h4>
          <div class="d-flex align-items-center">
          	<div class="mr-auto d-flex align-items-center">
          		<el-input
    				    placeholder="类别名称、创建人、编辑人"
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
        <el-table-column prop="type_sn" label="项目类别编号" width="180"></el-table-column>
        <el-table-column prop="name" label="类别名称" width="200"></el-table-column>
        <el-table-column prop="is_show" label="使用状态" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.is_show == 1"><i class="dot bg-success mr-1"></i>正常</span>
            <span v-else><i class="dot bg-danger mr-1"></i>禁用</span>
          </template>
        </el-table-column>
        <el-table-column prop="current_fund" label="本年预算金额" width="120"></el-table-column>
        <el-table-column prop="all_fund" label="总预算金额" width="120"></el-table-column>
        <el-table-column prop="aname" label="创建人" width="120"></el-table-column>
        <el-table-column prop="hoster_name" label="承办人" width="120"></el-table-column>
        <el-table-column prop="aename" label="最新编辑人" width="120"></el-table-column>
        <el-table-column prop="createtime" label="创建时间" width="150"></el-table-column>
        <el-table-column prop="updatetime" label="更新时间" width="150"></el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="350">
          <template slot-scope="scope">
            <span v-for="(action,index) in $store.getters.getmoreAction" :key="index" @click="fun(scope.$index,scope.row,action.sign)" class="text-primary cursor-pointer mr-2">{{action.title}}</span>
          </template>
        </el-table-column>
      </data-tables-server>
    </el-card>
    <category-edit :categoryData="categoryData"></category-edit>
    <addfund-dialog :fundData="fundData"></addfund-dialog>
    <fund-list :fundListData="fundListData"></fund-list>
    <use-details :detailsData="detailsData"></use-details>
	</div>
</template>

<script>
	import GlobalTips from "@/components/GlobalTips";
	import CategoryEdit from "./CategoryEdit";
  import AddfundDialog from "./AddfundDialog";
  import FundList from "./FundList";
  import UseDetails from "./UseDetails";

	export default {
		name: 'Category',
		provide() {
      return {
        loadData: this.loadData
      }
    },
		components: {
			GlobalTips,
			CategoryEdit,
      AddfundDialog,
      FundList,
      UseDetails,
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
        categoryData:{
        	dialog:false,
        	title:"",
        	id:"",
          isEdit:false,
        },
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
        this.$api.p_categoryList({
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

      // 新增项目类别
      handleAdd(){
      	this.categoryData.dialog = true;
      	this.categoryData.title = "新增项目类别";
      	this.categoryData.id = '';
        this.categoryData.isEdit = false;
      },

      // 操作们
      fun(index,row,sign){
        if(sign == 2){ // 编辑
          this.editCate(index,row);
        }else if(sign == 3){ // 删除
          this.handleDel(index,row);
        }else if(sign == 6){ // 验收配置
          this.config(index,row);
        }else if(sign == 7.1){ // 添加预算
          this.handleFund(index,row);
        }else if(sign == 7.2){ // 预算列表
          this.goFundList(index,row);
        }else if(sign == 7.3){ // 经费明细
          this.goDetails(index,row);
        }
      },

      // 验收配置
      config(index,row){
        this.$router.push({
          path:"/project/category/accept",
          query:{
            id:row.id
          }
        });
      },

      // 编辑项目类别
      editCate(index,row){
        this.categoryData.dialog = true;
        this.categoryData.title = '编辑项目类别';
        this.categoryData.id = row.id;
        this.categoryData.isEdit = true;
      },

      // 删除
      handleDel(index,row){
        this.$confirm("此操作将永久删除该项目类别, 是否继续?", "提示", {
          type: 'warning'
        }).then(() => {
          this.$api.p_categoryDel({
            id:row.id
          }).then(data=>{ 
             if(data.code == 0){
                this.$message({
                  message: "删除项目类别成功!",
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

      // 添加预算
      handleFund(index,row){
      	this.fundData.dialog = true;
      	this.fundData.title = "添加预算";
      	this.fundData.id = row.id;
        this.fundData.deptName = row.name;
      },
      // 预算列表
      goFundList(index,row){
        this.fundListData.dialog = true;
      	this.fundListData.title = row.name+" — 预算列表";
      	this.fundListData.id = row.id;
      },
      // 经费明细
      goDetails(index,row){
        this.detailsData.dialog = true;
      	this.detailsData.title = row.name+" — 使用明细";
      	this.detailsData.id = row.id;
      },

		},
	}
</script>

<style>

</style>