<template>
  <Page class="wrapper" :tabBarProps="{ activeIndex: 0 }">
    <div class="header">
      <SearchForm showRank />
      <FilterMenu ref="scrollbar" class="menu" @change="tabIndexChanged" />
    </div>
    <div class="main">
      <swiper class="mySwiper" @swiper="onSwiper" :speed="250" @slideChange="slideChange" ref="mySwiper">
        <swiper-slide class="swiper-slider" v-for="(item, index) in list" :key="index">
          <DemandList :appTypeId="item.id" :index="index" :activeIndex="activeIndex" />
        </swiper-slide>
      </swiper>
    </div>
  </Page>
</template>

<script setup lang="ts">
import 'swiper/css'
import Page from '@/components/page/index.vue';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import FilterMenu from './components/category-list.vue'
import DemandList from './components/project-list.vue'
import SearchForm from './components/search-form.vue'
import * as api from '@/service/project'
import { onMounted, ref } from 'vue'

const scrollbar = ref(null as any);
const mySwiper = ref(null);

const list = ref([] as any[]);
const activeIndex = ref(0);

const slideChange = (swiper: any) => {
  activeIndex.value = swiper.activeIndex;
  scrollbar.value.slideTo(swiper.activeIndex);
}

const tabIndexChanged = (index: number) => {
  activeIndex.value = index
  mySwiper.value.slideTo(index)
}

const onSwiper = (swiper: any) => {
  mySwiper.value = swiper;
};

onMounted(async () => {
  let res = await api.getProjectCategory()
  list.value = res.data.list;
})

//     appTypeId() {
//       return this.$route.query.appTypeId
//     }
</script>

<style lang="less" scoped>
.wrapper {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f4f4f4;
}

.header {
  z-index: 5;
  width: 100%;
  top: 0;

  .menu {
    margin-top: -1px;
  }
}

.main {
  flex: 1;
  width: 100%;
  overflow: hidden;

  .mySwiper {
    height: 100%;
    transition-timing-function: ease;
  }

  .swiper-slider {
    overflow: auto;
    height: 100%;
  }
}
</style>
