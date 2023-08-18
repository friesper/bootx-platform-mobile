<template>
  <div class="main.full">
    <template v-for="(item, index) in itemList" :key="index">
      <h2>{{ item.moduleName }}</h2>
      <nut-grid :gutter="5">
        <nut-grid-item v-for="(subitem, subIndex) in item.subList" :key="subIndex" :text="subitem.name"
          @click="handleClick(subitem)">
          <slot name="icon">
            <IconFont font-class-name="iconfont" class-prefix="icon" :name="subitem.icon" />
          </slot>
        </nut-grid-item>
      </nut-grid>
    </template>
    <nut-toast :msg="msg" v-model:visible="show" :type="type" :cover="cover" />
  </div>
</template>

<script>
import { h, reactive, toRefs } from 'vue'
import Taro from '@tarojs/taro'
import { IconFont } from '@nutui/icons-vue-taro'
import { Grid, GridItem } from '@nutui/nutui-taro'
import { Dongdong } from '@nutui/icons-vue-taro'

import { Home, Category, Find, My } from '@nutui/icons-vue-taro'

export default {
  name: 'Index',
  components: { IconFont, Grid, GridItem, Dongdong },
  setup() {
    const state = reactive({
      msg: '工作台',
      type: 'text',
      show: false,
      cover: false,
      //可以通过权限接口方式来填充这个List，以实现对工作台页面的项目的控制,其中的url是需要预先开发好的页面
      itemList: [
        { moduleName: '业务管理', subList: [{ name: '日报', icon: 'ribao', url: null }, { name: '结算台', icon: 'slice', url: '' }] },
        {
          moduleName: '流程中心',
          subList: [
            {
              name: 'OA审批',
              icon: 'tianshenpi',
              url: '/pages/my/personInfo/index'
            }
          ]
        }
      ]
    })
    const handleClick = item => {
      if (!item.url) {
        Taro.showToast({
          title: '参数配置错误',
          icon: 'error',
          duration: 2000
        })
        return
      }
      Taro.navigateTo({ url: item.url }, 550)
    }
    return {
      ...toRefs(state),
      handleClick
    }
  }
}
</script>

<style lang="scss"></style>
