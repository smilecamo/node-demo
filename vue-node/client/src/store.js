import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
// 设置类型
const types = {
  SET_AUTHEN: 'SET_AUTHEN',
  SET_USER: 'SET_USER',
};
// 设置数据
const state = {
  // 是否授权登录
  isAuthenicated: false,
  user: {},
};
// 获取数据
const getters = {
  // eslint-disable-next-line no-shadow
  isAuthenicated: state => state.isAuthenicated,
  // eslint-disable-next-line no-shadow
  user: state => state.user,
};
// 更改信息
const mutations = {
  // 方法 类型 是否授权
  // eslint-disable-next-line no-shadow
  [types.SET_AUTHEN](state, isAuthenicated) {
    if (isAuthenicated) {
      // eslint-disable-next-line no-param-reassign
      state.isAuthenicated = isAuthenicated;
    } else {
      // eslint-disable-next-line no-param-reassign
      state.isAuthenicated = false;
    }
  },
  // eslint-disable-next-line no-shadow
  [types.SET_USER](state, user) {
    // eslint-disable-next-line no-param-reassign
    if (user) state.user = user;
    // eslint-disable-next-line no-param-reassign
    else state.user = {};
  },
};
const actions = {
  setAuthenicated: ({ commit }, isAuthenicated) => {
    commit(types.SET_AUTHEN, isAuthenicated);
  },
  setUser: ({ commit }, user) => {
    commit(types.SET_USER, user);
  },
};
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
});
