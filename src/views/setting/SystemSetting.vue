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
              <el-form-item :label="item.title" :key="j" :prop="item.name">
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
                  <el-select class="w-100" popper-class="params_select" 
                    v-model="item.value" 
                    clearable 
                    filterable
                    :filter-method="getHosterList"
                    :placeholder="item.placeholder"
                    @clear="selectHosterClear">
                    <el-option
                      v-for="item in pusherIdOptions"
                      :key="item.id.toString()"
                      :label="item.name"
                      :value="item.id.toString()">
                      {{item.name + '---' +item.job_number + '---' +item.depart_name}}
                    </el-option>
                    <el-pagination
                      class="text-center"
                      small
                      @size-change="sizeHosterChange"
                      @current-change="currentHosterChange"
                      :current-page.sync="currentHosterPage"
                      :total="totalHoster"
                      :page-size.sync="pageHosterSize"
                      layout="prev,pager,next,total"
                      >
                    </el-pagination>
                  </el-select>
                </template>
                <template v-if="item.type == 'select'">
                  <el-select v-model.trim="item.value" :placeholder="item.placeholder" class="w-100" clearable>
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
        // 自定义推送人
				pusherIdOptions:[],
				totalHoster: 0, //总条数
        currentHosterPage: 1, //当前页
        pageHosterSize: 8, //每页显示条数
				pusherId_query:"",
			}
		},
    mounted(){
      this.loadData();
    },
		methods:{
      // 获取自定义推送人列表
			getHosterList(query){
				this.pusherId_query = query;
				this.$api.c_getTeacherList({
					page:this.currentHosterPage,
          limit:this.pageHosterSize,
					keywords:query,
					type:1,
        }).then(data=>{
          if(data.code == 0){
						this.totalHoster = data.data.total;
            this.pusherIdOptions = data.data.data;
          }else{
            this.$message.error(data.msg);
          }
        });
			},
			// 每页显示的条数改变
			sizeHosterChange() {
				this.currentHosterPage = 1;
				this.getHosterList();
			},
			// current-change用于监听页数改变，而内容也发生改变
			currentHosterChange(){
				this.getHosterList(this.pusherId_query);
			},
			selectHosterClear(){
				this.currentHosterPage = 1;
				this.pusherId_query = "";
				this.getHosterList();
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
            // 人员
            this.$api.c_getTeacherList({// 展示所有的人员，不分页
            }).then(data=>{
              if(data.code == 0){
                // 先获取所有的数据
                this.pusherIdOptions = data.data;
                // 再分页获取
                this.selectHosterClear();
              }else{
                this.$message.error(data.msg);
              }
            });
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