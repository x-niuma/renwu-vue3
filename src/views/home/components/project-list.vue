<template>
  <div
    v-infinite-scroll="loadMore"
    :infinite-scroll-disabled="loading"
    :infinite-scroll-distance="20"
    infinite-scroll-immediate-check="false"
  >
    <ul class="d-list">
      <li class="d-item" v-for="(item, index) in list" :key="index" @click="switchItem(item.id)">
        <div class="d-item__hd">
          <div class="d-item__logo-main">
            <div class="title-wrapper">
              <span class="title">{{ index + 1 }}. {{ item.title }}</span>
              <van-icon name="ellipsis" />
            </div>
            <div class="tags">
              <InlineTag :text="item.task_type_name" />
              <InlineTag :text="item.category_name" />
            </div>
          </div>
        </div>
        <div class="d-item__bd">
          <div class="column">
            <span class="label">需求预算：</span>
            <span>￥{{ +item.reward / 100 }}</span>
          </div>
          <div class="column">
            <span class="label">技能要求：</span>
            <span>{{ item.skill || '无任何要求' }}</span>
          </div>
          <div class="column">
            <span class="label">发布时间：</span>
            <span>{{ item.create_time }}</span>
          </div>
        </div>
        <div class="d-item__ft">
          <div class="ui-flex" @click.stop="goUserProfile(item.user_id)">
            <img class="d-item__avatar" :src="item.author_avatar || avatar" />
            <div class="d-item__name">{{ item.author_name }}</div>
          </div>
          <div class="ui-flex enroll-info">
            <van-icon class="icon-users" name="friends" />
            <span class="enroll-num">{{ 0 }}人报名</span>
            <!-- <van-icon class="arrow-right" name="arrow" /> -->
          </div>
        </div>
      </li>
    </ul>

    <div class="loading" v-if="loading">
      <van-loading class="van-loading" size="24px"></van-loading>
      <span>加载中...</span>
    </div>

    <div class="loading" v-if="!loading && !hasMore && !list.length">
      <NoneData />
    </div>

    <template v-if="!loading && !hasMore && list.length > 5">
      <Loading message="我是有底线的"></Loading>
    </template>
  </div>
</template>

<script lang="ts" setup>
import * as projectService from '@/service/auto-service/项目模块'
import Loading from '@/components/loading/index.vue'
import NoneData from '@/components/none-data/index.vue'
import InlineTag from '@/components/inline-tag/index.vue'
import avatar from '@/assets/img/avatar.png'
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import type { ProjectListVo } from '@/service/auto-service/types'

const props = defineProps({
  appTypeId: {
    type: [String, Number],
    default: ''
  },
  params: {
    type: Object,
    default: () => {}
  },
  index: {
    type: Number,
    required: true
  },
  activeIndex: {
    type: Number,
    required: true
  }
})

const router = useRouter()
const goUserProfile = (id: number) => {
  router.push('/userProfile/' + id)
}

const list = ref([] as ProjectListVo['list'])
const loading = ref(false)
const hasMore = ref(true)
const isRefresh = ref(false)

const pageIndex = ref(1)
const pageSize = 10
const total = ref(0)

async function getDataList() {
  loading.value = true
  const params = {
    pageSize: pageSize,
    pageIndex: pageIndex.value,
    // appTypeId: props.appTypeId,
    ...props.params
  }

  let res: any = await projectService.queryList(params)
  loading.value = false

  if (isRefresh.value) {
    list.value = res.data.list
  } else {
    list.value = list.value.concat(res.data.list)
  }

  total.value = res.data.total
  hasMore.value = list.value.length < total.value
  isRefresh.value = false
}

const switchItem = (itemId: number) => {
  router.push(`/project-detail?id=${itemId}`)
}

const handleParamChanged = () => {
  isRefresh.value = true
  pageIndex.value = 1
  getDataList()
}

const loadMore = () => {
  if (loading.value) return
  if (!hasMore.value) return
  pageIndex.value++
  getDataList()
}

onMounted(() => {
  if (props.index === props.activeIndex) {
    getDataList()
  }
})

watch(
  () => props.activeIndex,
  () => {
    if (props.activeIndex === props.index) {
      getDataList()
    }
  }
)
</script>

<style lang="less" scoped>
.view {
  min-height: 100vh;
  background: #f4f7f9;
}

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  text-align: center;
  color: #666;
  font-size: 12px;

  .van-loading {
    margin-right: 8px;
  }
}

.d-list {
  overflow: hidden;
  padding: 12px;
  padding-bottom: 10px;
}

.d-item {
  overflow: hidden;
  padding: 12px 12px;
  background: #fff;
  border-bottom: solid 1px #f5f5f5;
  margin-bottom: 8px;
  border-radius: 4px;

  &:last-child {
    margin-bottom: 0;
  }

  .tags {
    overflow: hidden;
    margin-top: 8px;
  }

  &__logo {
    width: 55px;
    height: 55px;
    margin-right: 10px;
    background: #2a98ff;
  }

  &__avatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
  }

  &__hd {
    display: flex;
    align-items: center;
    font-size: 14px;
    line-height: 20px;
  }

  &__bd {
    line-height: 24px;
    padding-top: 8px;
    padding-bottom: 8px;
  }

  &__ft {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    color: #48576a;
    padding-top: 10px;
    border-top: 1px solid #f4f4f4;
  }

  &__name {
    margin-left: 4px;
  }
}

.d-item__bd,
.d-item__name {
  font-size: 12px;
}

.d-item__logo {
  border-radius: 2px;
}

.enroll-info {
  font-size: 14px;

  .enroll-num {
    margin: 0 4px;
    font-size: 12px;
  }

  .icon-users {
    font-size: 16px;
  }
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 10px;
}

.loading {
  line-height: 50px;
}

.filter {
  z-index: 25;
  position: sticky;
  top: 0;
  background: #fff;

  .btn-sku {
    margin-left: 10px;
    font-size: 14px;
  }
}

.d-item__logo-main {
  width: 100%;
}

.title {
  display: inline-block;
  width: calc(100% - 24px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.title-wrapper {
  display: flex;
  align-items: center;
}

.van-icon-ellipsis {
  position: relative;
  right: -10px;
}
</style>
