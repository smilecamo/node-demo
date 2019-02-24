<template>
  <div class="bg">
    <el-form
      :model="registerForm" :rules="registerFormRule"
      ref="registerForm"
      label-width="100px"
      class="registerForm">
      <el-form-item label="邮箱" prop="email">
        <el-input
        v-model="registerForm.email"
        placeholder="请输入邮箱"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
        v-model="registerForm.password"
        placeholder="请输入密码"
        type="password"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
        type="primary"
        class="submit"
        @click="submitForm('registerForm')"
        >登录</el-button>
      </el-form-item>
      <p class="register">
        没有账号?
        <span @click="register">立即注册</span>
      </p>
    </el-form>
  </div>
</template>

<script>
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';

export default {
  name: 'login',
  data() {
    return {
      registerForm: {
        email: '',
        password: '',
      },
      registerFormRule: {
        email: [
          {
            required: true, type: 'email', message: '邮箱格式不正确', trigger: 'blur',
          },
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      // eslint-disable-next-line consistent-return
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'post',
            url: '/api/users/login',
            data: {
              email: this.registerForm.email,
              password: this.registerForm.password,
            },
          })
            .then((res) => {
              if (res.data.code === 200) {
                this.$message({
                  type: 'success',
                  message: '登录成功',
                });
                // 获取token
                const { token } = res.data;
                // 设置token
                localStorage.setItem('eleToken', token);
                // 解析token
                const decode = jwt_decode(token);
                // eslint-disable-next-line no-console
                // 存储token到vuex中
                this.$store.dispatch('setAuthenicated', !this.isEmpty(decode));
                this.$store.dispatch('setUser', decode);
                this.$router.push('/index');
              } else if (res.data.code === 400) {
                this.$message({
                  type: 'error',
                  message: res.data.message,
                });
              } else {
                this.$message({
                  type: 'error',
                  message: '登录失败',
                });
              }
            })
            .catch(() => {
              this.$message({
                type: 'error',
                message: '登录接口错误!!!',
              });
            });
        } else {
          return false;
        }
      });
    },
    register() {
      this.$router.push('/register');
    },
    // 判断是否为空
    isEmpty(value) {
      return (
        value === undefined
        || value === null
        || (typeof value === 'object' && Object.keys(value).length === 0)
        || (typeof value === 'string' && value.trim().length === 0)
      );
    },
  },
};
</script>

<style scoped>
.registerForm{
  width: 400px;
  height: 440px;
  margin-top: 10%;
  margin-left: 25%;
}
.submit{
  width: 100%
}
.register{
  float: right;
  font-size: 14px;
}
.register span{
  color: blueviolet;
  cursor: pointer;
}
</style>
