<template>
  <div class="user-container">
    <!-- 登录信息 -->
    <global-tips></global-tips>
    <!-- 类别管理 -->
    <el-card class="mt-3">
      <data-tables-server :data="tableData" layout="tool, table" :current-page="currentPage" :page-size="pageSize" :pagination-props="{ background: true, pageSizes: [15,30,45,60], total: total }" @query-change="loadData" :filters="filters" :table-props="tableProps">
        <div class="mb-3" slot="tool">
          <h4 class="fs_18 font-weight-semibold m-0 text-000 mb-3">类别管理</h4>
          <div class="d-flex align-items-center">
            <div class="mr-auto d-flex align-items-center">
              <!-- <el-input
                placeholder="分类名"
                prefix-icon="el-icon-search"
                v-model="filters[0].value"
                clearable>
              </el-input> -->
            </div>
            <div class="ml-auto">
              <el-button type="primary" @click="handleAdd()" v-if="$store.getters.getaddAction.title" ><i class="el-icon-plus el-icon--left"></i>{{$store.getters.getaddAction.title}}</el-button>
            </div>
          </div>
        </div>
        <el-table-column type="index" :index="indexMethod" label="序号" width="50"></el-table-column>
        <el-table-column prop="cate_name" label="分类名"></el-table-column>
        <el-table-column prop="form_text" label="参数信息"></el-table-column>
        <el-table-column prop="level" label="层级" width="80"></el-table-column>
        <el-table-column prop="cname" label="创建人"></el-table-column>
        <el-table-column prop="ename" label="最新编辑人"></el-table-column>
        <el-table-column prop="createtime" label="创建时间" width="150"></el-table-column>
        <el-table-column prop="updatetime" label="更新时间" width="150"></el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <template v-if="scope.row.level > 2">
              <span v-for="(action,index) in actions2" :key="index" @click="fun(scope.$index,scope.row,action.sign)" class="text-primary cursor-pointer mr-3">{{action.title}}</span>
            </template>
            <template v-else>
              <span v-for="(action,index) in actions1" :key="index" @click="fun(scope.$index,scope.row,action.sign)" class="text-primary cursor-pointer mr-3">{{action.title}}</span>
            </template>
          </template>
        </el-table-column>
      </data-tables-server>
    </el-card>
    <cate-edit :cateData="cateData"></cate-edit>
    <cate-params :paramsData="paramsData"></cate-params>
  </div>
</template>

<script>
  import GlobalTips from "@/components/GlobalTips";
  import CateEdit from "./CateEdit";
  import CateParams from "./CateParams";

  export default {
    name: 'Cate',
    provide() {
      return {
        loadData: this.loadData
      }
    },
    components: {
      GlobalTips,
      CateEdit,
      CateParams
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
        cateData:{
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
        actions1:[],
        actions2:[],
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
        this.$api.cateList({
        }).then(data=>{
          if(data.code == 0){
            this.tableData = data.data;
            var actions_1 = new Array,actions_2 = new Array,actions_3 = new Array
            this.$store.getters.getmoreAction.map((item,index)=>{
              if(item.sign == 2){ // 编辑
                actions_1.push(item);
              }else if (item.sign == 3){ // 删除
                actions_2.push(item);
              }else if (item.sign == 5){ // 分配参数
                actions_3.push(item);
              }
            })
            // level > 2 就有分配参数
            this.actions1 = [...actions_1,...actions_2];
            this.actions2 = [...actions_1,...actions_2,...actions_3];
          }else{
            this.$message.error(data.msg);
          }
        });
      },

      // 新增类别
      handleAdd(){
        this.cateData.dialog = true;
        this.cateData.title = '新增类别';
        this.cateData.isEdit = false;
      },

      // 操作们
      fun(index,row,sign){
        if(sign == 2){ // 编辑
          this.editCate(index,row);
        }else if(sign == 3){ // 删除
          this.handleDel(index,row);
        }else if(sign == 5){ // 分配参数
          this.handleParams(index,row);
        }
      },

      // 分配参数
      handleParams(index,row){
        this.paramsData.dialog = true;
        this.paramsData.title = '分配参数';
        this.paramsData.id = row.id;
      },

      // 编辑
      editCate(index,row){
        this.cateData.dialog = true;
        this.cateData.title = '编辑类别';
        this.cateData.id = row.id;
        this.cateData.isEdit = true;
      },

      // 删除
      handleDel(index,row){
        this.$confirm("此操作将永久删除该分类, 是否继续?", "提示", {
          type: 'warning'
        }).then(() => {
          this.$api.cateDel({
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