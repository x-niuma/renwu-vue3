<template>
  <div class="comment">
    <div class="ui-flex ui-flex-jc-start ui-flex-align-start comment-header">
      <div class="ui-flex ui-flex-jc-start ui-flex-align-start">
        <img class="avatar" :src="item.author_avatar" alt="" />
        <div class="nickname">
          {{ item.author_name }}
        </div>
      </div>
      <div class="comment-action">
        <van-icon name="chat-o" class="btn-reply" @click="handleReply" />
        <van-icon name="ellipsis" />
      </div>
    </div>
    <div class="comment-body ui-ml-24">
      <span v-if="item.reply_type === 'reply'">
        <span>回复:</span>
        <span class="to-name">{{ item.to_name }}</span>
      </span>
      <span class="sign-text">{{ item.content }}</span>
      <span class="date">[{{ fromNow(item.create_time) }}]</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useProjectDetailStore } from '@/stores/project-detail'
import { fromNow } from '@/utils/date'
import { defineProps } from 'vue'

const props = defineProps<{
  item: ReplyItemVo
}>()

const projectDetailStore = useProjectDetailStore()

const handleReply = () => {
  projectDetailStore.clearSpeakId()
  projectDetailStore.setSpeakReplay(props.item)
  projectDetailStore.showEdit()
}
</script>
