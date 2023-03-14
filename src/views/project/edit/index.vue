<template>
  <Page v-if="detail" title="编辑项目">
    <EditForm :detail="detail" :is-edit="true" />
  </Page>
  <Loading v-else />
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import EditForm from './form.vue'
import Loading from '@/components/loading/index.vue'
import Page from '@/components/page/index.vue'
import { queryDetail, type ProjectItemVo } from '@/service/auto-service/项目模块'

const route = useRoute()
const loading = ref(false);
const detail = ref<null | ProjectItemVo>(null)

onMounted(() => {
  loading.value = true;
  queryDetail({
    id: Number(route.query.id)
  }).then((res) => {
    loading.value = false;
    detail.value = res.data
  })
})
</script>
