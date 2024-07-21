<template>
  <header class="bg-white shadow-lg">
    <div
      class="max-w-7xl mx-auto h-16 px-4 sm:px-6 lg:px-8 flex justify-between items-center"
    >
      <div class="flex items-center gap-3">
        <img src="@/assets/Menu-bar.svg" alt="menu bar" />
        <h1 class="text-l md:text-xl font-bold text-[#0FA1DB]">{{ currentRoute.meta.title }}</h1>
      </div>
      <div class="user-profile flex gap-2">
        <button class="p-2 rounded-full border" @click="$emit('toggle-sidebar')">
          <img src="@/assets/User-profile-icon.svg" alt="user profile" />
        </button>
        <img src="@/assets/arrow-down.svg" alt="arrow down" />
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute();
const isSidebarOpen = ref(true);
const currentRoute = computed(() => route);

defineEmits(["toggle-sidebar"]);
</script>

<style scoped>
header {
  box-shadow: 0px 2px 5px 0px #68686899;
}
</style>
