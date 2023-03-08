<template>
  <div class="wrapper view-login">
    <div class="form">
      <div v-if="authType==LOGIN_TYPE">
        <van-field class="form-item" v-model="email" placeholder="电子邮箱" />
        <van-field class="form-item" v-model="password" placeholder="登录密码" type="password"/>
      </div>
      <div v-else>
        <div class="form-row">
          <van-field class="form-item form-item-email inline-block" v-model="email" placeholder="电子邮箱" />
          <van-button @click="handleGetCode" class="inline-block btn-code" size="small">获取验证码</van-button>
        </div>
        <van-field class="form-item" v-model="code" placeholder="验证码" />
        <van-field class="form-item" v-model="password" placeholder="登录密码" type="password"/>
      </div>
      <van-button
        class="button"
        type="primary"
        size="large"
        :loading="loading"
        :disabled="disabled"
        @click="handleClick">立即{{ authType === LOGIN_TYPE ? '登录' : '注册' }}</van-button
      >
      <div class="btm-wrap">
        <template v-if="authType===LOGIN_TYPE">
          <span>没有账户？</span>
          <span class="btn-toggle" @click="authType=REGISTER_TYPE">注册</span>
        </template>
        <template v-else>
          <span>已有账户？</span>
          <span class="btn-toggle" @click="authType=LOGIN_TYPE">登录</span>
        </template>
      </div>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { Field, Button, Toast } from 'vant'
import { computed, ref } from 'vue';

const LOGIN_TYPE = 1;
const REGISTER_TYPE = 2;
const email = ref('');
const password = ref('');
const authType = ref(LOGIN_TYPE);
const code = ref('');
const loading = ref(false);
const disabled = computed(() => {
  return !email.value.length || password.value.length < 6
})

const handleGetCode = () => {}
const handleClick = () => {}

  // import { mapState } from 'vuex'
  // import api from '../../../api/index'
  
  // export default {
  //   props: {
  //     onLogin: Function
  //   },
  //   data() {
  //     return {
  //       email: '',
  //       code: '',
  //       password: '',
  //       LOGIN_TYPE,
  //       REGISTER_TYPE,
  //       authType: LOGIN_TYPE
  //     }
  //   },
  //   computed: {
  //     ...mapState({
  //       loading: state => state.user.loading,
  //       userInfo: state => state.user.userInfo
  //     }),
  //     disabled() {
  //       return !this.email.length || this.password.length < 6
  //     },
  //     redirect() {
  //       return this.$route.query.redirect
  //     }
  //   },
  //   created() {
  //     if (this.$route.query.authType) {
  //       this.authType = this.$route.query.authType
  //     }
  //   },
  //   methods: {
  //     async handleGetCode() {
  //       let res = await api.getEmailCode({
  //         email: this.email
  //       })
  //       if (res && res.success) {
  //         return Toast('发送验证成功')
  //       }
  //       Toast(`发送验证码失败: ${res.errMsg}`)
  //     },
  //     handleClick() {
  //       const dispatchName = this.authType === LOGIN_TYPE ? 'user/login' : 'user/register'
  //       this.$store.dispatch(dispatchName, {
  //         email: this.email,
  //         password: this.password,
  //         code: this.code,
  //         onSuccess: () => {
  //           if (this.onLogin) {
  //             return this.onLogin()
  //           }
  //           if (this.redirect) {
  //             this.$router.push(this.redirect)
  //           } else {
  //             this.$router.go(-1)
  //           }
  //         }
  //       })
  //     }
  //   }
  // }
  </script>
  
  <style lang="less" scoped>
  .form {
    padding: 20px;
    .form-item {
      padding-left: 0;
    }
    // /deep/ .van-cell:not(:last-child)::after {
    //   left: 0;
    // }
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
    .form-item-email {
      flex: 1;
      &::after {
        display: none;
      }
    }
  }
  
  .form-item-email,
  .btn-code {
    display: inline-block;
  }
  
  .wrapper {
    background: #fff;
  }
  
  .btn-toggle {
    // color: @button-primary-bg-color;
  }
  </style>
  