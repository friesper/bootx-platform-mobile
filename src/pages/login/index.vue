<template>
  <view class="main">
    <view class="login logo-content align-center justify-center flex">
      <image style="width: 100rpx;height: 100rpx;" src="http://v3.platform.bootx.cn/assets/logo-905dcfc8.png"
        mode="widthFix">
      </image>
      <text class="title">Bootx-Platfom</text>
    </view>
    <view class="loginView">
      <view class="account">
        <nut-input class="input" font-class-name="iconfont" label-width="0px" left-icon="user" v-model="form.account"
          @update:model-value="accountUpdate" max-length="100" placeholder="请输入账号" clearable clearSize="14">
          <template #left>
            <IconFont name="my2"></IconFont>
          </template>
        </nut-input>
      </view>
      <view class="password">
        <nut-input label-width="0px" class="input" left-icon="password" v-model="form.password"
          @update:model-value="passwordUpdate" clearable clearSize="14" max-length="100" type="password"
          placeholder="请输入密码"> <template #left>
            <IconFont font-class-name="iconfont" class-prefix="icon" name="password" />
          </template></nut-input>
      </view>
      <view class="captcha">
        <nut-input max-length="4" class="input" @update:model-value="captchaUpdate(form.captcha)" label-width="0px"
          left-icon="capt" v-model="form.captcha" clearable clearSize="14" placeholder="请输入验证码">
          <template #left>
            <IconFont font-class-name="iconfont" class-prefix="icon" name="yanzhengyanzhengma" />
          </template>
          <template #right> <img style="margin-top: 2px; width:100px;height:22px" :src="captchaData" @click="getCaptcha"
              alt="验证码" /> </template>
        </nut-input>
      </view>
      <view class="loginBtn">
        <nut-button size="large" :disabled="!enableLogin" type="primary" @click="handleClick()">登录</nut-button>

        <nut-button size="large" style="margin-top: 22px;" color="green" block type="info" @click="handleWechantLogin()">
          <template #icon>
            微信登录
            <IconFont font-class-name="iconfont" class-prefix="icon" name="wechat" />
          </template></nut-button>
      </view>
    </view>
    <nut-toast :msg="msg" v-model:visible="show" :type="type" :cover="cover" />
  </view>
</template>

<script>
import { reactive, toRefs } from 'vue'
import Taro from '@tarojs/taro'
import { login, loginWithWeChat } from '../../api/login'
import { IconFont } from '@nutui/icons-vue-taro'
import { imgCaptcha } from '../../api/system/captcha'

export default {
  name: 'index',
  components: { IconFont },
  setup() {
    const state = reactive({
      enableLogin: false,
      type: 'text',
      account: '',
      password: '',
      show: false,
      cover: false,
      captchaData: null,
      form: {
        account: '',
        password: '',
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
            Taro.showToast({
              title: res.msg,
              icon: 'error',
              duration: 2000
            })
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
    };
    const handleWechantLogin = () => {
      Taro.login({
        success: function (res) {
          if (res.code) {
            //发起网络请求
            const loginData = {
              loginType: 'weChatApplet',
              weChatAppletCode: res.code
            }
            loginWithWeChat(loginData).then(res => {
              if (res.code == 0) {
                Taro.setStorageSync('accessToken', res.data)
                Taro.switchTab({ url: '/pages/index/index' })
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
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    }
    const getCaptcha = () => {
      imgCaptcha().then(result => {
        let res = result.data
        state.captchaData = res.captchaData
        state.form.captchaKey = res.captchaKey
      })
    }
    const accountUpdate = (val) => {
      console.log(123)
      updateEnableLogin()
    }
    const passwordUpdate = (val) => {
      updateEnableLogin()
    }
    const captchaUpdate = (val) => {
      console.log('captchaUpdate')

      updateEnableLogin()
    }

    const updateEnableLogin = () => {
      console.log('updateEnableLogin')

      state.enableLogin = (state.form.account && state.form.password && state.form.captcha)
    }
    return {
      ...toRefs(state),
      handleClick,
      getCaptcha, accountUpdate, passwordUpdate, captchaUpdate, handleWechantLogin
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

.login {
  margin-top: 22px;

}

.logo-content {
  width: 100%;
  font-size: 21px;
  text-align: center;
  padding-top: 15%;

  image {
    border-radius: 4px;
  }

  .title {
    margin-left: 10px;
  }
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

  .input {
    border-radius: 25px;
  }
}

.password {
  margin-top: 22px;
  margin-right: 2px;
  margin-left: 2px;
  text-align: center;
  border-radius: 25px;
  background: #efefef;
  height: 45px;
  border-radius: 20px;

  .input {
    border-radius: 25px;
  }
}

.captcha {
  margin-top: 22px;
  margin-right: 2px;
  margin-left: 2px;
  text-align: center;
  border-radius: 25px;
  background: #efefef;

  .input {
    border-radius: 25px;
  }
}
</style>
