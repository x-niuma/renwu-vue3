<script setup lang="ts">
import { Button } from 'vant';
import Page from '@/components/page/index.vue';
</script>

<template>
  <Page :tabBarProps="{ activeIndex: 0 }">
    <div class="main">
      <Button>Hello World</Button>
    </div>
  </Page>
</template>

<style lang="less" scoped>
.main {
  padding: 16px;
}
</style>