import { postData, get } from '../../util/request'

/**
 * 获取用户基础信息
 */
export function getUserBaseInfo() {
  return get(`/user/getUserBaseInfo`, {})
}

export function pageByReceive(params) {
  return get('/site/message/pageByReceive', params)
}
