import { postData } from '../util/request'

export function login(data) {
  return postData(
    '/token/login' +
      '?client=adminv3&client=password&account=' +
      data.account +
      '&password=' +
      data.password +
      '&loginType=' +
      data.loginType +
      '&captchaKey=' +
      data.captchaKey +
      '&captcha=' +
      data.captcha,
    {}
  )
}
export function loginWithWeChat(data) {
  return postData(
    '/token/login' + '?client=adminv3&client=password' + '&weChatApplet=' + data.weChatAppletCode + '&loginType=' + data.loginType,
    {}
  )
}
