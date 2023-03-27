<template>
    <div>
      {{  query }}
    </div>
</template>

<script lang="ts" setup scoped>
import { onMounted } from 'vue'
import { wexinLoginByAuthCode } from '@/service/auto-service/账户模块';
import { useRoute } from 'vue-router';
const route = useRoute();
const query = route.query;

onMounted(() => {
  wexinLoginByAuthCode({
    code: query.code,
    state: query.state
  }).then((res) => {
    console.log(res)
  })
})
</script>