import request from '../utils/request'
export function login (data) {
  return request.post('app/v1_0/authorizations', data)
}
export function sendmss (data) {
  return request.get(`app/v1_0/sms/codes${data}`)
}
