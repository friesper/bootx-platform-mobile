import {  post } from '../util/request'

export function login(data) {
  return post('/token/login'+"?application=h5&client=password&account="+data.account+"&password="+data.password+"&captchaKey=",{})
}

