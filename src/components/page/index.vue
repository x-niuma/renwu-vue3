<template>
  <div class="page">
    <div class="header" v-if="title">
      <van-nav-bar :title="title" left-arrow @click-left="onClickLeft" :right-text="rightText" />
    </div>
    <div
      class="body"
      :class="[
        {
          'with-tab-bar': Boolean(tabBarProps),
          'with-header': Boolean(title)
        }
      ]"
    >
      <slot></slot>
    </div>
    <template v-if="tabBarProps">
      <TabBar :activeIndex="tabBarProps.activeIndex" />
    </template>
  </div>
</template>

<script lang="ts">
import TabBar from '../tabbar/index.vue'
import { Tab, Tabs, NavBar } from 'vant'
import { useRouter } from 'vue-router'

export default {
  components: {
    TabBar,
    Tab,
    Tabs,
    [NavBar.name]: NavBar
  },
  props: {
    tabBarProps: {
      type: Object,
      default() {
        return null
      }
    },
    title: {
      type: String
    },
    rightText: {
      type: String
    }
  },
  setup(props) {
    const router = useRouter()
    const isStr = typeof props.title === 'string'
    return {
      isStr,
      onClickLeft() {
        router.back()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.page {
  position: relative;
  width: 100%;
  height: 100%;
}

.body {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: scroll;
}

.with-header {
  height: calc(100% - 46px);
}

.with-tab-bar {
  height: calc(100% - 50px);
}

.with-header.with-tab-bar {
  height: calc(100% - 96px);
}
</style>
