import request from '../utils/request'
// import store from '@/store'
export function login (data) {
  return request.post('app/v1_0/authorizations', data)
}
export function sendmss (data) {
  return request.get(`app/v1_0/sms/codes${data}`)
}

/**
 * 获取用户自己的信息
 */
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
    // 发送请求头数据
    // headers: {
    //   // 注意：该接口需要授权才能访问
    //   //       token的数据格式：Bearer token数据，注意 Bearer 后面有个空格
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}
