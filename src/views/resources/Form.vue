<template>
  <div class="user-container">
    <!-- 登录信息 -->
    <global-tips></global-tips>
    <!-- 参数管理 -->
    <el-card class="mt-3">
      <data-tables-server :data="tableData" layout="tool, table,pagination" :current-page="currentPage" :page-size="pageSize" :pagination-props="{ background: true, pageSizes: [15,30,45,60], total: total }" @query-change="loadData" :filters="filters" :table-props="tableProps">
        <div class="mb-3" slot="tool">
          <h4 class="fs_18 font-weight-semibold m-0 text-000 mb-3">参数管理</h4>
          <div class="d-flex align-items-center">
            <div class="mr-auto d-flex align-items-center">
              <el-input
                placeholder="请输入参数名称/变量名称查询"
                prefix-icon="el-icon-search"
                v-model="filters[0].value"
                clearable>
              </el-input>
            </div>
            <div class="ml-auto">
              <el-button type="primary" @click="handleAdd()" v-if="$store.getters.getaddAction.title" ><i class="el-icon-plus el-icon--left"></i>{{$store.getters.getaddAction.title}}</el-button>
            </div>
          </div>
        </div>
        <el-table-column type="index" :index="indexMethod" label="序号" width="55" v-if="isShow"></el-table-column>
        <el-table-column prop="id" label="编号ID" width="100"></el-table-column>
        <el-table-column prop="title" label="参数名称"></el-table-column>
        <el-table-column prop="name" label="变量名称"></el-table-column>
        <el-table-column prop="cname" label="创建人"></el-table-column>
        <el-table-column prop="ename" label="最新编辑人"></el-table-column>
        <el-table-column label="是否必填">
          <template slot-scope="scope">
            <span v-if="scope.row.is_required == 2"><i class="dot bg-success mr-1"></i>是</span>
            <span v-else><i class="dot bg-danger mr-1"></i>否</span>
          </template>
        </el-table-column>
        <el-table-column prop="placeholder" label="提示语"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <span v-for="(action,index) in $store.getters.getmoreAction" :key="index" @click="fun(scope.$index,scope.row,action.sign)" class="text-primary cursor-pointer mr-3">{{action.title}}</span>
          </template>
        </el-table-column>
      </data-tables-server>
    </el-card>
    <form-edit :formData="formData"></form-edit>
  </div>
</template>

<script>
  import GlobalTips from "@/components/GlobalTips";
  import FormEdit from "./FormEdit";

  export default {
    name: 'Form',
    provide() {
      return {
        loadData: this.loadData
      }
    },
    components: {
      GlobalTips,
      FormEdit,
    },
    data () {
      return {
        isShow:false,
        tableProps: {
          
        },
        tableData: [],
        filters: [
          {
            value: '',
            prop: 'title'
          }
        ],
        total: 0, //总条数
        currentPage: 1, //当前页
        pageSize: 15, //每页显示条数
        formData:{
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
        this.$api.formList({
          page:this.currentPage,
          limit:this.pageSize,
          keywords:this.filters[0].value,
        }).then(data=>{
          if(data.code == 0){
            this.total = data.data.total;
            this.tableData = data.data.data;
          }else{
            this.$message.error(data.msg);
          }
        });
      },

      // 新增参数
      handleAdd(){
        this.formData.dialog = true;
        this.formData.title = '新增参数';
        this.formData.isEdit = false;
      },
      
      // 操作们
      fun(index,row,sign){
        if(sign == 2){ // 编辑
          this.editCate(index,row);
        }else if(sign == 3){ // 删除
          this.handleDel(index,row);
        }
      },

      // 编辑
      editCate(index,row){
        this.formData.dialog = true;
        this.formData.title = '编辑参数';
        this.formData.id = row.id;
        this.formData.isEdit = true;
      },

      // 删除
      handleDel(index,row){
        this.$confirm("此操作将永久删除该参数, 是否继续?", "提示", {
          type: 'warning'
        }).then(() => {
          this.$api.formDel({
            id:row.id
          }).then(data=>{ 
             if(data.code == 0){
                this.$message({
                  message: "删除参数成功!",
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