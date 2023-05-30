<template>
  <Page class="wrapper" title="绑定手机号">
    <van-field
      v-model="mobile"
      name="mobile"
      label="手机号"
      placeholder="手机号"
      clearable
      @clear="clearMobile"
      :rules="[{ required: true, message: '请填写' }]"
    />
    <van-field
      v-model="code"
      center
      clearable
      @clear="clearCode"
      label="验证码"
      placeholder="请输入验证码"
    >
      <template #button>
        <van-button size="small" type="primary" :loading="sendLoading" @click="getCode" :disabled="!mobile.length"
          >发送验证码</van-button
        >
      </template>
    </van-field>
    <div class="ui-m-16">
      <van-button
        class="ui-mt-20"
        :disabled="!mobile.length || !code.length"
        :loading="loading"
        round
        block
        type="primary"
        @click="onSubmit"
      >
        提交
      </van-button>
    </div>
  </Page>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import Page from '@/components/page/index.vue'
import { bindMobile } from '@/service/auto-service/账户模块'
import { sendSmsCode } from '@/service/auto-service/sms-pop'
import { showToast } from 'vant'

const code = ref('')
const mobile = ref('')
const loading = ref(false)
const sendLoading = ref(false)
const router = useRouter()
const userStore = useUserStore()

const clearCode = () => (code.value = '')
const clearMobile = () => (mobile.value = '')

const onSubmit = async () => {
  try {
    loading.value = true
    await bindMobile({
      mobile: mobile.value,
      code: code.value
    })
    await userStore.checkLogin()
    loading.value = false
    showToast({
      type: 'success',
      message: '绑定成功'
    })
    router.back()
  } catch (e) {
    loading.value = false
  }
}

const getCode = () => {
  sendLoading.value = true;
  sendSmsCode({ mobile: mobile.value }).then((res) => {
    console.log(res)
  }).catch(() => {
    sendLoading.value = false;
  })
}

onMounted(() => {
  mobile.value = userStore.userInfo?.mobile || ''
})
</script>

<style lang="less" scoped>
.wrapper {
  background-color: #fff;
}
</style>
