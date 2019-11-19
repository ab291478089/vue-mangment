<template>
  <div class="register">
    <section>
      <span class="container">逍遥在线后台管理系统</span>
      <el-form
        :model="registerUser"
        status-icon
        :rules="rules"
        ref="registerForm"
        label-width="80px"
        class="register-form"
      >
        <el-form-item label="用户名" prop="name">
          <el-input v-model="registerUser.name" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="registerUser.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="registerUser.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="registerUser.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="选择身份">
          <el-select v-model="registerUser.identity" class="select-btn" placeholder="请选择身份">
            <el-option label="管理员" value="manager"></el-option>
            <el-option label="员工" value="employee"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="submit-btn"
            size="max"
            @click="submitForm('registerForm')"
          >注册</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>
<script>
export default {
  name: "register",
  components: {},
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerUser.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      registerUser: {
        name: "",
        email: "",
        password: "",
        checkPass: "",
        identity: ""
      },
      rules: {
        name: [
          { required: true, message: "用户名不能为空！", trigger: "blur" },
          { min: 2, max: 6, message: "名称必须在2到6个字符之间！" }
        ],
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
        checkPass: [
          { required: true, message: "确认密码不能为空", trigger: "blur" },
          { validator: validatePass2, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post("/api/users/register", this.registerUser)
            .then(res => {
              //注册成功
              this.$message({
                message: "账号注册成功！",
                type: "success"
              });
              this.$router.push("/login");
            });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.register {
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
  .register-form {
    position: absolute;
    padding: 20px;
    padding-top: 30px;
    width: 400px;
    height: 370px;
    background-color: white;
    box-shadow: 0 5px 15px -5px rgba(0, 0, 0, 0.5);
    left: 41%;
    top: 20%;
    border-radius: 12px;
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