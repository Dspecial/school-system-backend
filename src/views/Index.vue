<template>
	<div class="index-container">
		<el-row :gutter="20">
			<!-- 资源概况 -->
			<el-col :span="12">
				<el-card>
					<h4 class="fs_18 font-weight-semibold m-0 mb-3 text-000">资源概况</h4>
					<el-row :gutter="20" type="flex">
						<template v-for="(item,index) in resources">
							<el-col :span="8" :key="index">
								<div class="text-center">
									<el-image style="width: 80px; height: 80px" :src="item.icon" fit="cover" class="img-round">
										<div slot="error" class="el-image__error img-round">
											<p class="m-0">加载失败或未上传</p>
										</div>
									</el-image>
									<span class="mt-3 d-block opacity-60">{{item.cate_name}}</span>
									<p class="m-0 mt-2 fs_24">{{item.use_counts}}/{{item.all_counts}}</p>
								</div>
							</el-col>
						</template>
					</el-row>	
				</el-card>
			</el-col>
			<!-- 其他资源概况 -->
			<el-col :span="12">
				<el-card>
					<h4 class="fs_18 font-weight-semibold m-0 mb-3 text-000">其他资源概况</h4>
					<el-row :gutter="20" type="flex">
						<template v-for="(item,index) in otherResources">
							<el-col :span="8" :key="index">
								<div class="text-center">
									<el-image style="width: 80px; height: 80px" :src="item.icon" fit="cover">
										<div slot="error" class="el-image__error img-round">
											<p class="m-0">加载失败或未上传</p>
										</div>
									</el-image>
									<span class="mt-3 d-block opacity-60">{{item.cate_name}}</span>
									<p class="m-0 mt-2 fs_24">{{item.use_counts}}/{{item.all_counts}}</p>
								</div>
							</el-col>
						</template>
					</el-row>
				</el-card>
			</el-col>
		</el-row>

		<!-- 项目汇总--状态统计 -->
		<el-card class="mt-3">
			<h4 class="fs_18 font-weight-semibold m-0 mb-3 text-000">项目汇总</h4>
			<el-row :gutter="20" type="flex">
				<template v-for="(status,index) in statusList">
					<el-col class="text-center status-item" :key="index">
						<span class="mb-2 d-inline-block opacity-60">{{status.name}}</span>
						<p class="m-0 fs_24">{{status.count}}/{{statusTotal}}</p>
					</el-col>
				</template>
			</el-row>
		</el-card>

		<el-row :gutter="20" class="mt-3">
			<!-- 维护记录 -->
			<el-col :span="12">
				<el-card :body-style="{ padding: '0px' }">
					<div class="d-flex justify-content-between align-items-center isCell">
						<h4 class="fs_18 font-weight-semibold m-0 text-000">维护记录</h4>
						<div class="tab_nav">
							<!-- <span class="ml-3 cursor-pointer text-primary" @click="moreRecord">更多</span> -->
						</div>
					</div>
					<div class="tab_content" style="padding: 20px">
						<el-table :data="handleData" :default-expand-all="true" :row-class-name="getRowClass" height="335">
							<el-table-column type="expand" label="" width="50">
								<template slot-scope="scope">
									<div class="d-flex align-items-center justify-content-between files_list" v-for="(file,index) in scope.row.files" :key="index">
										<div class="cursor-pointer view" @click="preview(file.path)" title="在线预览">
											<i class="el-icon-document mr-2"></i><span>{{file.name}}</span>
										</div>
										<div class="opacity-80">
											<i class="el-icon-view cursor-pointer view mr-3" @click="preview(file.path)"></i>
											<i class="el-icon-download cursor-pointer view" @click="downloadview(file)"></i>
										</div>
									</div>
								</template>
							</el-table-column>
							<el-table-column prop="record_number" label="记录编号" width="150"></el-table-column>
							<el-table-column prop="desc" label="所属资源" width="150">
								<template slot-scope="scope">
									<el-popover
										placement="top-start"
										title="所属资源"
										width="200"
										trigger="hover"
										:content="scope.row.resource_name">
										<span class="text-truncate" slot="reference">{{scope.row.resource_name}}</span>
									</el-popover>
								</template>
							</el-table-column>
							<el-table-column prop="title" label="标题" width="100"></el-table-column>
							<el-table-column prop="username" label="上传企业" width="150"></el-table-column>
							<el-table-column prop="createtime" label="创建时间" width="150"></el-table-column>
						</el-table>
					</div>
				</el-card>
			</el-col>

			<!-- 付款信息 -->
			<el-col :span="12">
				<el-card :body-style="{ padding: '0px' }">
					<div class="d-flex justify-content-between align-items-center isCell">
						<h4 class="fs_18 font-weight-semibold m-0 text-000">付款信息</h4>
						<div class="tab_nav">
							<template v-for="(year,index) in handleYear">
								<span :key="index" :class="['cursor-pointer ml-3',handleYearIndex == year.id?'active':'']" @click="handleYearTab(year.id)">{{year.title}}</span>
							</template> 
						</div>
					</div>
					<div class="tab_content" style="padding: 20px">
						<my-echart :id="'echarts'" :data="option" height="335px"></my-echart>
					</div>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import BaseEcharts from "@/components/echarts/BaseEcharts"
	export default {
		name: 'Index.vue',
		components: {
			"my-echart":BaseEcharts
		},
		data () {
			return {
				// 资源概况
				resources:[],
				// 其他资源状况
				otherResources:[],
				// 项目汇总--状态统计
				statusList:[],

				// 维护记录
				handleData: [],

				// 付款信息Tab
				handleYear:[
					{
						id:"",
						title:"总计",
					},
					{
						id:new Date().getFullYear(),
						title:new Date().getFullYear() + '年',
					},
					{
						id:new Date().getFullYear()-1,
						title:new Date().getFullYear()-1 + '年',
					},
					{
						id:new Date().getFullYear()-2,
						title:new Date().getFullYear()-2 + '年',
					},
				],
				// 默认选中的年份tab
				handleYearIndex:new Date().getFullYear(),
				// 图
				option:{
					title: {
            text: '项目合同总金额',
            subtext:"\n100000 元",
            x: 'center',
            y: '125',
            textStyle: {
              fontStyle: 'normal', //字体风格,'normal','italic','oblique'
              fontWeight: '500', //字体粗细
              fontSize: 14,
            },
            subtextStyle:{
            	color: '#032F99',
              fontWeight: '500', //字体粗细
              fontSize: 20,
            },
          },
			    tooltip: {
		        trigger: 'item',
		        formatter: '{a} <br/>{b} : {c} ({d}%)'
			    },
			    legend: {
		        orient: 'horizontal',
		        x: 'center',
		        bottom: '0',
		        icon: 'circle',
		        itemWidth: 10,
		        data: ['未付款', '已付款']
			    },
			    series: [
		        {
	            name: '金额',
	            type: 'pie',
	            radius: ['50%', '70%'],
	            center: ['50%', '48%'],
	            label: {
                formatter: `{b|{b}：}{c} 元 {per|{d}%}`,
                fontSize: 16,
                rich: {
                  per: {
                    color: '#eee',
                    backgroundColor: '#334455',
                    padding: [6, 6],
                    borderRadius: 4,
                  }
                }
            	},
	            data: [
                {value: 7000, name: '未付款'},
                {value: 3000, name: '已付款'},
	            ],
	            hoverOffset:5,
	            emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
	            }
		        }
			    ]
				},
			}
		},

		mounted(){
			this.initResource();
			this.initRecord();
			this.initState();
			this.initPay(this.handleYearIndex);
		},
		methods:{
			// 获取首页资源
			initResource(){
				this.$api.dashboard_resource({
				}).then(data=>{
					if(data.code == 0){
						this.resources = data.data.cate_list_1;
						this.otherResources = data.data.cate_list_2;
					}else{
						this.$message.error(data.msg);
					}
				})
			},
			// 获取项目汇总-状态统计
			initState(){
				this.$api.dashboard_state({
				}).then(data=>{
					if(data.code == 0){
						this.statusTotal = data.data.all_count;
						this.statusList = data.data.project_node_list;
					}else{
						this.$message.error(data.msg);
					}
				})
			},
			
			// 更多
			moreRecord(){
				// this.$router.push({ 
				// 	path:"/works/routine"
				// });
			},

			indexMethod(index) { //自增序列
        return ++index;
      },

			// 获取维护记录
			initRecord(){
				this.$api.dashboard_record({
				}).then(data=>{
					if(data.code == 0){
						this.handleData = data.data;
					}else{
						this.$message.error(data.msg);
					}
				})
			},

			// 判断表格是否有子项，无子项不显示展开按钮
			getRowClass (row) {
				if (row.row.is_pay == 1) {
					return 'row-expand-cover'
				}
			},

			// 年份tab
			handleYearTab(year){
				this.handleYearIndex = year; 
				this.initPay(year);
			},
			// 获取首页获取付款信息
			initPay(year){
				this.$api.dashboard_pay({
					year:year
				}).then(data=>{
					if(data.code == 0){
						this.option = {
							title:{
								subtext:'\n' + data.data.all_money + '元'
							},
							series:[{
								data:data.data.name_value
							}],
						};
					}else{
						this.$message.error(data.msg);
					}
				})
			},
		},
	}
</script>

<style>

</style>