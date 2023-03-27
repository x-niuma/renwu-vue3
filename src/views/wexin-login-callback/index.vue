<template>
  <div>
    登录中...
    {{ query }}
  </div>
</template>

<script lang="ts" setup scoped>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()

const query = route.query

onMounted(() => {
  userStore.wexinLoginByAuthCode(query).then(() => {
    router.push((route.query.redirect as string) || '/')
  })
})
</script>
