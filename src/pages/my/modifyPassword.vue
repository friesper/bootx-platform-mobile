<template >
  <view class>
    <nut-form :model-value="formData" ref="ruleForm">
      <nut-form-item prop="oldPassword" :rules="[{ required: true, message: '请输入原密码' }]" required label="原密码">
        <input class="nut-input-text" placeholder="请输入原密码" type="password" v-model="formData.oldPassword" />
      </nut-form-item>
      <nut-form-item required prop="password" :rules="[{ required: true, message: '请输入新密码' }]" label="新密码">
        <input class="nut-input-text" placeholder="请输入新密码" v-model="formData.password" type="password" />
      </nut-form-item>
      <nut-form-item required prop="confirmPassword" :rules="[{ validator: passwordValid, message: '二次确认的新密码不一致' }]" label="确认新密码">
        <input
          @blur="customBlurValidate('confirmPassword')"
          class="nut-input-text"
          placeholder="请再次输入新密码"
          v-model="formData.confirmPassword"
          type="password"
        />
      </nut-form-item>
      <view style=" margin-left:20px;margin-right: 20px ">
        <nut-button block type="primary" @click="submit">提交</nut-button>
      </view>
    </nut-form>
  </view>
</template>
  
  <script lang="ts">
import { reactive, toRefs, ref } from 'vue'
import Taro from '@tarojs/taro'
import { updatePassword } from '../../api/system/user'

export default {
  name: 'modifyPassword',
  components: {},
  setup() {
    const state = reactive({
      type: 'text',
      show: false,
      cover: false,
      userInfo: {}
    })
    const formData = reactive({
      password: '',
      oldPassword: '',
      confirmPassword: ''
    })
    const ruleForm = ref<any>(null)
    const reset = () => {
      ruleForm.value.reset()
    }
    const handleClick = (type, msg, cover = false) => {
      Taro.navigateBack()
    }
    const submit = () => {
      ruleForm.value.validate().then(({ valid, errors }: any) => {
        if (valid) {
          Taro.showLoading({ title: '请求中' })
          updatePassword(formData.oldPassword, formData.password)
            .then(res => {
              Taro.hideLoading()
              Taro.showToast({ title: '成功', icon: 'success', duration: 2000 })
              Taro.navigateBack()
            })
            .catch(err => {
              Taro.showToast({ title: err, icon: 'error', duration: 2000 })
              Taro.hideLoading()
            })
          console.log('success', formData)
        } else {
          console.log('error submit!!', errors)
        }
      })
    }
    const passwordValid = (item: string, newItem: String): boolean => {
      console.log(formData.confirmPassword)
      return formData.confirmPassword === formData.password
    }
    const customBlurValidate = (prop: string) => {
      console.log(prop)

      ruleForm.value.validate(prop).then(({ valid, errors }: any) => {
        if (valid) {
          console.log('success', formData)
        } else {
          console.log('error submit!!', errors)
        }
      })
    }

    return {
      ...toRefs(state),
      handleClick,
      customBlurValidate,
      ruleForm,
      passwordValid,
      formData,
      submit
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
  