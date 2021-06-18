<template>
	<div class="user-container">
		<!-- 登录信息 -->
    <global-tips></global-tips>
    <!-- 项目列表 -->
    <el-card class="mt-3">
      <data-tables-server :data="tableData" layout="tool, table,pagination" :current-page="currentPage" :page-size="pageSize" :pagination-props="{ background: true, pageSizes: [15,30,45,60], total: total }" @query-change="loadData" :filters="filters" :table-props="tableProps">
        <div class="mb-3" slot="tool">
          <h4 class="fs_16 font-weight-semibold m-0 text-000 mb-3">项目列表</h4>
          <div class="d-flex align-items-center project_search_div">
          	<div class="d-flex align-items-center">
          		<el-input
    				    placeholder="请输入项目编号/项目名称/公司名称"
    				    prefix-icon="el-icon-search"
    				    v-model="filters[0].value"
                clearable
                class="mr-3">
    				  </el-input>
              <el-date-picker
                placeholder="请选择项目年份"
                v-model="filters[1].value"
                type="year"
                class="mr-3"
                value-format="yyyy">
              </el-date-picker>
              <el-date-picker
                v-model="filters[2].value"
                type="daterange"
                range-separator="至"
                start-placeholder="创建时间"
                end-placeholder="创建时间"
                align="right"
                value-format="yyyy-MM-dd">
              </el-date-picker>
          	</div>
            <div class="ml-auto">
              <el-button type="primary" @click="handleAdd()" v-if="$store.getters.getaddAction.title" ><i class="el-icon-plus el-icon--left"></i>{{$store.getters.getaddAction.title}}</el-button>
            </div>
          </div>
        </div>
        <el-table-column type="index" :index="indexMethod" label="序号" width="50"></el-table-column>
        <el-table-column prop="apply_number" label="项目编号" width="220"></el-table-column>
        <el-table-column prop="cname" label="项目类别" width="200"></el-table-column>
        <el-table-column prop="p_name" label="项目名称" width="200"></el-table-column>
        <el-table-column prop="projecttime" label="年份"></el-table-column>
        <el-table-column prop="job_number" label="所属公司" width="220"></el-table-column>
        <el-table-column prop="name" label="申请人姓名"></el-table-column>
        <el-table-column prop="depart_name" label="申请人部门"></el-table-column>
        <el-table-column prop="createtime" label="创建时间" width="150"></el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="250">
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
	          prop: 'keywords'
	        },
          {
	          value: '',
	          prop: 'projecttime'
	        },
          {
	          value: '',
	          prop: 'createtime'
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
        this.$api.p_projectList({
          page:this.currentPage,
          limit:this.pageSize,
          keywords:this.filters[0].value,
          projecttime:this.filters[1].value,
          createtime:this.filters[2].value?this.filters[2].value.join(" - "):'',
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
        if(sign == '2'){ // 编辑
          this.editCate(index,row);
        }else if(sign == '3'){ // 删除
          this.handleDel(index,row);
        }else if(sign == '4'){ // 详情
          
        }else if(sign == '10'){ // 更改流程
          
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