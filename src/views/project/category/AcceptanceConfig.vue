<template>
	<div class="user-container">
		<!-- 登录信息 -->
    <global-tips></global-tips>
    <Breadcrumb></Breadcrumb>
    <!-- 验收配置列表 -->
    <el-card class="mt-3">
      <data-tables-server :data="tableData" layout="tool, table,pagination" :current-page="currentPage" :page-size="pageSize" :pagination-props="{ background: true, pageSizes: [15,30,45,60], total: total }" @query-change="loadData" :filters="filters" :table-props="tableProps">
        <div class="mb-3" slot="tool">
          <h4 class="fs_18 font-weight-semibold m-0 text-000 mb-3">验收配置</h4>
          <div class="d-flex align-items-center">
            <div class="ml-auto">
              <el-button type="primary" @click="handleAdd()"><i class="el-icon-plus el-icon--left"></i>新增验收配置</el-button>
            </div>
          </div>
        </div>
        <el-table-column type="index" :index="indexMethod" label="序号" width="50"></el-table-column>
        <el-table-column prop="title" label="验收名称"></el-table-column>
        <el-table-column prop="group_name" label="分组名称"></el-table-column>
        <el-table-column prop="sort" label="排序" width="150"></el-table-column>
        <el-table-column prop="remark" label="备注" width="250"></el-table-column>
        <el-table-column fixed="right" label="操作"  width="150">
          <template slot-scope="scope">
            <span class="text-primary cursor-pointer ml-3" @click="editCate(scope.$index,scope.row)">编辑</span>
            <span class="text-primary cursor-pointer ml-3" @click="handleDel(scope.$index,scope.row)">删除</span>
          </template>
        </el-table-column>
      </data-tables-server>
    </el-card>
    <acceptanceconfig-edit :configData="configData"></acceptanceconfig-edit>
	</div>
</template>

<script>
	import GlobalTips from "@/components/GlobalTips";
  import Breadcrumb from "@/components/Breadcrumb";
  import AcceptanceconfigEdit from "./AcceptanceconfigEdit";

	export default {
		name: 'Category',
		provide() {
      return {
        loadData: this.loadData
      }
    },
		components: {
			GlobalTips,
      Breadcrumb,
      AcceptanceconfigEdit
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
        configData:{
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
        this.$api.p_accpetConfig({
          category_id:this.$route.query.id,
        }).then(data =>{
          if(data.code == 0){
            this.tableData = data.data;
          }else{
            this.$message.error(data.msg);
          }
        });
      },

      // 新增项目类别
      handleAdd(){
      	this.configData.dialog = true;
      	this.configData.title = "新增验收配置";
      	this.configData.id = '';
        this.configData.isEdit = false;
      },

      // 编辑项目类别
      editCate(index,row){
        this.configData.dialog = true;
        this.configData.title = '编辑验收配置';
        this.configData.id = row.id;
        this.configData.isEdit = true;
      },

      // 删除
      handleDel(index,row){
        this.$confirm("此操作将永久删除该验收配置, 是否继续?", "提示", {
          type: 'warning'
        }).then(() => {
          this.$api.p_accpetConfigDel({
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