<template>
  <div class="comment u-flex">
    <div class="side">
      <img class="avatar" :src="item.author_avatar" alt="" />
    </div>
    <div class="main">
      <div class="u-flex comment-header">
        <div class="nickname">{{ item.author_name }}</div>
      </div>
      <div class="comment-body">
        <!-- <span v-if="parent">
            <span class="sign-replay" @click="handleReply">回复</span>
            <span class="sign-quote">@</span>
            <span class="sign-name">{{ parent.userInfo.nickname }}:</span>
            <span class="sign-text">{{ comment.content }}</span>
          </span>
          <span class="sign-text" v-else>{{ comment.content }}</span> -->
        <span class="sign-text">{{ item.content }}</span>
        <div class="comment-date">
          <span class="date">{{ item.create_time }}</span>
          <div class="comment-action">
            <van-icon name="chat-o" class="btn-reply" @click="handleReply" />
            <van-icon name="ellipsis" />
          </div>
        </div>
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
import type { CommentItemVo, ReplyItemVo } from '@/service/auto-service/types'
import { queryReplyList } from '@/service/auto-service/评论模块'
import { ref, computed, defineProps, onMounted } from 'vue'
import ReplyItem from './reply-item.vue'

const loading = ref(false)
const props = defineProps<{
  topic_id: number
  item: CommentItemVo
}>()

const total = ref(0)
const list = ref<ReplyItemVo[]>([])

const fetchReply = (size: number) => {
  loading.value = true
  queryReplyList({
    comment_id: props.item.id,
    pageSize: size,
    skip: list.value.length
  }).then((res) => {
    loading.value = false
    total.value = res.data.total
    list.value.push(...res.data.list)
  })
}

const hasMore = computed(() => list.value.length < total.value)
const isShowExpand = computed(() => total.value > 1 && list.value.length === 1)

const handleReply = () => {}
const loadMore = () => fetchReply(5)

onMounted(() => {
  fetchReply(1)
})
</script>

<style lang="less" scoped src="./index.less"></style>
