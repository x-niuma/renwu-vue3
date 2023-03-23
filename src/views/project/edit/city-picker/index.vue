<template>
  <van-popup v-model:show="isShow" position="bottom">
    <van-picker
      :model-value="defaultValues"
      ref="pickerRef"
      :columns="list"
      :loading="loading"
      show-toolbar
      title="选择地址"
      @cancel="onCancel"
      @confirm="onConfirm"
      value-key="name"
    />
  </van-popup>
</template>

<script lang="ts" setup>
import { ref, onMounted, toRaw } from 'vue'
import type { PickerInstance, PickerOption } from 'vant'
import { getCity } from '@/service/auto-service/default'

export interface ICityPicker {
  show: () => void
  hide: () => void
  getSelectedOptions: () => PickerOption[]
}

const props = defineProps<{
  defaultValues: string[]
}>();

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
  getCity({}).then((res: any) => {
    list.value = res.data.list
  })
})
</script>
