<template>
  <view class="index">
    <view>
      <img src alt />
    </view>
    {{ msg }}
    <nut-toast :msg="msg" v-model:visible="show" :type="type" :cover="cover" />
  </view>
</template>

<script>
import { reactive, toRefs } from 'vue'
import Taro from '@tarojs/taro'
import { Button } from '@nutui/nutui-taro'

export default {
  name: 'Index',
  components: {},
  setup() {
    const state = reactive({
      msg: '首页',
      type: 'text',
      show: false,
      cover: false
    })

    const handleClick = (type, msg, cover = false) => {
      Taro.navigateTo({ url: '/pages/login/index' }, 550)
    }
    return {
      ...toRefs(state),
      handleClick
    }
  }
}
</script>

<style lang="scss">
.index {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  bottom: 0;
  /* 在 H5 模式下将会编译成 margin-bottom: 50px，在小程序模式下则会忽略*/
  margin-bottom: taro-tabbar-height;
}
</style>
