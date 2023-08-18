<template>
    <div class="main.full">
        <nut-form :model-value="formData" :rules="{
            name: [{
                message: 'name 至少两个字符',
                validator: nameLengthValidator
            }]
        }" ref="ruleForm">
            <nut-form-item :rules="[
                { required: true, message: '请选择分类' },
            ]" required prop="classify" label="问题分类" body-align="center">
                <nut-input class="nut-input-text" v-model="formData.classify" readonly placeholder="请选择分类"
                    @click="categoryData.visible = true" />
            </nut-form-item>
            <nut-form-item required prop="name" max-length="10" label="姓名" body-align="center">
                <nut-input v-model="formData.name" clearable class="nut-input-text" placeholder="请输入您的姓名" type="text" />
            </nut-form-item>
            <nut-form-item prop="contact" required label="联系方式" :rules="[
                { required: true, message: '请填写联系电话' },
                { validator: validTelPhone, message: '电话格式不正确' }
            ]">
                <nut-input v-model="formData.contact" clearable class="nut-input-text" placeholder="请输入您的联系方式 "
                    type="number" />
            </nut-form-item>
            <nut-form-item prop="content" required :rules="[{ required: true, message: '请输入反馈内容' },]" label="内容"
                body-align="center">
                <nut-textarea max-length="200" clearable limit-show v-model="formData.content" placeholder="请输入反馈内容"
                    type="text" text-align="left" />
            </nut-form-item>
            <nut-cell>
                <nut-button type="primary" style="margin-right: 10px" size="large" @click="submit">提交</nut-button>
            </nut-cell>
        </nut-form>
        <nut-cascader title="问题分类" v-model:visible="categoryData.visible" v-model="categoryData.value"
            @change="events.change" @pathChange="events.pathChange" :options="categoryData.options"></nut-cascader>

    </div>
</template>
<script>
import { h, ref, reactive, toRefs } from 'vue'
import Taro from '@tarojs/taro'
import { IconFont } from '@nutui/icons-vue-taro'
import { Grid, GridItem } from '@nutui/nutui-taro'
import { Dongdong } from '@nutui/icons-vue-taro'
import { addFeedBack } from '@/api/system/user'
import { getTimeId } from '@/util/commonUtil'
export default {
    name: 'add',
    components: { IconFont, Grid, GridItem, Dongdong },
    setup() {
        const state = reactive({
            formData: {
                classify: '',
                name: '',
                contact: '',
                content: '',
            },
            categoryData: {
                options: [{
                    value: '程序功能',
                    text: '程序功能'
                },
                {
                    value: '业务咨询',
                    text: '业务咨询',
                }],
                visible: false,
                value: 'null'
            }
        })

        const ruleForm = ref < any > (null);
        const reset = () => {
            ruleForm.values.reset();
        };
        const nameLengthValidator = (val: string) => {
            if (val == null || val == undefined) {
                return Promise.reject('姓名必须存在');
            }
            if (val.length > 10) {
                return Promise.reject('不能超过五个字');
            } else if (val.length < 2) {
                return Promise.reject('名称两个字以上');
            }
            return Promise.resolve();

        };
        const submit = () => {
            ruleForm.value.validate().then(({ valid, errors }) => {
                if (valid) {
                    addFeedBack(state.formData).then(res => {
                        if (res.code == 0) {
                            Taro.showToast({
                                title: '成功',
                                icon: 'success',
                                duration: 2000,
                                mask: true,
                                success: () => {
                                    setTimeout(() => { Taro.navigateBack() }, 2000)
                                }
                            })
                        } else {
                            Taro.showToast({
                                title: '提交失败',
                                icon: 'fail',
                                duration: 2000
                            })
                        }

                    }).catch(err => {
                        console.log(err)
                        Taro.showToast({
                            title: "失败",
                            icon: 'error',
                            duration: 2000
                        })
                    })
                    console.log('success', state.formData);
                } else {
                    console.log('error submit!!', errors);
                }
            });
        };
        const events = {
            change(...args: any) {
                console.log('change', ...args);
                state.formData.classify = args[0]
            },
            pathChange(...args: any) {
                console.log('pathChange', ...args);
            }
        };
        const validTelPhone = (val) => {
            console.log('nam;en' + val)

            const telReg = /^1\d{10}$/;
            if (!val) {
                return Promise.reject('请输入联系电话');
            } else if (!telReg.test(val)) {
                return Promise.reject('联系电话格式不正确');
            } else {
                return Promise.resolve();
            }
        };
        const openToast = (type: string, msg: string, cover: boolean = false) => {
            state.show = true;
            state.msg = msg;
            state.type = type;
            state.cover = cover;
            state.title = title;
            state.bottom = bottom;
            state.center = center;
        };
        return {
            ruleForm,
            validTelPhone,
            nameLengthValidator,
            submit,
            events,
            reset,
            ...toRefs(state),
        }
    }
}
</script>
  
<style lang="scss"></style>
  