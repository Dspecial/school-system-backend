/**
* @Author: dxx
* @Email: dxxtalking@163.com
* @Date:   2021-01-15 16:11:11
* @Last Modified by:   dxx
* @Last Modified time: 2021-01-25 16:33:14
*/

import {post,postJson} from '@/core/axios.js';

export default {
	// 登录
	login: p => post('/backstage/login/login', p),
	// 菜单
	menu: p => post('/backstage/menu/index', p),
	// 路由管理
	router: p => post('/backstage/adminauth.rule/index', p),
}