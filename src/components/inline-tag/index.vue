<template>
  <span class="inline-tag">
    <span class="text">{{ text }}</span>
  </span>
</template>
  
<script lang="ts" setup>
import { defineProps } from 'vue'
const props = defineProps({
  text: {
    type: String,
    default: ''
  }
})
</script>

<style lang="less" scoped>
.inline-tag {
  display: inline-block;
  padding: 1px 0px;
  line-height: 20px;
  color: #72ace8;
  text-align: center;
  margin-right: 5px;
  border-radius: 2px;
  background: rgba(64, 158, 255, 0.1);
  background: #f7f6f6;
}

.text {
  display: block;
  font-size: 13px;
  transform: scale(0.8);
}
</style>
  