<template>
  <Page title="项目互动">
    <van-tabs class="scroll" shrink v-model:active="active">
      <van-tab title="点赞" :name="1">
        <Collect :action_type="1" />
      </van-tab>
      <van-tab title="收藏" :name="2">
        <Collect :action_type="2" />
      </van-tab>
    </van-tabs>
  </Page>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Page from '@/components/page/index.vue'
import Collect from './components/collect/index.vue'
const active = ref(1)
</script>

<style lang="less" scoped>
.scroll {
  :deep(.van-tabs__content) {
    padding-left: 12px;
    padding-right: 12px;
  }
}
</style>
