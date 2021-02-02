<template>
	<div class="user-container">
		<!-- 登录信息 -->
    <global-tips></global-tips>
    <!-- 供应商管理 -->
    <el-card class="mt-3">
      <data-tables-server :data="tableData" layout="tool, table,pagination" :current-page="currentPage":page-size="pageSize" :pagination-props="{ background: true, pageSizes: [15,30,45,60], total: total }" @query-change="loadData" :filters="filters" :table-props="tableProps">
        <div class="mb-3" slot="tool">
          <h4 class="fs_16 font-weight-semibold m-0 text-000 mb-3">供应商管理</h4>
          <div class="d-flex align-items-center">
          	<div class="mr-auto d-flex align-items-center">
              <el-input
                class="w-40"
                placeholder="公司名称/营业执照编码/负责人姓名/手机号"
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
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" :index="indexMethod" label="序号" width="50"></el-table-column>
        <el-table-column prop="companyName" label="公司名称"></el-table-column>
        <el-table-column prop="blCode" label="营业执照编码"></el-table-column>
        <el-table-column prop="name" label="负责人姓名"></el-table-column>
        <el-table-column prop="sex" label="性别"></el-table-column>
        <el-table-column prop="status" label="状态">
        	<template slot-scope="scope">
	        	<el-switch
						  v-model="scope.row.status"
						  active-value="1"
						  inactive-value="0"
						  active-color="#52C418"
						  inactive-color="#969191">
						</el-switch>
        	</template>
        </el-table-column>
        <el-table-column prop="tel" label="电话"></el-table-column>
        <el-table-column prop="role" label="角色"></el-table-column>
        <el-table-column fixed="right" label="操作" width="250" align="center">
          <template slot-scope="scope">
            <span class="text-primary cursor-pointer">修改</span>
            <span class="text-primary cursor-pointer ml-3">删除</span>
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
		name: 'ManufacturerSupplier',
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
        tableData: [
        	{
        		companyName:'XX实业有限公司',
        		blCode:"9NLDE1234555553221",
        		name:"张三",
        		sex:"男",
        		status:"1",
        		tel:"15196358795",
        		role:"合作厂商",
        	},
        	{
        		companyName:'XX实业有限公司',
        		blCode:"9NLDE1234555553221",
        		name:"张三",
        		sex:"男",
        		status:"1",
        		tel:"15196358795",
        		role:"合作厂商",
        	},
        	{
        		companyName:'XX实业有限公司',
        		blCode:"9NLDE1234555553221",
        		name:"张三",
        		sex:"男",
        		status:"1",
        		tel:"15196358795",
        		role:"合作厂商",
        	},
        ],
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
        this.$api.supplierList({
          page:this.currentPage,
          limit:this.pageSize,
          keywords:this.filters[0].value,
          lastlogintime:lastlogintime,
        }).then(data =>{
          if(data.code == 0){
            console.log(data.data,'9*/87954622');
            this.total = data.count;
            this.tableData = data.data;
          }else{
            this.$message.error(data.msg);
          }
        });
      },
      // 新增顶级菜单
      handleAdd(){
      	this.mfuserData.dialog = true;
      	this.mfuserData.title = "新增厂商用户";
      	this.mfuserData.id = '';
      },
		},
	}
</script>

<style>

</style>