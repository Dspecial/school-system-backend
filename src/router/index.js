import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
		{
		  path: '/',
		  component: resolve => require(['@/views/Home'], resolve),
		  name: 'Home',
		  redirect: '/index',
		  meta: {
		    title: '主页'
		  },
		  children: [
		  	{
				  path: '/index',
				  component: resolve => require(['@/views/Index'], resolve),
				  name: 'Index',
				  meta: {
				    title: '工作台'
				  },
				  children: null
				},
				{
				  path: '/system',
				  component: resolve => require(['@/views/system/System'], resolve),
				  name: 'System',
				  meta: {
				    title: '系统配置'
				  },
				  children: null
				},
				{
				  path: '/resources',
				  component: resolve => require(['@/views/resources/Resources'], resolve),
				  name: 'Resources',
				  meta: {
				    title: '资源管理'
				  },
				  children: null
				},
				{
				  path: '/auth/dept',
				  component: resolve => require(['@/views/auth/Dept'], resolve),
				  name: 'Dept',
				  meta: {
				    title: '部门管理'
				  },
				  children: null
				},
				{
				  path: '/auth/user',
				  component: resolve => require(['@/views/auth/User'], resolve),
				  name: 'user',
				  meta: {
				    title: '用户管理'
				  },
				  children: null
				},
				{
				  path: '/auth/role',
				  component: resolve => require(['@/views/auth/Role'], resolve),
				  name: 'Role',
				  meta: {
				    title: '角色管理'
				  },
				  children: null
				},
				{
				  path: '/project/category',
				  component: resolve => require(['@/views/project/Category'], resolve),
				  name: 'Category',
				  meta: {
				    title: '类别配置'
				  },
				  children: null
				},
				{
				  path: '/project/projectnode',
				  component: resolve => require(['@/views/project/Projectnode'], resolve),
				  name: 'Projectnode',
				  meta: {
				    title: '项目节点配置'
				  },
				  children: null
				},
				{
				  path: '/project/distribution',
				  component: resolve => require(['@/views/project/Distribution'], resolve),
				  name: 'Distribution',
				  meta: {
				    title: '项目资源分配'
				  },
				  children: null
				},
				{
				  path: '/auditProcess',
				  component: resolve => require(['@/views/auditProcess/AuditProcess'], resolve),
				  name: 'AuditProcess',
				  meta: {
				    title: '审核流程管理'
				  },
				  children: null
				},
				{
				  path: '/manufacturer/user',
				  component: resolve => require(['@/views/manufacturer/ManufacturerUser'], resolve),
				  name: 'ManufacturerUser',
				  meta: {
				    title: '厂商用户管理'
				  },
				  children: null
				},
				{
				  path: '/manufacturer/sub',
				  component: resolve => require(['@/views/manufacturer/ManufacturerSub'], resolve),
				  name: 'ManufacturerUser',
				  meta: {
				    title: '厂商子账号管理'
				  },
				  children: null
				},
				{
				  path: '/message',
				  component: resolve => require(['@/views/message/Message'], resolve),
				  name: 'Message',
				  meta: {
				    title: '信息管理'
				  },
				  children: null
				},
				{
				  path: '/document',
				  component: resolve => require(['@/views/document/Document'], resolve),
				  name: 'Document',
				  meta: {
				    title: '文档管理设置'
				  },
				  children: null
				},
				{
				  path: '/funds',
				  component: resolve => require(['@/views/funds/Funds'], resolve),
				  name: 'Funds',
				  meta: {
				    title: '经费管理'
				  },
				  children: null
				},
				{
				  path: '/log',
				  component: resolve => require(['@/views/log/Log'], resolve),
				  name: 'Log',
				  meta: {
				    title: '日志管理'
				  },
				  children: null
				},
				{
				  path: '/version',
				  component: resolve => require(['@/views/version/Version'], resolve),
				  name: 'Version',
				  meta: {
				    title: '版本管理'
				  },
				  children: null
				},
		  ],
		}
  ]
})
