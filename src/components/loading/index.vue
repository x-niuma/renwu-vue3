<template>
  <div class="loading">
    <p>{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

defineProps({
  message: {
    type: String,
    default: '加载中...'
  }
})
</script>

<style lang="less" scoped>
p {
  line-height: 50px;
  font-size: 12px;
  color: #bdc0c5;
  text-align: center;
}
</style>
