<template >
  <view>
    <nut-cell title="姓名" :desc="userInfo.name"></nut-cell>
    <nut-cell title="性别" :desc="userInfo.sex === 1 ? '男' : '女'"></nut-cell>
    <nut-cell title="生日" :desc="userInfo.birthday"></nut-cell>
    <nut-cell title="微信帐号" :desc="userInfo.birthday" @click="bindWechat"></nut-cell>

  </view>
</template>
  
<script>
import { reactive, toRefs } from 'vue'

import Taro from '@tarojs/taro'
import { getUserBaseInfo } from '../../../api/system/user'

export default {
  name: 'index',
  setup() {
    const state = reactive({
      msg: '我的',
      msg2: '你成功了～',
      type: 'text',
      show: false,
      cover: false,
      userInfo: { name: '' }
    })
    getUserBaseInfo().then(res => {
      state.userInfo = res.data
    })

    const bindWechat = () => {
      Taro.getUserProfile({
        desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
          console.log(res);
        }
      })
    }

    return {
      ...toRefs(state),
      bindWechat

    }
  }
}
</script>
  
<style lang="scss"></style>
  