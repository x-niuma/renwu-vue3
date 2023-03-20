<template>
  <EditForm />
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import EditForm from './form.vue';
import { queryDetail } from '@/service/auto-service/项目模块';

const route = useRoute()

onMounted(() => {
  queryDetail({
    id: route.query.id as unknown as number
  })
})
</script>