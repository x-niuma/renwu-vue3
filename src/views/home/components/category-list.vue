<template>
  <div v-if="menuList.length">
    <van-tabs class="list" @click-tab="handleClick" v-model:active="activeIndex">
      <van-tab v-for="(item, index) in menuList" :key="index" :title="item.name" :name="index">
        <slot></slot>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import * as projectService from '@/auto-service/项目模块'

const emit = defineEmits(['change'])
const menuList = ref([] as any[])
const activeIndex = ref(0)

const handleClick = (active: any) => {
  activeIndex.value = active.name
  emit('change', activeIndex.value)
}

const slideTo = (index: number) => {
  activeIndex.value = index
}

defineExpose({ slideTo })

onMounted(async () => {
  let res: any = await projectService.queryCategoryList({})
  menuList.value = res.data!.list
})
</script>

<style lang="less" scoped>
.list {
  overflow: hidden;
  width: 100%;
}
</style>
