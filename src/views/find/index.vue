<script setup lang="ts">
import { Button } from 'vant';
import Page from '@/components/page/index.vue';
</script>

<template>
  <Page :tabBarProps="{ activeIndex: 2 }">
    <div class="main">
      <Button>Find</Button>
    </div>
  </Page>
</template>

<style lang="less" scoped>
.main {
  padding: 16px;
}
</style>