<template>
  <header class="head-nav">
  <el-row>
    <el-col :span="6" class="logo-container">
      <img src="../assets/logo.png" alt="logo" class="logo">
      <span class="title">后台管理系统</span>
    </el-col>
    <el-col :span="4" class="user">
      <div class="user-container">
        <img src="../assets/logo.png" alt="头像" class="ava">
        <p class="user-info">欢迎<span>{{user.name}}</span></p>
        <span>
          <el-dropdown
          teigger="click"
          @command="handleCommand"
          >
            <span class="el-dropdown-link">
              <i class="el-icon-caret-bottom"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="info">个人信息</el-dropdown-item>
              <el-dropdown-item command="out">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </span>
      </div>
    </el-col>
  </el-row>
  </header>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    handleCommand(cmdItem) {
      switch (cmdItem) {
        case 'info':
          this.showInfoList();
          break;
        case 'out':
          this.out();
          break;
        default:
          break;
      }
    },
    showInfoList() {
      this.$router.push('/index/info');
    },
    out() {
      // 清除token
      localStorage.removeItem('eleToken');
      // 清除vuex
      this.$store.dispatch('clearCurrentSatet');
      // 跳转
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
.head-nav{
  width: 100%;
  height: 60px;
  min-width: 600px;
  box-sizing: border-box;
  background: #324057;
  color: #fff;
  border-bottom: 1px solid #1F2d3d;
}
.logo-container {
  float: left;
  display: flex;
  align-items: center;
}
.logo-container .logo{
  width: 60px;
}
.logo-container .title{
  font-size: 14px;
  line-height: 60px;
}
.user{
  float: right;
}
.user-container{
  display: flex;
  align-items: center;
}
.user .ava{
  width: 40px;
  height: 40px;
  border-radius: 40px;
  border: 1px solid #ccc;
}
.user-container .user-info{
  margin-left:5px;
}
.user-container .user-info span{
  margin-left: 5px;
}
.user-container i{
  margin-left: 10px;
  color: #fff;
  cursor: pointer;
}
</style>
