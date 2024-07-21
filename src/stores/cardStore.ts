import { defineStore } from 'pinia';
import { storage } from '@/utils/storage';
import type { Card } from '@/types';

const STORAGE_KEY = 'cards';

export const useCardStore = defineStore('card', {
  state: () => ({
    cards: storage.get(STORAGE_KEY) || [
      {
        id: '1',
        name: 'John Doe',
        bankName: 'Chase Bank',
        cardType: 'credit',
        cardNumber: '4111 1111 1111 1111',
        validTill: '12/25',
        cvv: '123',
        isDefault: true,
        addedToGPay: false,
        isLocked: false,
        isArchived: false,
      },
    ] as Card[],
  }),
  actions: {
    addCard(card: Card) {
      this.cards.push(card);
      this.saveCards();
    },
    updateCard(updatedCard: Card) {
      const index = this.cards.findIndex((card: Card) => card.id === updatedCard.id);
      if (index !== -1) {
        this.cards[index] = updatedCard;
        this.saveCards();
      }
    },
    saveCards() {
      storage.set(STORAGE_KEY, this.cards);
    },
  },
  getters: {
    getCreditCards: (state) => state.cards.filter((card: Card) => card.cardType === 'credit'),
    getDebitCards: (state) => state.cards.filter((card: Card) => card.cardType === 'debit'),
  },
});
