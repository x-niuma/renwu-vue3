<template>
  <div class="data-finish">
    <span>{{ text }}</span>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
defineProps({
  text: {
    type: String,
    default: '加载完毕'
  },
  isFixed: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="less" scoped>
.data-finish {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #ccc;
  height: 24px;
}
</style>
