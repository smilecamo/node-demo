import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/index',
    },
    {
      path: '/index',
      name: 'index',
      component: () => import('./views/Index.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue'),
    },
    {
      path: '*',
      name: '404',
      component: () => import('./views/404.vue'),
    },
  ],
});
// 路由守卫

router.beforeEach((to, from, next) => {
  // 判断token是否存在
  const loginIn = !!localStorage.eleToken;
  // 如果进入的是登录和注册页,正常进入就行
  if (to.path === '/login' || to.path === '/register') {
    next();
  } else {
    // 根据是否有token来进行跳转
    // eslint-disable-next-line no-unused-expressions
    loginIn ? next() : next('/login');
  }
});

export default router;
