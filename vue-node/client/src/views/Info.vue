<template>
  <div class="container">
    <el-row type="flex" justify='center'>
      <el-col :span="8">
        <div class="info-ava">
          <img src="../assets/logo.png" alt="" >
        </div>
      </el-col>
      <el-col :span="16">
        <div class="info-user">
          <div class="user-name">
            {{user.identity}}
          </div>
          <div class="user-name">
            {{user.name}}
          </div>
        </div>
      </el-col>
    </el-row>
  </div>

</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
};
</script>

<style scoped>
html,body{
  width: 100%;
  height: 100%;
}
.container{
  width: 100%;
  height: 100%;
  min-height: 600px;
}
.info-ava ,.info-user{
  margin-top: 30%
}
.info-ava{
  background: #000
}
.info-user{
  background: #eee
}
.info-ava img{
  width: 80px;
  height: 80px;
  float: right;
}
</style>
