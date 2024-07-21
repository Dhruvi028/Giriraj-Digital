<template>
  <div class="flex flex-col md:flex-row h-auto bg-[#ECEFF1]">
    <Sidebar :is-open="isSidebarOpen" class="w-full md:w-72" />
    <div class="flex-1 flex flex-col overflow-hidden">
      <Header @toggle-sidebar="toggleSidebar" />
      <Breadcrumb :items="breadcrumbItems" />
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-[#ECEFF1]">
        <div class="p-4">
          <router-view></router-view>
        </div>
        <footer class="bg-[#6A94A5] px-4 py-2 text-xs text-center text-gray-600">
          © 2024 GIRIRAJ DIGITAL. All rights reserved.
        </footer>
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import Sidebar from './components/Sidebar.vue';
import Header from './components/Header.vue';
import Breadcrumb from './components/Breadcrumb.vue';
import type { BreadcrumbItem } from './types';

const route = useRoute();
const isSidebarOpen = ref(true);

const currentRoute = computed(() => route);

// Ensure the type of the breadcrumb is correct
const breadcrumbItems = computed<BreadcrumbItem[]>(() => {
  return (currentRoute.value.meta.breadcrumb || []) as BreadcrumbItem[];
});

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};
</script>
