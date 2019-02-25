<template>
<el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#324057"
      text-color="#fff"
      active-text-color="#ffd04b">
      <router-link to="/index">
      <el-menu-item index="1">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      </router-link>
      <template v-for="item of menu">
        <el-submenu :index="item.path" :key="item.path" v-if="item.children">
        <template slot="title">
          <i :class="item.icon"></i>
          <span slot="title">{{item.name}}</span>
        </template>
        <router-link v-for="(citem,cindex) of item.children"
        :key="cindex"
        :to="citem.path">
          <el-menu-item :index="citem.path">
            <span slot="title">{{citem.name}}</span>
          </el-menu-item>
        </router-link>
        </el-submenu>
      </template>
    </el-menu>
</template>

<script>
export default {
  data() {
    return {
      menu: [
        {
          icon: 'el-icon-edit-outline',
          name: '资金管理',
          path: 'fund',
          children: [
            {
              name: '资金流水',
              path: '/index/fundlist',
            },
          ],
        },
        {
          icon: 'el-icon-document',
          name: '个人信息',
          path: 'info',
          children: [
            {
              name: '个人信息',
              path: '/index/info',
            },
          ],
        },
      ],
    };
  },
};
</script>

<style scoped>

</style>
