<template >
  <view class="login">
    <view>
      <nut-cell center :desc="userInfo.name" size="large" :isLink="true">
        <template v-slot:icon>
          <nut-avatar size="50" @click="handleClick">
            <img src="https://img12.360buyimg.com/imagetools/jfs/t1/196430/38/8105/14329/60c806a4Ed506298a/e6de9fb7b8490f38.png" />
          </nut-avatar>
        </template>
      </nut-cell>
      <nut-cell title="修改密码"></nut-cell>
      <nut-cell title="关于我们"></nut-cell>
    </view>
    <view style="margin-top: 90%;margin-left: 20px;margin-right:20px">
      <nut-button size="large" type="primary">退出登录</nut-button>
    </view>
  </view>
</template>

<script>
import { reactive, toRefs } from 'vue'
import Taro from '@tarojs/taro'
import { My } from '@nutui/icons-vue-taro'
import { getUserBaseInfo } from '../../api/system/user'

export default {
  name: 'index',
  components: { My },
  setup() {
    const state = reactive({
      msg: '我的',
      msg2: '你成功了～',
      type: 'text',
      show: false,
      cover: false,
      userInfo: {}
    })

    const handleClick = (type, msg, cover = false) => {
      Taro.navigateBack()
    }
    getUserBaseInfo().then(res => {
      state.userInfo = res.data
    })
    return {
      ...toRefs(state),
      handleClick
    }
  }
}
</script>

<style lang="scss">
.login {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
