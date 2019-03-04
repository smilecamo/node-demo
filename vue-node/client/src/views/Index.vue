<template>
  <el-container>
    <el-header style="padding:0">
      <head-nav></head-nav>
    </el-header>
    <el-container>
      <el-aside style="width:240px">
        <left-aside></left-aside>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
</el-container>
</template>

<script>
import HeadNav from '../components/Header.vue';
import LeftAside from '../components/Aside.vue';

export default {
  components: {
    HeadNav,
    LeftAside,
  },
};
</script>

<style scoped>

</style>
