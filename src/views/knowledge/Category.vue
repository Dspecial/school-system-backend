<template>
  <div class="user-container">
    <!-- 登录信息 -->
    <global-tips></global-tips>
    <!-- 知识库分类列表 -->
    <el-card class="mt-3">
      <data-tables-server :data="tableData" layout="tool, table" :current-page="currentPage":page-size="pageSize" :pagination-props="{ background: true, pageSizes: [15,30,45,60], total: total }" @query-change="loadData" :filters="filters" :table-props="tableProps">
        <div class="mb-3" slot="tool">
          <h4 class="fs_16 font-weight-semibold m-0 text-000 mb-3">分类列表</h4>
          <div class="d-flex align-items-center">
            <div class="mr-auto d-flex align-items-center">
              <!-- <el-input
                placeholder="分类名"
                prefix-icon="el-icon-search"
                v-model="filters[0].value">
              </el-input> -->
            </div>
            <div class="ml-auto">
              <el-button type="primary" @click="handleAdd()"><i class="el-icon-plus el-icon--left"></i>新增分类</el-button>
            </div>
          </div>
        </div>
        <el-table-column prop="id" label="ID" width="80" type="id"></el-table-column>
        <el-table-column prop="cate_name" label="分类名"></el-table-column>
        <el-table-column prop="is_show" label="是否使用">
          <template slot-scope="scope">
            <span v-if="scope.row.is_show == 1"><i class="dot bg-success mr-1"></i>正常</span>
            <span v-else><i class="dot bg-danger mr-1"></i>禁用</span>
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序" width="80"></el-table-column>
        <el-table-column prop="cname" label="创建人"></el-table-column>
        <el-table-column prop="ename" label="最新编辑人"></el-table-column>
        <el-table-column prop="createtime" label="创建时间"></el-table-column>
        <el-table-column prop="updatetime" label="更新时间"></el-table-column>
        <el-table-column fixed="right" label="操作" width="250">
          <template slot-scope="scope">
            <span class="text-primary cursor-pointer" @click="editCate(scope.$index,scope.row)">编辑</span>
            <span class="text-primary cursor-pointer ml-3" @click="handleDel(scope.$index,scope.row)">删除</span>
          </template>
        </el-table-column>
      </data-tables-server>
    </el-card>
    <category-edit :categoryData="categoryData"></category-edit>
  </div>
</template>

<script>
  import GlobalTips from "@/components/GlobalTips";
  import CategoryEdit from "./CategoryEdit";

  export default {
    name: 'Category',
    provide() {
      return {
        loadData: this.loadData
      }
    },
    components: {
      GlobalTips,
      CategoryEdit,
    },
    data () {
      return {
        isShow:false,
        tableProps: {
          'default-expand-all':true,
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
        categoryData:{
          dialog:false,
          title:"",
          id:"",
          isEdit:false,
        },
        paramsData:{
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
        this.$api.kl_categoryList({
        }).then(data=>{
          if(data.code == 0){
            this.tableData = data.data;
          }else{
            this.$message.error(data.msg);
          }
        });
      },

      // 新增类别
      handleAdd(){
        this.categoryData.dialog = true;
        this.categoryData.title = '新增类别';
        this.categoryData.isEdit = false;
      },

      // 编辑
      editCate(index,row){
        this.categoryData.dialog = true;
        this.categoryData.title = '编辑类别';
        this.categoryData.id = row.id;
        this.categoryData.isEdit = true;
      },

      // 删除
      handleDel(index,row){
        this.$confirm("此操作将永久删除该分类, 是否继续?", "提示", {
          type: 'warning'
        }).then(() => {
          this.$api.kl_categoryDel({
            id:row.id
          }).then(data=>{ 
             if(data.code == 0){
                this.$message({
                  message: "删除分类成功!",
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