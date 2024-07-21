<template>
  <div class="bg-[#0C3F62] text-white space-y-6 py-2 px-4">
    <div class="flex justify-between items-center md:block">
      <div :class="{ hidden: !isOpen, block: isOpen, 'md:block': true }">
        <img src="./../../public//CompanyLogo.svg" alt="Giriraj Digital Logo" class="mx-auto mt-4" />
        <p class="w-[90%] text-center text-sm mx-auto mt-2 p-26">
          Software & Web Development Company - Umbraco Gold Partner
        </p>
      </div>
      <button @click="toggleSidebar" class="md:hidden">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </button>
    </div>
    <nav :class="{ hidden: !isOpen, block: isOpen, 'md:block': true }">
      <ul class="space-y-1 mt-12">
        <li class="flex px-4 items-center justify-between">
          <div class="flex">
            <img src="@/assets/HomeIcon.svg" alt="home" class="w-4" />

            <router-link to="/" class="block py-1.5 px-4 rounded transition duration-200 hover:text-[#0FA1DB]"
              :class="{ 'text-[#0FA1DB]': $route.path === '/' }">Home</router-link>
          </div>
          <div v-if="$route.path === '/'">
            <img src="@/assets/left-arrow.svg" alt="home" class="" />
          </div>
        </li>
        <hr class="mx-auto w-[90%] text-center" />
        <li class="flex px-4 items-center justify-between">
          <div class="flex">
            <img src="@/assets/CardsIcon.svg" alt="home" class="w-4" />
            <router-link to="/cards" class="block py-1.5 px-4 rounded transition duration-200 hover:text-[#0FA1DB]"
              :class="{ 'text-[#0FA1DB]': $route.path === '/cards' }">Cards</router-link>
          </div>
          <div v-if="$route.path === '/cards'">
            <img src="@/assets/left-arrow.svg" alt="home" class="" />
          </div>
        </li>
        <hr class="mx-auto w-[90%] text-center" />
        <li class="flex px-4 items-center justify-between">
          <div class="flex">
            <img src="@/assets/TransactionsIcon.svg" alt="home" class="w-4" />
            <router-link to="/transactions"
              class="block py-1.5 px-4 rounded transition duration-200 hover:text-[#0FA1DB]"
              :class="{ 'text-[#0FA1DB]': $route.path === '/transactions' }">Transactions</router-link>
            </div>
            <div v-if="$route.path === '/transactions'">
              <img src="@/assets/left-arrow.svg" alt="home" class="" />
            </div>
        </li>
        <hr class="mx-auto w-[90%] text-center" />
        <li class="flex px-4 items-center justify-between">
          <div class="flex">
            <img src="@/assets/SettingsIcon.svg" alt="home" class="w-4" />
            <router-link to="/settings" class="block py-1.5 px-4 rounded transition duration-200 hover:text-[#0FA1DB]"
              :class="{ 'text-[#0FA1DB]': $route.path === '/settings' }">Settings</router-link>
          </div>
          <div v-if="$route.path === '/settings'">
            <img src="@/assets/left-arrow.svg" alt="home" class="" />
          </div>
        </li>
      </ul>
    </nav>
    <div class="lg:mt-auto sm:mt-0 flex px-4">
      <img src="@/assets/LogoutIcon.svg" alt="home" class="w-4" />
      <router-link to="/logout"
        class="block py-1.5 px-4 rounded transition duration-200 hover:text-[#0FA1DB]">Logout</router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const isOpen = ref(false);

const toggleSidebar = () => {
  isOpen.value = !isOpen.value;
};
</script>
