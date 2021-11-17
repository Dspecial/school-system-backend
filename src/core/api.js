/*
 * @Author: dxx
 * @Email: dxxtalking@163.com
 * @Date: 2021-01-24 16:09:03
 * @LastEditors: dxx
 * @LastEditTime: 2021-11-17 15:28:57
 */

import {post,post2,postJson,postUpload} from '@/core/axios.js';

export default {
	/*
		***登录
	 */
	login: p => post2('/backstage/login/login', p),
	// 获取登录申请着的身份
	loginConfig: p => post2('/api/ajax/get_sys_config', p),

	/*
		***菜单
	 */
	// 菜单管理
	menu: p => post('/backstage/menu/index', p),
	// 获取所有的操作按钮
	menuButton: p => post('/backstage/menu/get_menu_buttom', p),

	/*
		***首页
	 */
	// 获取首页资源
	dashboard_resource: p => post2('/backstage/dashboard/get_resource_state', p),	
	// 获取最新的维护记录
	dashboard_record: p => post2('/backstage/dashboard/record', p),	
	// 获取项目汇总-项目状态数
	dashboard_state: p => post2('/backstage/dashboard/get_my_project_state', p),
	// 获取首页获取付款信息
	dashboard_pay: p => post2('/backstage/dashboard/project_pay_state', p),	

	/*
		***客户端权限管理
	 */
	// 人员列表(教师)(没对完)
	c_userList: p => post('/backstage/auth.admin/index', p),
	// 编辑人员列表(教师)
	c_userEdit: p => post('/backstage/auth.admin/edit', p),
	// 新增人员列表(教师)
	c_userAdd: p => post('/backstage/auth.admin/add', p),
	// 删除人员(教师)
	c_userDel: p => post('/backstage/auth.admin/del', p),
	// 新增人员(教师)时先调用部门列表
	c_dept: p => post('/backstage/ajax/getdepartlist', p),
	// 新增人员(教师)时根据部门选择教师
	c_user_form_dept: p => post('/backstage/ajax/get_user_for_depart', p),
	// 人员配置
	c_user_setuser: p => post('/backstage/auth.group/setuser', p),
	// 人员列表
	c_getUserList: p => post('/backstage/ajax/get_user_list', p),
	// 教师列表
	c_getTeacherList: p => post('/backstage/ajax/get_teacher_list', p),
	// 添加角色
	c_role_setusergroup: p => post('/backstage/auth.group/setusergroup', p),

	// 角色列表
	c_roleList: p => post('/backstage/auth.group/index', p),
	// 编辑角色
	c_roleEdit: p => post('/backstage/auth.group/edit', p),
	// 新增角色
	c_roleAdd: p => post('/backstage/auth.group/add', p),
	// 上级角色列表
	c_roleParent: p => post('/backstage/ajax/get_auth_group_list', p),
	// 获取对应角色的权限列表
	c_roleAuth: p => post('/backstage/ajax/get_application_auth_group_rule', p),
	// 删除角色
	c_roleDel: p => post('/backstage/auth.group/del', p),

	// 路由管理列表
	c_routerList: p => post('/backstage/auth.rule/index', p),
	// 编辑路由
	c_routerEdit: p => post('/backstage/auth.rule/edit', p),
	// 新增路由
	c_routerAdd: p => post('/backstage/auth.rule/add', p),
	// 删除路由(没有接口)
	c_routerDel: p => post('/backstage/auth.rule/del', p),


	/*
		***专家管理
	 */
	// 专家列表
	expertList: p => post('/backstage/expert.expert/index', p),
	// 新增专家列表
	expertAdd: p => post('/backstage/expert.expert/add', p),
	// 编辑专家列表
	expertEdit: p => post('/backstage/expert.expert/edit', p),

	/*
		***设置管理
	 */
	// 系统设置
	systemSetting: p => post('/backstage/system.config/index', p),
	// 资源审核角色
	system_config_group: p => post('/api/ajax/get_config_group', p),
	// 系统日志
	systemLog: p => post('/backstage/system.log/index', p),	

	/*
		***部门管理
	 */
	// 部门列表
	deptList: p => post('/backstage/department.department/index', p),


	/*
		***资源管理
	 */
	// 类别管理列表
	cateList: p => post('/backstage/resource.cate/index', p),
	// 编辑类别
	cateEdit: p => post('/backstage/resource.cate/edit', p),
	// 新增类别
	cateAdd: p => post('/backstage/resource.cate/add', p),
	// 删除类别
	cateDel: p => post('/backstage/resource.cate/del', p),
	// 获取表单参数
	cateParamsOption: p => post('/backstage/ajax/get_cate_form', p),
	// 分配参数
	setformparams: p => post('/backstage/resource.cate/setformparams', p),
	// 类别图片上传
	cateUpload: p => postUpload('/backstage/upload/upload', p),
	// 类别图片删除上传
	cateUploadDel: p => post('/backstage/upload/del_upload', p),

	// 参数管理列表
	formList: p => post('/backstage/resource.form/index', p),
	// 编辑参数
	formEdit: p => post('/backstage/resource.form/edit', p),
	// 新增参数
	formAdd: p => post('/backstage/resource.form/add', p),
	// 删除参数
	formDel: p => post('/backstage/resource.form/del', p),

	// 资源列表
	resourceList: p => post('/backstage/resource.resource/index', p),
	// 编辑资源
	resourceEdit: p => post('/backstage/resource.resource/edit', p),
	// 编辑资源时-供应商列表
	getSupplier: p => post('/backstage/ajax/get_company_supplier', p),
	// 新增资源
	resourceAdd: p => post('/backstage/resource.resource/add', p),
	// 删除资源
	resourceDel: p => post('/backstage/resource.resource/del', p),
	// 资源使用列表
	resource_useList: p => post('/backstage/resource.resource/use_list', p),
	// 回收资源
	resource_reover: p => post('/backstage/resource.resource/use_resource_reover', p),

	// 资源维护记录列表
	resource_recordList: p => post('/backstage/resource.resource/record', p),

	/*
		***后台权限管理
	 */
	// 人员列表
	userList: p => post('/backstage/adminauth.admin/index', p),
	// 编辑人员列表
	userEdit: p => post('/backstage/adminauth.admin/edit', p),
	// 新增人员列表
	userAdd: p => post('/backstage/adminauth.admin/add', p),
	// 修改人员状态
	changeUserState: p => post('/backstage/adminauth.admin/change_normal', p),

	// 角色列表
	roleList: p => post('/backstage/adminauth.group/index', p),
	// 编辑角色
	roleEdit: p => post('/backstage/adminauth.group/edit', p),
	// 新增角色
	roleAdd: p => post('/backstage/adminauth.group/add', p),
	// 删除角色
	roleDel: p => post('/backstage/adminauth.group/del', p),
	// 上级角色列表
	roleParent: p => post('/backstage/ajax/get_admin_auth_group_list', p),
	// 获取对应角色的权限列表
	roleAuth: p => post('/backstage/ajax/get_admin_auth_group_rule', p),

	// 路由管理列表
	routerList: p => post('/backstage/adminauth.rule/index', p),
	// 编辑路由
	routerEdit: p => post('/backstage/adminauth.rule/edit', p),
	// 新增路由
	routerAdd: p => post('/backstage/adminauth.rule/add', p),


	/*
		***项目配置
	 */
	// 项目类别列表
	p_categoryList: p => post('/backstage/project.category/index', p),
	// 获取参数
	p_category_form: p => post('/backstage/ajax/get_project_cate_form', p),
	// 编辑项目类别
	p_categoryEdit: p => post('/backstage/project.category/edit', p),
	// 新增项目类别
	p_categoryAdd: p => post('/backstage/project.category/add', p),
	// 删除项目类别
	p_categoryDel: p => post('/backstage/project.category/del', p),
	// 添加经费 (以下三个都是从部门管理挪过来的)
	addFund: p => post('/backstage/funds.funds/add', p),
	// 预算列表
	budgetList: p => post('/backstage/funds.funds/index', p),
	// 使用明细
	budgetUseDetails: p => post('/backstage/project.category/commission_list', p),

	// 项目审核流程列表
	p_flowList: p => post('/backstage/project.flow/index', p),
	// 编辑项目审核流程
	p_flowEdit: p => post('/backstage/project.flow/edit', p),
	// 新增项目审核流程
	p_flowAdd: p => post('/backstage/project.flow/add', p),
	// 删除项目审核流程
	p_flowDel: p => post('/backstage/project.flow/del', p),

	// 节点列表
	p_nodeList: p => post('/backstage/project.node/index', p),
	// 新增项目选了角色后的人员
	auth_userList: p=> post('/backstage/ajax/get_auth_group_user',p),

	// 验收配置
	p_accpetConfig: p=> post('/backstage/project.accept/index',p),
	// 新增验收配置
	p_accpetConfigAdd: p=> post('/backstage/project.accept/add',p),
	// 编辑验收配置
	p_accpetConfigEdit: p=> post('/backstage/project.accept/edit',p),
	// 删除验收配置
	p_accpetConfigDel: p=> post('/backstage/project.accept/del',p),

	// 参数设置
	p_cateformsList: p => post('/backstage/project.cateforms/index', p),
	// 新增参数
	p_cateformsAdd: p => post('/backstage/project.cateforms/add', p),
	// 编辑参数
	p_cateformsEdit: p => post('/backstage/project.cateforms/edit', p),
	// 更改状态
	p_cateformsStatus: p => post('/backstage/project.cateforms/tranform', p),

	// 项目列表
	p_projectList: p => post('/backstage/project.project/index', p),
	// 新增项目
	p_projectAdd: p => post('/backstage/project.project/add', p),
	// 获取部门
	p_project_dept: p => post('/backstage/ajax/getdepartlist', p),
	// 根据部门id获取教师列表
	p_project_dept_user: p => post('/backstage/ajax/get_user_list_by_department', p),
	// 获取项目类别
	p_project_cate: p => post('/backstage/ajax/get_project_cate_list', p),
	// 根据项目类别id获取表单
	p_project_cate_forms: p => post('/backstage/ajax/get_project_forms', p),
	// 获取企业列表
	p_project_company: p => post('/api/ajax/get_company_list', p),
	// 表单中文件上传
	p_upload: p => postUpload('/backstage/upload/upload', p),
	// 表单中文件上传后删除
	p_uploadDel: p => post('/backstage/upload/del_upload', p),
	// 上传付款附件或凭证
	p_uploadPayNode: p => postUpload('/api/upload/upload_pay_file', p),
	// 删除项目
	p_projectDel: p => post('/backstage/project.project/del', p),
	// 编辑项目
	p_projectEdit: p => post('/backstage/project.project/edit', p),
	// 项目详情
	p_projectDetail: p => post('/backstage/project.project/details', p),
	// 文件预览
	file_preview: p => post('/api/ajax/preview', p),
	// 项目审核流程设置
	p_projectProcess: p => post('/backstage/project.project/get_process_check', p),	
	// 项目审核角色
	p_group_rule: p => post('/backstage/ajax/get_check_group', p),	
	// 项目审核人员
	p_group_rule_user: p => post('/backstage/ajax/get_check_group_by_group ', p),

	// 流程节点管理
	p_processNode: p => post('/backstage/project.node/index', p),	
	// 流程节点编辑
	p_processNodeEdit: p => post('/backstage/project.node/edit', p),	

	// 维保列表
	p_maintenance: p => post('/backstage/project.maintenance/index', p), 
	// 项目维保-根据项目获取信息
	p_funds: p => post('/api/ajax/get_funds_by_project', p),
	// 维保编辑
	p_maintenance_edit: p => post('/backstage/project.maintenance/edit', p),
	// 维保上传文件
	p_maintenance_upload: p => postUpload('/api/upload/upload_extend_attach', p),
	// 维保上传文件删除
	p_maintenance_uploadDel: p => post('/api/upload/del_upload', p),
	// 维保详情
	p_maintenance_detail: p => post('/backstage/project.maintenance/details', p),

	

	/*
		***厂商管理
	 */
	// 厂商列表
	companyList: p => post('/backstage/company.company/index', p),
	// 编辑厂商
	companyEdit: p => post('/backstage/company.company/edit', p),
	// 新增厂商
	companyAdd: p => post('/backstage/company.company/add', p),
	// 删除厂商
	companyDel: p => post('/backstage/company.company/del', p),
	// 厂商角色列表
	companyRole: p => post('/backstage/ajax/get_auth_group_list', p),

	// 供应商列表
	supplierList: p => post('/backstage/company.supplier/index', p),
	// 编辑供应商
	supplierEdit: p => post('/backstage/company.supplier/edit', p),
	// 新增供应商
	supplierAdd: p => post('/backstage/company.supplier/add', p),
	// 删除供应商
	supplierDel: p => post('/backstage/company.supplier/del', p),
	// 供应商可用列表
	// supplierRole: p => post('/backstage/ajax/get_company_supplier', p),
	

	/*
		***知识库管理
	 */
	// 分类管理列表
	kl_categoryList: p => post('/backstage/knowledge.category/index', p),
	// 获取知识库可用列表
	kl_categoryUseList: p => post('/backstage/ajax/get_use_knowledge_category', p),
	// 编辑分类
	kl_categoryEdit: p => post('/backstage/knowledge.category/edit', p),
	// 新增分类
	kl_categoryAdd: p => post('/backstage/knowledge.category/add', p),
	// 删除分类
	kl_categoryDel: p => post('/backstage/knowledge.category/del', p),

	// 内容管理列表
	kl_contentList: p => post('/backstage/knowledge.knowledge/index', p),
	// 编辑内容
	kl_contentEdit: p => post('/backstage/knowledge.knowledge/edit', p),
	// 新增内容
	kl_contentAdd: p => post('/backstage/knowledge.knowledge/add', p),
	// 删除内容
	kl_contentDel: p => post('/backstage/knowledge.knowledge/del', p),
	// 内容上传
	kl_contentUpload: p => postUpload('/backstage/upload/upload_knowledge', p),
	// 内容文件删除
	kl_contentUploadDel: p => post('/backstage/upload/del_upload', p),
}