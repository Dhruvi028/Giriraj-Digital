<template>
  <Teleport to="body">
    <div v-if="isVisible"
      class="w-full fixed inset-0 bg-blue-400 bg-opacity-50 flex items-center justify-center overflow-y-auto">
      <div class="bg-white p-4 w-90">
        <h2 class="text-xl font-semibold mb-4">New Card</h2>
        <form @submit.prevent="submitForm">
          <div class="mb-4" :class="{ 'text-red-500': errors.name }">
            <label class="block text-sm mb-1">Name:</label>
            <input v-model="cardForm.name" type="text" class="w-full border px-2"
              :class="{ 'border-red-500': errors.name }" placeholder="i.e. James Carlon" equired maxlength="35">
            <p v-if="errors.name" class="text-red-500 text-xs mt-1">{{ errors.name }}</p>
          </div>
          <div class="mb-4" :class="{ 'text-red-500': errors.bankName }">
            <label class="block text-sm mb-1">Bank Name:</label>
            <input v-model="cardForm.bankName" type="text" class="w-full border px-2"
              :class="{ 'border-red-500': errors.bankName }" placeholder="i.e. HDFC BANK" required>
            <p v-if="errors.bankName" class="text-red-500 text-xs mt-1 ">{{ errors.bankName }}</p>
          </div>
          <div class="mb-4">
            <label class="block text-sm mb-1">Card Type:</label>
            <select v-model="cardForm.cardType" class="w-full border px-2" required>
              <option value="">Select Card Type</option>
              <option value="credit">Credit</option>
              <option value="debit">Debit</option>
            </select>
            <p v-if="errors.cardType" class="text-red-500 text-xs mt-1">{{ errors.cardType }}</p>
          </div>
          <div class="mb-4" :class="{ 'text-red-500': errors.cardNumber }">
            <label class="block text-sm mb-1">Card Number:</label>
            <input v-model="cardForm.cardNumber" type="text" class="w-full border px-2"
              :class="{ 'border-red-500': errors.cardNumber }" placeholder="i.e. 7754 1542 6584 4875" required>
            <p v-if="errors.cardNumber" class="text-red-500 text-xs mt-1">{{ errors.cardNumber }}</p>
          </div>
          <div class="flex mb-4">
            <div class="w-1/2 pr-2" :class="{ 'text-red-500': errors.validTill }">
              <label class="block text-sm mb-1">Valid Till:</label>
              <input v-model="cardForm.validTill" type="month" class="w-full border py-1 px-2"
                :class="{ 'border-red-500': errors.validTill }" :min="currentMonth" required>
              <p v-if="errors.validTill" class="text-red-500 text-xs mt-1">{{ errors.validTill }}</p>
            </div>
            <div class="w-1/5" :class="{ 'text-red-500': errors.cvv }">
              <label class="block text-sm mb-1 ">CVV:</label>
              <input v-model="cardForm.cvv" type="password" class="w-full border py-1 px-2"
                :class="{ 'border-red-500': errors.cvv }" placeholder="---" required>
              <p v-if="errors.cvv" class="text-red-500 text-xs mt-1">{{ errors.cvv }}</p>
            </div>
          </div>
          <div class="mb-4">
            <label class="flex items-center">
              <input v-model="cardForm.setAsDefault" type="checkbox" class="mr-2">
              <span class="text-sm">Set this card as Default</span>
            </label>
            <p v-if="errors.setAsDefault" class="text-red-500 text-xs mt-1">{{ errors.setAsDefault }}</p>
          </div>
          <div class="mb-4">
            <label class="flex items-center">
              <input v-model="cardForm.addToGPay" type="checkbox" class="mr-2">
              <span class="text-sm">Add this card to GPay?</span>
            </label>
          </div>
          <hr class="pb-4 border-1" />
          <div class="flex justify-end">
            <button type="button" @click="hide"
              class="bg-gray-100 text-gray-700 px-4 py-1 rounded-md mr-2">Cancel</button>
            <button type="submit" class="bg-blue-500 text-white px-4 py-1 rounded-md">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue';
import { useCardStore } from '@/stores/cardStore';
import type { Card } from '@/types';

const cardStore = useCardStore();
const isVisible = ref(false);

const cardForm = reactive({
  name: '',
  bankName: '',
  cardType: 'credit' as 'credit' | 'debit',
  cardNumber: '',
  validTill: '',
  cvv: '',
  setAsDefault: false,
  addToGPay: false,
});

const errors = reactive({
  name: '',
  bankName: '',
  cardType: '',
  cardNumber: '',
  validTill: '',
  cvv: '',
  setAsDefault: '',
});

const show = () => {
  isVisible.value = true;
};

const hide = () => {
  Object.assign(cardForm, {
    name: '',
    bankName: '',
    cardType: 'credit',
    cardNumber: '',
    validTill: '',
    cvv: '',
    setAsDefault: false,
    addToGPay: false,
  });
  Object.keys(errors).forEach(key => (errors[key as keyof typeof errors] = ''));
  isVisible.value = false;
}
const currentMonth = computed(() => {
  const now = new Date();
  return `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}`;
});

const validateForm = () => {
  let isValid = true;
  errors.cardNumber = validateCardNumber(cardForm.cardNumber) ? '' : 'Invalid card number';
  errors.validTill = validateValidTill(cardForm.validTill) ? '' : 'Invalid date (MM/YYYY)';

  if (cardForm.setAsDefault) {
    console.log("cardForm.setAsDefault", cardForm.setAsDefault);
    
    const hasDefaultCard = cardStore.cards.some((card: Card) => card.cardType === cardForm.cardType && card.isDefault);
    if (hasDefaultCard) {
      errors.setAsDefault = 'The selected card type already has a default card.';
      isValid = false;
    }
  }else{
    errors.setAsDefault= '';
    isValid = true;
  }

  return isValid && !Object.values(errors).some(error => error !== '');
};

const validateCardNumber = (number: string): boolean => {
  const cleanNumber = number.replace(/\D/g, '');
  if (cleanNumber.length < 13 || cleanNumber.length > 19) return false;

  let sum = 0;
  let isEven = false;

  for (let i = cleanNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cleanNumber.charAt(i), 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    isEven = !isEven;
  }

  const firstTwoDigits = cleanNumber.slice(0, 2);
  const firstDigit = cleanNumber[0];

  if (firstDigit === '4' && [13, 16, 19].includes(cleanNumber.length)) return sum % 10 === 0;
  if (['51', '52', '53', '54', '55'].includes(firstTwoDigits) && cleanNumber.length === 16) return sum % 10 === 0;
  if (['34', '37'].includes(firstTwoDigits) && cleanNumber.length === 15) return sum % 10 === 0;
  if (firstTwoDigits === '65' || (parseInt(firstTwoDigits) >= 64 && parseInt(firstTwoDigits) <= 65) || cleanNumber.startsWith('6011') && cleanNumber.length === 16) return sum % 10 === 0;

  return sum % 10 === 0;
};

const validateValidTill = (date: string) => {

  const dateMonthYear = date.split('-');
  const month = +dateMonthYear[1];
  const year = +dateMonthYear[0] - 1;
  const cardDate = new Date(year, month + 1, 0).getDate();
  const dateObj = new Date(year, month, cardDate - 2); // Timezones fix.
  const dateNow = new Date();

  return dateNow > dateObj;
};


const submitForm = () => {
  if (validateForm()) {
    const newCard: Card = {
      id: Date.now().toString(),
      ...cardForm,
      isDefault: cardForm.setAsDefault,
      addedToGPay: cardForm.addToGPay,
      isLocked: false,
      isArchived: false,
    };
    cardStore.addCard(newCard);
    hide();
  }

};

defineExpose({ show, hide });

</script>
