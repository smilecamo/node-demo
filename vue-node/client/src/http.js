import axios from 'axios';
import { Loading, Message } from 'element-ui';
import router from './router';

let loading;
// 加载动画开始
function startLoading() {
  loading = Loading.service({
    lock: true,
    text: '拼命加载中...',
    background: 'rgba(0,0,0,.6)',
  });
}
// 结束加载动画
function endLoading() {
  loading.close();
}

// 请求拦截

axios.interceptors.request.use((config) => {
  // 加载动画
  startLoading();
  // 如果token存在,配置统一的请求头
  if (localStorage.eleToken) {
    // 统一的请求头
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = localStorage.eleToken;
  }
  return config;
}, error => Promise.reject(error));

// 响应拦截
axios.interceptors.response.use((config) => {
  // 结束loading
  endLoading();
  return config;
}, (error) => {
  // 结束loading
  endLoading();
  // 提示错误
  Message.error(error.response.data);
  // 获取错误码
  const { status } = error.response;
  if (status === 401) {
    Message.error('token失效,请重新登录');
    localStorage.removeItem('eleToken');
    router.push('/login');
  }
  return Promise.reject(error);
});

export default axios;
