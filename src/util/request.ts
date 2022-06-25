import Taro from '@tarojs/taro'
export function get(uri,data) {
    return new Promise((resolve,reject)=>{
        Taro.request({
            url:uri,
            data: data,
            method:'GET',
            success: function (res) {
                resolve(res);
              },
              fail:function(res) {
                  reject(res);
              },
        })
    })
   
}
export function post(uri,data) {
    return new Promise((resolve,reject)=>{
        Taro.request({
            url:uri,
            data: data,
            method:'POST',
            success: function (res) {
                resolve(res);
              },
              fail:function(res) {
                  reject(res);
              },
        })
    })
   
}