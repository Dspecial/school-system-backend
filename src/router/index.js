import Vue from 'vue'
import Router from 'vue-router'
import VueCookies from 'vue-cookies';

Vue.use(Router)

const router = new Router({
  routes: [
  	{
      path: '*',
      hidden: true,
      component: ()=>import('@/views/404'),
      name: 'notFound',
      hidden: true,
		  meta: {
		    title: '404'
		  },
    },
    {
  		path: '/',
		  component: resolve => require(['@/views/Login'], resolve),
		  name: '首次进入',
		  meta: {
		    title: '登录'
		  },
  	},
  	{
  		path: '/login',
		  component: resolve => require(['@/views/Login'], resolve),
		  name: 'Login',
		  meta: {
		    title: '登录'
		  },
  	},
		{
		  path: '/home',
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

				/*
				**客户端权限管理
				 */
				{
				  path: '/authClient/user',
				  component: resolve => require(['@/views/authClient/User'], resolve),
				  name: 'ClientUser',
				  meta: {
				    title: '客户端用户（教师）'
				  },
				  children: null
				},
				{
				  path: '/authClient/role',
				  component: resolve => require(['@/views/authClient/Role'], resolve),
				  name: 'ClientRole',
				  meta: {
				    title: '客户端角色'
				  },
				  children: null
				},
				{
				  path: '/authClient/router',
				  component: resolve => require(['@/views/authClient/Router'], resolve),
				  name: 'ClientRouter',
				  meta: {
				    title: '客户端路由'
				  },
				  children: null
				},

				/*
				**专家管理
				 */
				{
				  path: '/expert/expert',
				  component: resolve => require(['@/views/expert/Expert'], resolve),
				  name: 'expertList',
				  meta: {
				    title: '专家列表'
				  },
				  children: null
				},

				/*
				**设置管理
				 */
				// 系统设置
				{
				  path: '/setting/systemSetting',
				  component: resolve => require(['@/views/setting/SystemSetting'], resolve),
				  name: 'systemSettingList',
				  meta: {
				    title: '系统设置'
				  },
				  children: null
				},

				/*
				**部门管理
				 */
				// 部门列表
				{
				  path: '/department/department',
				  component: resolve => require(['@/views/department/Department'], resolve),
				  name: 'departmentList',
				  meta: {
				    title: '部门列表'
				  },
				  children: null
				},

				/*
				**资源管理
				 */
				{
				  path: '/resources/cate',
				  component: resolve => require(['@/views/resources/Cate'], resolve),
				  name: 'Cate',
				  meta: {
				    title: '类别管理'
				  },
				  children: null
				},
				{
				  path: '/resources/form',
				  component: resolve => require(['@/views/resources/Form'], resolve),
				  name: 'Form',
				  meta: {
				    title: '参数设置'
				  },
				  children: null
				},
				{
				  path: '/resources/resource',
				  component: resolve => require(['@/views/resources/Resource'], resolve),
				  name: 'Resource',
				  meta: {
				    title: '资源列表'
				  },
				  children: null
				},

				/*
				**后台权限管理
				 */
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
				  path: '/auth/router',
				  component: resolve => require(['@/views/auth/Router'], resolve),
				  name: 'Router',
				  meta: {
				    title: '路由管理'
				  },
				  children: null
				},

				/*
				**项目管理
				 */
				{
				  path: '/project/category',
				  component: resolve => require(['@/views/project/category/Category'], resolve),
				  name: 'Category',
				  meta: {
				    title: '类别配置'
				  },
				  children: null
				},
				{
				  path: '/project/category/accept',
				  component: resolve => require(['@/views/project/category/AcceptanceConfig'], resolve),
				  name: 'AcceptanceConfig',
				  meta: {
				    title: '验收配置'
				  },
				  children: null
				},
				{
				  path: '/project/auditProcess',
				  component: resolve => require(['@/views/project/Auditprocess'], resolve),
				  name: 'Auditprocess',
				  meta: {
				    title: '审核流程管理'
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
				  path: '/project/cateforms',
				  component: resolve => require(['@/views/project/Cateforms'], resolve),
				  name: 'Cateforms',
				  meta: {
				    title: '参数设置'
				  },
				  children: null
				},
				{
				  path: '/project/project',
				  component: resolve => require(['@/views/project/Project'], resolve),
				  name: 'Project',
				  meta: {
				    title: '项目列表'
				  },
				  children: null
				},

				/*
				**厂商管理
				 */
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
				  name: 'ManufacturerSub',
				  meta: {
				    title: '厂商子账号管理'
				  },
				  children: null
				},
				{
				  path: '/manufacturer/supplier',
				  component: resolve => require(['@/views/manufacturer/ManufacturerSupplier'], resolve),
				  name: 'ManufacturerSupplier',
				  meta: {
				    title: '供应商管理'
				  },
				  children: null
				},

				/*
				**知识库管理
				 */
				{
				  path: '/knowledge/category',
				  component: resolve => require(['@/views/knowledge/Category'], resolve),
				  name: 'KnowledgeCategory',
				  meta: {
				    title: '知识库分类列表'
				  },
				  children: null
				},
				{
				  path: '/knowledge/content',
				  component: resolve => require(['@/views/knowledge/Content'], resolve),
				  name: 'KnowledgeContent',
				  meta: {
				    title: '知识库内容列表'
				  },
				  children: null
				},

				/*
				**信息管理
				 */
				{
				  path: '/message',
				  component: resolve => require(['@/views/message/Message'], resolve),
				  name: 'Message',
				  meta: {
				    title: '信息管理'
				  },
				  children: null
				},

				/*
				**文档管理
				 */
				{
				  path: '/document',
				  component: resolve => require(['@/views/document/Document'], resolve),
				  name: 'Document',
				  meta: {
				    title: '文档管理设置'
				  },
				  children: null
				},

				/*
				**经费管理
				 */
				{
				  path: '/funds',
				  component: resolve => require(['@/views/funds/Funds'], resolve),
				  name: 'Funds',
				  meta: {
				    title: '经费管理'
				  },
				  children: null
				},

				/*
				**日志管理
				 */
				{
				  path: '/log',
				  component: resolve => require(['@/views/log/Log'], resolve),
				  name: 'Log',
				  meta: {
				    title: '日志管理'
				  },
				  children: null
				},

				/*
				**版本管理
				 */
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

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  if (to.path === '/' || to.path === '/login') {
    next();
  } else {
    let token = VueCookies.get('token');
    if (token === null || token === '') {
      next({
      	path:'/login',
      	query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      });
    } else {
      next();
    }
  }
});

export default router;
