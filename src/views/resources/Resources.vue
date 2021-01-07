<template>
  <div class="resources-container">
    <!-- 登录信息 -->
    <global-tips></global-tips>
    <!-- 资源概况 -->
		<el-card class="mt-3">
			<h4 class="fs_16 font-weight-semibold m-0 mb-3 text-000">资源概况</h4>
			<el-row :gutter="20">
				<template v-for="item in resources">
					<el-col :span="12" class="status-item">
						<div class="d-flex align-items-center justify-content-center p-2">
							<img :src="item.src" alt="" width="80" height="80">
							<div class="ml-3 text-center">
								<span class="mb-2 d-inline-block opacity-60">{{item.title}}</span>
								<p class="m-0 fs_24 text-primary">{{item.num}}/{{item.total}}</p>
							</div>
						</div>
					</el-col>
				</template>
			</el-row>	
		</el-card>
    <!-- 资源列表 -->
    <el-card class="mt-3">
      <data-tables-server :data="tableData" layout="tool, table,pagination" :total="total" :current-page="currentPage":page-size="pageSize" :pagination-props="{ background: true, pageSizes: [15,30,45,60]}" @query-change="loadData" :filters="filters" :table-props="tableProps">
        <div class="mb-3" slot="tool">
          <h4 class="fs_16 font-weight-semibold m-0 text-000 mb-3">资源列表</h4>
          <div class="d-flex align-items-center">
          	<div class="mr-auto d-flex align-items-center">
						  <el-select v-model="spValue" placeholder="请选择服务商">
						    <el-option
						      v-for="item in spOptions"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						  </el-select>
						  <el-select v-model="duValue" placeholder="请选择分配使用" class="ml-3">
						    <el-option
						      v-for="item in duOptions"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						  </el-select>
						  <el-select v-model="deptValue" placeholder="请选择管理部门" class="ml-3">
						    <el-option
						      v-for="item in deptOptions"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						  </el-select>
						  
              <el-button type="primary" class="ml-3">查询</el-button>
          	</div>
            <div class="ml-auto">
              <el-button type="primary" @click="handleAdd()"><i class="el-icon-plus el-icon--left"></i>新增资源</el-button>
            </div>
          </div>
        </div>
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" :index="indexMethod" label="序号" width="50"></el-table-column>
        <el-table-column prop="id" label="类别编号"></el-table-column>
        <el-table-column prop="categoryName" label="类别名称"></el-table-column>
        <el-table-column prop="typeId" label="类容编号"></el-table-column>
        <el-table-column prop="system" label="系统"></el-table-column>
        <el-table-column prop="cpu" label="CPU"></el-table-column>
        <el-table-column prop="ram" label="内存"></el-table-column>
        <el-table-column prop="remark" label="备注" width="200"></el-table-column>
        <el-table-column prop="distribution" label="分配使用" width="300"></el-table-column>
        <el-table-column prop="dept" label="管理部门"></el-table-column>
        <el-table-column prop="administrators" label="管理员"></el-table-column>
        <el-table-column prop="serviceProvider" label="服务商"></el-table-column>
        <el-table-column fixed="right" label="操作" width="150" align="center">
          <template slot-scope="scope">
            <span class="text-primary cursor-pointer">修改</span>
            <span class="text-primary cursor-pointer ml-3">删除</span>
          </template>
        </el-table-column>
      </data-tables-server>
      <resources-add :resourceData="resourceData"></resources-add>
    </el-card>
  </div>
</template>

<script>
  import GlobalTips from "@/components/GlobalTips";
  import ResourcesAdd from "./ResourcesAdd";

	export default {
    name: 'Resources',
    components: {
      GlobalTips,
      ResourcesAdd,
    },
    data() {
      return {
      	// 资源概况
				resources:[
					{
						src:require("@/assets/images/index-resource4.png"),
						title:"服务器(台)",
						num:"8",
						total:"100"
					},
					{
						src:require("@/assets/images/index-resource2.png"),
						title:"IP分配(个)",
						num:"5",
						total:"20"
					},
				],
				// 服务商
				spValue:"",
				spOptions:[
					{
						label:"常州公司",
						value:"1",
					},
					{
						label:"北京公司",
						value:"2",
					},
					{
						label:"上海公司",
						value:"3",
					},
				],
				// 分配使用
				duValue:"",
				duOptions:[
					{
						label:"信息管理项目1",
						value:"1",
					},
					{
						label:"食堂管理项目2",
						value:"2",
					},
				],
				// 管理部门
				deptValue:"",
				deptOptions:[
					{
						label:"教务处",
						value:"1",
					},
					{
						label:"学工办",
						value:"2",
					},
				],
        tableProps: {
          'max-height': 670,
        },
        tableData: [
        	{
            id:"10111",
            categoryName:"服务器",
            typeId:"10111102",
        		system:"windows",
        		cpu:"8",
            ram:"16",
            remark:"硬盘1T、带宽10M",
            distribution:"信息管理项目1、食堂管理项目2",
            dept:"教务处",
            administrators:"小王",
            serviceProvider:"常州xxx公司",
        	},
        	{
            id:"10111",
            categoryName:"服务器",
            typeId:"10111102",
        		system:"windows",
        		cpu:"8",
            ram:"16",
            remark:"硬盘1T、带宽10M",
            distribution:"信息管理项目1、食堂管理项目2",
            dept:"教务处",
            administrators:"小王",
            serviceProvider:"常州xxx公司",
        	},
        	{
            id:"10111",
            categoryName:"服务器",
            typeId:"10111102",
        		system:"windows",
        		cpu:"8",
            ram:"16",
            remark:"硬盘1T、带宽10M",
            distribution:"信息管理项目1、食堂管理项目2",
            dept:"教务处",
            administrators:"小王",
            serviceProvider:"常州xxx公司",
        	},
        ],
        filters: [
	        {
	          value: '',
	          prop: 'name'
	        }
        ],
        total: 0, //总条数
        currentPage: 1, //当前页
        pageSize: 15, //每页显示条数
        // 新增资源
        resourceData:{
          dialog:false,
          title:"",
          id:","
        },
      }
    },
    provide() {
      return {
        loadData: this.loadData
      }
    },
    computed: {
    },
    mounted(){
      this.total = this.tableData.length;
    },
    methods: {
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
        // this.MyAxios.post(this.globalUrl.baseURL + "/forklift/achievements/achievements_list", {
        //   page: this.currentPage,
        //   limit: this.pageSize,
        //   name: this.filters[0].value
        // }).then(data => {
        //   if (data) {
        //     if (data.code == 0) {
        //       _this.total = data.count;
        //       _this.tableData = data.data;
        //     } else {
        //       _this.$message.error("接口失败");
        //     }
        //   }
        // })
      },
      // 申请项目
      handleAdd(){
        this.resourceData.dialog = true;
        this.resourceData.title = "新增资源";
        this.resourceData.id = "";
      },

    },
  }
</script>

<style>

</style>