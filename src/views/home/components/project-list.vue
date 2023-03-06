<template>
  <div v-infinite-scroll="loadMore" :infinite-scroll-disabled="loading" :infinite-scroll-distance="20"
    infinite-scroll-immediate-check="false">
    <ul class="d-list">
      <li class="d-item" v-for="(item, index) in list" :key="index" @click="switchItem(item.id)">
        <div class="d-item__hd">
          <div class="d-item__logo-main">
            <div class="title-wrapper">
              <span class="title">{{ index + 1 }}. {{ item.title }}</span>
              <van-icon name="ellipsis" @click.stop="$store.dispatch('showComplain', {
                oid: item.id,
                type: 3,
                uid: item.userInfo.id
              })" />
            </div>
            <div class="tags">
              <InlineTag :text="item.appType" />
              <InlineTag :text="item.projectType + '任务'" />
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
            <span>{{ item.requires || '无任何要求' }}</span>
          </div>
          <div class="column">
            <span class="label">发布时间：</span>
            <span>{{ item.createTime | formatDate }}</span>
          </div>
        </div>
        <div class="d-item__ft">
          <div class="ui-flex" @click.stop="$router.push('/userProfile/' + item.userInfo.id)">
            <img class="d-item__avatar" :src="item.userInfo.avatar || avatar" />
            <div class="d-item__name">{{ item.userInfo.nickname }}</div>
          </div>
          <div class="ui-flex enroll-info">
            <van-icon class="icon-users" name="friends" />
            <span class="enroll-num">{{ item.enrollList.length }}人报名</span>
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
  
<script>
import * as projectService from '@/service/project';
import Loading from '@/components/loading/index.vue'
import NoneData from '@/components/none-data/index.vue'
import InlineTag from '@/components/inline-tag/index.vue'
import avatar from '@/assets/img/avatar.png'

export default {
  components: {
    Loading,
    NoneData,
    InlineTag
  },

  props: {
    appTypeId: {
      type: [String, Number],
      default: ''
    },
    params: {
      type: Object,
      default: () => { }
    },
    index: {
      type: Number,
      required: true
    },
    activeIndex: {
      type: Number,
      required: true
    }
  },

  data() {
    return {
      avatar,
      list: [],
      loading: false,
      hasMore: true,
      isRefresh: false,
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      currentRow: null
    }
  },

  computed: {
    cid() {
      return this.$route.query.cid
    }
  },

  watch: {
    // appTypeId() {
    //   this.handleParamChanged()
    // },
    activeIndex() {
      if (this.index === this.activeIndex) {
        this.getDataList()
      }
    }
  },

  mounted() {
    if (this.index === this.activeIndex) {
      this.getDataList()
    }
  },

  methods: {
    loadMore() {
      if (this.loading) return
      if (!this.hasMore) return

      this.pageIndex++
      this.getDataList()
    },

    switchItem(itemId) {
      this.$router.push(`/project/${itemId}`)
    },

    async getDataList() {
      this.loading = true
      const params = {
        pageSize: this.pageSize,
        pageIndex: this.pageIndex,
        appTypeId: this.appTypeId,
        ...this.params
      }

      let res = await projectService.getProjectList(params)
      this.loading = false

      if (this.isRefresh) {
        this.list = res.data.list
      } else {
        this.list = this.list.concat(res.data.list)
      }

      this.total = res.data.pageInfo.total
      this.hasMore = this.list.length < this.total
      this.isRefresh = false
    },

    handleParamChanged() {
      this.isRefresh = true
      this.pageIndex = 1
      this.getDataList()
    }
  }
}
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
  padding-bottom: 0;
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
  