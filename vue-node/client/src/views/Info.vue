<template>
  <div class="container">
    <el-row type="flex" justify='center'  class="container-row">
      <el-col :span="8">
        <div class="info-ava">
          <img src="../assets/logo.png" alt="" >
        </div>
      </el-col>
      <el-col :span="16">
        <div class="info-user">
          <div class="user-name">
            xiangm
          </div>
          <div class="user-name">
            xiaaaa
          </div>
        </div>
      </el-col>
    </el-row>
  </div>

</template>

<script>
export default {

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
}
.container-row{
  width: 100%;
  height: 100%;
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
