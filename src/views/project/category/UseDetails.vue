<template>
	<el-dialog
	  :title="detailsData.title"
	  :visible.sync="detailsData.dialog"
	  width="50%"
	  @open="openEdit"
	  @closed="closedEdit"
	  :before-close="handleClose">
    <data-tables-server v-if="detailsData.dialog" :data="tableData" @query-change="loadDeatilsData" layout="tool, table, pagination" :current-page="currentPage" :page-size="pageSize" :pagination-props="{ background: true, pageSizes: [5,10,15,20], total: total }" :filters="filters" :table-props="tableProps">
      <div class="mb-3" slot="tool">
        <div class="d-flex align-items-center">
          <div class="mr-auto d-flex align-items-center">
            <el-input
              placeholder="请输入标题、项目名称"
              prefix-icon="el-icon-search"
              v-model="filters[0].value"
              clearable>
            </el-input>
            <el-select v-model="filters[1].value" placeholder="请选择类型" class="ml-3" clearable>
              <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <el-table-column type="index" :index="indexMethod" label="序号" width="50"></el-table-column>
      <el-table-column prop="title" label="标题" width="250"></el-table-column>
      <el-table-column prop="year" label="年份" width="70"></el-table-column>
      <el-table-column prop="type" label="类型" width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.type == 1"><i class="dot bg-success mr-1"></i>项目合同</span>
          <span v-else-if="scope.row.type == 2"><i class="dot bg-primary mr-1"></i>延保合同</span>
          <span v-else><i class="dot bg-warning mr-1"></i>维保合同</span>
        </template>
      </el-table-column>
      <el-table-column prop="money" label="金额"></el-table-column>
      <el-table-column prop="createtime" label="创建时间" width="150"></el-table-column>
      <el-table-column prop="project_name" label="项目名称" width="200"></el-table-column>
    </data-tables-server>
	</el-dialog>
</template>

<script>
	export default {
		props:['detailsData'],
		inject: ['loadData'],
		name: 'UseDetails',
		data () {
			return {
        typeOptions:[
          {
            value: '1',
            label: '项目合同'
          },
          {
            value: '2',
            label: '延保合同'
          },
          {
            value: '3',
            label: '维保合同'
          }
        ],
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
	        }
        ],
        total: 0, //总条数
        currentPage: 1, //当前页
        pageSize: 5, //每页显示条数
			}
		},
		components: {},
		mounted(){
			
		},
		methods:{
			// 自增序列
      indexMethod(index) { 
        return ++index;
      },
			// dialog初始化-加载数据
			openEdit(){
				// this.loadDeatilsData();
			},
      loadDeatilsData(queryInfo){
        if (queryInfo != null) {
          this.currentPage = queryInfo.page;
          this.pageSize = queryInfo.pageSize;
        }
        this.$api.budgetUseDetails({
          page:this.currentPage,
          limit:this.pageSize,
          depart_id:this.detailsData.id,
          keywords:this.filters[0].value,
          type:this.filters[1].value,
        }).then(data =>{
          if(data.code == 0){
            this.total = data.counts;
            this.tableData = data.data;
          }else{
            this.$message.error(data.msg);
          }
        });
      },
			// dialog关闭
			closedEdit(){
				this.handleClose();
			},
			// 右上角x关闭
			handleClose(){
				this.detailsData.dialog = false;
			},
		}
	}
</script>

<style>

</style>