export interface BreadcrumbItem {
    name: string;
    path: string;
}

export interface Card {
  id: string;
  name: string;
  bankName: string;
  cardType: 'credit' | 'debit';
  cardNumber: string;
  validTill: string;
  cvv: string;
  isDefault: boolean;
  addedToGPay: boolean;
  isLocked: boolean;
  isArchived: boolean;
}
  