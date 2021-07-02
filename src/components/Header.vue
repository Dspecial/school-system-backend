<template>
	<div class="page-header h-100 d-flex align-items-center">
		<div class="ml-auto d-flex align-items-center">
      <div class="d-flex align-items-center ml-4">
        <el-dropdown trigger="click">
          <div class="d-flex align-items-center">
      	    <el-avatar :size="28" :src="avatarUrl"></el-avatar><span class="fs_14 ml-2">{{name}}</span>
          </div>
          <el-dropdown-menu slot="dropdown">
            <div @click="logOut"><el-dropdown-item><i class="el-icon-user-solid fs_16"></i>退出登录</el-dropdown-item></div>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
	</div>
</template>

<script>
	export default {
		name: 'Header',
		data () {
			return {
				// 消息列表
				totalNews:[
          {
           status:"0",//0:消息通知；1:报警
           content:"京A-888888 需要保养"
          },
          {
           status:"1",//0:消息通知；1:报警
           content:"京A-888888 未系安全带"
          },
          {
           status:"0",//0:消息通知；1:报警
           content:"京A-123456 需要保养"
          },
          {
           status:"1",//0:消息通知；1:报警
           content:"京A-888888 与 京A-123456 发生碰撞"
          },
        ],
        // 头像
        avatarUrl:require("@/assets/images/avatar.jpg"),
        name:this.$cookies.get('userName'),
			}
		},
		components: {},
    methods:{
      logOut(){
        this.$router.push("/login");
        this.$cookies.remove("token");
      }
    },

	}
</script>

<style>

</style>