<template>
  <Page class="wrapper" title="我的资料">
    <van-field
      v-model="username"
      name="username"
      label="昵称"
      placeholder="昵称"
      :blur="() => onBlur('username')"
      :rules="[{ required: true, message: '请填写' }]"
    />
    <van-field
      v-model="mobile"
      name="mobile"
      label="手机号码"
      to="/me/bind-mobile"
      :is-link="true"
      :rules="[{ required: true, message: '请填写' }]"
    />
    <van-field
      v-model="email"
      name="email"
      to="/me/bind-email"
      label="邮箱"
      :is-link="true"
      :rules="[{ required: true, message: '请填写' }]"
    />
    <van-field
      v-model="password"
      type="password"
      name="密码"
      label="密码"
      :is-link="true"
      :rules="[{ required: true, message: '请填写密码' }]"
    />
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

const username = ref('')
const password = ref('')
const email = ref('')
const mobile = ref('')

const router = useRouter()
const userStore = useUserStore()

const onBlur = (field: string) => {
  console.log(field)
  switch (field) {
    case 'username': {
      console.log(username.value)
    }
  }
}

const onSubmit = async () => {
  loading.value = true
  await updateUserInfo({
    nickname: username.value
  })
  loading.value = false
}

onMounted(() => {
  mobile.value = userStore.userInfo?.mobile || ''
  email.value = userStore.userInfo?.email || ''
  username.value = userStore.userInfo?.nickname || ''
})
</script>

<style lang="less" scoped>
.wrapper {
  background-color: #fff;
}
</style>
