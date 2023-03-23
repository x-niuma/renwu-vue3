<template>
  <div class="floor">
    <div class="floor__header">
      <div class="title">留言列表</div>
    </div>
    <div class="floor__body ui-pt-0">
      <div class="list">
        <List v-model:loading="loading" :finished="finished" @load="onLoad">
          <CommentItem
            v-for="item in projectDetailStore.comments"
            :key="item.id"
            :item="item"
            :topic_id="topic_id"
          />
        </List>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { List } from 'vant'
import { ref, onMounted } from 'vue'
import { CommentTopicTypeEnum } from '@/types/enum'
import CommentItem from './item.vue'
import { useProjectDetailStore } from '@/stores/project-detail'

const loading = ref(false)
const finished = ref(false)
const pageSize = 5;
const pageIndex = ref(0);

const onLoad = () => {
  pageIndex.value += 1;
  projectDetailStore
    .getComments({
      pageSize,
      pageIndex: pageIndex.value,
      topic_id: props.topic_id,
      topic_type: CommentTopicTypeEnum.project
    })
    .then((res) => {
      loading.value = false
      if (res.data.list.length === 0) {
        finished.value = true
      }
    })
}
const props = defineProps<{ topic_id: number }>()
const projectDetailStore = useProjectDetailStore()
</script>
