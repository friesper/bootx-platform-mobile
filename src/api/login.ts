import { get, post } from '../util/request'

export function login(data) {
  return post('', data)
}

