<template>
  <Page title="项目详情" v-if="projectDetailStore.detail">
    <div class="page-project">
    
        <BaseInfo :detail-data="projectDetailStore.detail" />
        <EnrollPerson :enroll-list="enrolls" />
        <Comment :topic_id="projectId" />

      <Footer :topic_id="projectId" topic_type="project" />
    </div>
  </Page>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import BaseInfo from './components/base-info/index.vue'
import EnrollPerson from './components/enroll-person/index.vue'
import Page from '@/components/page/index.vue'
import Comment from './components/comment/index.vue'
import Footer from './components/footer/index.vue'
import { useProjectDetailStore } from '@/stores/project-detail'

const route = useRoute()
const enrolls = ref([] as any[])
const projectId = Number(route.query.id)
const projectDetailStore = useProjectDetailStore()


onMounted(() => {
  projectDetailStore.queryDetail(projectId)
})
</script>

<style lang="less" src="./index.less"></style>
