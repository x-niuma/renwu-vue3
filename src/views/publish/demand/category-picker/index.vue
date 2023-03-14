<template>
  <van-popup v-model:show="isShow" round position="bottom">
    <van-picker
      :loading="loading"
      ref="pickerRef"
      class="picker"
      show-toolbar
      title="选择项目分类"
      :columns="list"
      value-key="name"
      @cancel="onCancel"
      @confirm="onConfirm"
    />
  </van-popup>
</template>

<script lang="ts" setup>
import { ref, onMounted, toRaw } from 'vue'
import * as ProjectAPI from '@/service/auto-service/项目模块'
import type { PickerInstance, PickerOption } from 'vant'

export interface ICityPicker {
  show: () => void
  hide: () => void
  getSelectedOptions: () => PickerOption[]
}

const emit = defineEmits(['confirm', 'cancel'])
const pickerRef = ref<PickerInstance>()
const isShow = ref(false)
const loading = ref(false)
const list = ref([])

const hide = () => (isShow.value = false)
const show = () => (isShow.value = true)
const getSelectedOptions = () => pickerRef.value?.getSelectedOptions() as PickerOption[]
const onCancel = () => hide()

const onConfirm = () => {
  hide()
  emit('confirm', toRaw(getSelectedOptions()))
}

const exposed = { show, hide, getSelectedOptions }
defineExpose<ICityPicker>(exposed)

onMounted(() => {
  loading.value = true
  ProjectAPI.queryCategoryList({}).then((res: any) => {
    loading.value = false
    list.value = res.data.list.map((it: any) => {
      return {
        text: it.name,
        value: it.id
      }
    })
  })
})
</script>
