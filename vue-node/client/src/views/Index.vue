<template>
  <div>
    <head-nav></head-nav>
    <router-view></router-view>
  </div>
</template>

<script>
import HeadNav from '../components/Header.vue';

export default {
  components: {
    HeadNav,
  },
};
</script>

<style scoped>

</style>
