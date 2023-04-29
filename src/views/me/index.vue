<script setup lang="ts">
import { Space } from 'vant'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { Button } from 'vant'
import Page from '@/components/page/index.vue'

const router = useRouter()
const userStore = useUserStore()
const toLogin = () => router.push('/login')
const logout = () => userStore.logout()
const goProfile = () => router.push('/me/user-info')
const recharge = () => router.push('/wallet');
</script>

<template>
  <Page :tabBarProps="{ activeIndex: 2 }">
    <div class="me-page-content" v-if="userStore.userInfo">
      <div class="main-card">
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
        </div>
        <div class="ui-mt-30 ui-fs-14 ui-flex">
          <Space>
            <div class="ui-text-center">
              <span>粉丝</span>
              <span>(4)</span>
            </div>
            <div class="ui-text-center">
              <span>关注</span>
              <span>(4)</span>
            </div>
          </Space>
          <div>
            <van-button
              class="btn-edit ui-ml-10"
              size="small"
              round
              plain
              type="primary"
              @click="recharge"
              >我的钱包</van-button
            >
            <van-button
              class="btn-edit ui-ml-10"
              size="small"
              @click="goProfile"
              round
              plain
              type="primary"
              >编辑资料</van-button
            >
          </div>
        </div>
      </div>
      <van-cell-group title="项目">
        <van-cell title="收藏" is-link to="/project-track" />
        <van-cell title="点赞" is-link to="/project-track"  />
      </van-cell-group>
      <van-cell-group title="话题">
        <van-cell title="收藏" is-link to="/project-track" />
        <van-cell title="点赞" is-link to="/project-track" />
      </van-cell-group>
    </div>
    <div class="main-card no-login-box ui-text-center ui-flex" v-else>
      <Button @click="toLogin" size="small" type="primary">点击登录</Button>
    </div>
  </Page>
</template>

<style lang="less" scoped>
.main-card {
  height: 180px;
  padding-top: 40px;
  padding-left: 16px;
  padding-right: 16px;
  background-color: #fff;
  .words {
    font-size: 14px;
  }
  .account {
    font-size: 18px;
  }
  .btn-edit {
    height: 28px;
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
  :deep(.van-tabs__nav) {
    background: transparent;
  }
}

.card-content {
  overflow: hidden;
  padding: 0 12px;
  color: #000;
  background-color: #f5f5f5;
}
</style>
