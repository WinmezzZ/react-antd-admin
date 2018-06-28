import axios from 'axios'
axios.defaults.timeout = 5000;

//请求拦截
axios.interceptors.request.use((config) => {

  return config;
}, (err) => {
  return Promise.reject(err);
});
//响应拦截//
axios.interceptors.response.use((res) => {
  return res

}, (err) => {
  return Promise.reject(err);
});

export default axios