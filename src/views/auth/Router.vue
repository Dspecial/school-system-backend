<template>
	<div class="user-container">
		<!-- 登录信息 -->
    <global-tips></global-tips>
    <!-- 路由管理 -->
    <el-card class="mt-3">
      <data-tables-server :data="tableData" layout="tool, table" :current-page="currentPage":page-size="pageSize" :pagination-props="{ background: true, pageSizes: [15,30,45,60], total: total }" @query-change="loadData" :filters="filters" :table-props="tableProps" :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <div class="mb-3" slot="tool">
          <h4 class="fs_16 font-weight-semibold m-0 text-000 mb-3">路由管理</h4>
          <div class="d-flex align-items-center">
          	<div class="mr-auto d-flex align-items-center">
          		<el-input
    				    placeholder="请输入菜单名称"
    				    prefix-icon="el-icon-search"
    				    v-model="filters[0].value">
    				  </el-input>
              <el-button type="primary" class="ml-3">查询</el-button>
          	</div>
            <div class="ml-auto">
              <el-button type="primary" @click="handleAdd()"><i class="el-icon-plus el-icon--left"></i>新增顶级路由</el-button>
            </div>
          </div>
        </div>
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" :index="indexMethod" label="序号" width="50"></el-table-column>
        <el-table-column prop="title" label="菜单名称"></el-table-column>
        <el-table-column prop="path" label="路由名称"></el-table-column>
        <el-table-column prop="folder" label="路径名称"></el-table-column>
        <el-table-column prop="icon" label="图标">
        	<template slot-scope="scope">
	        	<i :class="scope.row.icon"></i>
        	</template>
        </el-table-column>
        <el-table-column prop="sort" label="排序"></el-table-column>
        <el-table-column prop="status" label="状态">
        	<template slot-scope="scope">
	        	<el-switch
						  v-model="scope.row.status"
						  active-value="1"
						  inactive-value="0"
						  active-color="#005DDA"
						  inactive-color="#969191">
						</el-switch>
        	</template>
        </el-table-column>
        <el-table-column prop="createtime" label="创建时间"></el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
          	<span class="text-primary cursor-pointer" @click="">新增子集</span>
          	<span class="text-primary cursor-pointer ml-3" @click="">编辑</span>
            <span class="text-primary cursor-pointer ml-3">删除</span>
          </template>
        </el-table-column>
      </data-tables-server>
    </el-card>
	</div>
</template>

<script>
	import GlobalTips from "@/components/GlobalTips";

	export default {
		name: 'Router',
		provide() {
      return {
        loadData: this.loadData
      }
    },
		components: {
			GlobalTips,
		},
		data () {
			return {
				tableProps: {
          'default-expand-all':false,
          'row-key':"id",
          'tree-props':{
          	'children': 'children', 
          	'hasChildren': 'hasChildren'
          }
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
        roleData:{
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
        this.$api.router({
        }).then(data =>{
        	if(data.code == 0){
        		console.log(data,"aaa");
        		this.tableData = data.data;
        	}else{
        		this.$message.error("接口失败");
        	}

        })
      },
		},
	}
</script>

<style>

</style>