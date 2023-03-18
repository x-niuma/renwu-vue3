<template>
  <div class="floor floor-candidate">
    <div class="floor__header">
      <span>投标列表</span>
      <!-- <van-icon v-if="enrollInfo.total > enrollInfo.pageSize" @click="isScroll = !isScroll" :class="{ 'is-up': !isScroll }"
        class="van-icon" name="arrow-down" /> -->
    </div>
    <div class="floor__body">
      <div class="zero-tip" v-if="enrollList.length === 0">暂时无人报名</div>
      <ul class="u-list" :class="{ 'is-scroll': isScroll }" v-else>
        <li class="u-item" v-for="(item, index) in enrollList" :key="index">
          <img class="u-avatar" :src="item.userInfo.avatar || avatar" />
          <div class="u-nickname">{{ item.userInfo.nickname }}</div>
          <!-- <van-button class="u-btn" size="mini" :disabled="item.status === 3000 || item.status === 4000"
            @click="handleConfirmOrder(item)" v-if="userInfo.id === itemInfo.userInfo.id">
            <span v-if="item.status === 3000">已完成</span>
            <span v-else-if="item.status === 4000">已取消</span>
            <span v-else>确认完成</span>
          </van-button> -->
        </li>
        <li class="u-item load-more" v-if="enrollNum > enrollList.length">
          <van-icon class="icon-more" name="ellipsis" @click="loadMoreEnrollList" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import avatar from '@/assets/img/avatar.png';

defineProps({
  enrollList: Object as any
})

const enrollNum = 10;
const isScroll = ref(false);
const userInfo = ref({})
const loadMoreEnrollList = () => {}
</script>