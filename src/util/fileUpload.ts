// import Taro from '@tarojs/taro'

// var request = require('request')
// var COS = require('cos-nodejs-sdk-v5')
// var cos = new COS({
//   getAuthorization: function(options, callback) {
//     // 初始化时不会调用，只有调用 cos 方法（例如 cos.putObject）时才会进入
//     // 异步获取临时密钥

//     request(
//       {
//         url: process.env.API_URL + '/file/getTempCredentials',
//         Headers: { AccessToken: Taro.getStorageSync('accessToken') },
//         data: {
//           // 可从 options 取需要的参数
//         }
//       },
//       function(err, response, body) {
//         try {
//           var data = JSON.parse(body)
//           var credentials = data.data
//         } catch (e) {}
//         if (!data || !credentials) return console.error('credentials invalid')
//         callback({
//           TmpSecretId: credentials.tmpSecretId, // 临时密钥的 tmpSecretId
//           TmpSecretKey: credentials.tmpSecretKey, // 临时密钥的 tmpSecretKey
//           SecurityToken: credentials.sessionToken, // 临时密钥的 sessionToken
//           ExpiredTime: data.expiredTime // 临时密钥失效时间戳，是申请临时密钥时，时间戳加 durationSeconds
//         })
//       }
//     )
//   }
// })
// export function uploadFileToOss(filePath: String, key: String) {
//   cos.uploadFile(
//     {
//       Bucket: 'bootx' /* 填入您自己的存储桶，必须字段 */,
//       Region: 'ap-beijing' /* 存储桶所在地域，例如 ap-beijing，必须字段 */,
//       Key: '1.jpg' /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */,
//       FilePath: key /* 必须 */,
//       SliceSize: 1024 * 1024 * 5 /* 触发分块上传的阈值，超过5MB使用分块上传，非必须 */,
//       onTaskReady: function(taskId) {
//         /* 非必须 */
//         console.log(taskId)
//       },
//       onProgress: function(progressData) {
//         /* 非必须 */
//         console.log(JSON.stringify(progressData))
//       },
//       onFileFinish: function(err, data, options) {
//         /* 非必须 */
//         console.log(options.Key + '上传' + (err ? '失败' : '完成'))
//       },
//       // 支持自定义headers 非必须
//       Headers: {
//         'x-cos-meta-test': 123
//       }
//     },
//     (err, data) => {
//       console.log(err || data)
//     }
//   )
// }
