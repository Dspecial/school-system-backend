<template>
	<div class="dept-container">
		<!-- 登录信息 -->
    <global-tips></global-tips>
    <!-- 专家列表 -->
    <el-card class="mt-3">
      <data-tables-server :data="tableData" layout="tool, table, pagination" :current-page="currentPage":page-size="pageSize" :pagination-props="{ background: true, pageSizes: [15,30,45,60], total: total }" @query-change="loadData" :filters="filters" :table-props="tableProps">
        <div class="mb-3" slot="tool">
          <h4 class="fs_16 font-weight-semibold m-0 text-000 mb-3">专家列表</h4>
          <div class="d-flex align-items-center">
          	<div class="mr-auto d-flex align-items-center">
          		<el-input
    				    placeholder="请输入专家姓名、手机号、专业、擅长领域"
    				    prefix-icon="el-icon-search"
    				    v-model="filters[0].value">
    				  </el-input>
          	</div>
            <div class="ml-auto">
              <el-button type="primary" @click="handleAdd()"><i class="el-icon-plus el-icon--left"></i>新增专家</el-button>
            </div>
          </div>
        </div>
        <el-table-column type="index" :index="indexMethod" label="序号" width="50"></el-table-column>
        <el-table-column prop="e_name" label="专家姓名"></el-table-column>
        <el-table-column prop="e_phone" label="手机号"></el-table-column>
        <el-table-column prop="e_email" label="邮箱"></el-table-column>
        <el-table-column prop="sex" label="性别">
          <template slot-scope="scope">
            <span v-if="scope.row.e_sex == 1">男</span>
            <span v-if="scope.row.e_sex == 2">女</span>
          </template>
        </el-table-column>
        <el-table-column prop="subject" label="专业"></el-table-column>
        <el-table-column prop="label" label="擅长领域"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column prop="aname" label="创建人"></el-table-column>
        <el-table-column prop="aename" label="最新编辑人"></el-table-column>
        <el-table-column prop="createtime" label="创建时间" width="150"></el-table-column>
        <el-table-column prop="updatetime" label="更新时间" width="150"></el-table-column>
        <el-table-column fixed="right" label="操作" width="120" align="center">
          <template slot-scope="scope">
            <span class="text-primary cursor-pointer" @click="editExpert(scope.$index,scope.row)">编辑</span>
            <span class="text-primary cursor-pointer ml-3" @click="handleDel(scope.$index,scope.row)">删除</span>
          </template>
        </el-table-column>
      </data-tables-server>
    </el-card>
    <expert-edit :expertData="expertData"></expert-edit>
	</div>
</template>

<script>
	import GlobalTips from "@/components/GlobalTips";
	import ExpertEdit from "./ExpertEdit";

	export default {
		name: 'expert',
		provide() {
      return {
        loadData: this.loadData
      }
    },
		components: {
			GlobalTips,
			ExpertEdit,
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
        expertData:{
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
        this.$api.expertList({
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
      // 新增专家
      handleAdd(){
      	this.expertData.dialog = true;
      	this.expertData.title = "新增专家";
      	this.expertData.id = '';
        this.expertData.isEdit = false;
      },
      // 编辑专家
      editExpert(index,row){
        this.expertData.dialog = true;
        this.expertData.title = "编辑专家";
        this.expertData.id = row.id;
        this.expertData.isEdit = true;
      },

      // 删除
      handleDel(index,row){
        this.$confirm("此操作将永久删除该项目类别, 是否继续?", "提示", {
          type: 'warning'
        }).then(() => {
          // this.$api.expertDel({
          //   id:row.id
          // }).then(data=>{ 
          //    if(data.code == 0){
          //       this.$message({
          //         message: "删除项目类别成功!",
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