<template>
  <Page title="提现">
    <div class="form">
      <van-field
        v-model="value"
        readonly
        clickable
        @touchstart.stop="show = true"
        placeholder="输入提现金额"
      />
      <van-button class="ui-mt-20" block square type="primary" @click="submit">提交</van-button>
      <van-number-keyboard
        v-model="value"
        :show="show"
        theme="custom"
        extra-key="."
        close-button-text="完成"
        @blur="show = false"
      />
    </div>
  </Page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { showToast } from 'vant'
import Page from '@/components/page/index.vue'
import { doWalletWithdraw } from '@/service/auto-service/钱包模块'

const show = ref(false)
const value = ref('10.00')
const onInput = (value) => showToast(value)
const onDelete = () => showToast('删除')
const submit = () => {
  doWalletWithdraw({
    password: '123456',
    amount: Number(value.value)
  }).then((res) => {
    console.log(res)
  })
}
</script>

<style lang="less" scoped>
.form {
  padding: 12px;
}
</style>
