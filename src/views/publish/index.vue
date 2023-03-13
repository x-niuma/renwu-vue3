<template>
  <div class="view">
    <van-nav-bar
      title="发布需求"
      left-text=""
      left-arrow
      @click-left="$router.go(-1)"
    >
      <div class="ui-center" slot="title">
        <div class="button-group">
          <span
            class="button"
            :class="{ 'is-active': tabIndex === 0 }"
            @click="tabIndex = 0"
            >发布需求</span
          >
          <div class="line"></div>
          <span
            class="button"
            :class="{ 'is-active': tabIndex === 1 }"
            @click="tabIndex = 1"
            >发布帖子</span
          >
        </div>
      </div>
    </van-nav-bar>
    <ProjectForm v-if="tabIndex===0"/>
    <!-- <TopicForm v-if="tabIndex===1" /> -->
  </div>
</template>

<script>
import ProjectForm from './demand/index.vue'
// import TopicForm from './topic/index.vue'
export default {
  components: {
    TopicForm,
    ProjectForm
  },

  data() {
    return {
      tabIndex: 0
    }
  }
}
</script>

<style lang="less" scoped>
.ui-center {
  text-align: center;
}
.button-group {
  margin: 10px auto;
  width: 100%;
  display: inline-flex;
  justify-content: center;
  height: 28px;
  .line {
    height: 100%;
    width: 1px;
    background: #ccc;
    transform: scaleX(0.5);
  }
  span {
    display: block;
    position: relative;
    flex: 1;
    width: 100%;
    height: 28px;
    padding: 0;
    font-size: 12px;
    line-height: 29px;
    text-align: center;
    color: #999;
    white-space: nowrap;
    background: #fdfdfd;
    &:first-child {
      border-top-left-radius: 28px;
      border-bottom-left-radius: 28px;
      &::after {
        content: ' ';
        position: absolute;
        left: 0;
        top: 0;
        width: 200%;
        height: 200%;
        color: #ccc;
        border-top-left-radius: 28px;
        border-bottom-left-radius: 28px;
        transform-origin: left top;
        transform: scale(0.5);
        border: 1px solid #ccc;
      }
    }
    &:last-child {
      border-top-right-radius: 28px;
      border-bottom-right-radius: 28px;
      &::after {
        content: ' ';
        position: absolute;
        left: 0;
        top: 0;
        width: 200%;
        height: 1px;
        border-right: 1px solid #ccc;
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        border-left: none;
        color: #ccc;
        height: 200%;
        transform-origin: left top;
        transform: scale(0.5);
        z-index: 1;
        border-top-right-radius: 28px;
        border-bottom-right-radius: 28px;
      }
    }
  }
  .is-active {
    background: red;
    color: #fff;
  }
}
</style>
