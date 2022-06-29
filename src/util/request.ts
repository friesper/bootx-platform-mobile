import Taro from '@tarojs/taro'


export function post(uri, data) {
  return new Promise((resolve, reject) => {
    Taro.request({
      url: process.env.API_URL + uri,
      data: data,
      header:{
        "AccessToken":Taro.getStorageSync('accessToken')
      },
      method: 'POST',
      success: function(res) {
        resolve(res.data)
      },
      fail: function(res) {
        reject(res)
      }
    })
  })
}
export function get(uri, data) {
  return new Promise((resolve, reject) => {
    Taro.request({
      url: process.env.API_URL + uri,
      header:{
        "AccessToken":Taro.getStorageSync('accessToken')
      },
      data: data,
      method: 'GET',
      success: function(res) {
        resolve(res.data)
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
      method: 'POST',
      success: function(res) {
        resolve(res.data)
      },
      fail: function(res) {
        reject(res)
      }
    })
  })
}
