<template>
  <div class="wrapper">
    <div class="main">
      <swiper class="mySwiper" @swiper="onSwiper" @slideChange="slideChange" ref="mySwiper">
        <swiper-slide class="swiper-slider" v-for="(item, index) in list" :key="index">
          <div class="swiper-slider">
            {{  index }}
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script setup lang="ts">
import 'swiper/css'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import * as api from '@/service/project'
import { onMounted, ref } from 'vue'

const scrollbar = ref(null as any);
const mySwiper  = ref(null);

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
</script>

<style lang="less" scoped>
.wrapper {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f4f4f4;
}

.main {
  flex: 1;
  width: 100%;
  overflow: hidden;

  .mySwiper {
    height: 100%;
  }

  .swiper-slider {
    height: 100%;
    background-color: red;
  }
}
</style>
