<template>
  <view class="login">
    <view>
      <img src alt />
    </view>
    {{ msg }}
    <view class="btn">
      <nut-button type="primary" @click="handleClick('text', msg2, true)">点我2</nut-button>
    </view>
    <nut-toast :msg="msg" v-model:visible="show" :type="type" :cover="cover" />
  </view>
</template>

<script>
import { reactive, toRefs } from 'vue'
import Taro from '@tarojs/taro'

export default {
  name: 'index',
  components: {},
  setup() {
    const state = reactive({
      msg: '登录页面',
      msg2: '你成功了～',
      type: 'text',
      show: false,
      cover: false
    })

    const handleClick = (type, msg, cover = false) => {
      Taro.navigateBack()
    }

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
  text-align: center;
}
</style>
