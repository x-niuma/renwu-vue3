<template>
  <van-popup v-model:show="isShow" round position="bottom">
    <van-picker
      :loading="loading"
      ref="pickerRef"
      class="picker"
      show-toolbar
      title="选择任务类型"
      :columns="props.columns"
      value-key="name"
      @cancel="onCancel"
      @confirm="onConfirm"
    />
  </van-popup>
</template>

<script lang="ts" setup>
import { ref, toRaw, defineProps } from 'vue'
import type { PickerColumn, PickerInstance, PickerOption } from 'vant'

export interface ICityPicker {
  show: () => void
  hide: () => void
  getSelectedOptions: () => PickerOption[]
}

const props = defineProps<{ columns: (PickerOption | PickerColumn)[] }>()
const emit = defineEmits(['confirm', 'cancel'])
const pickerRef = ref<PickerInstance>()
const isShow = ref(false)
const loading = ref(false)

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
</script>
