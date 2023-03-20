<template>
  <div class="floor">
    <div class="floor__header">
      <div class="title">留言列表</div>
    </div>
    <div class="floor__body ui-pt-0">
      <div class="list">
        <CommentItem
          v-for="item in projectDetailStore.comments"
          :key="item.id"
          :item="item"
          :topic_id="topic_id"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { CommentTopicTypeEnum } from '@/types/enum'
import CommentItem from './item.vue'
import { useProjectDetailStore } from '@/stores/project-detail'

const props = defineProps<{ topic_id: number }>()
const projectDetailStore = useProjectDetailStore()

onMounted(() => {
  projectDetailStore.getComments({
    topic_id: props.topic_id,
    topic_type: CommentTopicTypeEnum.project
  })
})
</script>
