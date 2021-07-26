<template>
	<el-dialog
	  :title="fundListData.title"
	  :visible.sync="fundListData.dialog"
	  width="50%"
	  @open="openEdit"
	  @closed="closedEdit"
	  :before-close="handleClose">
    <data-tables-server v-if="fundListData.dialog" :data="tableData" @query-change="loadFundList" layout="tool, table, pagination" :current-page="currentPage" :page-size="pageSize" :pagination-props="{ background: true, pageSizes: [15,30,45,60], total: total }" :filters="filters" :table-props="tableProps">
      <div class="mb-3" slot="tool">
        <div class="d-flex align-items-center">
          <div class="mr-auto d-flex align-items-center">
            <el-date-picker
              class="w-100"
              v-model="filters[0].value"
              type="year"
              value-format="yyyy"
              placeholder="请选择要查的年份"
              clearable>
            </el-date-picker>
          </div>
        </div>
      </div>
      <el-table-column type="index" :index="indexMethod" label="序号" width="50"></el-table-column>
      <el-table-column prop="years" label="年度"></el-table-column>
      <el-table-column prop="advance_money" label="预算金额"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <el-table-column prop="aname" label="创建人" width="150"></el-table-column>
      <el-table-column prop="createtime" label="创建时间" width="150"></el-table-column>
    </data-tables-server>
	</el-dialog>
</template>

<script>
	export default {
		props:['fundListData'],
		inject: ['loadData'],
		name: 'fundList',
		data () {
			return {
				tableProps: {
          
        },
        tableData: [],
        filters: [
	        {
	          value: '',
	          prop: 'year'
	        }
        ],
        total: 0, //总条数
        currentPage: 1, //当前页
        pageSize: 15, //每页显示条数
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
        // this.loadFundList();
			},
      loadFundList(queryInfo){
        if (queryInfo != null) {
          this.currentPage = queryInfo.page;
          this.pageSize = queryInfo.pageSize;
        }
        this.$api.budgetList({
          page:this.currentPage,
          limit:this.pageSize,
          depart_id:this.fundListData.id,
          year:this.filters[0].value,
        }).then(data =>{
          if(data.code == 0){
            this.total = data.data.total;
            this.tableData = data.data.data;
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
				this.fundListData.dialog = false;
			},
		}
	}
</script>

<style>

</style>