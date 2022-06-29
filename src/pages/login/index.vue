<template>
  <view class="login">
    <view>
      <img src="http://img10.360buyimg.com/ling/jfs/t1/181258/24/10385/53029/60d04978Ef21f2d42/92baeb21f907cd24.jpg" />
    </view>
    <view class="account">
      <nut-input
        font-class-name="iconfont"
        label-width="0px"
        left-icon="user"
        v-model="account"
        placeholder="请输入账号(测试:xxm)"
        clearable
        clearSize="14"
      />
    </view>
    <view class="password">
      <nut-input
        label-width="0px"
        left-icon="password"
        v-model="password"
        clearable
        clearSize="14"
        type="password"
        placeholder="请输入密码(测试:123456)"
      />
    </view>
    <view class="loginBtn">
      <nut-button block type="primary" @click="handleClick()">登录</nut-button>
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
      type: 'text',
      account: '',
      password: '',
      show: false,
      cover: false
    })

    const handleClick = () => {
      login({ account: state.account, password: state.password })
        .then(res => {
          if (res.code == 0) {
            Taro.setStorageSync('accessToken', res.data)
            Taro.switchTab({ url: '/pages/index/index' })
          } else {
          }
        })
        .catch(err => {
          Taro.showToast({
            title: err,
            icon: 'error',
            duration: 2000
          })
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
.loginBtn {
  margin-top: 22px;
  margin-right: 10px;
  margin-left: 10px;
}
.account {
  margin-top: 22px;
  margin-right: 2px;
  margin-left: 2px;
  text-align: center;
  border-radius: 25px;
  background: #efefef;
}
.password {
  margin-top: 22px;
  margin-right: 2px;
  margin-left: 2px;
  text-align: center;
  border-radius: 25px;
  background: #efefef;
}
</style>
