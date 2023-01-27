import axios from 'axios'
import { Toast } from 'vant'
import store from '../store'
import jsonBig from 'json-bigint'

const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net/', // 基础路径
  // http://api-toutiao-web.itheima.net/app/v1_0/user
  transformResponse: [function (data) {
    try {
      // 如果转换成功则返回转换的数据结果
      return jsonBig.parse(data)
    } catch (err) {
      // 如果转换失败，则包装为统一数据格式并返回
      return {
        data
      }
    }
  }]

})
request.interceptors.request.use(
  (config) => {
    const { user } = store.state
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

// 添加响应拦截器
request.interceptors.response.use(
  (response) => {
    // Toast.success('登录成功')

    return response.data
  },
  (err) => {
    if (err.response.status === 400) {
      Toast.fail('手机号或者验证码错误')
    }
    return Promise.reject(err)
  }
)
export default request
