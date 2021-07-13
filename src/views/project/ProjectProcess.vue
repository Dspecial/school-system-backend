<template>
	<div class="user-container">
		<!-- 登录信息 -->
    <global-tips></global-tips>
    <Breadcrumb></Breadcrumb>
    <!-- 项目流程 -->
    <el-card class="mt-3">
      <div class="mb-3">
        <h4 class="fs_18 font-weight-semibold m-0 text-000 mb-3">项目流程</h4>
      </div>
      <div v-for="(process,index) in processData" :key="index" class="mb-3">
        <p class="fs_16 mb-3"><span>{{index + 1}}、</span>{{process.name}}</p>
        <el-table :data="process.list" row-class-name="process_cell" :default-expand-all="false" row-key="id" :tree-props="{children: 'check_process', hasChildren: 'hasChildren'}">
          <el-table-column prop="record_number" label="角色组">
            <template slot-scope="scope">
              <el-select v-model="scope.row.rule_id" clearable filterable placeholder="请选择角色" class="w-100" 
              @change="ruleChange(scope.row)">
                <el-option
                  v-for="rule in ruleList"
                  :key="rule.id"
                  :label="rule.name"
                  :value="rule.id">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="desc" label="审核人员">
            <template slot-scope="scope">
              <el-select v-model="scope.row.check_ids" clearable filterable multiple placeholder="请选择人员" class="w-90">
                <el-option
                  v-for="user in scope.row.authUser"
                  :key="user.id"
                  :label="user.name"
                  :value="user.id">
                </el-option>
              </el-select>
              <!-- 父表 -->
              <template v-if="scope.row.check_process">
                <el-button type="primary" @click="submitForm(scope.row,2)" class="ml-3" v-if="scope.row.check_process.length == 0">保 存</el-button>
              </template>
              <!-- 子表 -->
              <template v-else>
                <el-button type="primary" @click="submitForm(scope.row,3)" class="ml-3" v-if="scope.row.check_state == 1">保 存</el-button>
              </template>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="d-flex justify-content-end">
        <el-button @click="closedEdit">取 消</el-button>
      </div>
    </el-card>
	</div>
</template>

<script>
	import GlobalTips from "@/components/GlobalTips";
  import Breadcrumb from "@/components/Breadcrumb";

	export default {
		name: 'ProjectProcess',
		provide() {
      return {
        loadData: this.loadData
      }
    },
		components: {
			GlobalTips,
      Breadcrumb
		},
		data () {
			return {
        processData: [],
        ruleList:[],
			}
		},
    mounted(){
      this.loadData();
    },
		methods:{
			// 自增序列
      indexMethod(index) { 
        return ++index;
      },

      // 角色组
      initRule(){
				this.$api.c_roleList({
        }).then(data=>{
          if(data.code == 0){
          	this.ruleList = data.data;
          }else{
            this.$message.error(data.msg);
          }
        });
			},
      // 角色选择对应人员名单变化
			ruleChange(cell){
        if(cell.rule_id != cell.rule_id_old){
          // 清空已选人员
          cell.check_ids = [];
        }
        
				this.$api.auth_userList({
					group_id:cell.rule_id,
        }).then(data=>{
          if(data.code == 0){
            cell.rule_id_old = cell.rule_id
          	// authUser 重新赋值
          	this.$set(cell,'authUser',data.data);
          }else{
            this.$message.error(data.msg);
          }
        });
			},

      // 关闭编辑
			closedEdit(){
				this.$router.go(-1);//返回上一层
			},

      // 加载数据
      loadData() {
        let _this = this;
        this.initRule()
        this.$api.p_projectProcess({
          id:this.$route.query.id,
          function_type:1,
        }).then(data=>{
          if(data.code == 0){
            // 审核流程
            var nodeList = new Array;
            nodeList = data.data.node_check_list.map((item,index) =>{
              var aArray = new Array;
              aArray = item.list.map((l,i)=>{
                var bArray = new Array;
                bArray = l.check_process.map((check,j)=>{
                  return {
                    rule_id:check.rule_id,
                    rule_id_old:check.rule_id,
                    check_ids:check.check_ids.split(',').map(Number),
                    id:check.id,
                    function_id:check.function_id,
                    check_state:check.check_state,
                  }
                })
                bArray.map((check)=>{
                  this.ruleChange(check);
                });

                return {
                  rule_id:l.rule_id,
                  rule_id_old:l.rule_id,
                  check_ids:l.check_ids.split(',').map(Number),
                  check_process:bArray,
                  name:l.name,
                  id:l.id,
                  node_id:l.node_id,
                }
              })
              aArray.map((l)=>{
                this.ruleChange(l);
              });

              return {
                list:aArray,
                name:item.name,
              };
            });
            this.processData = nodeList;
          }else{
            this.$message.error(data.msg);
          }
        });
      },
      // 提交
			submitForm(row,function_type) {
        // function_type 操作类型-必填:1=获取数据,2=保存父级数据,3=保存子级数据
        var _this = this;
        var objNew =  {
          id:row.id,
          rule_id:row.rule_id,
          check_ids:row.check_ids.join(',')
        };
        this.$api.p_projectProcess({
          id:this.$route.query.id,
          function_type:function_type,
          json_data:JSON.stringify(objNew),
        }).then((data)=>{
          if(data.code == 0){
            this.$message({
              message: data.msg,
              type: 'success'
            });
            this.loadData();
          }
        })
      },

		},
	}
</script>

<style>

</style>