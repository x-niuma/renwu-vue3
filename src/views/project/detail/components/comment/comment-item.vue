<template>
  <div class="comment ui-border-bottom">
    <div class="ui-flex ui-flex-jc-start ui-flex-align-start comment-header">
      <div class="ui-flex ui-flex-jc-start ui-flex-align-start">
        <img class="avatar" :src="item.author_avatar" alt="" />
        <div class="nickname">{{ item.author_name }}</div>
      </div>
      <div class="comment-action">
        <van-icon name="chat-o" class="btn-reply" @click="handleReply" />
        <van-icon name="ellipsis" />
      </div>
    </div>
    <div class="ui-ml-34">
      <div class="comment-body">
        <span class="sign-text">{{ item.content }}</span>
        <span class="date">{{ fromNow(item.create_time) }}</span>
      </div>
      <div class="comment-child" v-if="list.length">
        <ReplyItem v-for="(child, childIndex) in list" :item="child" :key="childIndex" />
        <div class="load-more" v-if="loading">加载中</div>
        <div v-else>
          <div class="load-more" v-if="isShowExpand" @click="loadMore">展开 {{ total }} 条回复</div>
          <div class="load-more" v-else-if="hasMore" @click="loadMore">加载更多回复</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, defineProps } from 'vue'
import ReplyItem from './reply-item.vue'
import { useProjectDetailStore } from '@/stores/project-detail'
import { fromNow } from '@/utils/date'

const projectDetailStore = useProjectDetailStore()

const loading = ref(false)
const props = defineProps<{
  topic_id: number
  item: CommentItemVo
}>()

const total = computed(() => {
  return props.item.reply_info.total
})
const list = computed(() => {
  return props.item.reply_info.list
})

const fetchReply = (size: number) => {
  loading.value = true
  projectDetailStore
    .queryReplyList(props.item.id, {
      comment_id: props.item.id,
      pageSize: size,
      skip: list.value.length
    })
    .then(() => {
      loading.value = false
    })
}

const hasMore = computed(() => list.value.length < total.value)
const isShowExpand = computed(() => total.value > 1 && list.value.length === 1)

const handleReply = () => {
  projectDetailStore.clearSpeakId()
  projectDetailStore.setSpeakComment(props.item)
  projectDetailStore.showEdit()
}
const loadMore = () => fetchReply(5)
</script>
