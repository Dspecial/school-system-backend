<template>
  <div class="user-container">
    <!-- 登录信息 -->
    <global-tips></global-tips>
    <!-- 知识库内容列表 -->
    <el-card class="mt-3">
      <data-tables-server :data="tableData" layout="tool, table, pagination" :current-page="currentPage":page-size="pageSize" :pagination-props="{ background: true, pageSizes: [15,30,45,60], total: total }" @query-change="loadData" :filters="filters" :table-props="tableProps">
        <div class="mb-3" slot="tool">
          <h4 class="fs_18 font-weight-semibold m-0 text-000 mb-3">内容列表</h4>
          <div class="d-flex align-items-center">
            <div class="mr-auto d-flex align-items-center">
              <el-input
                placeholder="标题、简介、创建人、编辑人"
                prefix-icon="el-icon-search"
                v-model="filters[0].value"
                clearable>
              </el-input>
              <el-select v-model="filters[1].value" placeholder="请选择是否使用" clearable class="ml-3" @change="onChange">
                <el-option label="正常" :value="1"></el-option>
                <el-option label="禁用" :value="2"></el-option>
              </el-select>
              <el-select v-model="filters[2].value" placeholder="请选择所属类别" clearable class="ml-3">
                <el-option label="文章" :value="1"></el-option>
                <el-option label="文档" :value="2"></el-option>
                <el-option label="图片" :value="3"></el-option>
                <el-option label="多媒体" :value="4"></el-option>
              </el-select>
            </div>
            <div class="ml-auto">
              <el-button type="primary" @click="handleAdd()" v-if="$store.getters.getaddAction.title" ><i class="el-icon-plus el-icon--left"></i>{{$store.getters.getaddAction.title}}</el-button>
            </div>
          </div>
        </div>
        <el-table-column prop="id" label="ID" width="60" type="id"></el-table-column>
        <el-table-column prop="title" label="标题" width="160"></el-table-column>
        <el-table-column prop="desc" label="简介" width="150">
          <template slot-scope="scope">
            <el-popover
              placement="top-start"
              title="简介"
              width="200"
              trigger="hover"
              :content="scope.row.desc">
              <span class="text-truncate" slot="reference">{{scope.row.desc}}</span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="类型" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.type == 1"><i class="dot bg-success mr-1"></i>文章</span>
            <span v-if="scope.row.type == 2"><i class="dot bg-primary mr-1"></i>文档</span>
            <span v-if="scope.row.type == 3"><i class="dot bg-danger mr-1"></i>图片</span>
            <span v-if="scope.row.type == 4"><i class="dot bg-warning mr-1"></i>多媒体</span>
          </template>
        </el-table-column>
        <el-table-column prop="is_show" label="是否使用" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.is_show == 1"><i class="dot bg-success mr-1"></i>正常</span>
            <span v-else><i class="dot bg-danger mr-1"></i>禁用</span>
          </template>
        </el-table-column>
        <el-table-column prop="cate_name" label="所属分类"></el-table-column>
        <el-table-column prop="sort" label="排序" width="80"></el-table-column>
        <el-table-column prop="cname" label="创建人"></el-table-column>
        <el-table-column prop="ename" label="最新编辑人"></el-table-column>
        <el-table-column prop="createtime" label="创建时间"></el-table-column>
        <el-table-column prop="updatetime" label="更新时间"></el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <span v-for="(action,index) in $store.getters.getmoreAction" :key="index" @click="fun(scope.$index,scope.row,action.sign)" class="text-primary cursor-pointer mr-3">{{action.title}}</span>
          </template>
        </el-table-column>
      </data-tables-server>
    </el-card>
    <content-edit :contentData="contentData"></content-edit>
  </div>
</template>

<script>
  import GlobalTips from "@/components/GlobalTips";
  import ContentEdit from "./ContentEdit";

  export default {
    name: 'Content',
    provide() {
      return {
        loadData: this.loadData
      }
    },
    components: {
      GlobalTips,
      ContentEdit,
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
            prop: 'name'
          },
          {
            value: '',
            prop: 'is_use'
          },
          {
            value: '',
            prop: 'type'
          }
        ],
        total: 0, //总条数
        currentPage: 1, //当前页
        pageSize: 15, //每页显示条数
        contentData:{
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
      onChange(value){
        console.log(value);
      },
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
        this.$api.kl_contentList({
          page:this.currentPage,
          limit:this.pageSize,
          keywords:this.filters[0].value,
          is_show:this.filters[1].value,
          type:this.filters[2].value,
        }).then(data=>{
          if(data.code == 0){
            this.total = data.data.total;
            this.tableData = data.data.data;
          }else{
            this.$message.error(data.msg);
          }
        });
      },

      // 新增内容
      handleAdd(){
        this.contentData.dialog = true;
        this.contentData.title = '新增内容';
        this.contentData.isEdit = false;
      },

      // 操作们
      fun(index,row,sign){
        if(sign == 2){ // 编辑
          this.editContent(index,row);
        }else if(sign == 3){ // 删除
          this.handleDel(index,row);
        }
      },
      
      // 编辑内容
      editContent(index,row){
        this.contentData.dialog = true;
        this.contentData.title = '编辑内容';
        this.contentData.id = row.id;
        this.contentData.isEdit = true;
      },

      // 删除
      handleDel(index,row){
        this.$confirm("此操作将永久删除该内容, 是否继续?", "提示", {
          type: 'warning'
        }).then(() => {
          this.$api.kl_contentDel({
            id:row.id
          }).then(data=>{ 
             if(data.code == 0){
                this.$message({
                  message: "删除内容成功!",
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