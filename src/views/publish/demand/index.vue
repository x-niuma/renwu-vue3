<template>
  <div class="view">
    <div class="content" v-if="true">
      <van-field v-model="form.title" placeholder="标题(搜索的关键词)" />
      <van-field v-model="form.reward" placeholder="悬赏金额(单位为元)" />
      <van-field v-model="form.requires" placeholder="您对竞标者的要求" />
      <van-field v-model="form.description" placeholder="需求描述" type="textarea" />

      <van-field
        v-model="form.category_name"
        placeholder="项目分类"
        :readonly="true"
        :is-link="true"
        @click.native="showCategoryPicker"
      />
      <CategoryPicker
        :value="isShowCategoryPicker"
        @cancel="hideCategoryPicker"
        @confirm="confirmCategoryPicker"
      />

      <van-field
        v-model="form.task_type_name"
        placeholder="任务类型"
        :readonly="true"
        :is-link="true"
        @click.native="showTaskTypePicker"
      />
      <TaskTypePicker
        :value="isShowTaskTypePicker"
        :columns="taskTypeColumn"
        @cancel="hideTaskTypePicker"
        @confirm="confirmTaskTypePicker"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Toast } from 'vant'
import * as qiniu from 'qiniu-js'
import CategoryPicker from './category-picker/index.vue'
import TaskTypePicker from './task-type-picker/index.vue'

const taskTypeColumn = [
  {
    text: '项目',
    value: 1
  },
  {
    text: '悬赏',
    value: 2
  }
]

const form = ref({
  reward: '',
  title: '',
  city: '',
  description: '',
  requires: '',
  category_id: '' as unknown as number,
  category_name: '',
  task_type: '' as unknown as number,
  task_type_name: ''
})

const currentCategory = ref<null | { text: string; value: number }>(null)
const isShowCategoryPicker = ref(false)
const showCategoryPicker = () => (isShowCategoryPicker.value = true)
const hideCategoryPicker = () => (isShowCategoryPicker.value = false)
const confirmCategoryPicker = (v: { text: string; value: number }) => {
  hideCategoryPicker()
  currentCategory.value = v
  form.value.category_id = v.value
  form.value.category_name = v.text
}

const currentTaskType = ref<null | { text: string; value: number }>(null)
const isShowTaskTypePicker = ref(false)
const showTaskTypePicker = () => (isShowTaskTypePicker.value = true)
const hideTaskTypePicker = () => (isShowTaskTypePicker.value = false)
const confirmTaskTypePicker = (v: { text: string; value: number }) => {
  hideTaskTypePicker()
  currentTaskType.value = v
  form.value.task_type = v.value
  form.value.task_type_name = v.text
}
</script>

<style lang="less" scoped src="./index.less"></style>
