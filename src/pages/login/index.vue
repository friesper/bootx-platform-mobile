<template>
  <view class="main">
    <view class="logo">
      <image src="https://img10.360buyimg.com/ling/jfs/t1/181258/24/10385/53029/60d04978Ef21f2d42/92baeb21f907cd24.jpg"></image>
    </view>
    <view class="loginView">
      <view class="account">
        <nut-input
          font-class-name="iconfont"
          label-width="0px"
          left-icon="user"
          v-model="form.account"
          placeholder="请输入账号(测试:xxm)"
          clearable
          clearSize="14"
        />
      </view>
      <view class="password">
        <nut-input
          label-width="0px"
          left-icon="password"
          v-model="form.password"
          clearable
          clearSize="14"
          type="password"
          placeholder="请输入密码(测试:123456)"
        />
      </view>
      <view>
        <nut-input label-width="0px" left-icon="capt" v-model="form.captcha" clearable clearSize="14" placeholder="请输入验证码">
          <template #right> <img style="margin-top: 2px; width:100px;height:22px" :src="captchaData" @click="getCaptcha" alt="验证码" /> </template>
        </nut-input>
      </view>
      <view class="loginBtn">
        <nut-button size="large" block type="primary" @click="handleClick()">登录</nut-button>

        <nut-button size="large" style="margin-top: 22px;" color="green" block type="info" @click="handleClick()">
          <template #icon>
            微信登录
            <IconFont font-class-name="iconfont" class-prefix="icon" name="wechat" /> </template
        ></nut-button>
      </view>
    </view>
    <nut-toast :msg="msg" v-model:visible="show" :type="type" :cover="cover" />
  </view>
</template>

<script>
import { reactive, toRefs } from 'vue'
import Taro from '@tarojs/taro'
import { login } from '../../api/login'
import { IconFont } from '@nutui/icons-vue-taro'
import { imgCaptcha } from '../../api/system/captcha'

export default {
  name: 'index',
  components: { IconFont },
  setup() {
    const state = reactive({
      type: 'text',
      account: 'xxm',
      password: '123456',
      show: false,
      cover: false,
      captchaData: null,
      form: {
        account: 'xxm',
        password: '123456',
        captchaKey: '',
        captcha: '',
        client: 'adminV3',
        loginType: 'password'
      }
    })

    const handleClick = () => {
      login(state.form)
        .then(res => {
          if (res.code == 0) {
            Taro.setStorageSync('accessToken', res.data)
            Taro.switchTab({ url: '/pages/index/index' })
          } else {
          }
        })
        .catch(err => {
          getCaptcha()
          Taro.showToast({
            title: err,
            icon: 'error',
            duration: 2000
          })
        })
    }
    /* 获取验证码 */
    const getCaptcha = () => {
      imgCaptcha().then(result => {
        const res = result.data
        state.captchaData = res.captchaData
        state.form.captchaKey = res.captchaKey
      })
    }
    return {
      ...toRefs(state),
      handleClick,
      getCaptcha
    }
  },
  onReady() {
    this.getCaptcha()
  }
}
</script>

<style lang="scss">
.main {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
}
.logo {
  height: 50%;
}
.loginView {
  text-align: center;
}
.loginBtn {
  margin-top: 22px;
  margin-right: 22px;
  margin-left: 22px;
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
