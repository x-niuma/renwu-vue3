<template>
  <div class="none-data" :class="{ 'none-data--fixed': isFixed }">
    <img class="none-data-icon" src="./img/no-msg.svg" alt="">
    <div class="none-data-text">{{ text }}</div>
  </div>
</template>
  
<script lang="ts" setup>
import { defineProps } from 'vue'
const props = defineProps({
  text: {
    type: String,
    default: '暂无数据'
  },
  isFixed: {
    type: Boolean,
    default: false
  }
})
</script>
  
<style lang="less" scoped>
.none-data {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0px;
  padding-top: 40px;

  &--fixed {
    position: fixed;
    left: 50%;
    top: 40%;
    padding-top: 0;
    text-align: center;
    transform: translate3d(-50%, -50%, 0);
  }
}

.none-data-icon {
  width: 80px;
  height: 80px;
  color: #ccc;
}

.none-data-text {
  color: #aaa;
  font-size: 12px;
  line-height: 20px;
  margin-top: 0;
}
</style>
  