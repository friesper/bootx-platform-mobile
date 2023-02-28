import {  postData } from '../../util/request'

/**
 * 获取图片验证码
 */
export function imgCaptcha () {
  return postData(
     '/captcha/imgCaptcha',{}
  )
}
