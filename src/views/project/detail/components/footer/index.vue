<template>
  <div class="group group-btm">
    <div v-if="isEdit" class="edit-box ui-flex ui-flex-align-start">
      <van-field
        class="input"
        v-model="message"
        rows="1"
        autosize
        type="textarea"
        placeholder="请输入留言"
      />
      <van-button class="ui-ml-10" size="small" type='default'>发送</van-button>
      <van-button class="ui-ml-10" size="small" type="default" @click="hideEdit">取消</van-button>
    </div>
    <div class="action-box ui-flex" v-else>
      <div class="edit-tip" @click="showEdit">
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
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const isEdit = ref(false);
const message = ref('');
const showEdit = () => isEdit.value = true;
const hideEdit = () => isEdit.value = false;
</script>

<style lang="less" scoped>
.icon {
  font-size: 20px;
  margin-right: 4px;
}

.edit-box {
  flex: 1;
  padding: 12px;
  .input {
    flex: 1;
    padding: 6px 12px;
    border-radius: 16px;
    background-color: #f5f5f5;
  }
}

.action-box {
  flex: 1;
  padding: 10px 12px;
  .edit-tip {
    display: flex;
    align-items: center;
    color: #888;
    height: 32px;
    padding: 0 12px;
    padding-right: 100px;
    border-radius: 16px;
    background-color: #f5f5f5;
  }
}
</style>