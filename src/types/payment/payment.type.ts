export type PaymentTransaction = {
  id: number;
  refNumber: string;
  status: string;
  transactionCompletedAt?: string | Date;
  stamptUserId: number;
  slipImage?: string;
  createdAt: string;
  updatedAt: string;
};
