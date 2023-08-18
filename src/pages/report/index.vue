<template>
    <div class="main.full">
        <nut-form>
            <nut-form-item label="标题" body-align="center">
                <nut-input v-model="fromData.title" class="nut-input-text" placeholder="请输入标题" type="text" />
            </nut-form-item>
            <nut-form-item label="问题分类" body-align="center">
                <nut-input v-model="fromData.category" class="nut-input-text" readonly placeholder="请输入联系电话"
                    @click="categoryData.visible = true" />
            </nut-form-item>
            <nut-form-item label="联系方式">
                <nut-input v-model="fromData.tel" class="nut-input-text" placeholder="请输入联系电话" type="text" />
            </nut-form-item>
            <nut-form-item v-model="fromData.desc" label="问题描述" body-align="center">
                <nut-textarea placeholder="请输入问题描述" type="text" text-align="left" />
            </nut-form-item>
            <nut-form-item label="相关图片">
                <nut-uploader url=" " accept="image/*" v-model:file-list="fromData.defaultFileList" maximum="3" multiple>
                </nut-uploader>
            </nut-form-item>
            <nut-form-item label="相关文件">
                <nut-uploader v-model:file-list="fromData.defaultFileList" list-type="list"
                    :before-xhr-upload="beforeXhrUpload" maximum="3" multiple>\
                    <nut-button type="success" size="small">上传文件</nut-button>
                </nut-uploader>
            </nut-form-item>
        </nut-form>

        <nut-cascader title="问题分类" v-model:visible="categoryData.visible" v-model="categoryData.value"
            @change="events.change" @pathChange="events.pathChange" :options="categoryData.options"></nut-cascader>
    </div>
</template>
  
<script>
import { h, reactive, toRefs } from 'vue'
import Taro from '@tarojs/taro'
import { IconFont } from '@nutui/icons-vue-taro'
import { Grid, GridItem } from '@nutui/nutui-taro'
import { Dongdong } from '@nutui/icons-vue-taro'
import { getUpLoadOptions } from '@/api/system/common'
import { Home, Category, Find, My } from '@nutui/icons-vue-taro'
import { getTimeId } from '@/util/commonUtil'
export default {
    name: 'Index',
    components: { IconFont, Grid, GridItem, Dongdong },
    setup() {
        const state = reactive({
            fromData: {
                title: '',
                category: '',
                tel: '',
                desc: '',
                defaultFileList: []
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
        const events = {
            change(...args: any) {
                console.log('change', ...args);
                state.fromData.category = args[0]
            },
            pathChange(...args: any) {
                console.log('pathChange', ...args);
            }
        };
        const beforeXhrUpload = (taroUploadFile, options) => {
            let fileKey = getTimeId(12);
            //taroUploadFile  是 Taro.uploadFile ， 你也可以自定义设置其它函数
            getUpLoadOptions().then(res => {
                if (res.code == 0) {

                    let data = res.data
                    let fileKey = getTimeId(4, "ax")
                    console.log(fileKey)
                    console.log()
                    const uploadTask = Taro.uploadFile({
                        url: data.uploadUrl,
                        filePath: options.taroFilePath,
                        fileType: options.fileType,
                        header: {
                            'Content-Type': 'multipart/form-data',
                        }, //
                        formData: { ...res.data.formData, key: fileKey },
                        name: "file",
                        success(response: { errMsg: any; statusCode: number; data: string }) {
                            if (options.xhrState == response.statusCode) {
                                options.onSuccess?.(response, options);
                            } else {
                                options.onFailure?.(response, options);
                            }
                        },
                        fail(e: any) {
                            options.onFailure?.(e, options);
                        }
                    });
                    options.onStart?.(options);
                    uploadTask.progress((res: { progress: any; totalBytesSent: any; totalBytesExpectedToSend: any }) => {
                        options.onProgress?.(res, options);
                        // console.log('上传进度', res.progress);
                        // console.log('已经上传的数据长度', res.totalBytesSent);
                        // console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend);
                    });
                }

            }).catch(err => {

            })

            // uploadTask.abort(); // 取消上传任务
        };
        return {
            events,
            ...toRefs(state),
            beforeXhrUpload
        }
    }
}
</script>
  
<style lang="scss"></style>
  