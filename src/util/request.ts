import Taro from '@tarojs/taro'
Taro.addInterceptor(Taro.interceptors.logInterceptor)
Taro.addInterceptor(Taro.interceptors.timeoutInterceptor)

export function post(uri, data) {
  return new Promise((resolve, reject) => {
    Taro.request({
      url: process.env.API_URL + uri,
      data: data,
      header: {
        AccessToken: Taro.getStorageSync('accessToken')
      },
      method: 'POST',
      success: function(res) {
        handlerResponse(resolve, reject, res)
      },
      fail: function(res) {
        console.log(res)
        reject(res)
      }
    })
  })
}
export function get(uri, data) {
  return new Promise((resolve, reject) => {
    Taro.request({
      url: process.env.API_URL + uri,
      header: {
        AccessToken: Taro.getStorageSync('accessToken')
      },
      data: data,
      method: 'GET',
      success: function(res) {
        handlerResponse(resolve, reject, res)
      },
      fail: function(res) {
        reject(res)
      }
    })
  })
}
export function postData(uri, data) {
  return new Promise((resolve, reject) => {
    Taro.request({
      url: process.env.API_URL + uri,
      data: data,
      header: {
        AccessToken: Taro.getStorageSync('accessToken')
      },
      method: 'POST',
      success: function(res) {
        handlerResponse(resolve, reject, res)
      },
      fail: function(res) {
        reject(res)
      }
    })
  })
}
function handlerResponse(resolve, reject, response) {
  if (response.data.code == 10004) {
    Taro.redirectTo({ url: '/pages/login/index' })
  } else {
    resolve(response.data)
  }
}
