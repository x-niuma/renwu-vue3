<template>
  <Page>
    <div class="ui-flex ui-flex-auto ui-flex-column main">
      <Search v-model="value" placeholder="请输入搜索关键词" @search="onSearch" @cancel="onCancel" show-action />
      <template v-if="!value.length">
        <div class="full-tip">
          <span>输入搜索条件</span>
        </div>
      </template>
      <template v-else>
        <List class="ui-flex-auto list" v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-cell v-for="item in list" :key="item.id" :title="item.title" @click="goDetail(item.id)">
            <template #title>
              <span class="custom-title">{{ item.id }}. {{ item.title }}</span>
            </template>
          </van-cell>
        </List>
      </template>
    </div>
  </Page>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Page from '@/components/page/index.vue'
import * as projectService from '@/service/auto-service/项目模块'
import { Search } from 'vant'
import { List } from 'vant'
import { useRouter } from 'vue-router'

const router = useRouter()
const value = ref('')
const list = ref<ProjectItemVo[]>([])
const loading = ref(false)
const finished = ref(false)
const pageIndex = ref(0)

const goDetail = (id: number) => {
  router.push(`project-detail?id=${id}`)
}

const onLoad = async () => {
  pageIndex.value += 1;
  const res = await projectService.queryList({
    pageSize: 20,
    title: value.value,
    pageIndex: pageIndex.value
  })

  list.value = [...list.value, ...res.data.list]

  // 加载状态结束
  loading.value = false

  // 数据全部加载完成
  finished.value = list.value.length >= res.data.total
}

const onSearch = () => {
  pageIndex.value = 0;
  list.value = [];
  onLoad()
}

const onCancel = () => {
  router.back();
}
</script>

<style lang="less" scoped>
.main {
  height: 100%;
  align-items: initial;
}

.list {
  overflow: auto;
}

.full-tip {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #ccc;
  text-align: center;
}
</style>