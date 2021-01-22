<template>
	<div class="login-container h-100">
		<div class="w-50 login d-flex">
			<div class="login-left">
				<el-image :src="loginBg" fit="fill" class="h-100"></el-image>
			</div>
			<div class="login-right">
				<el-form ref="loginForm" :model="loginForm" :rules="rules" label-width="0" class="login-box" size="large">
	        <div class="login-header mb-5">
	          <p class="fs_28 text-000 text-center">账号登录</p>
	        </div>
	        <el-form-item prop="username">
	          <el-input placeholder="账号" prefix-icon="el-icon-user-solid" v-model="loginForm.username" autocomplete="off">
	          </el-input>
	        </el-form-item>
	        <el-form-item prop="password">
	          <el-input :type="pwdType" placeholder="密码" prefix-icon="el-icon-lock" v-model="loginForm.password" autocomplete="off" @keyup.enter.native ="onSubmit('loginFrom')">
	            <i slot="suffix" :class="['el-input__icon icon cursor-pointer',suffixIcon]" @click="showPwd"></i>
	          </el-input>
	        </el-form-item>
	        <el-checkbox v-model="rememberPwd">记住密码</el-checkbox>
	        <el-form-item>
	          <el-button type="primary" class="w-100 fs_16 mt-5" @click="onSubmit('loginForm')">登录</el-button>
	        </el-form-item>
	      </el-form>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Login',
		components: {},
		data () {
			return {
				loginBg:require('@/assets/images/login_bg.png'),
				loginForm: {
          username: '',
          password: ''
        },
        pwdType:"password",
        suffixIcon:'icon-eye2',
        rememberPwd:true,
        rules:{
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
          password:[
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
        },
			}
		},
		created() {
      let that = this;
      document.onkeydown = function(e) {
        var key = window.event.keyCode;
        if (key == 13) {
          that.onSubmit();
        }
      }
    },
    mounted(){
    },
    methods:{
    	showPwd(){
        this.pwdType === 'password' ? this.pwdType = '' : this.pwdType = 'password';
        this.pwdType == '' ? this.suffixIcon = 'icon-eye-blocked2' : this.suffixIcon = 'icon-eye2';
      },
      onSubmit(formName){
        var that  = this;
        this.$refs[formName].validate((valid) => {
          if(valid){
            this.$api.login({
              name:this.loginForm.username,
              password:this.loginForm.password,
            }).then( data =>{
              if(data.code == 0){
                // 存值给cookies
                this.$cookies.set('token', data.token);
                this.$cookies.set('userId', data.id);
                this.$cookies.set('userName', data.name);
                // 存值给localStorage
                
                this.$router.push("/home");
              }else{
                const h = this.$createElement;
                this.$notify({
                  title: "登录失败",
                  message: h('i', {
                    style: 'color: teal'
                  }, data.msg),
                  type: 'warning',
                  duration: 3000,
                });
              }

            });
          }else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    },
	}
</script>

<style>

</style>