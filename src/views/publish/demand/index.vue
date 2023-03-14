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
      <CategoryPicker ref="categoryRef" @confirm="confirmCategoryPicker" />

      <van-field
        v-model="form.task_type_name"
        placeholder="任务类型"
        :readonly="true"
        :is-link="true"
        @click.native="showTaskTypePicker"
      />
      <TaskTypePicker
        ref="taskTypePicker"
        :columns="taskTypeColumn"
        @confirm="confirmTaskTypePicker"
      />

      <van-field
        v-model="form.city"
        placeholder="所在城市"
        :readonly="true"
        :is-link="true"
        @click.native="cityClickHandler"
      />
      <CityPicker ref="cityPicker" @confirm="confirmCityPicker" />

      <ImagePicker ref="imagePickerRef" />
    </div>

    <!-- 提交按钮 -->
    <div class="footer">
      <van-button size="large" type="primary" @click="handleSubmit">
        <span>提交</span>
      </van-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { PickerOption } from 'vant'
import CategoryPicker from './category-picker/index.vue'
import TaskTypePicker from './task-type-picker/index.vue'
import CityPicker, { type ICityPicker } from './city-picker/index.vue'
import ImagePicker, { type ImagePickerRef } from './image-picker/index.vue'

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
  category_id: '',
  category_name: '',
  task_type: '',
  task_type_name: ''
})

const handleSubmit = () => {}

// 选择项目分类
const categoryRef = ref<ICityPicker | null>(null)
const currentCategory = ref<null | PickerOption>(null)
const showCategoryPicker = () => categoryRef.value?.show()
const confirmCategoryPicker = (list: PickerOption[]) => {
  const v = list[0]
  currentCategory.value = v
  form.value.category_id = `${v.value}`
  form.value.category_name = `${v.text}`
}

// 选择任务类型
const taskTypePicker = ref<ICityPicker | null>(null)
const currentTaskType = ref<null | PickerOption>(null)
const showTaskTypePicker = () => taskTypePicker.value?.show()
const confirmTaskTypePicker = (list: PickerOption[]) => {
  const v = list[0]
  currentTaskType.value = v
  form.value.task_type = `${v.value}`
  form.value.task_type_name = `${v.text}`
}

// 选择服务城市
const cityPicker = ref<ICityPicker | null>(null)
const cityClickHandler = () => cityPicker.value?.show()
const currentCity = ref<PickerOption[]>([])
const confirmCityPicker = (data: PickerOption[]) => {
  currentCity.value = data
  form.value.city = data.map((it) => it.text).join(' ')
}

// 选择图片
const imagePickerRef = ref<null | ImagePickerRef>()
</script>

<style lang="less" scoped src="./index.less"></style>
