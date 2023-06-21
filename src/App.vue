<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" :key="$route.name" />
  </router-view>
</template>