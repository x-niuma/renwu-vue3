<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { Button } from 'vant'
import Page from '@/components/page/index.vue'

const router = useRouter()
const userStore = useUserStore()

const toLogin = () => {
  router.push('/login')
}

const logout = () => {
  userStore.logout()
}
</script>

<template>
  <Page :tabBarProps="{ activeIndex: 2 }">
    <div class="main" v-if="userStore.userInfo">
      <van-image width="80" height="80" :src="userStore.userInfo.avatar" :radius="4" />
      <div class="account">{{ userStore.userInfo.account }}</div>
      <Button class="login-out" @click="logout" size="small" type="primary">退出登录</Button>
    </div>
    <div class="main" v-else>
      <Button @click="toLogin" size="small" type="primary">点击登录</Button>
    </div>
  </Page>
</template>

<style lang="less" scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
  padding-top: 30%;
  .account {
    font-size: 18px;
    margin-top: 10px;
  }
  .login-out {
    margin-top: 10px;
  }
}
</style>
