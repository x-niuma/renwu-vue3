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
        <!-- <div class="comment-child" v-if="comment.children && comment.children.length"> -->
          <!-- <comment
            :level="level + 1"
            v-for="(child, childIndex) in comment.children"
            :comment="child"
            :key="childIndex"
            :parent="comment"
            :onClickReply="onClickReply"
          />
          <div class="load-more" v-if="level === 1 && comment.hasMore" @click="onLoadMore">
            加载更多
          </div> -->
        <!-- </div> -->
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import type { CommentItemVo } from '@/service/auto-service/types';
  import { defineProps } from 'vue';
  
  const props = defineProps<{
    item: CommentItemVo
  }>();

const handleReply = () => {}

  </script>
  
  
  <style lang="less" scoped src="./index.less"></style>