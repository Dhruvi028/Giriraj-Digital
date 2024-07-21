<template>
  <div class="flex items-start justify-between text-sm">
    <div class="flex items-start space-x-3">
      <div>
        <img
          v-if="type === 'credit'"
          src="@/assets/Credited.svg"
          alt="credited"
          class="w-[35px] h-[35px]"
        />
        <img v-else src="@/assets/Debited.svg" alt="debited" class="w-[35px] h-[35px]"/>
      </div>
      <div>
        <p class="text-m font-medium text-gray-800">{{ title }}</p>
        <p class="text-xs text-gray-500">{{ date }}</p>
        <p class="text-xs mt-1 text-[#0FA1DB]">{{ description }}</p>

      </div>
    </div>
    <span :class="type === 'credit' ? 'text-green-400' : 'text-red-600'" class="font-medium text-xs">
      {{ type === "credit" ? "+" : "-" }}${{ amount }}
    </span>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  title: string;
  description: string;
  date: string;
  amount: string;
  type: "credit" | "debit";
}>();
</script>
