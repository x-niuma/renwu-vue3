<template>
  <List
    v-model:loading="loading"
    :finished="!isCurrent || !hasMore"
    finished-text="没有更多了"
    @load="loadMore"
  >
    <ul class="d-list">
      <li class="d-item" v-for="(item, index) in list" :key="index" @click="switchItem(item.id)">
        <div class="d-item__hd">
          <div class="d-item__logo-main">
            <div class="title-wrapper">
              <span class="title">{{ item.id }}. {{ item.title }}</span>
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
            <div class="ui-fs-13 ui-ml-4">{{ item.author_name }}</div>
          </div>
          <div class="ui-flex enroll-info">
            <van-icon class="icon-users" name="friends" />
            <span class="enroll-num">{{ 0 }}人报名</span>
          </div>
        </div>
      </li>
    </ul>
  </List>
</template>

<script lang="ts" setup>
import { List } from 'vant'
import * as projectService from '@/service/auto-service/项目模块'
import InlineTag from '@/components/inline-tag/index.vue'
import avatar from '@/assets/img/avatar.png'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { formatDate } from '@/utils/date'

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
  },
  category_id: {
    type: Number,
  }
})

const router = useRouter()
const goUserProfile = (id: number) => router.push('/userProfile/' + id)
const list = ref([] as ProjectListVo['list'])
const loading = ref(false)
const hasMore = ref(true)
const pageIndex = ref(0)
const pageSize = 10
const total = ref(0)
const isCurrent = computed(() => props.activeIndex === props.index)

async function getDataList() {
  const params = {
    pageSize: pageSize,
    pageIndex: pageIndex.value,
    category_id: String(props.category_id),
    ...props.params
  }

  let res = await projectService.queryList(params)
  list.value = list.value.concat(res.data.list).map((it) =>  {
    return {
      ...it,
      create_time: formatDate(it.create_time)
    }
  })
  total.value = res.data.total
  hasMore.value = list.value.length < total.value
  loading.value = false
}

const switchItem = (itemId: number) => {
  router.push(`/project-detail?id=${itemId}`)
}

const loadMore = () => {
  if (!isCurrent.value) return
  pageIndex.value++
  getDataList()
}
</script>

<style lang="less" scoped>
.d-list {
  overflow: hidden;
  padding: 12px;
  padding-bottom: 0;
}

.d-item {
  overflow: hidden;
  padding: 12px 12px;
  background: #fff;
  border-bottom: solid 1px #f5f5f5;
  margin-bottom: 8px;
  border-radius: 4px;
  font-size: 13px;

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
