<template>
    <div>
      {{  query }}
    </div>
</template>

<script lang="ts" setup scoped>
import { useRoute } from 'vue-router';
const route = useRoute();
const query = route.query;
</script>