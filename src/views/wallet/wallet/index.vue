<template>
  <Page title="我的钱包">
    <div class="card">
      <div class="ui-flex ui-flex-jc-start ui-mb-10">
        <span class="total-text ui-mr-10">总资产</span>
        <van-icon name="closed-eye" />
      </div>
      <div>
        <span class="money-value">56,300</span>
      </div>
      <div class="card-footer ui-flex">
        <span>XXX</span>
        <span>SSS</span>
      </div>
      <div class="actions">
        <van-space>
          <van-button class="btn" type="primary" plain size="small" @click="doCharge">充 值</van-button>
          <van-button class="btn" size="small" plain>提 现</van-button>
        </van-space>
      </div>
    </div>
    <van-tabs class="wallet-tabs" v-model:active="activeName" shrink>
      <van-tab title="全部" name="a"></van-tab>
      <van-tab title="收入" name="b"></van-tab>
      <van-tab title="支出" name="c"></van-tab>
    </van-tabs>
  </Page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Page from '@/components/page/index.vue'
import { doWalletRecharge, queryUserWalletFlow } from '@/service/auto-service/钱包模块';
import { showToast } from 'vant';

const activeName = ref('a')

const doCharge = () => {
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

onMounted(() => {
  queryUserWalletFlow({}).then(res => {
    console.log(res)
  })
})
</script>

<style lang="less" scoped>
.page {
  overflow: hidden;
  height: 100%;
  background: #fff;
}

.card {
  position: relative;
  height: 140px;
  margin-left: 12px;
  margin-right: 12px;
  margin-top: 12px;
  padding-inline: 20px;
  padding-block: 20px;
  border-radius: 2px;
  color: #fff;
  background: linear-gradient(to right, #f78f15, #f5502d);
  .total-text {
    font-size: 16px;
    font-weight: bold;
  }
  .money-value {
    font-size: 24px;
    font-weight: bold;
  }
  .card-footer {
    margin-top: 10px;
  }
  .actions {
    position: absolute;
    right: 12px;
    top: 40px;
  }
  .btn {
    height: 28px;
    line-height: 25px;
    color: #fff;
    border-color: #fff;
    background: transparent;
    &::before {
      background: transparent;
      border-color: #fff;
    }
  }
}

:deep(.wallet-tabs) {
  .van-tabs__line {
    width: 16px;
  }
}
</style>
