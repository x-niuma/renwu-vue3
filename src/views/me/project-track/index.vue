<template>
  <Page title="项目互动">
    <van-tabs class="scroll" shrink v-model:active="active">
      <van-tab title="点赞" :name="TrackActionTypeEnum.like">
        <Collect :action_type="TrackActionTypeEnum.like" />
      </van-tab>
      <van-tab title="收藏" :name="TrackActionTypeEnum.star">
        <Collect :action_type="TrackActionTypeEnum.star" />
      </van-tab>
    </van-tabs>
  </Page>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Page from '@/components/page/index.vue'
import Collect from './components/collect/index.vue'
import { TrackActionTypeEnum } from '@/views/project/detail/utils'
import { useRoute } from 'vue-router'

const route = useRoute();
const active = ref(route.query.action_type ? Number(route.query.action_type) : TrackActionTypeEnum.like)
</script>

<style lang="less" scoped>
.scroll {
  :deep(.van-tabs__content) {
    padding-left: 12px;
    padding-right: 12px;
  }
}
</style>
