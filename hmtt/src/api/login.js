import request from '../utils/request'
export function login (data) {
  return request.post('app/v1_0/authorizations', data)
}
