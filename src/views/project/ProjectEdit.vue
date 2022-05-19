<template>
	<div class="project_edit">
		<!-- 新建初始项目 -->
		<projectEdit-init v-if="$route.query.type == 1"></projectEdit-init>
		<!-- 新建完成项目 -->
		<projectEdit-complete v-if="$route.query.type == 2"></projectEdit-complete>
	</div>
</template>

<script>
	import GlobalTips from "@/components/GlobalTips";
	import Breadcrumb from "@/components/Breadcrumb";
	import ProjectEditInit from "./ProjectEditInit";
	import ProjectEditComplete from "./ProjectEditComplete";
	export default {
		name: 'ProjectEdit',
		data () {
			return {
				
			}
		},
		components: {
			GlobalTips,
			Breadcrumb,
			ProjectEditInit,
			ProjectEditComplete,
		},
		mounted(){

		},
		methods:{
			
		}
	}
</script>

<style>

</style>