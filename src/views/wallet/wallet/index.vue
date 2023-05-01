<template>
  <Page title="我的钱包">
    <div class="card">
      <div class="ui-flex ui-flex-jc-start ui-mb-10">
        <span class="total-text ui-mr-10">总资产</span>
        <van-icon name="closed-eye" />
      </div>
      <div>
        <span class="money-value">{{ totalAmount }}</span>
      </div>
      <div class="card-footer ui-flex">
        <span>白金VIP</span>
        <span @click="toBank">
          我的银行卡
          <van-icon name="arrow" />
        </span>
      </div>
      <div class="actions">
        <van-space>
          <van-button class="btn" type="primary" plain size="small" @click="doCharge">充 值</van-button>
          <van-button class="btn" size="small" plain @click="toWithdraw">提 现</van-button>
        </van-space>
      </div>
    </div>
    <van-tabs class="wallet-tabs" v-model:active="activeName" shrink>
      <van-tab title="全部" name="a">
        <div>
          <div v-for="item in flowList">
            <van-cell :title="`${numeral(item.amount / 100).format('0,0[.]00')}`" :label="item.description" :value="formatDate(item.create_time)" />
          </div>
        </div>
      </van-tab>
      <van-tab title="收入" name="b"></van-tab>
      <van-tab title="支出" name="c"></van-tab>
    </van-tabs>
  </Page>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import Page from '@/components/page/index.vue'
import { doWalletRecharge, queryUserWalletAccount, queryUserWalletFlow } from '@/service/auto-service/钱包模块';
import { showToast } from 'vant';
import numeral from 'numeral';
import { formatDate } from '@/utils/date';
import router from '@/router';

const activeName = ref('a');
const wAccount = ref<QueryWalletAccountVO|null>(null);

const totalAmount = computed(() => {
  const value = wAccount.value ? wAccount.value.amount : '0.00';
  const money = Number(value) / 100;
  return numeral(money).format('0,0[.]00')
})

const toBank = () => router.push('/wallet/bank');
const toWithdraw = () => router.push('/wallet/withdraw');

const flowList = ref<WalletAccountFlowEntity[]>([]);

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
          setTimeout(() => {
            initData()
          }, 2000)
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

const initData = () => {
  queryUserWalletAccount({}).then(res => {
    wAccount.value = res.data
  })
  queryUserWalletFlow({}).then(res => {
    flowList.value = res.data.list
  })
}

onMounted(() => {
  initData()
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
  padding-right: 0;
  border-radius: 2px;
  color: #fff;
  background: linear-gradient(to right, #f78f15, #f5502d);
  /*background: linear-gradient(to right, #5b5a59, #545252);*/
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
    padding-right: 10px;
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
