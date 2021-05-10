<template>
	<div class="user-container">
		<!-- 登录信息 -->
    <global-tips></global-tips>
    <!-- 系统设置 -->
    <el-tabs type="border-card" class="mt-3">
      <template v-for="(tab,index) in systemTabs">
        <el-tab-pane :label="tab.group_name" :key="index">
          <el-form :ref="'form'+ index" :model="tabsForm[index]" label-width="150px" label-position="left">
            <template v-for="(item,j) in tab.list">
              <el-form-item :label="item.title" :key="j" :prop="item.name" :required="item.is_required == 'required'">
                <template v-if="item.type == 'string'">
                  <el-input v-model="item.value" :placeholder="item.placeholder"></el-input>
                </template>
                <template v-if="item.type == 'switch'">
                  <el-switch v-model="item.value"
                    active-value="true"
                    inactive-value="false">
                  </el-switch>
                </template>
                <template v-if="item.type == 'select_check'">
                  <el-select v-model.trim="item.value" :placeholder="item.placeholder" class="w-100">
                    <el-option v-for="(opt,z) in examineOption" :key="z" :label="opt.name" :value="opt.id.toString()"></el-option>
                  </el-select>
                </template>
                <template v-if="item.type == 'select'">
                  <el-select v-model.trim="item.value" :placeholder="item.placeholder" class="w-100">
                    <el-option v-for="(opt,z) in item.extra" :key="z" :label="opt" :value="z.toString()"></el-option>
                  </el-select>
                </template>
              </el-form-item>
            </template>

            <el-form-item>
              <el-button type="primary" @click="onSubmit(tab.list)">确定</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </template>
    </el-tabs>
	</div>
</template>

<script>
	import GlobalTips from "@/components/GlobalTips";
	export default {
		name: 'SystemSetting',
		components: {
			GlobalTips,
		},
		data () {
			return {
        // tabs
        systemTabs:[
          {},
        ],
        // tabsForm
        tabsForm:[
          {},
        ],
        // 资源审核角色
        examineOption:[],
			}
		},
    mounted(){
      this.loadData();
    },
		methods:{
      // 获取资源审核角色
      initExamine(){
        this.$api.system_config_group({
        }).then(data=>{
          if(data.code == 0){
            this.examineOption = data.data;
          }
        })
      },
      // 加载数据
      loadData(queryInfo) { 
        let _this = this;
        if (queryInfo != null) {
          this.currentPage = queryInfo.page;
          this.pageSize = queryInfo.pageSize;
        }
        this.$api.systemSetting({
          function_type:""
        }).then(data=>{
          if(data.code == 0){
            this.systemTabs = data.data;
            this.initExamine();
          }else{
            this.$message.error(data.msg);
          }
        });
      },

      // 提交
      onSubmit(form){
        var json = {};
        form.map((item)=>{
          json[item.name] = `${item.value}`;
        });
        json.function_type = 2;
        console.log(json,'json');
        this.$api.systemSetting(json).then(data=>{
          if(data.code == 0){
            this.$message({
              message: data.msg,
              type: 'success'
            });
            this.loadData();
          }else{
            this.$message.error(data.msg);
          }
        });
      },

		},
	}
</script>

<style>

</style>