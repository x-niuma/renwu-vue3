<script setup lang="ts">
import { ref } from 'vue'
import { Space, Toast, showToast } from 'vant'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { Button } from 'vant'
import Page from '@/components/page/index.vue'
import Collect from './components/collect/index.vue'
import { doWalletRecharge } from '@/service/auto-service/钱包模块'

const router = useRouter()
const userStore = useUserStore()
const active = ref(0)
const toLogin = () => router.push('/login')
const logout = () => userStore.logout()
const recharge = () => {
  doWalletRecharge({ amount: 10 }).then((res) => {
    showToast({
      message: JSON.stringify(res.data)
    })

    const params = {
      ...res.data
    }

    console.log(`下单参数`, params)

    setTimeout(() => {
      ;(window as any).WeixinJSBridge.invoke('getBrandWCPayRequest', params, function (res: any) {
        console.log(res)
        if (res.err_msg == 'get_brand_wcpay_request:ok') {
          showToast({
            type: 'success',
            message: '支付成功'
          })
          // 使用以上方式判断前端返回,微信团队郑重提示：
          //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
        } else {
          showToast({
            type: 'fail',
            message: res.err_msg
          })
        }
      })
    }, 2000)
  })
}
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
          <Button class="btn-edit" @click="logout" size="small" type="primary">退出登录</Button>
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
            <van-button size="small" @click="recharge">充值</van-button>
          </Space>
          <van-button class="btn-edit ui-ml-10" size="small" round plain type="primary"
            >编辑资料</van-button
          >
        </div>
      </div>
      <van-tabs class="scroll" v-model:active="active">
        <van-tab title="笔记"> </van-tab>
        <van-tab title="收藏"></van-tab>
        <van-tab title="点赞"></van-tab>
      </van-tabs>

      <div class="card-content">
        <Collect />
      </div>
    </div>
    <div class="main-card no-login-box ui-text-center ui-flex" v-else>
      <Button @click="toLogin" size="small" type="primary">点击登录</Button>
    </div>
  </Page>
</template>

<style lang="less" scoped>
.me-page-content {
  background-color: #2a2a66;
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
  .btn-edit {
    background: transparent;
    color: #fff;
    height: 28px;
    border-color: #fff;
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

.card-content {
  overflow: hidden;
  padding: 0 12px;
  background-color: #f5f5f5;
}
</style>
