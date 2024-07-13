export type PaymentTransaction = {
  id: number;
  refNumber: string;
  status: string;
  transactionCompletedAt?: any;
  stamptUserId: number;
  slipImage?: any;
  createdAt: string;
  updatedAt: string;
};
