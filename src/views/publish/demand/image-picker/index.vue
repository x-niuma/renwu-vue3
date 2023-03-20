<template>
  <div class="upload-wrap">
    <van-uploader v-model="fileList" multiple :after-read="afterRead" />
  </div>
</template>

<script lang="ts" setup>
import type { UploaderFileListItem } from 'vant'
import * as qiniu from 'qiniu-js'
import { ref, onMounted, defineExpose } from 'vue'
import { get7niuToken } from '@/service/auto-service/上传模块'

export interface ImagePickerRef {
  getValue: () => string[]
}

const uploadToken = ref('')
const fileList = ref<UploaderFileListItem[]>([])

const afterRead = (file: UploaderFileListItem|UploaderFileListItem[], detail: {}) => {
  console.log(detail)
  if (file && !Array.isArray(file)) {
    upload(file)
  }
}

const upload = (it: UploaderFileListItem) => {
  const { file } = it
  const observable = qiniu.upload(file!, file!.name, uploadToken.value, {}, {})
  observable.subscribe({
    next(res) {
      it.status = 'uploading'
      it.message = `${res.total.percent}%`
    },
    error(error) {
      it.status = 'failed'
      it.message = error.message || '上传失败'
    },
    complete(res) {
      it.status = 'done'
      it.url = 'http://s2.airtlab.com/' + res.key
      console.log()
    }
  })
}
const getValue = () => fileList.value.map((it) => it.url)
const exposed = { getValue }

defineExpose(exposed)

onMounted(() => {
  get7niuToken({}).then((res: any) => {
    uploadToken.value = res.data.token
  })
})
</script>

<style lang="less" scoped>
.upload-wrap {
  :deep(.van-uploader__upload),
  :deep(.van-uploader__preview) {
    border: 1px solid #eae9e9;
  }
}
</style>
