<template >
  <view class="main.full">
    <nut-cell center :desc="userInfo.name" @click="handleClick" size="large">
      <template v-slot:icon>
        <nut-avatar size="50">
          <img src="https://img12.360buyimg.com/imagetools/jfs/t1/196430/38/8105/14329/60c806a4Ed506298a/e6de9fb7b8490f38.png" />
        </nut-avatar>
      </template>
    </nut-cell>
    <view style="margin-left: 10px; margin-right: 10px;">
      <nut-cell @click="goToModifyPassword" title="修改密码" :isLink="true">
        <template v-slot:icon>
          <IconFont name="edit"></IconFont>
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
          <img class="nut-icon" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl-iU9pWdQ5anLjALb_Ge15bSJCo5kipf53PnkQsYZmg&s" />
        </template>
      </nut-cell>
    </view>
  </view>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { IconFont } from '@nutui/icons-vue-taro'
import { Avatar } from '@nutui/nutui-taro'
import Taro from '@tarojs/taro'
import { getUserBaseInfo } from '../../api/system/user'

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
      userInfo: {}
    })

    const handleClick = (type, msg, cover = false) => {
      Taro.navigateTo({
        url: '/pages/my/personInfo/index'
      })
    }
    const logout = () => {
      Taro.removeStorageSync('accessToken')
      Taro.navigateTo({
        url: '/pages/login/index'
      })
    }
    getUserBaseInfo().then(res => {
      state.userInfo = res.data
    })
    const goToModifyPassword = () => {
      Taro.navigateTo({ url: '/pages/my/modifyPassword' })
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
      handleClick,
      goToModifyPassword,
      logout,
      sacnCode
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
