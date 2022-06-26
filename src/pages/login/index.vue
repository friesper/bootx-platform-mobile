<template>
  <view class="login">
    <view>
      <img src="http://img10.360buyimg.com/ling/jfs/t1/181258/24/10385/53029/60d04978Ef21f2d42/92baeb21f907cd24.jpg" />
    </view>
    <view>
      <nut-input font-class-name="iconfont" left-icon="user" v-model="account" label="账号" placeholder="请输入账号" clearable clearSize="14" />
      <nut-input left-icon="password" v-model="password" clearable clearSize="14" type="password" label="密码" placeholder="请输密码" />
    </view>
    <view class="btn">
      <nut-button type="primary" @click="handleClick()">登录按钮</nut-button>
    </view>
    <nut-toast :msg="msg" v-model:visible="show" :type="type" :cover="cover" />
  </view>
</template>

<script>
import { reactive, toRefs } from 'vue'
import Taro from '@tarojs/taro'
import { login } from '../../api/login'
export default {
  name: 'index',
  components: {},
  setup() {
    const state = reactive({
      msg: '登录页面',
      msg2: '你成功了～',
      type: 'text',
      account: 'xxm',
      password: '123456',
      show: false,
      cover: false
    })

    const handleClick = () => {
      login({ account: state.account, password: state.password }).then(res => {
        console.log(res)
      })
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
