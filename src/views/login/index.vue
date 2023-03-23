<template>
  <div class="wrapper view-login">
    <div class="form">
      <div v-if="authType == LOGIN_TYPE">
        <van-field class="form-item" v-model="account" placeholder="登录账户" />
        <van-field class="form-item" v-model="password" placeholder="登录密码" type="password" />
      </div>
      <div v-else>
        <div class="form-row">
          <van-field
            class="form-item form-item-account inline-block"
            v-model="account"
            placeholder="电子邮箱"
          />
          <van-button @click="handleGetCode" class="inline-block btn-code" size="small"
            >获取验证码</van-button
          >
        </div>
        <van-field class="form-item" v-model="code" placeholder="验证码" />
        <van-field class="form-item" v-model="password" placeholder="登录密码" type="password" />
      </div>
      <van-button
        class="button"
        type="primary"
        size="large"
        :loading="loading"
        :disabled="disabled"
        @click="handleClick"
        >立即{{ authType === LOGIN_TYPE ? '登录' : '注册' }}</van-button
      >
      <div class="btm-wrap">
        <template v-if="authType === LOGIN_TYPE">
          <span>没有账户？</span>
          <span class="btn-toggle" @click="authType = REGISTER_TYPE">注册</span>
        </template>
        <template v-else>
          <span>已有账户？</span>
          <span class="btn-toggle" @click="authType = LOGIN_TYPE">登录</span>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter, useRoute } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()
const route = useRoute()

const LOGIN_TYPE = 1
const REGISTER_TYPE = 2
const account = ref('dev_01')
const password = ref('123456')
const authType = ref(LOGIN_TYPE)
const code = ref('')
const loading = ref(false)
const disabled = computed(() => {
  return !account.value.length || password.value.length < 6
})

const handleGetCode = () => {}
const handleClick = () => {
  userStore
    .login({
      account: account.value,
      password: password.value
    })
    .then((success) => {
      if (success) {
        router.push((route.query.redirect as string) || '/')
      }
    })
}
</script>

<style lang="less" scoped>
.view-login {
  height: 100%;
  background-color: #fff;
}
.form {
  padding: 20px;
  .form-item {
    padding-left: 0;
  }
}

.button {
  margin-top: 20px;
}

.btm-wrap {
  color: #999;
  font-size: 14px;
  margin-top: 10px;
  text-align: right;
}

.form-row {
  display: flex;
  align-items: center;
  padding-bottom: 4px;
  border-bottom: 1px solid #f5f5f5;
  .form-item-account {
    flex: 1;
    &::after {
      display: none;
    }
  }
}

.form-item-account,
.btn-code {
  display: inline-block;
}

.wrapper {
  background: #fff;
}
</style>