<template>
  <div class="comment ui-flex ui-flex-jc-start ui-flex-align-start">
    <div class="side">
      <img class="avatar" :src="item.author_avatar" alt="" />
    </div>
    <div class="main">
      <div class="ui-flex ui-flex-jc-start ui-flex-align-start comment-header">
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
          <span class="date">{{ formatDate(item.create_time) }}</span>
          <div class="comment-action">
            <van-icon name="chat-o" class="btn-reply" @click="handleReply" />
            <van-icon name="ellipsis" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useProjectDetailStore } from '@/stores/project-detail';
import { formatDate } from '@/utils/date';
import { defineProps } from 'vue'

const props = defineProps<{
  item: ReplyItemVo
}>()


const projectDetailStore = useProjectDetailStore()

const handleReply = () => {
  projectDetailStore.clearSpeakId();
  projectDetailStore.setSpeakReplay(props.item);
  projectDetailStore.showEdit()
}
</script>