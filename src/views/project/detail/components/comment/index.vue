<template>
  <div class="floor">
    <div class="floor__header">
      <div class="title">留言列表</div>
    </div>
    <div class="floor__body">
      <div class="list">
        <CommentItem v-for="(item, index) in comments" :key="index" :item="item" :topic_id="topic_id" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import * as CommentAPI from '@/service/auto-service/评论模块'
import { CommentTopicTypeEnum } from '@/types/enum'
import type { CommentItemVo } from '@/service/auto-service/types'
import CommentItem from './item.vue'

const props = defineProps<{
  topic_id: number;
}>()

const comments = ref<CommentItemVo[]>([])

const getComments = async () => {
  const res = await CommentAPI.queryCommentList({
    topic_id: props.topic_id,
    topic_type: CommentTopicTypeEnum.project,
  })
  comments.value = res.data.list
}

onMounted(() => {
  getComments()
})
</script>