export type PaymentTransaction = {
  id: number;
  refNumber: string;
  status: "pending" | "completed" | "cancelled";
  transactionCompletedAt?: string | Date;
  stamptUserId: number;
  slipImage?: string;
  createdAt: string;
  updatedAt: string;
};
