<template >
  <view>
    <nut-cell title="姓名" :desc="userInfo.name"></nut-cell>
    <nut-cell title="性别" :desc="userInfo.sex===1?'男':'女'"></nut-cell>
    <nut-cell title="生日" :desc="userInfo.birthday"></nut-cell>
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

    return {
      ...toRefs(state)
    }
  }
}
</script>
  
  <style lang="scss">
</style>
  