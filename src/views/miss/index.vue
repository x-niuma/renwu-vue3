<script setup lang="ts">
import { Button } from 'vant';
import Page from '@/components/page/index.vue';
</script>

<template>
  <Page>
    <div class="main">
      <span>You Are Lost!</span>
      <Button class="btn" size="small" type="primary">Back Home</Button>
    </div>
  </Page>
</template>

<style lang="less" scoped>
.main {
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .btn {
    margin-top: 20px;
  }
}
</style>