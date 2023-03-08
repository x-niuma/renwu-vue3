<template>
  <TowLayout>
    <template #head>
      <search-form :isField="true" :showBack="true" v-model="keyword" placeholder="搜索牛人" />
    </template>

    <template #main>
      <div class="user-list">
        <div class="user-item" v-for="(item, index) in datalist" :key="index">
          <div>
            <span class="rank">{{ index + 1 }}</span>
          </div>
          <div class="main u-flex u-flex-1">
            <div @click="gotoUserProfile(item)">
              <img class="user-avatar" :src="item.avatar || avatar" alt="" />
            </div>
            <div>
              <p class="nickname">{{ item.nickname }}</p>
              <p class="desc">{{ item.words || '该用户比较懒啥也没说~' }}</p>
              <span class="col">
                <span>成就:</span>
                <span>{{ item.rcoinNum }}</span>
              </span>
            </div>
            <div class="call" @onLogin="callUser(item)">
              <van-button size="small">向他咨询</van-button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </TowLayout>
</template>
  
<script lang="ts" setup>
import * as RankService from '@/service/rank'
import avatar from '@/assets/img/avatar.png'
import SearchForm from '@/components/search-form/index.vue';
import TowLayout from '@/components/two-layout/index.vue';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const keyword = ref();
const datalist = ref([] as any[])

const fetchData = async () => {
  let res = await RankService.getUserRankList()
  datalist.value = res.data.list
}

const gotoUserProfile = (item: any) => {
  router;
}

const callUser = ({ id, avatar, nickname }: any) => {
  // const urlPath = `/chatItem/${id}?avatar=${avatar}&nickname=${nickname}`
  // router.push(urlPath)
}

onMounted(() => {
  fetchData()
})
</script>
  
<style lang="less" scoped>
.u-flex {
  display: flex;
}

.u-flex-1 {
  flex: 1;
}

.col {
  display: inline-block;
  margin-top: 10px;
  margin-right: 10px;
  color: #666;
}

.desc {
  margin-top: 10px;
  color: #6d6b6b;
  text-align: justify;
}

.main {
  position: relative;
  background: #fff;
  padding: 10px;
  border-radius: 4px;
}

.nickname {
  font-size: 16px;
  font-weight: bold;
}

.user-item {
  display: flex;
  padding: 10px;
  padding-bottom: 0;
  font-size: 12px;

  &:last-child {
    margin-bottom: 10px;
  }
}

.rank {
  display: inline-block;
  width: 24px;
  line-height: 24px;
  text-align: center;
  margin-right: 10px;
  font-size: 10px;
  border-radius: 4px;
  background-color: antiquewhite;
}

.user-avatar {
  width: 45px;
  height: 45px;
  margin-right: 10px;
  border-radius: 4px;
}

.call {
  position: absolute;
  right: 12px;
  background: #f5f3f1;
}

.btn-home {
  font-size: 10px;
  text-align: center;
}

.summary {
  font-size: 12px;
  width: 80%;
}
</style>