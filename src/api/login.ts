import { get, post } from '../util/request'

export function login(data) {
  return post('/token/login'+"?client=admin&account="+data.account+"&password="+data.password+"&captchaKey=",{})
}

