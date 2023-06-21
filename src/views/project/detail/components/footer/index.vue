<template>
  <div class="group group-btm">
    <div v-if="projectDetailStore.isEdit" class="edit-box ui-flex ui-flex-align-start">
      <van-field
        class="input"
        v-model="content"
        rows="1"
        autosize
        type="textarea"
        placeholder="请输入留言"
      />
      <van-button class="ui-ml-10" size="small" type="default" @click="send">发送</van-button>
      <van-button class="ui-ml-10" size="small" type="default" @click="projectDetailStore.hideEdit"
        >取消</van-button
      >
    </div>

    <div class="action-box ui-flex" v-else>
      <div class="edit-tip" @click="projectDetailStore.showEdit">
        <van-icon name="edit" />
        <span>说点什么</span>
      </div>
      <div>
        <van-space :size="18">
          <div class="ui-flex">
            <van-icon v-if="likeStatus" class="icon" name="like" />
            <van-icon v-else class="icon" :name="'like-o'" />
            <span>{{ likeCount }}</span>
          </div>
          <div class="ui-flex">
            <van-icon v-if="starStatus" class="icon" name="star" />
            <van-icon v-else class="icon" name="star-o" />
            <span>{{ starCount }}</span>
          </div>
          <div class="ui-flex">
            <van-icon class="icon" name="chat-o" />
            <span>10</span>
          </div>
        </van-space>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useProjectDetailStore } from '@/stores/project-detail'
import { CommentReplyTypeEnum } from '@/types/enum';

const props = defineProps<{
  topic_id: number;
  topic_type: string;
  starStatus: boolean;
  likeStatus: boolean;
  likeCount: number;
  starCount: number;
}>()

const projectDetailStore = useProjectDetailStore()
const content = ref('')

const send = () => {
  if (projectDetailStore.speakCommentInfo) {
    // 回复某个评论
    const item = projectDetailStore.speakCommentInfo;
    projectDetailStore.replyToComment({
      to_uid: item!.from_uid,
      comment_id: item!.id,
      reply_id: item!.id,
      reply_type: CommentReplyTypeEnum.comment,
      content: content.value,
      images: ''
    })
  } else if (projectDetailStore.speakReply) {
    // 回复某个回复
    const item = projectDetailStore.speakReply;
    projectDetailStore.replyToComment({
      to_uid: item!.from_uid,
      comment_id: item!.comment_id,
      reply_id: item!.id,
      reply_type: CommentReplyTypeEnum.reply,
      content: content.value,
      images: ''
    })
  } else {
    // 添加评论
    projectDetailStore.addComment({
      topic_id: props.topic_id,
      topic_type: props.topic_type,
      content: content.value,
      images: ''
    })
  }
}
</script>

<style lang="less" scoped>
.icon {
  font-size: 20px;
  margin-right: 4px;
}

.edit-box {
  flex: 1;
  padding: 12px;
  .input {
    flex: 1;
    padding: 6px 12px;
    border-radius: 16px;
    background-color: #f5f5f5;
  }
}

.action-box {
  flex: 1;
  padding: 10px 12px;
  .edit-tip {
    display: flex;
    align-items: center;
    color: #888;
    height: 32px;
    padding: 0 12px;
    padding-right: 100px;
    border-radius: 16px;
    background-color: #f5f5f5;
  }
}
</style>
