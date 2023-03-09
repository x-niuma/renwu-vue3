<template>
  <template v-if="detailData">
    <div class="floor demand-item">
      <div class="demand-item__hd">
        <div class="title">{{ detailData.title }}</div>
      </div>
      <div class="demand-item__bd">
        <div class="column">
          <span class="label">任务标签：</span>
          <InlineTag :text="detailData.appType" />
          <InlineTag :text="detailData.projectType + '任务'" />
        </div>
        <div class="column">
          <span class="label">需求预算：</span>
          <span>￥{{ detailData.reward / 100 }}</span>
        </div>
        <div class="column">
          <span class="label">技能要求：</span>
          <span v-html="detailData.requires || '无要求'"></span>
        </div>
        <div class="column">
          <span class="label">发布日期：</span>
          <span>{{ detailData.createTime }}</span>
        </div>
        <div class="column">
          <span class="label">截止日期：</span>
          <span v-if="detailData.deadline">
            {{ detailData.deadline }}
          </span>
          <span v-else>无要求</span>
        </div>
      </div>
      <div class="demand-item__ft">
        <div class="ui-flex">
          <img class="demand-item__avatar" :src="detailData.userInfo.avatar || avatar" />
          <div class="demand-item__name">{{ detailData.userInfo.nickname }}</div>
        </div>
        <div class="ui-flex enroll-info">
          <van-icon class="icon-people" name="friends" />
          <span class="enroll-info-num">{{ 0 }}人报名</span>
        </div>
      </div>
    </div>

    <div class="floor floor-desc">
      <div class="floor__header">需求描述</div>
      <div class="floor__body">
        <!-- <div v-html="decodeText()"></div> -->
      </div>
    </div>
  </template>
</template>
  
<script lang="ts" setup>
import { defineProps } from 'vue'

import InlineTag from '@/components/inline-tag/index.vue'
import avatar from '@/assets/img/avatar.png'
defineProps({
  detailData: Object as any
})
</script>
  
<style lang="less" scoped src="./index.less"></style>
  