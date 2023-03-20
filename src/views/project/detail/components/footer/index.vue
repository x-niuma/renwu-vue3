<template>
  <div class="group ui-flex group-btm">
    <div class="edit-tip">
      <van-icon name="edit" />
      <span>说点什么</span>
    </div>
    <div>
      <van-space :size="18">
      <div class="ui-flex">
        <van-icon class="icon" name="like-o" />
        <span>10</span>
      </div>
      <div class="ui-flex">
        <van-icon class="icon" name="star-o" />
        <span>10</span>
      </div>
      <div class="ui-flex">
        <van-icon class="icon" name="chat-o" />
        <span>10</span>
      </div>
      </van-space>
    </div>
  </div>
</template>

<script lang="ts" setup>
</script>

<style lang="less" scoped>
.icon {
  font-size: 20px;
  margin-right: 4px;
}

.edit-tip {
  height: 32px;
  padding: 0 12px;
  padding-right: 100px;
  border-radius: 16px;
  background-color: #f5f5f5;
}
</style>