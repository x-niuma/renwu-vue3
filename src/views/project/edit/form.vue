<template>
  <div class="view">
    <van-form class="content" @submit="onSubmit">
      <van-field
        v-model="form.title"
        placeholder="标题(搜索的关键词)"
        :rules="[{ required: true, message: '请填写标题' }]"
      />
      <van-field
        v-model="form.reward"
        placeholder="悬赏金额(单位为元)"
        :rules="[{ validator: checkMoney, message: '请填写有效的金额' }]"
      />
      <van-field
        v-model="form.skill"
        placeholder="您对竞标者的要求"
        :rules="[{ required: true, message: '请填写技能要求' }]"
      />
      <van-field v-model="form.description" placeholder="需求描述" type="textarea" :rules="[{ required: true, message: '请填写项目描述' }]" />

      <van-field
        v-model="form.category_name"
        placeholder="项目分类"
        :readonly="true"
        :is-link="true"
        :rules="[{ required: true, message: '请选择' }]"
        @click.native="showCategoryPicker"
      />
      <CategoryPicker ref="categoryRef" @confirm="confirmCategoryPicker" />

      <van-field
        v-model="form.task_type_name"
        placeholder="任务类型"
        :readonly="true"
        :is-link="true"
        @click.native="showTaskTypePicker"
        :rules="[{ required: true, message: '请选择' }]"
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
        :rules="[{ required: true, message: '请选择' }]"
      />
      <CityPicker ref="cityPicker" :defaultValues="defaultCityData" @confirm="confirmCityPicker" />

      <ImagePicker ref="imagePickerRef" :default-value="defaultImageValue" />

      <div class="footer">
        <van-button size="large" native-type="submit" :loading="submitLoading" type="primary">
          <span>提交</span>
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, toRaw } from 'vue'
import { showSuccessToast, type PickerOption } from 'vant'
import CategoryPicker from './category-picker/index.vue'
import TaskTypePicker from './task-type-picker/index.vue'
import CityPicker, { type ICityPicker } from './city-picker/index.vue'
import ImagePicker, { type ImagePickerRef } from './image-picker/index.vue'
import * as ProjectAPI from '@/service/auto-service/项目模块'
import { checkMoney } from '@/utils/validation'

const props = defineProps<{
  isEdit?: boolean
  detail?: ProjectItemVo
}>()

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

const submitLoading = ref(false)
const form = ref<ProjectItemVo>(
  props.isEdit
    ? (props.detail as ProjectItemVo)
    : ({
        reward: '',
        title: '',
        skill: '',
        description: '',
        category_id: '',
        category_name: '',
        task_type: '',
        task_type_name: '',
        city: '',
        city_code: ''
      } as unknown as ProjectItemVo)
)

// 选择项目分类
const categoryRef = ref<ICityPicker | null>(null)
const currentCategory = ref<null | PickerOption>(null)
const showCategoryPicker = () => categoryRef.value?.show()
const confirmCategoryPicker = (list: PickerOption[]) => {
  const v = list[0]
  currentCategory.value = v
  form.value.category_id = Number(v.value)
  form.value.category_name = `${v.text}`
}

// 选择任务类型
const taskTypePicker = ref<ICityPicker | null>(null)
const currentTaskType = ref<null | PickerOption>(null)
const showTaskTypePicker = () => taskTypePicker.value?.show()
const confirmTaskTypePicker = (list: PickerOption[]) => {
  const v = list[0]
  currentTaskType.value = v
  form.value.task_type = Number(v.value)
  form.value.task_type_name = `${v.text}`
}

// 选择服务城市
const defaultCityData = ref(props.detail ? props.detail.city_code.split(' ') : [])
const cityPicker = ref<ICityPicker | null>(null)
const cityClickHandler = () => cityPicker.value?.show()
const currentCity = ref<PickerOption[]>([])
const confirmCityPicker = (data: PickerOption[]) => {
  currentCity.value = data
  form.value.city = data.map((it) => it.text).join(' ')
  form.value.city_code = data.map((it) => it.value).join(' ')
}

// 选择图片
const imagePickerRef = ref<null | ImagePickerRef>()
const defaultImageValue = props.isEdit
  ? (props.detail as ProjectItemVo).images.split(',').map((it) => ({ url: it }))
  : []

const getFormData = () => {
  const params: CreateProjectDTO = toRaw(form.value) as CreateProjectDTO
  params.images = imagePickerRef.value?.getValue().join(',')
  return params
}

// 创建项目
const doAdd = async () => {
  submitLoading.value = true
  try {
    const res = await ProjectAPI.create(getFormData())
    if (res.code === '0') {
      showSuccessToast('操作成功')
    }
  } catch (e) {
    e
  }
  submitLoading.value = false
}

// 修改项目
const doEdit = async () => {
  submitLoading.value = true
  try {
    const res = await ProjectAPI.updateProject(getFormData())
    if (res.code === '0') {
      showSuccessToast('操作成功')
    }
  } catch (e) {
    e
  }
  submitLoading.value = false
}

const onSubmit = () => {
  props.isEdit ? doEdit() : doAdd()
}
</script>

<style lang="less" scoped>
.view {
  padding-bottom: 50px;
  .footer {
    z-index: 100;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
  }
}

// 图片上传
.upload-wrap {
  float: right;
  padding: 20px 0;
}

.footer {
  position: absolute;
  bottom: 0;
}
</style>
