<template>
  <Page title="项目详情" v-if="detailData">
    <div class="page-project" >
      <BaseInfo :detail-data="detailData" />
      <EnrollPerson :enroll-list="enrolls" />
      <Comment :topic_id="projectId" />
      <Footer />
    </div>
  </Page>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import * as ProjectAPI from '@/service/auto-service/项目模块'
import BaseInfo from './components/base-info/index.vue'
import EnrollPerson from './components/enroll-person/index.vue'
import Page from '@/components/page/index.vue'
import type { ProjectItemVo } from '@/service/auto-service/项目模块'
import Comment from './components/comment/index.vue'
import Footer from './components/footer/index.vue'

const route = useRoute()
const enrolls = ref([] as any[])
const detailData = ref<ProjectItemVo | null>(null)
const projectId = Number(route.query.id)

const getDetails = async () => {
  let res = await ProjectAPI.queryDetail({
    id: projectId
  })
  detailData.value = res.data
}

onMounted(() => {
  getDetails()
})
</script>

<style lang="less" src="./index.less"></style>
