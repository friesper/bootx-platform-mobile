<template>
  <view class="index">
    <nut-noticebar direction="vertical" :list="horseLamp1" :speed="10" :standTime="1000" @click="go"
      :close-mode="true"></nut-noticebar>
    <nut-swiper :init-page="page" :pagination-visible="true" pagination-color="#426543" auto-play="3000">
      <nut-swiper-item v-for="item in list" :key="item">
        <img :src="item" />
      </nut-swiper-item>
    </nut-swiper>
    <nut-toast :msg="msg" v-model:visible="show" :type="type" :cover="cover" />
  </view>
</template>

<script lang="ts">
import { h, reactive, toRefs, onMounted } from 'vue'
import Taro from '@tarojs/taro'
export default {
  name: 'Index',
  components: {},
  setup() {
    const state = reactive({
      msg: '首页',
      type: 'text',
      show: false,
      page: 2,
      list: [],
      cover: false,
      horseLamp1: ['Noticebar 公告栏', 'Cascader 级联选择', 'DatePicker 日期选择器', 'CheckBox 复选按钮']
    })


    onMounted(() => {
      setTimeout(() => {
        state.list = [
          'https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg',
          'https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg',
          'https://storage.360buyimg.com/jdc-article/welcomenutui.jpg',
          'https://storage.360buyimg.com/jdc-article/fristfabu.jpg'
        ]
      }, 3000)
    })
    const handleClick = (type, msg, cover = false) => {
      Taro.navigateTo({ url: '/pages/login/index' }, 550)
    }
    const go = item => {
      console.log(item)
    }
    return {
      ...toRefs(state),
      handleClick,
      go
    }
  }
}
</script>

<style lang="scss" >
.index {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  bottom: 0;
  /* 在 H5 模式下将会编译成 margin-bottom: 50px，在小程序模式下则会忽略*/
  margin-bottom: taro-tabbar-height;
}

.nut-swiper-item {
  line-height: 150px;

  img {
    width: 100%;
    height: 100%;
  }
}

.echarts {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin-left: 20px;
  margin-right: 20px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
}
</style>
