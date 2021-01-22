/**
* @Author: dxx
* @Email: dxxtalking@163.com
* @Date:   2021-01-15 16:11:11
* @Last Modified by:   dxx
* @Last Modified time: 2021-01-22 16:06:51
*/

import {post,postJson} from '@/core/axios.js';

export default {
	// 登录
	login: p => post('/backstage/login/login', p),
}