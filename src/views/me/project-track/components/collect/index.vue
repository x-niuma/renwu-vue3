<template>
  <div>
    <div class="item" v-for="it in list">
      {{  it.entity_id }}.
      {{ it.entity.title }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { queryListForUser } from '@/service/auto-service/数据采集';
import { queryListByIdList } from '@/service/auto-service/项目模块';
import { TrackEntityTypeEnum } from '@/views/project/detail/utils';

const props = defineProps<{
  action_type: number;
}>()

const list = ref<(TrackItemVo & {
  entity: ProjectItemVo
})[]>([]);

const getList = async () => {
  const trackRes = await queryListForUser({
    entity_type: TrackEntityTypeEnum.project,
    action_type: props.action_type
  })
  const trackList = trackRes.data.list;

  const projectRes = await queryListByIdList({
    id: trackList.map((it) => it.entity_id)
  })
  const projectList = projectRes.data.list;

  list.value = trackList.map((it) => {
    return {
      ...it,
      entity: projectList.find((p) => p.id === it.entity_id) as ProjectItemVo
    }
  })
}

onMounted(() => {
  getList()
})
</script>

<style lang="less" scoped>
.item {
  padding: 10px 12px;
  background: #fff;
  margin-bottom: 10px;
  margin-top: 10px;
}
</style>