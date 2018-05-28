<template>
  <div class="loginPage">
    <!--<div class="showlogin">-->
      <!--<h1>欢迎来到王者大神秀的后台管理系统</h1>-->
      <!--<h1>登录系统</h1>-->
      <!--<p>{{msg}}</p>-->
    <!--</div>-->
    <div class="login-form">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="ruleForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="passWord">
          <el-input v-model="ruleForm.passWord"></el-input>
        </el-form-item>
        <el-form-item class="loginwrap">
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <el-button @click="gotoregister">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        msg: '',
        ruleForm: {
          userName: '',
          passWord: ''
        },
        rules: {
          userName: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur' }
          ],
          passWord: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 5, max: 30, message: '长度在 5 到 30 个字符', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm: function (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post('http://127.0.0.1:8083/banner/addbanner', {
              userName: this.ruleForm.userName,
              passWord: this.ruleForm.passWord
            }, {emulateJSON: true}).then((response) => {
              console.log('fanhui' + response);
              let success = response.body.code;
              if (success === 1) {
                this.msg = response.body.message;
              }
            }, (response) => {
              console.log('error');
            });
          }
        });
      },
      gotoregister: function () {
        this.$router.push('/register');
      }
    }

  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
  .loginPage
    width 100%
    height 100px
    display: flex
    justify-content  center
    .login-form
      margin-top 15%
      .loginwrap
        padding-top 15px
</style>

