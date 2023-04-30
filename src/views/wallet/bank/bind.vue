<template>
  <Page title="添加银行卡">
    <van-form class="form" @submit="onSubmit">
      <van-field
        v-model="bank_name"
        is-link
        readonly
        name="bank_name"
        label="银行"
        placeholder="选择银行"
        @click="showPicker = true"
        :rules="[{ required: true, message: '请选择银行' }]"
      />
      <van-field
        v-model="bank_account"
        name="bank_account"
        label="持卡人"
        placeholder="持卡人"
        :rules="[{ required: true, message: '请填写持卡人' }]"
      />
      <van-field
        v-model="bank_no"
        name="bank_no"
        label="卡号"
        placeholder="卡号"
        :rules="[{ required: true, message: '请填写卡号' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit"> 提交 </van-button>
      </div>
    </van-form>
    <van-popup v-model:show="showPicker" position="bottom">
      <van-picker :columns="columns" @confirm="onConfirm" @cancel="showPicker = false" />
    </van-popup>
  </Page>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Page from '@/components/page/index.vue'
import { doBindWalletBank } from '@/service/auto-service/钱包模块'

const showPicker = ref(false)
const bank_account = ref('')
const bank_no = ref('')
const bank_name = ref('')

const columns = [
  { text: '宁波银行', value: '宁波银行' },
  { text: '建设银行', value: '建设银行' },
  { text: '光大银行', value: '光大银行' },
  { text: '农业银行', value: '农业银行' },
  { text: '交通银行', value: '交通银行' }
]

const onConfirm = ({
  selectedOptions
}: {
  selectedOptions: {
    text: string
    value: string
  }[]
}) => {
  bank_name.value = selectedOptions[0]?.text;
  showPicker.value = false
}

const onSubmit = (values: {
  bank_no: string;
  bank_account: string;
  bank_name: string;
}) => {
  console.log('submit', values)
  doBindWalletBank(values).then((res) => {
    console.log(res)
  })
}
</script>

<style lang="less" scoped>
.form {
  height: 100%;
  background-color: #fff;
}
</style>
