<template>
    <Page title="我的银行卡">
      <div class="card" v-for="item in 4">
        <div class="ui-flex ui-flex-jc-start ui-mb-10">
          <span class="total-text ui-mr-10">招商银行</span>
        </div>
        <div>
          <span class="money-value">522126199308095530</span>
        </div>
        <div class="actions">
          <van-space>
            <van-button class="btn" type="primary" plain size="small" @click="doCharge">删除</van-button>
            <van-button class="btn" size="small" plain>修改</van-button>
          </van-space>
        </div>
      </div>
      <div class="footer">
        <van-button type="primary" block>
          <span>添加银行卡</span>
        </van-button>
      </div>
    </Page>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, computed } from 'vue'
  import Page from '@/components/page/index.vue'
  import { doWalletRecharge, queryUserWalletAccount, queryUserWalletFlow } from '@/service/auto-service/钱包模块';
  import { showToast } from 'vant';
  
  const wAccount = ref<QueryWalletAccountVO|null>(null);
  
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
    height: 100px;
    margin-left: 12px;
    margin-right: 12px;
    margin-top: 16px;
    padding-inline: 20px;
    padding-block: 20px;
    border-radius: 10px;
    color: #fff;
    background: linear-gradient(to right, #f78f15, #f5502d);
    .total-text {
      font-size: 15px;
      font-weight: bold;
    }
    .money-value {
      font-size: 13px;
      font-weight: bold;
    }
    .card-footer {
      margin-top: 10px;
    }
    .actions {
      position: absolute;
      right: 12px;
      top: 54px;
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

  .footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 10px 12px;
  }
  
  :deep(.wallet-tabs) {
    .van-tabs__line {
      width: 16px;
    }
  }
  </style>
  