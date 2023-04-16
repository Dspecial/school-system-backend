<template>
	<div class="dept-container">
		<!-- 登录信息 -->
    <global-tips></global-tips>
    <!-- 系统日志 -->
    <el-card class="mt-3">
      <data-tables-server :data="tableData" layout="tool, table, pagination" :current-page="currentPage" :page-size="pageSize" :pagination-props="{ background: true, pageSizes: [15,30,45,60], total: total }" @query-change="loadData" :filters="filters" :table-props="tableProps">
        <div class="mb-3" slot="tool">
          <h4 class="fs_18 font-weight-semibold m-0 text-000 mb-3">日志列表</h4>
          <div class="d-flex align-items-center">
          	<div class="mr-auto d-flex align-items-center">
          		<el-input
    				    placeholder="请输入名称、内容"
    				    prefix-icon="el-icon-search"
    				    v-model="filters[0].value"
                clearable>
    				  </el-input>
              <el-select 
                v-model="filters[1].value" 
                placeholder="请选择类型" 
                clearable 
                class="ml-3">
                <el-option label="管理端" :value="1"></el-option>
                <el-option label="应用端" :value="2"></el-option>
              </el-select>
              <el-date-picker
                v-model="filters[2].value"
                type="daterange"
                range-separator="至"
                start-placeholder="创建时间"
                end-placeholder="创建时间"
                align="right"
                value-format="yyyy-MM-dd"
                clearable
                class="ml-3">
              </el-date-picker>
          	</div>
            <div class="ml-auto">
              <el-button type="primary" @click="handleAdd()" v-if="$store.getters.getaddAction.title" ><i class="el-icon-plus el-icon--left"></i>{{$store.getters.getaddAction.title}}</el-button>
            </div>
          </div>
        </div>
        <el-table-column type="index" :index="indexMethod" label="序号" width="50"></el-table-column>
        <el-table-column prop="router_name" label="名称" width="300"></el-table-column>
        <el-table-column prop="content" label="内容">
          <template slot-scope="scope">
            <el-popover
              placement="top-start"
              title="内容"
              width="200"
              trigger="hover"
              :content="scope.row.content">
              <span class="text-truncate" slot="reference">{{scope.row.content}}</span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="类型" width="200">
          <template slot-scope="scope">
            <span v-if="scope.row.type == 1"><i class="dot bg-success mr-1"></i>管理端</span>
            <span v-else-if="scope.row.type == 2"><i class="dot bg-primary mr-1"></i>应用端</span>
          </template>
        </el-table-column>
        <el-table-column prop="createtime" label="创建时间" width="200"></el-table-column>
      </data-tables-server>
    </el-card>
    <!-- <expert-edit :expertData="expertData"></expert-edit> -->
	</div>
</template>

<script>
	import GlobalTips from "@/components/GlobalTips";
	// import ExpertEdit from "./ExpertEdit";

	export default {
		name: 'SystemLog',
		provide() {
      return {
        loadData: this.loadData
      }
    },
		components: {
			GlobalTips,
			// ExpertEdit,
		},
		data () {
			return {
				tableProps: {
          
        },
        tableData: [],
        filters: [
	        {
	          value: '',
	          prop: 'keywords'
	        },
          {
	          value: '',
	          prop: 'type'
	        },
          {
	          value: '',
	          prop: 'createtime'
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
        this.$api.systemLog({
          page:this.currentPage,
          limit:this.pageSize,
          keywords:this.filters[0].value,
          type:this.filters[1].value,
          createtime:this.filters[2].value?this.filters[2].value.join(" - "):'',
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

      // 操作们
      fun(index,row,sign){
        if(sign == 2){ // 编辑
          this.editExpert(index,row);
        }else if(sign == 3){ // 删除
          this.handleDel(index,row);
        }
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