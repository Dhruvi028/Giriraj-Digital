<template>
  <div class="w-full">
    <div class="flex flex-col xl:flex-row gap-8 w-[90%]">
      <div v-if="cards.length !== 0" class="relative grow w-full xl:w-24">
        <!-- "Show Card Number" button -->
        <div class="mt-4 flex justify-end mb-1">
          <button @click="toggleShowCardNumber"
            class="text-blue-900 p-1 rounded-sm font-semibold flex items-center bg-[#C2E2EE] text-xs">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z">
              </path>
            </svg>
            {{ isCardNumberVisible ? 'Hide' : 'Show' }} Card Number
          </button>
        </div>

        <!-- Card Carousel -->
        <div class="flex space-x-4 overflow-x-hidden">
          <div v-for="(card, index) in cards" :key="card.id" class="w-full flex-shrink-0">
            <div class="bg-[#0C3F62] rounded-md shadow-md p-6 text-white mb-4"
              :class="{ 'bg-[#0C3F62]': selectedCard.isLocked, 'bg-[#6A94A5]': selectedCard.isArchived, 'bg-[#0FA1DB]': selectedCard.isDefault, 'bg-[#4086F4]': selectedCard.addedToGPay }">
              <div class="flex justify-end items-start mb-2" :class="{ 'justify-between': cardStatus }">
                <div class="flex gap-2 items-center">
                  <div v-if="cardStatus === 'default'">
                    <img src="@/assets/default.svg" alt="Set as Default" />
                  </div>
                  <div v-else-if="cardStatus === 'gpay'">
                    <img src="@/assets/gpay.png" alt="gpay" />
                  </div>
                  <div v-else-if="cardStatus === 'lock'">
                    <img src="@/assets/lock-icon.svg" alt="lock" />
                  </div>
                  <div v-else-if="cardStatus === 'archive'">
                    <img src="@/assets/archive-icon.svg" alt="Archive" />
                  </div>
                </div>
                <div v-if="selectedCard.bankName.toLowerCase().includes('hdfc')">
                  <img src="@/assets/CardBank.png" alt="Bank Logo" />
                </div>
                <div v-else class="font-bold text-xl font-sans text-white">
                  {{ selectedCard.bankName.toUpperCase() }}
                </div>
              </div>

              <p class="text-xl font-normal font-mono">{{ selectedCard.name }}</p>
              <p class="text-l font-extralight font-mono">
                {{ isCardNumberVisible ? selectedCard.cardNumber.replace(/(\d{4})/g, '$1 ').trim() :
                  maskCardNumber(selectedCard.cardNumber) }}
              </p>
              <div class="flex justify-between items-end">
                <div>
                  <p class="text-sm text-sm font-normal">Valid Till: <span class="font-extralight	">{{
                    selectedCard.validTill
                      }}</span></p>

                </div>
                <div>
                  <p class="text-sm font-normal font-mono">CVV: <span class="text-l">•••</span></p>
                </div>
                <img src="@/assets/CardType.png" alt="Card Type" class="mb-2" />
              </div>
            </div>
          </div>
        </div>

        <!-- Dot Navigation -->
        <div class="flex justify-center">
          <button v-for="(c, index) in cards" :key="index" @click="selectCard(index)"
            class="w-1.5 h-1.5 mx-1 focus:outline-none bg-[#0C3F62]"
            :class="index === selectedCardIndex ? 'rounded-lg px-2' : 'rounded-full'"></button>
        </div>
      </div>
      <div v-else class="w-full text-blue-900 text-center font-semibold text-xl">
        No card Found
      </div>

      <!-- Common Action Buttons -->
      <div v-if="selectedCard"
        class=" grid grid-cols-2 p-4 my-10 w-auto h-auto lg:h-[70%] bg-[#C2E2EE] rounded-lg content-center gap-3">
        <button @click="toggleLockCard(selectedCard)"
          class="text-blue-700 flex flex-col items-center justify-center p-2">
          <div class="rounded-full p-2 transition-all duration-300 ease-out"
            :class="{ 'bg-[#0C3F62] text-white': selectedCard.isLocked, 'bg-blue-400 text-blue-700': !selectedCard.isLocked }">
            <img src="@/assets/lock-icon.svg" alt="lock" />
          </div>

          <span class="text-xs text-black w-auto text-center">{{ selectedCard.isLocked ? "Unlock" : "Lock" }}
            Card</span>
        </button>

        <button @click="toggleArchiveCard(selectedCard)" :disabled="selectedCard.isLocked"
          class="text-blue-700 flex flex-col items-center justify-center">
          <div class="rounded-full p-2 transition-all duration-300 ease-out"
            :class="{ 'bg-[#0C3F62] text-white': selectedCard.isArchived, 'bg-blue-400 text-blue-700': !selectedCard.isArchived }">
            <img src="@/assets/archive-icon.svg" alt="Archive" />
          </div>
          <span class="text-xs text-black text-center">{{ selectedCard.isArchived ? "Unarchive" : "Archive" }}</span>
        </button>

        <button @click="setAsDefault(selectedCard)" :disabled="selectedCard.isDefault || selectedCard.isLocked"
          class="text-blue-700 flex flex-col items-center justify-center"
          :class="{ 'opacity-50 cursor-not-allowed': selectedCard.isDefault }">
          <img src="@/assets/default-icon.svg" alt="Set as Default" class="w-[32px]" />
          <span class="text-xs text-black text-center">Set as Default</span>
        </button>

        <button @click="addToGPay(selectedCard)" :disabled="selectedCard.addedToGPay || selectedCard.isLocked"
          class="text-blue-700 flex flex-col items-center justify-center"
          :class="{ 'opacity-50 cursor-not-allowed': selectedCard.addedToGPay }">
          <div v-if="selectedCard.addedToGPay" class="absolute top-90">
            <img src="@/assets/default.svg" alt="Set as Default" class="mt-20" />
          </div>
          <img src="@/assets/Ellipse 44.png" alt="Add to GPay" />
          <span class="text-xs text-black text-center">Add to GPay</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { useCardStore } from "@/stores/cardStore";
import type { Card } from "@/types";

const cardStore = useCardStore();

const props = defineProps<{
  cardType: "credit" | "debit";
}>();

const cards = computed(() =>
  props.cardType === "credit"
    ? cardStore.getCreditCards
    : cardStore.getDebitCards
);

const selectedCardIndex = ref(0);
const selectedCard = computed(() => cards.value[selectedCardIndex.value]);
const isCardNumberVisible = ref(false);

const aciveOption = ref(selectedCard.value?.isDefault ? 'default' : selectedCard.value?.addedToGPay ? 'gpay' : selectedCard.value?.isLocked ? 'lock' : 'archive');
const cardStatus = computed(() => {
  if (selectedCard.value.isLocked) return 'lock';
  if (selectedCard.value.isArchived) return 'archive';
  if (selectedCard.value.isDefault) return 'default';
  if (selectedCard.value.addedToGPay) return 'gpay';
  return null;
});

const maskCardNumber = (cardNumber: string) => {
  const lastFourDigits = cardNumber.slice(-4);
  const maskedPart = "•••• •••• ••••";
  return maskedPart + " " + lastFourDigits;
};

const selectCard = (index: number) => {
  selectedCardIndex.value = index;
  console.log("indes", index, cards.value[selectedCardIndex.value]);
};


const toggleShowCardNumber = () => {
  isCardNumberVisible.value = !isCardNumberVisible.value;
};

const toggleLockCard = (card: Card) => {
  cardStore.updateCard({ ...card, isLocked: !card.isLocked });
  aciveOption.value = "lock";

};

const toggleArchiveCard = (card: Card) => {
  cardStore.updateCard({ ...card, isArchived: !card.isArchived });
  aciveOption.value = "archive";
};

const setAsDefault = (card: Card) => {
  cards.value.forEach((c: Card) => {
    if (c.id !== card.id && c.isDefault) {
      cardStore.updateCard({ ...c, isDefault: false });
    }
  });

  cardStore.updateCard({ ...card, isDefault: true });
  aciveOption.value = "default";
};

const addToGPay = (card: Card) => {
  cardStore.updateCard({ ...card, addedToGPay: true });
  aciveOption.value = "gpay";

};
</script>