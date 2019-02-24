<template>
  <div>
    <router-view/>
  </div>
</template>
<script>
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';

export default {
  created() {
    if (localStorage.eleToken) {
      // 解析token
      const decode = jwt_decode(localStorage.eleToken);
      // 存储token
      this.$store.dispatch('setAuthenicated', !this.isEmpty(decode));
      this.$store.dispatch('setUser', decode);
    }
  },
  methods: {
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

<style>
</style>
