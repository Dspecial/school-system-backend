<template>
	<div class="user-container">
		<!-- 登录信息 -->
    <global-tips></global-tips>
    <!-- 厂商管理 -->
    <el-card class="mt-3">
      <data-tables-server :data="tableData" layout="tool, table,pagination" :current-page="currentPage":page-size="pageSize" :pagination-props="{ background: true, pageSizes: [15,30,45,60], total: total }" @query-change="loadData" :filters="filters" :table-props="tableProps">
        <div class="mb-3" slot="tool">
          <h4 class="fs_16 font-weight-semibold m-0 text-000 mb-3">厂商管理</h4>
          <div class="d-flex align-items-center">
          	<div class="mr-auto d-flex align-items-center">
              <el-input
                class="w-40"
                placeholder="公司名称/负责人姓名"
                prefix-icon="el-icon-search"
                v-model="filters[0].value">
              </el-input>
              <el-date-picker
                class="ml-3 w-40"
                v-model="filters[1].value"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                type="daterange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                placeholder="选择上次登录时间">
              </el-date-picker>
            </div>
            <div class="ml-auto">
              <el-button type="primary" @click="handleAdd()"><i class="el-icon-plus el-icon--left"></i>新增厂商</el-button>
            </div>
          </div>
        </div>
        <el-table-column type="index" :index="indexMethod" label="序号" width="50"></el-table-column>
        <el-table-column prop="job_number" label="公司名称"></el-table-column>
        <el-table-column prop="sys_id" label="营业执照编码"></el-table-column>
        <el-table-column prop="name" label="负责人姓名"></el-table-column>
        <el-table-column prop="sex" label="性别">
          <template slot-scope="scope">
            <span v-if="scope.row.sex == 1">男</span>
            <span v-if="scope.row.sex == 2">女</span>
          </template>
        </el-table-column>
        <el-table-column prop="is_normal" label="状态">
        	<template slot-scope="scope">
	        	<el-switch
						  v-model="scope.row.is_normal"
						  active-value="0"
						  inactive-value="1"
						  active-color="#52C418"
						  inactive-color="#969191">
						</el-switch>
        	</template>
        </el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="rulename" label="角色"></el-table-column>
        <el-table-column fixed="right" label="操作" width="250" align="center">
          <template slot-scope="scope">
            <span class="text-primary cursor-pointer" @click="editUser(scope.$index,scope.row)">编辑</span>
            <span class="text-primary cursor-pointer ml-3" @click="handleDel(scope.$index,scope.row)">删除</span>
          </template>
        </el-table-column>
      </data-tables-server>
    </el-card>
    <mfuser-edit :mfuserData="mfuserData"></mfuser-edit>
	</div>
</template>

<script>
	import GlobalTips from "@/components/GlobalTips";
	import MfuserEdit from "./MfuserEdit";

	export default {
		name: 'ManufacturerUser',
		provide() {
      return {
        loadData: this.loadData
      }
    },
		components: {
			GlobalTips,
			MfuserEdit,
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
	        },
          {
            value: '',
            prop: 'date'
          }
        ],
        total: 0, //总条数
        currentPage: 1, //当前页
        pageSize: 15, //每页显示条数
        mfuserData:{
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
        var timeRange = this.filters[1].value;
        if(timeRange){
          var lastlogintime = timeRange.join("~");
        }else{
          lastlogintime = '';
        }
        this.$api.companyList({
          page:this.currentPage,
          limit:this.pageSize,
          keywords:this.filters[0].value,
          lastlogintime:lastlogintime,
        }).then(data =>{
          if(data.code == 0){
            this.total = data.count;
            this.tableData = data.data;
          }else{
            this.$message.error(data.msg);
          }
        });
      },
      // 新增厂商用户
      handleAdd(){
        this.mfuserData.dialog = true;
        this.mfuserData.title = "新增厂商用户";
        this.mfuserData.id = '';
        this.mfuserData.isEdit = false;
      },

      // 编辑厂商用户
      editUser(index,row){
        this.mfuserData.dialog = true;
        this.mfuserData.title = "编辑厂商用户";
        this.mfuserData.id = row.id;
        this.mfuserData.isEdit = true;
      },

      // 删除
      handleDel(index,row){
        this.$confirm("此操作将永久删除该厂商用户, 是否继续?", "提示", {
          type: 'warning'
        }).then(() => {
          this.$api.companyDel({// 接口不对
            id:row.id,
          }).then(data=>{ 
             if(data.code == 0){
                this.$message({
                  message: "删除厂商用户成功!",
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