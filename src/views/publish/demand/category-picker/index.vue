<template>
  <van-popup v-model:show="isShow" round position="bottom">
    <van-picker
      :loading="loading"
      ref="picker"
      class="picker"
      show-toolbar
      :title="title"
      :columns="list"
      value-key="name"
      @cancel="onCancel"
      @confirm="onConfirm"
    />
  </van-popup>
</template>

<script lang="ts" setup>
import { ref, onMounted, toRaw, defineProps, watch } from 'vue'
import * as ProjectAPI from '@/auto-service/项目模块'

const props = defineProps({
  value: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: '选择应用类型'
  }
})

const emit = defineEmits(['confirm', 'cancel'])

const isShow = ref(props.value)
const loading = ref(false)
const list = ref([])

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
