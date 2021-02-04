/**
* @Author: dxx
* @Email: dxxtalking@163.com
* @Date:   2021-01-15 16:11:11
* @Last Modified by:   dxx
* @Last Modified time: 2021-02-04 18:12:11
*/

import {post,postJson} from '@/core/axios.js';

export default {
	// 登录
	login: p => post('/backstage/login/login', p),
	// 菜单
	menu: p => post('/backstage/menu/index', p),

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

	/*
		***后台权限管理
	 */
	// 人员列表
	userList: p => post('/backstage/adminauth.admin/index', p),
	// 编辑人员列表
	userEdit: p => post('/backstage/adminauth.admin/edit', p),
	// 新增人员列表
	userAdd: p => post('/backstage/adminauth.admin/add', p),

	// 角色列表
	roleList: p => post('/backstage/adminauth.group/index', p),
	// 编辑角色
	roleEdit: p => post('/backstage/adminauth.group/edit', p),
	// 新增角色
	roleAdd: p => post('/backstage/adminauth.group/add', p),
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
		***客户端权限管理
	 */
	// 人员列表(没对完)
	c_userList: p => post('/backstage/auth.admin/index', p),
	// 编辑人员列表
	c_userEdit: p => post('/backstage/auth.admin/edit', p),
	// 新增人员列表
	c_userAdd: p => post('/backstage/auth.admin/add', p),

	// 角色列表(没对呢)
	c_roleList: p => post('/backstage/auth.group/index', p),
	// 编辑角色
	c_roleEdit: p => post('/backstage/auth.group/edit', p),
	// 新增角色
	c_roleAdd: p => post('/backstage/auth.group/add', p),
	// 上级角色列表
	c_roleParent: p => post('/backstage/ajax/get_auth_group_list', p),
	// 获取对应角色的权限列表
	c_roleAuth: p => post('/backstage/ajax/get_auth_group_rule', p),

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
	// 分类管理列表(没对完)
	kl_categoryList: p => post('/backstage/knowledge.category/index', p),
	// 获取知识库可用列表
	kl_categoryUseList: p => post('/backstage/ajax/get_use_knowledge_category', p),
}