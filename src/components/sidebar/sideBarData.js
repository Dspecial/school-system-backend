/*
* @Author: dxx
* @Email: dxxtalking@163.com
* @Date:   2020-12-24 11:19:21
* @Last Modified by:   dxx
* @Last Modified time: 2020-12-29 17:48:05
*/
export const sideBarData = {
	menu:[
		{
			id:"01",
			icon:"el-icon-house",
			name:"我的工作台",
			route:"/index",
			childs:null,
		},
		{
			id:"02",
			icon:"el-icon-edit-outline",
			name:"系统配置",
			route:"/system",
			childs:null,
		},
		{
			id:"03",
			icon:"el-icon-date",
			name:"资源管理",
			route:"/resources",
			childs:null,
		},
		{
			id:"04",
			icon:"el-icon-lock",
			name:"权限管理",
			route:"/auth",
			childs:[
				{
					id:"04-01",
					icon:"",
					name:"部门管理",
					route:"/auth/dept",
					childs:null,
				},
				{
					id:"04-02",
					icon:"",
					name:"用户管理",
					route:"/auth/user",
					childs:null,
				},
				{
					id:"04-03",
					icon:"",
					name:"角色管理",
					route:"/auth/role",
					childs:null,
				},
			],
		},
		{
			id:"05",
			icon:"el-icon-circle-check",
			name:"项目配置",
			route:"/project",
			childs:[
				{
					id:"05-01",
					icon:"",
					name:"类别配置",
					route:"/project/category",
					childs:null,
				},
				{
					id:"05-02",
					icon:"",
					name:"项目节点配置",
					route:"/project/projectnode",
					childs:null,
				},
				{
					id:"05-03",
					icon:"",
					name:"项目资源分配",
					route:"/project/distribution",
					childs:null,
				},
			],
		},
		{
			id:"06",
			icon:"icon-lan2",
			name:"审核流程管理",
			route:"/auditProcess",
			childs:null,
		},
		{
			id:"07",
			icon:"el-icon-office-building",
			name:"厂商管理",
			route:"/manufacturer",
			childs:[
				{
					id:"07-01",
					icon:"",
					name:"厂商用户管理",
					route:"/manufacturer/user",
					childs:null,
				},
				{
					id:"07-02",
					icon:"",
					name:"厂商子账号管理",
					route:"/manufacturer/sub",
					childs:null,
				},
			],
		},

		{
			id:"08",
			icon:"el-icon-message",
			name:"信息管理",
			route:"/message",
			childs:null,
		},
		{
			id:"09",
			icon:"el-icon-document",
			name:"文档资源管理",
			route:"/document",
			childs:null,
		},
		{
			id:"10",
			icon:"icon-coin-yen",
			name:"经费管理",
			route:"/outlay",
			childs:null,
		},
		{
			id:"11",
			icon:"el-icon-postcard",
			name:"日志管理",
			route:"/log",
			childs:null,
		},
		{
			id:"11",
			icon:"el-icon-info",
			name:"版本管理",
			route:"/version",
			childs:null,
		},
	],
}