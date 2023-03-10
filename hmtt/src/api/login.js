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

  })
}
// 获取列表数据
export const getUseList = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'

  })
}
// 获取文章数据
export const getUserArticle = (params) => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params

  })
}

export const getSearchSuggestion = q => {
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: {
      q
    }
  })
}

export function getSearch (params) {
  return request({
    method: 'GET',
    url: '/app/v1_0/search',
    params
  })
}

export const getArticleById = articleId => {
  return request({
    method: 'GET',
    url: '/app/v1_0/articles/' + articleId
  })
}

export const addFollow = userId => {
  return request({
    method: 'POST',
    url: '/app/v1_0/user/followings',
    data: {
      target: userId
    }
  })
}

/**
 * 取消关注
 */
export const deleteFollow = userId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/followings/${userId}`
  })
}
