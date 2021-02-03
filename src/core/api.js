/**
* @Author: dxx
* @Email: dxxtalking@163.com
* @Date:   2021-01-15 16:11:11
* @Last Modified by:   dxx
* @Last Modified time: 2021-02-03 19:13:42
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
	// 编辑角色（没对完）
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
		***厂商管理
	 */
	// 厂商列表(没对完)
	companyList: p => post('/backstage/auth.company/index', p),
	// 编辑厂商
	companyEdit: p => post('/backstage/auth.company/edit', p),
	// 新增厂商
	companyAdd: p => post('/backstage/auth.company/add', p),
	// 删除厂商
	companyDel: p => post('/backstage/auth.company/del', p),

	// 供应商列表(没对完)
	supplierList: p => post('/backstage/auth.supplier/index', p),
	// 编辑供应商
	supplierEdit: p => post('/backstage/auth.supplier/edit', p),
	// 新增供应商
	supplierAdd: p => post('/backstage/auth.supplier/add', p),
	// 删除供应商
	supplierDel: p => post('/backstage/auth.supplier/del', p),

}