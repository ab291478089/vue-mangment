<template>
  <div class="login">
      <span class="container">逍遥在线后台管理系统</span>
      <el-form
        :model="loginUser"
        status-icon
        :rules="rules"
        ref="loginForm"
        label-width="80px"
        class="login-form"
      >
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="loginUser.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginUser.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="submit-btn"
            size="max"
            @click="submitForm('loginForm')"
          >登录</el-button>
        </el-form-item>
        <div class="forword">还没有账号？现在<router-link to='/register'>注册</router-link></div>
      </el-form>
  </div>
</template>
<script>
//引入解析token第三方插件
import jwtDecode from 'jwt-decode'; 
export default {
  name: "login",
  components: {},
  data() {
    return {
      loginUser: {
        email: "",
        password: "",
      },
      rules: { 
        email: [
          {
            type: "email",
            required: true,
            message: "邮箱格式不正确!",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "密码长度必须在6-16位之间！",
            trigger: "blur"
          }
        ],
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post("/api/users/login", this.loginUser)
            .then(res => {
              //登录成功
              //token
              const { token } = res.data
              //存储localstorage
              localStorage.setItem("eleToken", token)

              //解析token
              const decode = jwtDecode(token)
              console.log(decode)
              //存储到vuex中
              this.$store.dispatch('setAuthenticated', !this.isEmpty(decode))
              this.$store.dispatch('setUser', decode)

              this.$router.push("/index");
            });
        }
      });
    },
    isEmpty(value) {
       return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  }
};
</script>
<style lang="less" scoped>
.login {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/bg.jpg) no-repeat center center;
  background-size: 100% 100%;
  .container {
    position: absolute;
    left: 43%;
    top: 14%;
    color: white;
    font-size: 36px;
    font-weight: 500;
  }
  .login-form {
    position: absolute;
    padding: 20px;
    padding-top: 30px;
    width: 400px;
    height: 222px;
    background-color: white;
    box-shadow: 0 5px 15px -5px rgba(0, 0, 0, 0.5);
    left: 41%;
    top: 20%;
    border-radius: 12px;
    .forword{
      margin-left: 238px;
      a{
        color:turquoise;
      }
    }
    .select-btn {
      margin-left: 40px;
    }
    .submit-btn {
      margin-left: 40px;
      width: 175px;
      display: block;
    }
  }
}
</style>