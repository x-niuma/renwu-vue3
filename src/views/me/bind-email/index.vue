<template>
  <Page class="wrapper" title="绑定邮箱">
    <van-field
      v-model="email"
      name="email"
      label="邮箱"
      placeholder="邮箱"
      :rules="[{ required: true, message: '请填写' }]"
    />
    <van-field v-model="code" center clearable label="验证码" placeholder="请输入验证码">
      <template #button>
        <van-button size="small" type="primary">发送验证码</van-button>
      </template>
    </van-field>
    <div class="ui-m-16">
      <van-button class="ui-mt-20" :loading="loading" round block type="primary" @click="onSubmit">
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
import { updateUserInfo } from '@/service/auto-service/账户模块'

const loading = ref(false)

const code = ref('')
const email = ref('')

const router = useRouter()
const userStore = useUserStore()

const onSubmit = async () => {
  loading.value = true
  await updateUserInfo({
    email: email.value
  })
  loading.value = false
}

onMounted(() => {
  email.value = userStore.userInfo?.email || ''
})
</script>

<style lang="less" scoped>
.wrapper {
  background-color: #fff;
}
</style>
