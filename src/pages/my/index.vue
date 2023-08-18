<template >
  <view class="main.full mine-container">
    <view class="header-section">
      <view class=" flex padding justify-between">
        <view class="flex align-center">
          <nut-avatar size="80">
            <img :src="imagePath + userInfo.avatar" />
          </nut-avatar>
          <view @click="handleToInfo" class="user-info">
            <view class="u_title">
              {{ userInfo.name }}
            </view>
          </view>
        </view>
        <view @click="goToPersonInfo" class="flex u_title align-center">
          <text>个人信息</text>
          <IconFont name="rect-right"></IconFont>
        </view>
      </view>
    </view>
    <view class="content-section">
      <view class="mine-actions grid col-4 text-center">
        <view class="action-item" @click="handleJiaoLiuQun">
          <view class="iconfont icon-wallet text-pink icon"></view>
          <text class="text">钱包</text>
        </view>

        <view class="action-item" @click="handleBuilding">
          <view class="iconfont icon-slice text-mauve icon"></view>
          <text class="text">订单</text>
        </view>
        <view class="action-item" @click="handleFeedBack">
          <view class="iconfont icon-icon-test text-blue icon"></view>
          <text class="text">反馈</text>
        </view>
        <view class="action-item" @click="handleBuilding">
          <view class="iconfont icon-heart text-green icon"></view>
          <text class="text">点赞我们</text>
        </view>
      </view>
      <view class="menu-list">
        <view style="margin-left: 10px; margin-right: 10px;">
          <nut-cell @click="goToModifyPassword" title="修改密码" :isLink="true">
            <template v-slot:icon>
              <IconFont font-class-name="iconfont" class-prefix="icon" name="password" />
            </template>
          </nut-cell>
          <nut-cell @click="sacnCode" title="扫一扫" :isLink="true">
            <template v-slot:icon>
              <IconFont name="scan"></IconFont>
            </template>
          </nut-cell>
          <nut-cell title="关于我们" :isLink="true">
            <template v-slot:icon>
              <IconFont name="issue"></IconFont>
            </template>
          </nut-cell>
          <nut-cell title="退出登录" @click="logout" :isLink="true">
            <template v-slot:icon>
              <IconFont font-class-name="iconfont" class-prefix="icon" name="exit" />
            </template>
          </nut-cell>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { IconFont } from '@nutui/icons-vue-taro'
import { Avatar } from '@nutui/nutui-taro'
import Taro from '@tarojs/taro'
import { getUserBaseInfo } from '../../api/system/user'
import { iamgePreview } from '../../api/system/common'

export default {
  name: 'index',
  components: { IconFont, Avatar },
  setup() {
    const state = reactive({
      msg: '我的',
      msg2: '你成功了～',
      type: 'text',
      show: false,
      cover: false,
      userInfo: {},
      imagePath: process.env.TARO_IMAGE_URL
    })

    const goToPersonInfo = (type, msg, cover = false) => {
      Taro.navigateTo({
        url: '/pages/my/personInfo/index'
      })
    }
    const logout = () => {
      Taro.removeStorageSync('accessToken')
      Taro.redirectTo({
        url: '/pages/login/index'
      })
    }
    getUserBaseInfo().then(res => {
      state.userInfo = res.data
    })
    const goToModifyPassword = () => {
      Taro.navigateTo({ url: '/pages/my/modifyPassword' })
    }
    const handleFeedBack = () => {
      Taro.navigateTo({ url: '/pages/my/feedback/add' })
    }
    const sacnCode = () => {
      Taro.scanCode({
        onlyFromCamera: true,
        success: res => {
          Taro.showToast({
            title: res.result,
            icon: 'none',
            duration: 2000
          })
        },
        fail: res => {
          console.log(res)
        },
        complete: () => {
          console.log('complete')
        }
      })
    }
    return {
      ...toRefs(state),
      goToPersonInfo,
      goToModifyPassword,
      logout,
      sacnCode, iamgePreview, handleFeedBack
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

.mine-container {
  width: 100%;
  height: 100%;


  .header-section {
    padding: 15px 15px 45px 15px;
    background-color: #3c96f3;
    color: white;

    .login-tip {
      font-size: 18px;
      margin-left: 10px;
    }

    .cu-avatar {
      border: 2px solid #eaeaea;

      .icon {
        font-size: 40px;
      }
    }

    .user-info {
      margin-left: 15px;

      .u_title {
        font-size: 16px;
        line-height: 30px;
      }
    }
  }

  .content-section {
    position: relative;
    top: -50px;

    .mine-actions {
      margin: 15px 15px;
      padding: 20px 0px;
      border-radius: 8px;
      background-color: white;

      .action-item {
        .icon {
          font-size: 28px;
        }

        .text {
          display: block;
          font-size: 13px;
          margin: 8px 0px;
        }
      }
    }
  }
}
</style>
