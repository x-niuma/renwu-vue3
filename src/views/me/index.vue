<script setup lang="ts">
import { ref } from 'vue'
import { Space } from 'vant'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { Button } from 'vant'
import Page from '@/components/page/index.vue'

const router = useRouter()
const userStore = useUserStore()
const active = ref(0)

const toLogin = () => router.push('/login')
const logout = () => userStore.logout()
</script>

<template>
  <Page :tabBarProps="{ activeIndex: 2 }">
    <div class="me-page-content">
      <div class="main-card" v-if="userStore.userInfo">
        <div class="user-box ui-flex">
          <div class="ui-flex">
            <van-image
              class="avatar"
              width="60"
              height="60"
              :src="userStore.userInfo.avatar"
              :radius="30"
            />
            <div class="ui-ml-10">
              <div class="account">{{ userStore.userInfo.account }}</div>
              <div class="words">{{ userStore.userInfo.nickname }}</div>
            </div>
          </div>
          <Button class="login-out" @click="logout" size="small" type="primary">退出登录</Button>
        </div>
        <div class="ui-mt-30 ui-fs-12">
          <Space>
            <div class="ui-text-center">
              <span>粉丝</span>
              <span>(4)</span>
            </div>
            <div class="ui-text-center">
              <span>关注</span>
              <span>(4)</span>
            </div>
            <!-- <van-button class="ui-ml-10" size="mini" plain type="primary">编辑资料</van-button> -->
          </Space>
        </div>
      </div>
      <div class="main-card no-login-box ui-text-center ui-flex" v-else>
        <Button @click="toLogin" size="small" type="primary">点击登录</Button>
      </div>
      <van-tabs class="scroll" v-model:active="active">
        <van-tab title="发布"></van-tab>
        <van-tab title="收藏"></van-tab>
        <van-tab title="点赞"></van-tab>
      </van-tabs>
    </div>
  </Page>
</template>

<style lang="less" scoped>
.me-page-content {
  background-color: #515569;
}

.main-card {
  height: 180px;
  padding-top: 40px;
  padding-left: 16px;
  padding-right: 16px;
  color: #fff;
  .words {
    font-size: 14px;
  }
  .account {
    font-size: 18px;
  }
}
.no-login-box {
  padding-top: 0;
  text-align: center;
  justify-content: center;
}

.scroll {
  flex: 1;
  background-color: #fff;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  :deep(.van-tabs__nav) {
    background: transparent;
  }
}
</style>
