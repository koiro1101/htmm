import axios from 'axios'
const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net/' // 基础路径
  // http://api-toutiao-web.itheima.net/app/v1_0/user
})
request.interceptors.request.use(
  (config) => {
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

// 添加响应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (err) => {
    if (err.response.status === 400) {
      console.log(1111)
    }
    return Promise.reject(err)
  }
)
export default request
