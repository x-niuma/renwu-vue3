<template>
  <Page class="wrapper" title="我的发布">
    <DemandList
      @edit="handleEdit"
      @delete="handleDelete"
      @offline="handleOffline"
      @online="handleOnline"
      ref="listRef"
    />
  </Page>
</template>

<script lang="ts" setup>
import { showConfirmDialog } from 'vant'
import { remove, updateProject } from '@/service/auto-service/项目模块'
import Page from '@/components/page/index.vue'
import DemandList from '@/views/project/components/my-project-list.vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'
import { toRaw, ref } from 'vue'

const listRef = ref<InstanceType<typeof DemandList> | null>(null)
const $router = useRouter()

const handleEdit = (item: ProjectItemVo) => {
  $router.push('project-edit?id=' + item.id)
}

const handleOnline = (item: ProjectItemVo) => {
  updateProject({
    ...toRaw(item),
    status: 1
  }).then(() => {
    showToast({
      type: 'success',
      message: '上架成功'
    })
    listRef.value.updateItem(item.id, {
      ...item,
      status: 1
    })
  })
}

const handleOffline = (item: ProjectItemVo) => {
  const action = () =>
    updateProject({
      ...toRaw(item),
      status: 0
    }).then(() => {
      showToast({
        type: 'success',
        message: '下架成功'
      })
      listRef.value.updateItem(item.id, {
        ...item,
        status: 0
      })
    })

  showConfirmDialog({
    title: '操作提示',
    message: '下架后不可被搜索，确认下架?'
  })
    .then(() => {
      action()
    })
    .catch(() => {})
}

const handleDelete = (item: ProjectItemVo) => {
  const action = () =>
    remove({
      id: item.id
    }).then(() => {
      showToast({
        type: 'success',
        message: '删除成功'
      })
      listRef.value.deleteItem(item.id)
    })

  showConfirmDialog({
    title: '操作提示',
    message: '删除后不可恢复，确认删除?'
  })
    .then(() => {
      action()
    })
    .catch(() => {})
}
</script>
