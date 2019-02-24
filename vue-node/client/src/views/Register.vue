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
      <el-form-item label="用户名" prop="name">
        <el-input
        v-model="registerForm.name"
        placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
        v-model="registerForm.password"
        placeholder="请输入密码"
        type="password"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="againPassword">
        <el-input
        v-model="registerForm.againPassword"
        placeholder="请再次输入密码"
        type="password"
        ></el-input>
      </el-form-item>
      <el-form-item label="权限" prop="region">
        <el-select
          v-model="registerForm.role"
          placeholder="请选择权限"
          style="width:300px"
          >
          <el-option label="员工" value="user"></el-option>
          <el-option label="管理员" value="admin"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
        type="primary"
        class="submit"
        @click="submitForm('registerForm')"
        >注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'register',
  data() {
    const againPassword = (rule, value, callback) => {
      if (value !== this.registerForm.password) {
        callback(new Error('两次密码不一致'));
      } else {
        callback();
      }
    };
    return {
      registerForm: {
        name: '',
        email: '',
        password: '',
        againPassword: '',
        role: '员工',
      },
      registerFormRule: {
        email: [
          {
            required: true, type: 'email', message: '邮箱格式不正确', trigger: 'blur',
          },
        ],
        name: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在2-20个字符之间' },
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在2-20个字符之间' },
        ],
        againPassword: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { validator: againPassword, trigger: 'blur' },
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
            url: '/api/users/register',
            data: {
              name: this.registerForm.name,
              email: this.registerForm.email,
              identity: this.registerForm.role,
              password: this.registerForm.password,
            },
          }).then((res) => {
            if (res.data.code === 200) {
              this.$message({
                type: 'success',
                message: '注册成功',
              });
              this.$router.push('/login');
            } else if (res.data.code === 400) {
              this.$message({
                type: 'error',
                message: res.data.message,
              });
            } else {
              this.$message({
                type: 'error',
                message: '注册失败,请重试!!!',
              });
            }
          }).catch((err) => {
            this.$message.error(err);
          });
        } else {
          // eslint-disable-next-line no-console
          console.log('error submit!!');
          return false;
        }
      });
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
</style>
