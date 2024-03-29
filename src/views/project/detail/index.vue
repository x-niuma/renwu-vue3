<template>
  <Page title="项目详情" v-if="projectDetailStore.detail">
    <div class="page-project">
      <BaseInfo :detail-data="projectDetailStore.detail" />
      <EnrollPerson :enroll-list="enrolls" />
      <Comment :topic_id="projectId" />
      <Footer
        :likeCount="projectDetailStore.detail.like_count"
        :starCount="projectDetailStore.detail.star_count"
        :topic_id="projectId"
        topic_type="project"
        :likeStatus="likeStatus"
        :starStatus="starStatus"
        :comment-count="projectDetailStore.detail.comment_count"
        :on-click-like="handleClickLike"
        :on-click-star="handleClickStar"
      />
    </div>
  </Page>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { ref, onMounted, onUnmounted } from 'vue'
import BaseInfo from './components/base-info/index.vue'
import EnrollPerson from './components/enroll-person/index.vue'
import Page from '@/components/page/index.vue'
import Comment from './components/comment/index.vue'
import Footer from './components/footer/index.vue'
import { useProjectDetailStore } from '@/stores/project-detail'
import { queryStatusForUser, saveActionForUser } from '@/service/auto-service/数据采集'
import { TrackActionTypeEnum, TrackEntityTypeEnum } from './utils'

const route = useRoute()
const enrolls = ref([] as any[])
const projectId = Number(route.query.id)
const projectDetailStore = useProjectDetailStore()
const likeStatus = ref(false)
const starStatus = ref(false)
const likeLoading = ref(false)
const starLoading = ref(false)

const initData = () => {
  projectDetailStore.queryDetail(projectId)
  queryStatusForUser({
    entity_type: TrackEntityTypeEnum.project,
    action_type: TrackActionTypeEnum.like,
    entity_id: projectId
  }).then((res) => {
    likeStatus.value = Boolean(res.data)
  })
  queryStatusForUser({
    entity_type: TrackEntityTypeEnum.project,
    action_type: TrackActionTypeEnum.star,
    entity_id: projectId
  }).then((res) => {
    starStatus.value = Boolean(res.data)
  })
}

const handleClickLike = () => {
  saveActionForUser({
    entity_type: TrackEntityTypeEnum.project,
    action_type: TrackActionTypeEnum.like,
    entity_id: projectId,
    flag: Number(!likeStatus.value)
  }).then((res) => {
    initData()
  })
}

const handleClickStar = () => {
  saveActionForUser({
    entity_type: TrackEntityTypeEnum.project,
    action_type: TrackActionTypeEnum.star,
    entity_id: projectId,
    flag: Number(!starStatus.value)
  }).then((res) => {
    initData()
  })
}

onMounted(() => {
  initData()
})

onUnmounted(() => {
  projectDetailStore.reset()
})
</script>

<style lang="less">
@import '@/assets/style/theme.less';

.page-project {
  overflow: auto;
  height: 100%;
  padding-bottom: 40px;

  .has-talk {
    padding-bottom: 140px;
  }
  .sign-name {
    color: #03a9f4;
  }

  .demand-item {
    overflow: hidden;
    padding: 12px 12px;
    padding-bottom: 8px;
    border-top: 0;
    border-bottom: solid 1px @line-bg-color;
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
      font-weight: bold;
    }
    &__bd {
      font-size: 12px;
      line-height: 24px;
      padding-top: 10px;
      padding-bottom: 10px;
      color: @text-color-second;
    }
    &__ft {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 12px;
      color: @text-color-gray;
      padding-top: 8px;
      border-top: 1px solid @line-bg-color;
    }
    &__name {
      margin-left: 4px;
    }
    .icon-people {
      font-size: 16px;
      margin-right: 6px;
    }
  }

  .comment {
    padding-top: 10px;
    font-size: 12px;
    .main {
      flex: 1;
    }
    &:last-child {
      .main {
        border: 0;
      }
    }
    .comment-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .nickname {
      font-size: 11px;
      color: #bbb;
    }
    .sign-text {
      color: #333;
    }
    .sign-quote {
      margin-right: -4px;
      margin-left: -2px;
      color: #2196f3;
    }
    .avatar {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      margin-right: 6px;
    }
    .date {
      margin-top: 2px;
      color: #bbb;
      font-size: 10px;
      margin-left: 4px;
    }
    .comment-body {
      padding-top: 4px;
      color: #999;
      padding-bottom: 6px;
      border-radius: 2px;
    }
    .comment-child {
      .comment {
        margin: 0;
      }
      .avatar {
        width: 18px;
        height: 18px;
      }
      .main {
        border: 0;
      }
    }
    .comment-action {
      font-size: 14px;
      .btn-reply {
        margin-right: 4px;
      }
    }
    .load-more {
      padding-bottom: 10px;
      text-align: center;
    }
  }

  .talk-box-wrapper {
    position: fixed;
    overflow: hidden;
    background: #d3ced4;
    z-index: 25;
    width: 100%;
    box-sizing: border-box;
    bottom: 0;
    left: 0;
    padding: 10px 12px;
    .talk-box {
      background: #f5f5f5;
    }
    .talk-btn {
      float: right;
      margin-top: 10px;
    }
    .back-btn {
      float: left;
      margin-top: 10px;
    }
  }

  .group {
    margin-bottom: 10px;
    background: #fff;
  }

  .group-btm {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 0;
    display: flex;
    align-items: center;
    font-size: 12px;
    line-height: 20px;
    justify-content: space-between;
    box-shadow: 10px 10px 20px #d6d3d3;
    .btn-want {
      line-height: 24px;
      padding: 0px 10px;
      color: #fff;
      font-size: 12px;
      border-radius: 1px;
      background-color: #615963;
    }
    .enroll-btn {
      color: #fff;
      background: #615963;
    }
    .is-active {
      .icon {
        color: #ff5722;
      }
    }
  }

  .floor-candidate {
    .u-list {
      overflow: hidden;
      padding-top: 6px;
      &.is-scroll {
        height: 190px;
      }
    }
    .u-item {
      float: left;
      width: 25%;
      text-align: center;
      margin-bottom: 8px;
    }
    .u-avatar {
      width: 24px;
      height: 24px;
      border-radius: 50%;
    }
    .icon-more {
      font-size: 20px;
    }
    .load-more {
      margin-bottom: 0;
    }
    .floor__header {
      .van-icon {
        transition: all 500ms;
        &.is-up {
          transform: rotate(180deg);
        }
      }
    }
  }

  .u-nickname {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 12px;
  }

  .u-btn {
    display: block;
    margin: 0 auto;
    margin-top: 6px;
    width: 62px;
    height: 24px;
    padding: 0;
    color: #fff;
    border-radius: 2px;
    background: #615963;
    &::before {
      border-radius: 2px;
    }
  }

  .floor__header {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 8px;
  }

  .ver-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-right: 16px;
    span {
      display: inline-block;
      transform: scale(0.9);
    }
  }

  .btn-order {
    position: relative;
    margin-right: 0;
    border-radius: 20px;
    .order-tip {
      position: absolute;
      width: 100px;
      top: -40px;
      height: 24px;
      line-height: 24px;
      right: 0;
      background: #03a9f4;
      color: #fff;
      background: linear-gradient(top, #ff5722, #f44336);
      border-radius: 4px;
      &:after {
        position: absolute;
        content: '\00a0';
        top: 22px;
        right: 22px;
        width: 0;
        height: 0;
        display: block;
        border-style: solid;
        border-width: 10px;
        border-color: #f44336 transparent transparent transparent;
      }
    }
  }

  .to-name {
    margin-left: 3px;
    margin-right: 3px;
  }
}
</style>
