<template>
  <div class="floor demand-item ui-p-12">
    <div class="ui-flex ui-fs-14 ui-lh-20 ui-font-bold">
      <div class="title">{{ detailData.title }}</div>
    </div>
    <div class="ui-pt-10 ui-pb-10 ui-lh-24">
      <div class="ui-flex ui-flex-jc-start">
        <span class="label">任务标签：</span>
        <InlineTag :text="detailData.task_type_name" />
        <InlineTag :text="detailData.category_name" />
      </div>
      <div class="ui-block">
        <span class="label">需求预算：</span>
        <span>￥{{ detailData.reward / 100 }}</span>
      </div>
      <div class="ui-block">
        <span class="label">技能要求：</span>
        <span v-html="detailData.skill || '无要求'"></span>
      </div>
      <div class="ui-block">
        <span class="label">发布日期：</span>
        <span>{{ detailData.create_time }}</span>
      </div>
      <div class="ui-block">
        <span class="label">截止日期：</span>
        <span v-if="detailData.create_time">
          {{ detailData.create_time }}
        </span>
        <span v-else>无要求</span>
      </div>
    </div>
    <div class="demand-item__ft">
      <div class="ui-flex">
        <img class="demand-item__avatar" :src="detailData.author_avatar || avatar" />
        <div class="demand-item__name">{{ detailData.author_name }}</div>
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
      {{ detailData.description }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import InlineTag from '@/components/inline-tag/index.vue'
import avatar from '@/assets/img/avatar.png'
import type { ProjectItemVo } from '@/service/auto-service/项目模块'

defineProps<{
  detailData: ProjectItemVo
}>()
</script>
