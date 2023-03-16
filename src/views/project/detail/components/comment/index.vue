<template>
  <div class="floor">
    <div class="floor__header">
      <div class="title">留言列表</div>
    </div>
    <div class="floor__body">
      <div class="list">
        <CommentItem v-for="(item, index) in comments" :key="index" :item="item" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import * as CommentAPI from '@/service/auto-service/评论模块'
import { CommentTopicTypeEnum } from '@/types/enum'
import type { CommentItemVo } from '@/service/auto-service/types'
import CommentItem from './item.vue'

const route = useRoute()
const comments = ref<CommentItemVo[]>([])
const projectId = Number(route.query.id)

const getComments = async () => {
  const res = await CommentAPI.queryCommentList({
    topic_type: CommentTopicTypeEnum.project,
    topic_id: projectId
  })
  comments.value = res.data.list
}

onMounted(() => {
  getComments()
})
</script>

<style lang="less" scoped src="./index.less"></style>
