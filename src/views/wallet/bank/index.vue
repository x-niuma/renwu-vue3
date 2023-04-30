<template>
  <Page title="我的银行卡">
    <div class="list">
      <div class="card" v-for="item in flowList">
        <div class="ui-flex ui-flex-jc-start ui-mb-10">
          <span class="total-text ui-mr-10">{{ item.bank_name }}</span>
        </div>
        <div>
          <span class="money-value">{{ item.bank_no }}</span>
          <span class="bank-account ui-fs-12 ui-ml-8">{{ item.bank_account }}</span>
        </div>
        <div class="actions">
          <van-space>
            <van-button class="btn" type="primary" plain size="small" @click="doDelete"
              >删除</van-button
            >
            <van-button class="btn" size="small" plain>修改</van-button>
          </van-space>
        </div>
      </div>
    </div>
    <div class="footer">
      <van-button type="primary" block @click="goBindBank">
        <span>添加银行卡</span>
      </van-button>
    </div>
  </Page>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import Page from '@/components/page/index.vue'
import { queryUserWalletAccount, queryUserWalletBank } from '@/service/auto-service/钱包模块'
import { showToast } from 'vant'
import { useRouter } from 'vue-router'

const router = useRouter()
const goBindBank = () => router.push('/wallet/bank/bind')

const flowList = ref<WalletBankEntity[]>([])

const doDelete = () => {}

const initData = () => {
  queryUserWalletBank({}).then((res) => {
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

.list {
  flex: 1;
  padding-top: 16px;
  overflow: auto;
}

.card {
  position: relative;
  height: 100px;
  margin-left: 12px;
  margin-right: 12px;
  margin-bottom: 16px;
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
  padding: 10px 12px;
  border-top: 1px solid #eee;
}

:deep(.wallet-tabs) {
  .van-tabs__line {
    width: 16px;
  }
}
</style>