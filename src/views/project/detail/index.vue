<template>
  <Page title="项目详情" v-if="detailData">
    <BaseInfo :detail-data="detailData" />
    <EnrollPerson :enroll-list="enrolls" />
  </Page>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import * as ProjectAPI from '@/service/auto-service/项目模块'
import BaseInfo from './components/base-info/index.vue'
import EnrollPerson from './components/enroll-person/index.vue'
import Page from '@/components/page/index.vue'

const route = useRoute()
const enrolls = ref([] as any[])
const detailData = ref(null as any)

const getDetails = async () => {
  let res = await ProjectAPI.queryDetail({
    id: Number(route.query.id)
  })
  detailData.value = res.data
}

const getEnrolls = async () => {
  // let res = await ProjectAPI.getOrderList()
  // enrolls.value = res.data.list;
}

onMounted(() => {
  getDetails()
  getEnrolls()
})
</script>

<style lang="less" scoped src="./index.less"></style>
