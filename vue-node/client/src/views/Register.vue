<template>
  <div>
    <el-form
      :model="registerForm" :rules="registerFormRule"
      ref="registerForm" label-width="100px" class="registerForm">
      <el-form-item label="用户名" prop="name">
        <el-input
        v-model="registerForm.name"
        placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
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
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="againPassword">
        <el-input
        v-model="registerForm.againPassword"
        placeholder="请再次输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="权限" prop="region">
        <el-select v-model="registerForm.role" placeholder="请选择权限">
          <el-option label="员工" value="user"></el-option>
          <el-option label="管理员" value="admin"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
        type="primary"
        class="submit"
        @click="resetForm('ruleForm2')"
        >注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'register',
  data() {
    return {
      registerForm: {
        name: '',
        email: '',
        password: '',
        againPassword: '',
        role: '员工',
      },
    };
  },
  methods: {
    resetForm() {

    },
  },
};
</script>

<style scoped>
.registerForm{
  width: 400px;
  height: 440px;
}
.submit{
  width: 100%
}
</style>
