import {  postData } from '../util/request'

export function login(data) {
  return postData('/token/login'+"?application=h5&client=password&account="+data.account+"&password="+data.password+"&captchaKey=",{})
}

