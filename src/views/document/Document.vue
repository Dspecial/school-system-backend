<template>
	<div class="dept-container">
		<!-- 登录信息 -->
    <global-tips></global-tips>
    <!-- 文档节点设置 -->
    <el-card class="mt-3">

      <h4 class="fs_18 font-weight-semibold m-0 text-000 mb-3">文档节点设置</h4>
      <div class="d-flex">
      	<div class="w-20 mr-3 panel">
					<el-tree
					  :data="treeData"
					  node-key="id"
					  default-expand-all
					  :expand-on-click-node="false">
					  <div class="custom-tree-node w-100 d-flex justify-content-between" slot-scope="{ node, data }">
					    <span>{{ node.label }}</span>
					    <span class="fs_16 text-primary action">
					      <i class="el-icon-edit-outline mr-2" @click="append(data)"></i>
					      <i class="el-icon-delete" @click="remove(node, data)"></i>
					    </span>
					  </div>
					</el-tree>
      	</div>
	      <data-tables-server class="w-80 panel" :data="tableData" layout="tool, table,pagination" :current-page="currentPage":page-size="pageSize" :pagination-props="{ background: true, pageSizes: [15,30,45,60], total: total }" @query-change="loadData" :filters="filters" :table-props="tableProps">
	        <div class="mb-3" slot="tool">
	          <div class="d-flex align-items-center">
	          	<div class="mr-auto d-flex align-items-center">
	          		<el-input
	    				    placeholder="下拉选择或搜索输入"
	    				    prefix-icon="el-icon-search"
	    				    v-model="filters[0].value"
									clearable>
	    				  </el-input>
	              <el-button type="primary" class="ml-3">查询</el-button>
	          	</div>
	            <div class="ml-auto">
	              <el-button type="primary" @click="handleUpload()"><i class="el-icon-upload2 el-icon--left"></i>上传文件</el-button>
	            </div>
	          </div>
	        </div>
	        <el-table-column type="selection" width="55"></el-table-column>
	        <el-table-column type="index" :index="indexMethod" label="序号" width="50"></el-table-column>
	        <el-table-column prop="documentName" label="文档名称"></el-table-column>
	        <el-table-column prop="type" label="项目类型"></el-table-column>
	        <el-table-column prop="node" label="项目节点"></el-table-column>
	        <el-table-column prop="size" label="文件大小"></el-table-column>
	        <el-table-column prop="status" label="状态"></el-table-column>
	        <el-table-column fixed="right" label="操作" align="center">
	          <template slot-scope="scope">
	            <span class="text-primary cursor-pointer">下载</span>
	          </template>
	        </el-table-column>
	      </data-tables-server>
      </div>
    </el-card>
    <document-upload :uploadData="uploadData"></document-upload>
	</div>
</template>

<script>
	import GlobalTips from "@/components/GlobalTips";
	import DocumentUpload from "./DocumentUpload";

	export default {
		name: 'Document',
		provide() {
      return {
        loadData: this.loadData
      }
    },
		components: {
			GlobalTips,
			DocumentUpload
		},
		data () {
			return {
        newId:20,
				treeData:[
					{
		        id: 1,
		        label: '常州信息职业技术学校',
		        children: [
			        {
			          id: 2,
			          label: '建设类',
			          children: [
				          {
				            id: 3,
				            label: '申请状态文档1',
				            children: [{
					            id: 5,
					            label: '申请状态文档1-1'
					          }, {
					            id: 6,
					            label: '申请状态文档1-2'
					          }],
				          }, 
				          {
				            id: 4,
				            label: '申请状态文档2'
				          }
			          ]
			        }
		        ]
	      	}
      	],
				tableProps: {
          'max-height': 670,
          'row-key':'id',
          'default-expand-all':true,
          'tree-props':{
          	hasChildren: 'hasChildren', 
          	children: 'children',
          },
        },
        tableData: [
        	{
        		id:1,
            documentName:"申请项目模板",
            type:"建设类",
            node:"申请",
            size:"20M",
            status:"锁定",
        	},
        	{
        		id:2,
            documentName:"xxx项目申请表",
            type:"建设类",
            node:"申请",
            size:"20M",
            status:"上传",
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
        uploadData:{
        	dialog:false,
        	title:"",
        	id:"",
        },
			}
		},
		mounted(){

    },
		methods:{
			append(data) {
        const newChild = { id: this.newId++, label: 'testtest', children: [] };
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        data.children.push(newChild);
      },

      remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
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
        this.total = this.tableData.length;
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
      // 上传文件
      handleUpload(){
      	this.uploadData.dialog = true;
      	this.uploadData.title = "上传文件";
      	this.uploadData.id = '';
      },
		},
	}
</script>

<style>

</style>