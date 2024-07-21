<template>
  <div class="max-w-7xl py-3 px-2 md:px-6 md:mx-4 mx-0 bg-white border-2">
    <div class="flex justify-between items-center">
      <div class="flex space-x-4">
        <button  @click="activateTab('saved')" :class="{'text-blue-500 border-blue-600' : activeTab === 'saved'}" class="font-normal pb-2 border-b-2 hover:text-[#0FA1DB]">
          Saved Cards
        </button>
        <button @click="activateTab('cd')" class="font-normal pb-2 border-b-2 hover:text-[#0FA1DB]" :class="{'text-blue-500 border-blue-600' : activeTab === 'cd'}">
          CD Cards
        </button>
      </div>
      <button @click="showModal"
        class="bg-[#0FA1DB] text-white px-2 py-1 text-sm font-normal hover:bg-blue-600 transition duration-300">
        + Add Card
      </button>
    </div>
    <hr class="mb-6 border" />
    <div v-if="activeTab === 'saved'" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="space-y-6">
        <div class="bg-gray-50 p-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <img src="@/assets/CardDetailIcon.svg" alt="card detail" />

              <span class="font-normal text-[#0FA1DB]">Card Details</span>
            </div>
            <button @click="isCardDetailsCollapsed = !isCardDetailsCollapsed" class="pointer">
              <!-- <img :src="isCardDetailsCollapsed ? '@/assets/UpArrowBg.svg' : '@/assets/DownArrowBg.svg'" alt="toggle arrow" /> -->
              <img src="@/assets/DownArrowBg.svg" alt="toggle arrow" />
            </button>
          </div>
        </div>

        <div>
          <div class="bg-gray-50 p-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <img src="@/assets/TansactionBlueIcon.svg" alt="tansaction detail" />

                <span class="font-normal text-[#0FA1DB]">Today's Transactions</span>
              </div>

              <button @click="isTransactionsCollapsed = !isTransactionsCollapsed" class="pointer">
                <!-- <img :src="isTransactionsCollapsed ? require(`@/assets/UpArrowBg.svg`) : require(`@/assets/DownArrowBg.svg`)" alt="toggle arrow" /> -->
                <img src="@/assets/DownArrowBg.svg" alt="toggle arrow" />
              </button>
            </div>
          </div>
          <div class="space-y-3 bg-white border-x-2 border-b-2 p-4" v-if="isTransactionsCollapsed"
            @close="isTransactionsCollapsed = false">
            <template v-for="(transaction, index) in transactions" :key="index">
              <TransactionItem :title="transaction.title" :description="transaction.description"
                :date="transaction.date" :amount="transaction.amount" :type="transaction.type" />
              <hr v-if="index !== transactions.length - 1" class="border-1 border-[#0FA1DB]" />
            </template>
          </div>
        </div>
      </div>

      <div class="mt-6 col-span-2">
        <div>

          <h2 class="text-xl font-medium text-[#0FA1DB]">Credit Cards</h2>
          <hr class="w-[95px] mb-4 border-1 border-[#0FA1DB] opacity-75 " />
          <div class="flex items-center justify-between">
            <CardCarousel cardType="credit" />
            <div class="flex flex-col space-y-2">
              <ActionButton icon="lock" text="Lock Card" />
              <ActionButton icon="archive" text="Archive" />
              <ActionButton icon="default" text="Set as Default" isActive />
              <ActionButton icon="gpay" text="Add to GPay" />
            </div>
          </div>
        </div>

        <div class="mt-6">
          <h2 class="text-xl font-medium text-[#0FA1DB]">Debit Cards</h2>
          <hr class="w-[95px] mb-4 border-1 border-[#0FA1DB] opacity-75 " />
          <div class="flex items-center justify-between">
            <CardCarousel cardType="debit" />
            <div class="flex flex-col space-y-2">
              <ActionButton icon="lock" text="Lock Card" />
              <ActionButton icon="archive" text="Archive" />
              <ActionButton icon="default" text="Set as Default" isActive />
              <ActionButton icon="gpay" text="Add to GPay" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8 h-screen">CD</div>
  </div>

  <AddCardModal ref="modal" />
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import CardCarousel from "@/components/CardCarousel.vue";
import AddCardModal from "@/components/AddCardModal.vue";
import TransactionItem from "@/components/TransactionItem.vue";

interface Transaction {
  title: string;
  description: string;
  date: string;
  amount: string;
  type: "credit" | "debit";
}

const isAddCardModalVisible = ref(false);
const isCardDetailsCollapsed = ref(false);
const isTransactionsCollapsed = ref(false);
const activeTab = ref('saved');

const modal = ref<InstanceType<typeof AddCardModal> | null>(null);

const showModal = () => {
  modal.value?.show();
};

onMounted(() => {
  if (modal.value) {
    modal.value?.hide();
  }
});

const activateTab = (tab: string) => {
  activeTab.value = tab;
};

const transactions = ref<Transaction[]>([
  {
    title: "Ordered Food",
    description: "Charges applied on credit card",
    date: "20th May 2022",
    amount: "150.50",
    type: "debit",
  },
  {
    title: "Ticket Refund",
    description: "Amount credited on debit card",
    date: "20th May 2022",
    amount: "30.50",
    type: "credit",
  },
  {
    title: "Interest credited",
    description: "Amount credited on debit card",
    date: "20th May 2022",
    amount: "5.50",
    type: "credit",
  },
  {
    title: "Electricity bill paid",
    description: "Charges applied on credit card",
    date: "20th May 2022",
    amount: "1050.50",
    type: "debit",
  },
]);

const showAddCardModal = () => {
  isAddCardModalVisible.value = true;
};
</script>

