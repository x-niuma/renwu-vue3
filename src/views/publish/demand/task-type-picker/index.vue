<template>
  <van-popup v-model:show="isShow" round position="bottom">
    <van-picker
      :loading="loading"
      ref="picker"
      class="picker"
      show-toolbar
      :title="title"
      :columns="props.columns"
      value-key="name"
      @cancel="onCancel"
      @confirm="onConfirm"
    />
  </van-popup>
</template>

<script lang="ts" setup>
import { ref, toRaw, defineProps, watch } from 'vue'

const props = defineProps({
  value: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: '选择任务类型'
  },
  columns: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['confirm', 'cancel'])

const isShow = ref(props.value)
const loading = ref(false)

const onCancel = () => {
  isShow.value = false
  emit('cancel')
}

const onConfirm = (data) => {
  isShow.value = true
  emit('confirm', toRaw(data.selectedOptions[0]))
}

watch(
  () => props.value,
  (v) => {
    isShow.value = v
  }
)
</script>
