<template>
  <nav class="text-sm mx-8 my-4">
    <ol class="list-none p-0 inline-flex">
      <li v-for="(item, index) in items" :key="index" class="flex items-center">
        <router-link :to="item.path" class="text-blue-900 hover:text-blue-800">
          {{ item.name }}
        </router-link>
        <span v-if="index < items.length - 1" class="mx-2">/</span>
      </li>
    </ol>
  </nav>
</template>

<script lang="ts" setup>
import type { BreadcrumbItem } from '@/types';

defineProps<{
  items: BreadcrumbItem[];
}>();
</script>
