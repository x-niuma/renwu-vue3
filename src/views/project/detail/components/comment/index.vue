<template>
  <div class="comment u-flex">
    <div class="side">
      <img class="avatar" :src="author.avatar" alt />
    </div>
    <div class="main">
      <div class="u-flex comment-header">
        <div class="nickname">{{ author.nickname }}</div>
      </div>
      <div class="comment-body">
        <span v-if="parent">
          <span class="sign-replay" @click="handleReply">回复</span>
          <span class="sign-quote">@</span>
          <span class="sign-name">{{ parent.userInfo.nickname }}:</span>
          <span class="sign-text">{{ comment.content }}</span>
        </span>
        <span class="sign-text" v-else>{{ comment.content }}</span>
        <div class="comment-date">
          <span class="date">{{ comment.createTime | formatDate }}</span>
          <div class="comment-action">
            <van-icon name="chat-o" class="btn-reply" @click="handleReply" />
            <van-icon name="ellipsis" />
          </div>
        </div>
      </div>
      <div class="comment-child" v-if="comment.children && comment.children.length">
        <comment
          :level="level + 1"
          v-for="(child, childIndex) in comment.children"
          :comment="child"
          :key="childIndex"
          :parent="comment"
          :onClickReply="onClickReply"
        />
        <div class="load-more" v-if="level === 1 && comment.hasMore" @click="onLoadMore">
          加载更多
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'comment', // 递归组件
  components: {},
  props: {
    comment: {
      type: Object,
      default: null
    },
    parent: {
      type: Object,
      default: null
    },
    onClickReply: {
      type: Function
    },
    level: {
      type: Number,
      default: 1
    },
    getChildComment: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      complainVisible: false
    }
  },
  computed: {
    author() {
      return this.comment.userInfo || {}
    }
  }
}
</script>
