<template>
  <div class="search-bar">
    <i class="iconfont icon-back icon-arrow-left" v-if="showBack" @click="goBack" />
    <div class="form" @click="goSearch" v-if="!isField">
      <i slot="left-icon" class="iconfont icon-search"></i>
      <span class="input">{{ placeholder }}</span>
    </div>
    <van-field
      v-else
      :autofocus="autofocus"
      class="field"
      v-model="localValue"
      :placeholder="placeholder"
      clearable
    >
      <i slot="left-icon" class="iconfont icon-search"></i>
    </van-field>
    <span type="clear" v-if="showRank" size="small" class="btn-rank" @click="goRank">牛人榜</span>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref, watch, defineEmits, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const $emit = defineEmits(['input'])
const router = useRouter()
const props = defineProps({
  isField: {
    type: Boolean,
    default: false
  },
  value: {
    type: String,
    default: ''
  },
  autofocus: {
    type: Boolean,
    default: true
  },
  showBack: {
    type: Boolean,
    default: false
  },
  showRank: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    default: '搜索关键字'
  }
})

const localValue = ref(props.value);

const goBack = () => router.go(-1)
const goRank = () => router.push('/user-rank')
const goSearch = () => router.push('/project-search')

watch(localValue, (val) => {
  $emit('input', val);
});

onMounted(() => {
  localValue.value = props.value
})
</script>

<style lang="less" scoped>
.search-bar {
  display: flex;
  align-items: center;
  padding: 8px 10px;
  padding-bottom: 4px;
  background: #fff;
  font-size: 14px;
  box-sizing: border-box;
  .icon-search {
    font-size: 20px;
  }
  .icon-back {
    color: #888;
    font-size: 24px;
    margin-left: -8px;
    margin-right: 8px;
  }
  .btn-rank {
    margin-left: 10px;
    border-radius: 2px;
    text-align: center;
    padding-left: 0;
    padding-right: 0;
    font-weight: 500;
    font-size: 13px;
  }
}

.field,
.form {
  flex: 1;
}

.field {
  display: flex;
  align-items: center;
  height: 30px;
  padding: 2px 8px;
  border-radius: 2px;
  background: #f4f4f4;
}

.form {
  box-sizing: border-box;
  position: relative;
  display: flex;
  align-items: center;
  height: 30px;
  line-height: 30px;
  width: 100%;
  z-index: 1;
  border-radius: 3px;
  background: #f4f4f4;
  .input {
    padding-left: 8px;
    color: #888b8e;
  }
  .icon-search {
    margin-left: 8px;
  }
}
</style>
