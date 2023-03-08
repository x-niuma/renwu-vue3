<script setup lang="ts">
import { Button } from 'vant';
import Page from '@/components/page/index.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const toLogin = () => {
  router.push('/login')
}

</script>

<template>
  <Page :tabBarProps="{ activeIndex: 2 }">
    <div class="main">
      <Button @click="toLogin">Go Login</Button>
    </div>
  </Page>
</template>

<style lang="less" scoped>
.main {
  padding: 16px;
}
</style>