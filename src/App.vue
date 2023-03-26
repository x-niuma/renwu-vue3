<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" :key="$route.name" />
    </keep-alive>
    <!-- <component :is="Component" :key="$route.name" v-if="!$route.meta.keepAlive" /> -->
  </router-view>
</template>